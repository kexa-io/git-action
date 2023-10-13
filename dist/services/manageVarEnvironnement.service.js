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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlVmFyRW52aXJvbm5lbWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21hbmFnZVZhckVudmlyb25uZW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUV0QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFL0IscURBQThDO0FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBR2hELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM1RCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM5RCxpRkFBaUY7QUFFMUUsS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFXO0lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUZELDhCQUVDO0FBRUQsS0FBSyxVQUFVLGNBQWMsQ0FBQyxJQUFXO0lBQ3JDLElBQUk7UUFDQSxJQUFHLHlCQUF5QixFQUFFO1lBQzFCLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QyxJQUFJLDRCQUE0QixFQUFFO1lBQ25DLE9BQU8sTUFBTSw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRCxJQUFJLE1BQU0sK0JBQStCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7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