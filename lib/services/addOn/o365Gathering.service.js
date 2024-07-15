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
const jsonStringify_1 = require("../../helpers/jsonStringify");
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
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response.data.value));
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
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response.data.value));
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
            jsonData.usersLicenses = JSON.parse((0, jsonStringify_1.jsonStringify)(adaptedResponse));
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
                jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response.data.value));
            else
                jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response.data));
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
                tmpJson.methods = JSON.parse((0, jsonStringify_1.jsonStringify)(response.data.value));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibzM2NUdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL28zNjVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7Ozs7OztBQUVGLHNGQUFzRTtBQUd0RSwrREFBNEQ7QUFFNUQsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxZQUFZLENBQUMsQ0FBQztBQUMxQyxJQUFJLGFBQXdCLENBQUM7QUFFN0IseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFFbEMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxVQUF1QjtJQUNyRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztJQUUzQyxLQUFLLElBQUksTUFBTSxJQUFJLFVBQVUsSUFBRSxFQUFFLEVBQUU7UUFDL0IsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLGFBQWEsR0FBRztZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsSUFBSTtZQUNoQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7WUFDZCxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHFCQUFxQixFQUFFLElBQUk7U0FDYixDQUFDO1FBQ25CLElBQUk7WUFDQSxJQUFJLE1BQU0s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