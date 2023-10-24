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
////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("googleWorkspaceLogger");
const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
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
    const payload = JSON.stringify({
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
    jsonData = JSON.parse(JSON.stringify(users));
    let nbSuperAdmin = 0;
    for (let i = 0; i < jsonData.length; i++) {
        const service = google.admin({ version: 'directory_v1', auth });
        let isSuperAdmin = false;
        try {
            const adminRoles = await service.roles.list({
                customer: 'my_customer',
                userKey: jsonData[i].primaryEmail,
            });
            jsonData[i].adminRoles = JSON.parse(JSON.stringify(adminRoles.data.items));
            jsonData[i].adminRoles.forEach((element) => {
                if (element.isSuperAdminRole == true) {
                    isSuperAdmin = true;
                }
            });
        }
        catch (error) {
            logger.error('Error listing user roles:', error);
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
                jsonData.push(JSON.parse(JSON.stringify(newJsonEntry)));
            }
            catch (e) {
                logger.error(e);
            }
        }
    }
    catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}
async function listGroups(auth) {
    let jsonData = [];
    const admin = google.admin({ version: 'directory_v1', auth });
    try {
        const groupResponse = await admin.groups.list({
            customer: 'my_customer',
        });
        const groups = groupResponse.data;
        if (groups)
            jsonData = JSON.parse(JSON.stringify(groups));
        else
            return null;
    }
    catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}
async function listRoles(auth) {
    let jsonData = [];
    const service = google.admin({ version: 'directory_v1', auth });
    try {
        const adminRoles = await service.roles.list({
            customer: 'my_customer',
        });
        jsonData = JSON.parse(JSON.stringify(adminRoles.data.items));
    }
    catch (error) {
        logger.error('Error listing user roles:', error);
    }
    return jsonData ?? null;
}
async function listOrganizationalUnits(auth) {
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
        jsonData = JSON.parse(JSON.stringify(orgUnitList));
    }
    catch (error) {
        console.error('Error listing organizational units:', error);
    }
    return jsonData ?? null;
}
async function listCalendars(auth) {
    let jsonData = [];
    try {
        const calendar = google.calendar({ version: 'v3', auth });
        const response = await calendar.calendarList.list({
            customer: "my_customer"
        });
        const calendars = response.data.items;
        jsonData = JSON.parse(JSON.stringify(calendars));
        for (let i = 0; i < jsonData.length; i++) {
            const responseUnit = await calendar.acl.list({
                customer: "my_customer",
                calendarId: jsonData[i].id
            });
            const calendarACL = responseUnit.data;
            jsonData[i].calendarACL = JSON.parse(JSON.stringify(calendarACL.items));
        }
    }
    catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}
async function listFiles(auth) {
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
            jsonData.push(JSON.parse(JSON.stringify(res.data)));
        }
    }
    catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}
async function listDrive(auth) {
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
            jsonData.push(JSON.parse(JSON.stringify(res.data)));
        }
    }
    catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLHNGQUFzRTtBQUd0RSwrQ0FBc0U7QUFFdEUsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRXJELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxNQUFNLEVBQUMsTUFBTSxFQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXZDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBR3pDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHO0lBQ1gsK0RBQStEO0lBQy9ELGlFQUFpRTtJQUNqRSxnRUFBZ0U7SUFDaEUseUVBQXlFO0lBQ3pFLGtFQUFrRTtJQUNsRSxtREFBbUQ7SUFDbkQsNERBQTREO0lBQzVELHdEQUF3RDtJQUN4RCw0RUFBNEU7SUFDNUUsZ0RBQWdEO0NBQUMsQ0FBQztBQUV0RCxzQkFBc0I7QUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FB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