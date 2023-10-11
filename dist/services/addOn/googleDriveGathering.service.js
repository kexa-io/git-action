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
//# sourceMappingURL=googleDriveGathering.service.js.map