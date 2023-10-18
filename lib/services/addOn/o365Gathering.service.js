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
                    logger.warning("O365 - Error when calling graph API for user " + element.displayName);
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
            logger.warning("O365 - Error when calling graph API for subsribed Skus ");
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
            logger.warning("O365 - Error when calling graph API for users (skus) ");
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
            logger.warning("O365 - Error when calling graph API for " + operationName);
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
                logger.warning("O365 - Error when calling graph API for Auth Methods ");
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
                logger.warning("O365 - Error when calling graph API for user " + jsonData[i].displayName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibzM2NUdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL28zNjVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWtCRTs7Ozs7O0FBRUYsc0ZBQWlGO0FBSWpGLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBRWhDLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFFbEMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxVQUF1QjtJQUNyRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztJQUUzQyxLQUFLLElBQUksTUFBTSxJQUFJLFVBQVUsSUFBRSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxhQUFhLEdBQUc7WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLElBQUk7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLElBQUk7WUFDaEIsbUJBQW1CLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFDbkIsSUFBSTtZQUNBLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdELElBQUksY0FBYyxHQUFHLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxD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