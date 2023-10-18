"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigOrEnvVar = exports.setEnvVar = exports.getEnvVar = void 0;
const core = require('@actions/core');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlVmFyRW52aXJvbm5lbWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21hbmFnZVZhckVudmlyb25uZW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFdEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRS9CLHFEQUE4QztBQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUdoRCxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDNUQsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDOUQsaUZBQWlGO0FBRTFFLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBVztJQUN2QyxPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCw4QkFFQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsSUFBVztJQUNyQyxJQUFJO1FBQ0EsSUFBRyx5QkFBeUIsRUFBRTtZQUMxQixPQUFPLE1BQU0sMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0MsSUFBSSw0QkFBNEIsRUFBRTtZQUNuQyxPQUFPLE1BQU0sNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQsSUFBSSxNQUFNLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM5RSxPQUFPLE1BQU0sZ0NBQWdDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMs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