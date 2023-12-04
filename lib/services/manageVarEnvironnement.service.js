"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigOrEnvVar = exports.setEnvVar = exports.getEnvVar = void 0;
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
        else if (await possibleWithGoogleSecretManager(process.env["GOOGLE_PROJECT_ID"]))
            return await getEnvVarWithGoogleSecretManager(name, process.env["GOOGLE_PROJECT_ID"]);
    }
    catch (e) { }
    return null;
}
function possibleWithAzureKeyVault() {
    return Boolean(process.env.AZUREKEYVAULTNAME);
}
async function getEnvVarWithAzureKeyVault(name) {
    const url = `https://${process.env.AZUREKEYVAULTNAME}.vault.azure.net`;
    let UAI = {};
    let useAzureIdentity = process.env.USERAZUREIDENTITYID;
    if (useAzureIdentity)
        UAI = { managedIdentityClientId: useAzureIdentity };
    const credential = new DefaultAzureCredential(UAI);
    const client = new SecretClient(url, credential);
    return (await client.getSecret(name)).value;
}
function possibleWithAwsSecretManager() {
    return (Boolean(process.env.AWS_SECRET_NAME));
}
const aws_sdk_1 = require("aws-sdk");
async function getEnvVarWithAwsSecretManager(name) {
    let awsKeyId = process.env.AWS_ACCESS_KEY_ID;
    let awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
    let credentials = new aws_sdk_1.SharedIniFileCredentials({ profile: 'default' });
    if (awsKeyId && awsSecretKey) {
        credentials = new aws_sdk_1.Credentials({
            accessKeyId: awsKeyId,
            secretAccessKey: awsSecretKey
        });
    }
    const secretsmanager = new AWS.SecretsManager({ credentials });
    const secName = process.env.AWS_SECRET_NAME;
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
    const usrScrt = process.env.GOOGLE_SECRET_NAME;
    console.log("LOG");
}
async function setEnvVar(name, value) {
    process.env[name] = value;
}
exports.setEnvVar = setEnvVar;
async function getConfigOrEnvVar(config, name, optionalPrefix = "") {
    return ((await getFromManager(optionalPrefix + name)) ?? config[name]) ?? process.env[optionalPrefix + name];
}
exports.getConfigOrEnvVar = getConfigOrEnvVar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlVmFyRW52aXJvbm5lbWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21hbmFnZVZhckVudmlyb25uZW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFL0IscURBQThDO0FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBR2hELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM1RCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM5RCxpRkFBaUY7QUFFMUUsS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFXO0lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUZELDhCQUVDO0FBRUQsS0FBSyxVQUFVLGNBQWMsQ0FBQyxJQUFXO0lBQ3JDLElBQUk7UUFDQSxJQUFHLHlCQUF5QixFQUFFO1lBQzFCLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QyxJQUFJLDRCQUE0QixFQUFFO1lBQ25DLE9BQU8sTUFBTSw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRCxJQUFJLE1BQU0sK0JBQStCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7S0FDN0Y7SUFBQyxPQUFNLENBQUMsRUFBRSxHQUFFO0lBQ2IsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMseUJBQXlCO0lBQzlCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsS0FBSyxVQUFVLDBCQUEwQixDQUFDLElBQVc7SUFDakQsTUFBTSxHQUFHLEdBQUcsV0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixrQkFBa0IsQ0FBQztJQUN2RSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDdkQsSUFBRyxnQkFBZ0I7UUFBRSxHQUFHLEdBQUcsRUFBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3ZFLE1BQU0sVUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsNEJBQTRCO0lBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxxQ0FBZ0U7QUFDaEUsS0FBSyxVQUFVLDZCQUE2QixDQUFDLElBQVc7SUFDcEQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0lBQ3JELElBQUksV0FBVyxHQUFnQixJQUFJLGtDQUF3QixDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDbEYsSUFBRyxRQUFRLElBQUksWUFBWSxFQUFDO1FBQ3hCLFdBQVcsR0FBRyxJQUFJLHFCQUFXLENBQUM7WUFDMUIsV0FBVyxFQUFFLFFBQVE7WUFDckIsZUFBZSxFQUFFLFlBQVk7U0FDaEMsQ0FBQyxDQUFDO0tBQ047SUFDRCxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQzdELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0lBQzVDLE1BQU0sTUFBTSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBUyxFQUFFLElBQVU7UUFDaEUsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1NBQ3BEO2FBQ0k7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBS0QsS0FBSyxVQUFVLCtCQUErQixDQUFDLFNBQWM7SUFDekQsbUNBQW1DO0lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO1dBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUNoRDtRQUNJOzs7Ozs7Ozs7OzswQ0FXa0M7UUFDbEMsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FDSTtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUNELEtBQUssVUFBVSxnQ0FBZ0MsQ0FBQyxJQUFXLEVBQUUsU0FBYztJQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUN4QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO0lBRS9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUVNLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBVyxFQUFFLEtBQVk7SUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDOUIsQ0FBQztBQUZELDhCQUVDO0FBRU0sS0FBSyxVQUFVLGlCQUFpQixDQUFDLE1BQVUsRUFBRSxJQUFXLEVBQUUsaUJBQXdCLEVBQUU7SUFDdkYsT0FBTyxDQUFDLENBQUMsTUFBTSxjQUFjLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFDekcsQ0FBQztBQUZELDhDQUVDIn0=