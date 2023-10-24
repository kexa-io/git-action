"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectData = void 0;
/*
    * Provider : googleDrive
    * Thumbnail : https://icones.pro/wp-content/uploads/2022/08/logo-google-drive.png
    * Documentation : https://developers.google.com/drive/api/reference/rest/v3?hl=fr
    * Creation date : 2023-08-16
    * Note :
    * Resources :
    *     - files
*/
const process = require('process');
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const files_1 = require("../../helpers/files");
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("GoogleDriveLogger");
const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { auth, drive } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = path.join(process.cwd(), '/config/token_drive.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials_drive.json');
async function collectData(googleDriveConfig) {
    let resources = [];
    for (let config of googleDriveConfig ?? []) {
        let prefix = config.prefix ?? (googleDriveConfig.indexOf(config).toString());
        (0, files_1.writeStringToJsonFile)(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "DRIVECRED", prefix), "./config/credentials_drive.json");
        (0, files_1.writeStringToJsonFile)(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "DRIVETOKEN", prefix), "./config/token_drive.json");
        let auth = await authorize();
        let files = await listFiles(auth);
        (0, files_1.deleteFile)("./config/credentials_drive.json");
        (0, files_1.deleteFile)("./config/token_drive.json");
        resources.push({
            "files": files
        });
    }
    return resources ?? null;
}
exports.collectData = collectData;
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return auth.fromJSON(credentials);
    }
    catch (err) {
        return null;
    }
}
/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
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
/**
 * Load or request or authorization to call APIs.
 *
 */
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
async function listFiles(auth) {
    const driveData = drive({ version: "v3", auth });
    try {
        const response = await driveData.files.list({
            q: "'root' in parents",
            fields: "files(*)",
        });
        const files = response.data.files;
        if (files.length) {
            logger.debug(files[0]);
            return files;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.error("Erreur lors de la récupération des fichiers :", err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlRHJpdmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9nb29nbGVEcml2ZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7OztFQVFFO0FBQ0YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLHNGQUFzRTtBQUN0RSwrQ0FBd0U7QUFFeEUsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxNQUFNLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1QyxNQUFNLE1BQU0sR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7QUFDbEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUN4RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7QUFFN0UsS0FBSyxVQUFVLFdBQVcsQ0FBQyxpQkFBc0I7SUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEtBQUksSUFBSSxNQUFNLElBQUksaUJBQWlCLElBQUUsRUFBRSxFQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLE1BQU0s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