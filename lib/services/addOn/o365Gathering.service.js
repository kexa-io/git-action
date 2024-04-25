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
    *       - directory_role
    *       - sp
    *       - alert
    *       - incident
    *       - app_access_policy
    *       - group
    *       - policy
    *       - conditional_access
    *       - sharepoint_settings
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
let currentConfig;
/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
async function collectData(o365Config) {
    let resources = new Array();
    for (let config of o365Config ?? []) {
        currentConfig = config;
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
            "app_access_policy": null,
            "group": null,
            "policy": null,
            "conditional_access": null,
            "sharepoint_settings": null
        };
        try {
            let prefix = config.prefix ?? (o365Config.indexOf(config).toString());
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
                    listSubscribedSkus(graphApiEndpoint, accessToken, headers),
                    listDomains(graphApiEndpoint, accessToken, headers),
                    listSecureScore(graphApiEndpoint, accessToken, headers),
                    listAuthMethods(graphApiEndpoint, accessToken, userList),
                    listOrganization(graphApiEndpoint, accessToken, headers),
                    listDirectoryRole(graphApiEndpoint, accessToken, headers),
                    listServicePrincipal(graphApiEndpoint, accessToken, headers),
                    listAlerts(graphApiEndpoint, accessToken, headers),
                    listIncidents(graphApiEndpoint, accessToken, headers),
                    listAppAccessPolicy(graphApiEndpoint, accessToken, headers, userList),
                    listGroups(graphApiEndpoint, accessToken, headers),
                    listPolicies(graphApiEndpoint, accessToken, headers),
                    listConditionalAccess(graphApiEndpoint, accessToken, headers),
                    listSharepointSettings(graphApiEndpoint, accessToken, headers)
                ];
                const [skuList, domainList, secure_scoreList, auth_methodsList, organizationList, directoryList, spList, alertList, incidentList, app_access_policyList, groupList, policyList, conditional_accessList, sharepoint_settingsList] = await Promise.all(promises);
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
                    app_access_policy: app_access_policyList,
                    group: groupList,
                    policy: policyList,
                    conditional_access: conditional_accessList,
                    sharepoint_settings: sharepoint_settingsList
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
    if (!currentConfig?.ObjectNameNeed?.includes("user"))
        return null;
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
                element.passwordProfile = await genericListing(endpoint, accessToken, "users/" + element.id + "/passwordProfile", "User password profile");
                if (element.passwordProfile == '')
                    element.passwordProfile = null;
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
    if (!currentConfig?.ObjectNameNeed?.includes("sku"))
        return null;
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
            if (response.data.value)
                jsonData = JSON.parse(JSON.stringify(response.data.value));
            else
                jsonData = JSON.parse(JSON.stringify(response.data));
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
    if (!currentConfig?.ObjectNameNeed?.includes("auth_methods"))
        return null;
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
                let tmpJson = { methods: [], userId: {}, userName: {}, userRole: {} };
                tmpJson.methods = JSON.parse(JSON.stringify(response.data.value));
                tmpJson.userId = element.id;
                tmpJson.userName = element.displayName;
                tmpJson.userRole = element.displayName;
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
    let jsonDataDetails;
    jsonData = await genericListing(endpoint, accessToken, "directoryRoles", "Directory roles");
    if (jsonData) {
        for (let i = 0; i < jsonData.length; i++) {
            jsonDataDetails = await genericListing(endpoint, accessToken, "directoryRoles/" + jsonData[i].id + "/members", "Directory roles assignments");
            jsonData[i].assignedUsers = jsonDataDetails;
        }
    }
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
    if (!currentConfig?.ObjectNameNeed?.includes("app_access_policy"))
        return null;
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
async function listGroups(endpoint, accessToken, headers) {
    let jsonData;
    let jsonDataOwners;
    jsonData = await genericListing(endpoint, accessToken, "groups", "Groups");
    if (jsonData) {
        for (let i = 0; i < jsonData.length; i++) {
            jsonDataOwners = await genericListing(endpoint, accessToken, "groups/" + jsonData[i].id + "/owners", "Groups");
        }
    }
    return jsonData ?? null;
}
// NEED TO LINK THIS TO A USER AUTH METHOD ???
async function listPolicies3(endpoint, accessToken, headers) {
    let jsonData;
    jsonData = await genericListing(endpoint, accessToken, "policies/authenticationStrengthPolicies", "Policies");
    return jsonData ?? null;
}
// NEED RESOURCE TO TEST ON PORTAL
async function listConditionalAccess(endpoint, accessToken, headers) {
    let jsonDataPolicies;
    jsonDataPolicies = await genericListing(endpoint, accessToken, "identity/conditionalAccess/policies", "Identity policies");
    return jsonDataPolicies ?? null;
}
/// NEED PERMISSIONS VALIDATION ON PORTAL
async function listPolicies(endpoint, accessToken, headers) {
    //let jsonData : any[] | null;
    let jsonData = [];
    let jsonDataAuthMethods, jsonDataTimeout, jsonDataSecurityDefault, jsonDataAuth, jsonTenant;
    jsonDataTimeout = await genericListing(endpoint, accessToken, "policies/activityBasedTimeoutPolicies", "Policies Timeout");
    if (jsonDataTimeout) {
        for (let i = 0; i < jsonDataTimeout.length; i++) {
            jsonDataTimeout[i].definition = JSON.parse(jsonDataTimeout[i].definition);
            jsonData.push(jsonDataTimeout[i]);
        }
    }
    jsonDataSecurityDefault = await genericListing(endpoint, accessToken, "policies/identitySecurityDefaultsEnforcementPolicy", "Security Default Policy");
    if (jsonDataSecurityDefault)
        jsonData.push(jsonDataSecurityDefault);
    jsonDataAuthMethods = await genericListing(endpoint, accessToken, "policies/authenticationMethodsPolicy", "Auth Methods Policies");
    if (jsonDataAuthMethods) {
        jsonData.push(jsonDataAuthMethods);
    }
    jsonDataAuth = await genericListing(endpoint, accessToken, "policies/authorizationPolicy", "Authorization Policies");
    if (jsonDataAuth) {
        jsonData.push(jsonDataAuth);
    }
    jsonTenant = await genericListing(endpoint, accessToken, "policies/defaultAppManagementPolicy", "App Management Policy");
    if (jsonTenant) { //policies/defaultAppManagementPolicy
        jsonData.push(jsonTenant);
    }
    return jsonData ?? null;
}
async function listSharepointSettings(endpoint, accessToken, headers) {
    let jsonData = [];
    let jsonSettings;
    jsonSettings = await genericListing(endpoint, accessToken, "admin/sharepoint/settings", "Sharepoint Settings");
    jsonData.push(jsonSettings);
    return jsonData ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibzM2NUdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL28zNjVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7Ozs7OztBQUVGLHNGQUFzRTtBQUl0RSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLElBQUksYUFBd0IsQ0FBQztBQUU3Qix5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUVsQyxLQUFLLFVBQVUsV0FBVyxDQUFDLFVBQXVCO0lBQ3JELElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFpQixDQUFDO0lBRTNDLEtBQUssSUFBSSxNQUFNLElBQUksVUFBVSxJQUFFLEVBQUUsRUFBRTtRQUMvQixhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksYUFBYSxHQUFHO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLG9CQUFvQixFQUFFLElBQUk7WUFDMUIscUJBQXFCLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDbkIsSUFBSTtZQUNBLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FB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