"use strict";
/*
    * Provider : googleWorkspace
    * Thumbnail : https://lh3.googleusercontent.com/sYGCKFdty43En6yLGeV94mfNGHXfVj-bQYitHRndarB7tHmQq_kyVxhlPejeCBVEEYUbnKG2_jUzgNXoPoer6XJm71V3uz2Z6q0CmNw=w0
    * Documentation : https://developers.google.com/workspace?hl=fr
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - user
    *       - domain
    *       - group
    *       - role
    *       - orgaunit
    *       - calendar
    *       - file
    *       - drive
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectData = void 0;
const process = require('process');
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const files_1 = require("../../helpers/files");
const jsonStringify_1 = require("../../helpers/jsonStringify");
////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("googleWorkspaceLogger");
const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
let currentConfig;
/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
//////////////////////////////////
// DELETE NOT READ ONLY AND TRY //
//////////////////////////////////
const SCOPES = [
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    'https://www.googleapis.com/auth/admin.directory.domain.readonly',
    'https://www.googleapis.com/auth/admin.directory.group.readonly',
    'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
    'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.settings.readonly',
    'https://www.googleapis.com/auth/calendar.acls.readonly',
    'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
];
//getConfigOrEnvVar();
const TOKEN_PATH = path.join(process.cwd(), '/config/token_workspace.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials_workspace.json');
async function collectData(googleWorkspaceConfig) {
    let resources = new Array();
    for (let config of googleWorkspaceConfig ?? []) {
        currentConfig = config;
        let googleWorkspaceResources = {
            "user": null,
            "domain": null,
            "group": null,
            "role": null,
            "orgaunit": null,
            "calendar": null,
            "file": null,
            "drive": null
        };
        try {
            let prefix = config.prefix ?? (googleWorkspaceConfig.indexOf(config).toString());
            (0, files_1.writeStringToJsonFile)(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "WORKSPACECRED", prefix), path.join(process.cwd(), '/config/credentials_workspace.json'));
            if (process.env[googleWorkspaceConfig.indexOf(config) + "-WORKSPACETOKEN"])
                (0, files_1.writeStringToJsonFile)(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "WORKSPACETOKEN", prefix), "./config/token_workspace.json");
            const auth = await authorize();
            const promises = [
                await listUsers(auth),
                await listDomains(auth),
                await listGroups(auth),
                await listRoles(auth),
                await listOrganizationalUnits(auth),
                await listCalendars(auth),
                await listFiles(auth),
                await listDrive(auth)
            ];
            const [userList, domainList, groupList, roleList, orgaunitList, calendarList, fileList, driveList] = await Promise.all(promises);
            googleWorkspaceResources = {
                user: userList,
                domain: domainList,
                group: groupList,
                role: roleList,
                orgaunit: orgaunitList,
                calendar: calendarList,
                file: fileList,
                drive: driveList
            };
            logger.info("- listing googleWorkspace resources done -");
        }
        catch (e) {
            logger.error("error in collect googleWorkspace data: ");
            logger.error(e);
        }
        (0, files_1.deleteFile)("./config/credentials_workspace.json");
        (0, files_1.deleteFile)("./config/token_workspace.json");
        resources.push(googleWorkspaceResources);
    }
    return resources ?? null;
}
exports.collectData = collectData;
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    }
    catch (err) {
        return null;
    }
}
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = (0, jsonStringify_1.jsonStringify)({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}
async function listUsers(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("user"))
        return null;
    let jsonData = [];
    const service = google.admin({ version: 'directory_v1', auth });
    const res = await service.users.list({
        customer: 'my_customer',
        orderBy: 'email',
    });
    const users = res.data.users;
    if (!users || users.length === 0) {
        console.log('No users found.');
        return null;
    }
    jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(users));
    let nbSuperAdmin = 0;
    for (let i = 0; i < jsonData.length; i++) {
        const service = google.admin({ version: 'directory_v1', auth });
        let isSuperAdmin = false;
        try {
            const adminRoles = await service.roles.list({
                customer: 'my_customer',
                userKey: jsonData[i].primaryEmail,
            });
            jsonData[i].adminRoles = JSON.parse((0, jsonStringify_1.jsonStringify)(adminRoles.data.items));
            jsonData[i].adminRoles.forEach((element) => {
                if (element.isSuperAdminRole == true) {
                    isSuperAdmin = true;
                }
            });
        }
        catch (error) {
            logger.debug('Error listing user roles:', error);
            return [];
        }
        if (isSuperAdmin) {
            nbSuperAdmin = nbSuperAdmin + 1;
        }
    }
    jsonData.forEach((element) => {
        element.totalSuperAdmin = nbSuperAdmin;
    });
    return jsonData ?? null;
}
async function listDomains(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("domain"))
        return null;
    let jsonData = [];
    const admin = google.admin({ version: 'directory_v1', auth });
    try {
        const domainResponse = await admin.domains.list({
            customer: 'my_customer',
        });
        const domains = domainResponse.data.domains;
        for (let i = 0; i < domains.length; i++) {
            let newJsonEntry = {};
            try {
                const admin = google.admin({ version: 'directory_v1', auth });
                const domainResponse = await admin.domains.get({
                    customer: 'my_customer',
                    domainName: domains[i].domainName,
                });
                newJsonEntry = {
                    domainName: domains[i].domainName,
                    domainInfos: domainResponse.data
                };
                jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(newJsonEntry)));
            }
            catch (e) {
                logger.debug(e);
            }
        }
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
async function listGroups(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("group"))
        return null;
    let jsonData = [];
    const admin = google.admin({ version: 'directory_v1', auth });
    try {
        const groupResponse = await admin.groups.list({
            customer: 'my_customer',
        });
        const groups = groupResponse.data;
        if (groups)
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(groups));
        else
            return null;
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
async function listRoles(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("role"))
        return null;
    let jsonData = [];
    const service = google.admin({ version: 'directory_v1', auth });
    try {
        const adminRoles = await service.roles.list({
            customer: 'my_customer',
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(adminRoles.data.items));
    }
    catch (error) {
        logger.debug('Error listing user roles:', error);
    }
    return jsonData ?? null;
}
async function listOrganizationalUnits(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("orgaunit"))
        return null;
    let jsonData = [];
    try {
        const service = google.admin({
            version: 'directory_v1',
            auth,
        });
        const orgUnits = await service.orgunits.list({
            customerId: 'my_customer',
        });
        const orgUnitList = orgUnits.data;
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(orgUnitList));
    }
    catch (error) {
        logger.debug('Error listing organizational units:', error);
    }
    return jsonData ?? null;
}
async function listCalendars(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("calendar"))
        return null;
    let jsonData = [];
    try {
        const calendar = google.calendar({ version: 'v3', auth });
        const response = await calendar.calendarList.list({
            customer: "my_customer"
        });
        const calendars = response.data.items;
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(calendars));
        for (let i = 0; i < jsonData.length; i++) {
            const responseUnit = await calendar.acl.list({
                customer: "my_customer",
                calendarId: jsonData[i].id
            });
            const calendarACL = responseUnit.data;
            jsonData[i].calendarACL = JSON.parse((0, jsonStringify_1.jsonStringify)(calendarACL.items));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
async function listFiles(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("file"))
        return null;
    let jsonData = [];
    try {
        const drive = google.drive({ version: 'v3', auth });
        const response = await drive.files.list();
        const files = response.data.files;
        for (let i = 0; i < files.length; i++) {
            const res = await drive.files.get({
                fileId: files[i].id,
                fields: '*'
            });
            jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(res.data)));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
async function listDrive(auth) {
    if (!currentConfig?.ObjectNameNeed?.includes("drive"))
        return null;
    let jsonData = [];
    try {
        const drive = google.drive({ version: 'v3', auth });
        const response = await drive.drives.list();
        const drives = response.data.drives;
        for (let i = 0; i < drives.length; i++) {
            const res = await drive.drives.get({
                driveId: drives[i].id,
                fields: '*'
            });
            jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(res.data)));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLHNGQUFzRTtBQUd0RSwrQ0FBc0U7QUFDdEUsK0RBQTREO0FBRTVELGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBRWhDLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUVyRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ2xDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEVBQUMsWUFBWSxFQUFDLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDM0QsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxJQUFJLGFBQW9DLENBQUM7QUFFekMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFHekMsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsTUFBTSxNQUFNLEdBQUc7SUFDWCwrREFBK0Q7SUFDL0QsaUVBQWlFO0lBQ2pFLGdFQUFnRTtJQUNoRSx5RUFBeUU7SUFDekUsa0VBQWtFO0lBQ2xFLG1EQUFtRDtJQUNuRCw0REFBNEQ7SUFDNUQsd0RBQXdEO0lBQ3hELDRFQUE0RTtJQUM1RSxnREFBZ0Q7Q0FBQyxDQUFDO0FBRXRELHNCQUFzQjtBQUN0QixNQUFNLFVBQVUsR0FB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