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
    const result = ((await getFromManager(name)) ?? process.env[name]) ?? core.getInput(name);
    if (result == "")
        return null;
    return result;
}
exports.getEnvVar = getEnvVar;
async function getFromManager(name) {
    try {
        if (possibleWithAzureKeyVault())
            return await getEnvVarWithAzureKeyVault(name);
        else if (possibleWithAwsSecretManager())
            return await getEnvVarWithAwsSecretManager(name);
        else if (await possibleWithGoogleSecretManager(process.env["GOOGLE_PROJECT_ID"]))
            return await getEnvVarWithGoogleSecretManager(name, process.env["GOOGLE_PROJECT_ID"]);
    }
    catch (e) { }
    return null;
}
function possibleWithAzureKeyVault() {
    return Boolean(core.getInput('AZUREKEYVAULTNAME'));
}
async function getEnvVarWithAzureKeyVault(name) {
    const url = `https://${core.getInput('AZUREKEYVAULTNAME')}.vault.azure.net`;
    let UAI = {};
    let useAzureIdentity = process.env.USERAZUREIDENTITYID;
    if (useAzureIdentity)
        UAI = { managedIdentityClientId: useAzureIdentity };
    const credential = new DefaultAzureCredential(UAI);
    const client = new SecretClient(url, credential);
    return (await client.getSecret(name)).value;
}
function possibleWithAwsSecretManager() {
    return (Boolean(core.getInput('AWS_SECRET_NAME')));
}
const aws_sdk_1 = require("aws-sdk");
async function getEnvVarWithAwsSecretManager(name) {
    let awsKeyId = core.getInput('AWS_ACCESS_KEY_ID');
    let awsSecretKey = core.getInput('AWS_SECRET_ACCESS_KEY');
    let credentials = new aws_sdk_1.SharedIniFileCredentials({ profile: 'default' });
    if (awsKeyId && awsSecretKey) {
        credentials = new aws_sdk_1.Credentials({
            accessKeyId: awsKeyId,
            secretAccessKey: awsSecretKey
        });
    }
    const secretsmanager = new AWS.SecretsManager({ credentials });
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
    const result = ((await getFromManager(optionalPrefix + name)) ?? config[name]) ?? core.getInput(optionalPrefix + name);
    if (result == "")
        return null;
    return result;
}
exports.getConfigOrEnvVar = getConfigOrEnvVar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlVmFyRW52aXJvbm5lbWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21hbmFnZVZhckVudmlyb25uZW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRS9CLHFEQUE4QztBQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUdoRCxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDNUQsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDOUQsaUZBQWlGO0FBRTFFLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBVztJQUN2QyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RixJQUFHLE1BQU0sSUFBSSxFQUFFO1FBQUMsT0FBTyxJQUFJLENBQUM7SUFDNUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUpELDhCQUlDO0FBRUQsS0FBSyxVQUFVLGNBQWMsQ0FBQyxJQUFXO0lBQ3JDLElBQUk7UUFDQSxJQUFHLHlCQUF5QixFQUFFO1lBQzFCLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QyxJQUFJLDRCQUE0QixFQUFFO1lBQ25DLE9BQU8sTUFBTSw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRCxJQUFJLE1B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