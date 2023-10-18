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
            let prefix = config.prefix ?? (googleWorkspaceConfig.indexOf(config) + "-");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBR25DLHNGQUFpRjtBQUdqRiwrQ0FBc0U7QUFFdEUsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRXJELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxNQUFNLEVBQUMsTUFBTSxFQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXZDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBR3pDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHO0lBQ1gsK0RBQStEO0lBQy9ELGlFQUFpRTtJQUNqRSxnRUFBZ0U7SUFDaEUseUVBQXlFO0lBQ3pFLGtFQUFrRTtJQUNsRSxtREFBbUQ7SUFDbkQsNERBQTREO0lBQzVELHdEQUF3RDtJQUN4RCw0RUFBNEU7SUFDNUUsZ0RBQWdEO0NBQUMsQ0FBQztBQUV0RCxzQkFBc0I7QUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FB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