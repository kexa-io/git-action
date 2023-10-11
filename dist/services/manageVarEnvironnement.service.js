"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigOrEnvVar = exports.setEnvVar = exports.getEnvVar = void 0;
const core = __importStar(require("@actions/core"));
const AWS = require('aws-sdk');
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("KubernetesLogger");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
//const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
async function getEnvVar(name) {
    return (await getFromManager(name)) ?? process.env[name];
}
exports.getEnvVar = getEnvVar;
async function getFromManager(name) {
    try {
        if (possibleWithAzureKeyVault())
            return await getEnvVarWithAzureKeyVault(name);
        else if (possibleWithAwsSecretManager())
            return await getEnvVarWithAwsSecretManager(name);
        else if (await possibleWithGoogleSecretManager(process.env["0-GOOGLE_PROJECT_ID"]))
            return await getEnvVarWithGoogleSecretManager(name, process.env["0-GOOGLE_PROJECT_ID"]);
    }
    catch (e) { }
    return null;
}
function possibleWithAzureKeyVault() {
    return Boolean(core.getInput('AZUREKEYVAULTNAME'));
}
async function getEnvVarWithAzureKeyVault(name) {
    const url = `https://${core.getInput('AZUREKEYVAULTNAME')}.vault.azure.net`;
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(url, credential);
    return (await client.getSecret(name)).value;
}
function possibleWithAwsSecretManager() {
    return (Boolean(core.getInput('AWS_SECRET_NAME')));
}
async function getEnvVarWithAwsSecretManager(name) {
    const secretsmanager = new AWS.SecretsManager();
    const secName = core.getInput('AWS_SECRET_NAME');
    const params = { SecretId: secName };
    secretsmanager.getSecretValue(params, function (err, data) {
        if (err) {
            console.log("Error when looking for AWS secrets");
            console.log(err, err.stack); // an error occurred
        }
        else {
            const secretData = JSON.parse(data.SecretString);
            const value = secretData[name];
            return (value);
        }
    });
}
async function possibleWithGoogleSecretManager(projectId) {
    // HERE LIST AND CHECK FOR NAME ///
    if ((process.env["GOOGLE_APPLICATION_CREDENTIALS"]
        && process.env["GOOGLE_STORAGE_PROJECT_ID"])) {
        /*console.log("OUI OUI");
        const config = require('config');
        const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
        setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        writeStringToJsonFile(process.env["0-GOOGLE_APPLICATION_CREDENTIALS"].toString(), "./config/gcp.json");
        setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        const storage = new Storage({
            projectId,
        });
        let secret = await listSecrets(projectId);
        console.log("got secrets here...: " + secret);
        deleteFile("./config/gcp.json");*/
        return false;
    }
    else {
        return false;
    }
}
async function getEnvVarWithGoogleSecretManager(name, projectId) {
    console.log("NAME IS : " + name);
    console.log("PROJET ID : " + projectId);
    const usrScrt = core.getInput('GOOGLE_SECRET_NAME');
    console.log("LOG");
}
async function setEnvVar(name, value) {
    process.env[name] = value;
}
exports.setEnvVar = setEnvVar;
async function getConfigOrEnvVar(config, name, optionalPrefix = "") {
    return (((await getFromManager(optionalPrefix + name)) ?? config[name]) ?? process.env[optionalPrefix + name]) ?? core.getInput(optionalPrefix + name);
}
exports.getConfigOrEnvVar = getConfigOrEnvVar;
//# sourceMappingURL=manageVarEnvironnement.service.js.map