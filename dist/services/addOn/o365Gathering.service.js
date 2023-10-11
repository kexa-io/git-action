"use strict";
/*
    * Provider : o365
    * Thumbnail : https://www.logo.wine/a/logo/Office_365/Office_365-Logo.wine.svg
    * Documentation : https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - sku
    *       - user
    *       - domain
    *       - secure_score
    *       - auth_methods
    *       - organization
    *       - directory
    *       - sp
    *       - alert
    *       - incident
    *       - app_access_policy
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectData = void 0;
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("o365Logger");
/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
async function collectData(o365Config) {
    let resources = new Array();
    for (let config of o365Config ?? []) {
        let o365Resources = {
            "sku": null,
            "user": null,
            "domain": null,
            "secure_score": null,
            "auth_methods": null,
            "organization": null,
            "directory_role": null,
            "sp": null,
            "alert": null,
            "incident": null,
            "app_access_policy": null
        };
        try {
            let prefix = config.prefix ?? (o365Config.indexOf(config) + "-");
            let subscriptionId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix);
            const clientId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTID", prefix);
            const clientSecret = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTSECRET", prefix);
            const tenantId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURETENANTID", prefix);
            const graphApiEndpoint = 'https://graph.microsoft.com/v1.0';
            let accessToken;
            if (tenantId && clientId && clientSecret)
                accessToken = await getToken(tenantId, clientId, clientSecret);
            else
                logger.error("Failed to get client id, tenant id or client secret env var for token retrieve. Leaving O365 gathering...");
            if (accessToken == null) {
                logger.error("Failed to get authentification token for Microsoft Graph API. Leaving O365 gathering...");
            }
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`);
            if (!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            }
            else {
                logger.info("- listing O365 resources -");
                const userList = await listUsers(graphApiEndpoint, accessToken, headers);
                const promises = [
                    await listSubscribedSkus(graphApiEndpoint, accessToken, headers),
                    await listDomains(graphApiEndpoint, accessToken, headers),
                    await listSecureScore(graphApiEndpoint, accessToken, headers),
                    await listAuthMethods(graphApiEndpoint, accessToken, userList),
                    await listOrganization(graphApiEndpoint, accessToken, headers),
                    await listDirectoryRole(graphApiEndpoint, accessToken, headers),
                    await listServicePrincipal(graphApiEndpoint, accessToken, headers),
                    await listAlerts(graphApiEndpoint, accessToken, headers),
                    await listIncidents(graphApiEndpoint, accessToken, headers),
                    await listAppAccessPolicy(graphApiEndpoint, accessToken, headers, userList)
                ];
                const [skuList, domainList, secure_scoreList, auth_methodsList, organizationList, directoryList, spList, alertList, incidentList, app_access_policyList] = await Promise.all(promises);
                o365Resources = {
                    sku: skuList,
                    user: userList,
                    domain: domainList,
                    secure_score: secure_scoreList,
                    auth_methods: auth_methodsList,
                    organization: organizationList,
                    directory_role: directoryList,
                    sp: spList,
                    alert: alertList,
                    incident: incidentList,
                    app_access_policy: app_access_policyList
                };
                logger.info("- listing O365 resources done -");
            }
        }
        catch (e) {
            logger.error("error in collect O365 data: ");
            logger.error(e);
        }
        resources.push(o365Resources);
    }
    return resources ?? null;
}
exports.collectData = collectData;
const axios_1 = __importDefault(require("axios"));
async function getToken(tenantId, clientId, clientSecret) {
    const requestBody = new URLSearchParams();
    if (clientId && clientSecret) {
        requestBody.append('grant_type', 'client_credentials');
        requestBody.append('client_id', clientId);
        requestBody.append('client_secret', clientSecret);
        requestBody.append('scope', 'https://graph.microsoft.com/.default');
    }
    let accessToken;
    try {
        const response = await axios_1.default.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, requestBody);
        if (response.status == 200)
            accessToken = response.data.access_token;
        else {
            logger.error("O365 - Error on token retrieve.");
            return null;
        }
    }
    catch (error) {
        console.error('O365 - Error fetching token:', error);
        throw error;
    }
    return accessToken ?? null;
}
async function listUsers(endpoint, accessToken, headers) {
    const axios = require("axios");
    let jsonData = [];
    try {
        const response = await axios.get(`${endpoint}/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status != 200) {
            logger.error("O365 - Error when calling graph API");
            return null;
        }
        jsonData = JSON.parse(JSON.stringify(response.data.value));
        for (const element of jsonData) {
            try {
                const licenseResponse = await axios.get(`${endpoint}/users/${element.id}/licenseDetails`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                element.licenses = licenseResponse.data.value;
                const userTypeResponse = await axios.get(`${endpoint}/users/${element.id}?$select=userType,id,passwordPolicies`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (userTypeResponse.status != 200) {
                    logger.warn("O365 - Error when calling graph API for user " + element.displayName);
                    element.userType = null;
                    continue;
                }
                element.userType = userTypeResponse.data.userType;
                element.passwordPolicies = userTypeResponse.data.passwordPolicies;
            }
            catch (e) {
                logger.error('O365 - Error fetching user ');
                logger.error(e);
            }
        }
    }
    catch (error) {
        console.error('O365 - Error fetching :');
        console.error(error.response.data);
    }
    return jsonData ?? null;
}
async function listSubscribedSkus(endpoint, accessToken, headers) {
    let jsonData = [];
    try {
        const response = await axios_1.default.get(`${endpoint}/subscribedSkus`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for subsribed Skus ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
        const assignedResponse = await axios_1.default.get(`${endpoint}/users?$select=id,assignedLicenses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (assignedResponse.status != 200) {
            logger.warn("O365 - Error when calling graph API for users (skus) ");
        }
        else {
            const adaptedResponse = assignedResponse.data.value.map((user) => ({
                userId: user.id,
                assignedLicenses: user.assignedLicenses,
            }));
            jsonData.usersLicenses = JSON.parse(JSON.stringify(adaptedResponse));
        }
    }
    catch (e) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}
async function genericListing(endpoint, accessToken, queryEndpoint, operationName) {
    let jsonData = [];
    try {
        const response = await axios_1.default.get(`${endpoint}/${queryEndpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for " + operationName);
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    }
    catch (e) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}
async function listDomains(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "domains", "Domains");
    return jsonData ?? null;
}
async function listSecureScore(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "security/secureScores", "Secure scores");
    return jsonData ?? null;
}
async function listAuthMethods(endpoint, accessToken, userList) {
    let jsonData = [];
    for (const element of userList) {
        try {
            const response = await axios_1.default.get(`${endpoint}/users/${element.id}/authentication/methods`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status != 200) {
                logger.warn("O365 - Error when calling graph API for Auth Methods ");
                return null;
            }
            else {
                let tmpJson = { methods: [], userId: {}, userName: {} };
                tmpJson.methods = JSON.parse(JSON.stringify(response.data.value));
                tmpJson.userId = element.id;
                tmpJson.userName = element.displayName;
                tmpJson.methods.forEach((method) => {
                    method.dataType = method['@odata.type'];
                    method.userId = element.id;
                    delete method['@odata.type'];
                });
                jsonData.push(tmpJson);
            }
        }
        catch (e) {
            logger.error(e.response.data);
        }
    }
    return jsonData ?? null;
}
async function listOrganization(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "organization?$select=passwordPolicies", "Organization");
    return jsonData ?? null;
}
async function listDirectoryRole(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "directoryRoles", "Directory roles");
    return jsonData ?? null;
}
async function listServicePrincipal(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "servicePrincipals", "Service principals");
    return jsonData ?? null;
}
async function listAlerts(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "security/alerts_v2", "Security alerts");
    return jsonData ?? null;
}
async function listIncidents(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "security/incidents", "Security incidents");
    return jsonData ?? null;
}
async function listAppAccessPolicy(endpoint, accessToken, headers, userList) {
    const axios = require("axios");
    let jsonData;
    for (let i = 0; i < userList.length; i++) {
        try {
            const licenseResponse = await axios.get(`${endpoint}/users/${userList[i].id}/memberOf`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (licenseResponse.status != 200) {
                logger.warn("O365 - Error when calling graph API for user " + jsonData[i].displayName);
                continue;
            }
            jsonData = licenseResponse.data.value;
        }
        catch (e) {
            logger.error('O365 - Error fetching user ');
            logger.error(e);
        }
    }
    return jsonData ?? null;
}
//# sourceMappingURL=o365Gathering.service.js.map