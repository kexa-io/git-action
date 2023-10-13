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
        let prefix = config.prefix ?? (googleDriveConfig.indexOf(config) + "-");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlRHJpdmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9nb29nbGVEcml2ZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7OztFQVFFO0FBQ0YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLHNGQUFzRTtBQUN0RSwrQ0FBd0U7QUFFeEUsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxNQUFNLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1QyxNQUFNLE1BQU0sR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7QUFDbEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUN4RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7QUFFN0UsS0FBSyxVQUFVLFdBQVcsQ0FBQyxpQkFBc0I7SUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEtBQUksSUFBSSxNQUFNLElBQUksaUJBQWlCLElBQUUsRUFBRSxFQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLE1BQU0s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