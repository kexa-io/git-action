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
                jsonData.push(JSON.parse(JSON.stringify(newJsonEntry)));
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
            jsonData = JSON.parse(JSON.stringify(groups));
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
        jsonData = JSON.parse(JSON.stringify(adminRoles.data.items));
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
        jsonData = JSON.parse(JSON.stringify(orgUnitList));
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
            jsonData.push(JSON.parse(JSON.stringify(res.data)));
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
            jsonData.push(JSON.parse(JSON.stringify(res.data)));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ29vZ2xlV29ya3NwYWNlR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLHNGQUFzRTtBQUd0RSwrQ0FBc0U7QUFFdEUsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRXJELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxNQUFNLEVBQUMsTUFBTSxFQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLElBQUksYUFBb0MsQ0FBQztBQUV6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUd6QyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyxNQUFNLE1BQU0sR0FBRztJQUNYLCtEQUErRDtJQUMvRCxpRUFBaUU7SUFDakUsZ0VBQWdFO0lBQ2hFLHlFQUF5RTtJQUN6RSxrRUFBa0U7SUFDbEUsbURBQW1EO0lBQ25ELDREQUE0RDtJQUM1RCx3REFBd0Q7SUFDeEQsNEVBQTRFO0lBQzVFLGdEQUFnRDtDQUFDLENBQUM7QUFFdEQsc0JBQXNCO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLDhCQUE4QixDQUFDLENBQUM7QUFDNUUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0FBRWpGLEtBQUssVUFBVSxXQUFXLENBQUMscUJBQTZDO0lBQzNFLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUE0QixDQUFDO0lBR3RELEtBQUssSUFBSSxNQUFNLElBQUkscUJBQXFCLElBQUUsRUFBRSxFQUFFO1FBQzFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSx3QkFBd0IsR0FBRztZQUMzQixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDWSxDQUFDO1FBQzlCLElBQUk7WUFDQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDL0UsSUFBQSw2QkFBcUIsRUFBQyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDLENBQUM7WUFDaEosSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBQyxpQkFBaUIsQ0FBQztnQkFDcEUsSUFBQSw2QkFBcUIsRUFBQyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLCtCQUErQixDQUFDLENBQUM7WUFDdEgsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLEVBQUUsQ0FBQztZQUMzQixNQUFNLFFBQVEsR0FBRztnQkFDYixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDdkIsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUN0QixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU0sdUJBQXVCLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDckIsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3hCLENBQUM7WUFDRixNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVqSSx3QkFBd0IsR0FBRztnQkFDdkIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxTQUFTO2FBQ25CLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxPQUFPLENBQUMsRUFDUjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO1FBQ0wsSUFBQSxrQkFBVSxFQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDbEQsSUFBQSxrQkFBVSxFQUFDLCtCQUErQixDQUFDLENBQUM7UUFDNUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsT0FBTyxTQUFTLElBQUksSUFBSSxDQUFDO0FBQzdCLENBQUM7QUF4REQsa0NBd0RDO0FBRUQsS0FBSyxVQUFVLDJCQUEyQjtJQUN0QyxJQUFJO1FBQ0EsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM1QztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFFRCxLQUFLLFVBQVUsZUFBZSxDQUFDLE1BQVc7SUFDdEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztRQUN4QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWE7UUFDaEMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYTtLQUNsRCxDQUFDLENBQUM7SUFDSCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxLQUFLLFVBQVUsU0FBUztJQUNwQixJQUFJLE1BQU0sR0FBRyxNQUFNLDJCQUEyQixFQUFFLENBQUM7SUFDakQsSUFBSSxNQUFNLEVBQUU7UUFDUixPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQztRQUN4QixNQUFNLEVBQUUsTUFBTTtRQUNkLFdBQVcsRUFBRSxnQkFBZ0I7S0FDaEMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ3BCLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELEtBQUssVUFBVSxTQUFTLENBQUMsSUFBUztJQUM5QixJQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDakUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRWxCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDOUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNqQyxRQUFRLEVBQUUsYUFBYTtRQUN2QixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDLENBQUM7SUFDSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJO1lBQ0EsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDeEMsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTthQUNwQyxDQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0UsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO29CQUNsQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBRU47UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksWUFBWSxFQUFFO1lBQ2QsWUFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDbkM7S0FDSjtJQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtRQUM5QixPQUFPLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztBQUM1QixDQUFDO0FBQ0QsS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUFTO0lBQ2hDLElBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNuRSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFbEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJO1FBQ0EsTUFBTSxjQUFjLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM1QyxRQUFRLEVBQUUsYUFBYTtTQUMxQixDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSTtnQkFDQSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUU5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUMzQyxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO2lCQUNwQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWSxHQUFHO29CQUNYLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDakMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxJQUFJO2lCQUNuQyxDQUFBO2dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDSjtLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDO0FBQzVCLENBQUM7QUFFRCxLQUFLLFVBQVUsVUFBVSxDQUFDLElBQVM7SUFDL0IsSUFBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ2xFLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVsQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzVELElBQUk7UUFDQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzFDLFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxNQUFNO1lBQ04sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztZQUU5QyxPQUFPLElBQUksQ0FBQztLQUNuQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztBQUM1QixDQUFDO0FBRUQsS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFTO0lBQzlCLElBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNqRSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFbEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUU5RCxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN4QyxRQUFRLEVBQUUsYUFBYTtTQUMxQixDQUFDLENBQUM7UUFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNoRTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNwRDtJQUNELE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztBQUM1QixDQUFDO0FBRUQsS0FBSyxVQUFVLHVCQUF1QixDQUFDLElBQVM7SUFDNUMsSUFBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3JFLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVsQixJQUFJO1FBQ0EsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLEVBQUUsY0FBYztZQUN2QixJQUFJO1NBQ1AsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN6QyxVQUFVLEVBQUUsYUFBYTtTQUM1QixDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2xDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUN0RDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM5RDtJQUNELE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztBQUM1QixDQUFDO0FBQ0QsS0FBSyxVQUFVLGFBQWEsQ0FBQyxJQUFTO0lBQ2xDLElBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNyRSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFbEIsSUFBSTtRQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUM5QyxRQUFRLEVBQUUsYUFBYTtTQUMxQixDQUFDLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFDaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDekMsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUM3QixDQUFDLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNFO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7SUFDRCxPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDNUIsQ0FBQztBQUVELEtBQUssVUFBVSxTQUFTLENBQUMsSUFBUztJQUM5QixJQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDakUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRWxCLElBQUk7UUFDQSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXBELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUM5QixNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLE1BQU0sRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RDtLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDO0FBQzVCLENBQUM7QUFFRCxLQUFLLFVBQVUsU0FBUyxDQUFDLElBQVM7SUFDOUIsSUFBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ2xFLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVsQixJQUFJO1FBQ0EsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQixNQUFNLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztBQUM1QixDQUFDIn0=