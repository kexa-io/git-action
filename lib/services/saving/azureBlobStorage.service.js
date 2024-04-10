"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJsonToAzureBlobStorage = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const logger_service_1 = require("../logger.service");
const identity_1 = require("@azure/identity");
const logger = (0, logger_service_1.getNewLogger)("AzureBlobStorageLogger");
async function saveJsonToAzureBlobStorage(connectionString, save, json) {
    let blobServiceClient;
    if (save?.accountName && save?.accountKey) {
        blobServiceClient = getBlobServiceClientWithAccountAndKey(save?.accountName ?? "", ((await (0, manageVarEnvironnement_service_1.getEnvVar)(save?.accountKey ?? "")) ?? save?.accountKey) ?? "");
        logger.debug("Using accountName and accountKey to authenticate to Azure Blob Storage");
    }
    else if (connectionString) {
        blobServiceClient = getBlobServiceClientFromConnectionString(connectionString);
        logger.debug("Using connection string to authenticate to Azure Blob Storage");
    }
    else {
        if (!save?.accountName) {
            throw new Error("accountName is missing; It is required to authenticate to Azure Blob Storage. Maybe you forgot to set it in the config file or in the environment variable");
        }
        blobServiceClient = getBlobServiceClientFromDefaultAzureCredential(save?.accountName ?? "");
        logger.debug("Using DefaultAzureCredential to authenticate to Azure Blob Storage");
    }
    const containerClient = blobServiceClient.getContainerClient(save?.containerName ?? "");
    await containerClient.createIfNotExists();
    const jsonString = JSON.stringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient((((await (0, manageVarEnvironnement_service_1.getEnvVar)("ORIGIN")) ?? save?.origin) ?? "") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json");
    const uploadOptions = {};
    if (save?.tags)
        uploadOptions.tags = save?.tags;
    await blockBlobClient.upload(jsonString, jsonString.length, uploadOptions);
    logger.info("Saved to Azure Blob Storage");
}
exports.saveJsonToAzureBlobStorage = saveJsonToAzureBlobStorage;
function getBlobServiceClientFromConnectionString(urlConnection) {
    const client = storage_blob_1.BlobServiceClient.fromConnectionString(urlConnection);
    return client;
}
function getBlobServiceClientFromDefaultAzureCredential(accountName) {
    // Connect without secrets to Azure
    // Learn more: https://www.npmjs.com/package/@azure/identity#DefaultAzureCredential
    const client = new storage_blob_1.BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new identity_1.DefaultAzureCredential());
    return client;
}
function getBlobServiceClientWithAnonymousCredential(accountName) {
    const blobServiceUri = `https://${accountName}.blob.core.windows.net`;
    const blobServiceClient = new storage_blob_1.BlobServiceClient(blobServiceUri, new storage_blob_1.AnonymousCredential());
    return blobServiceClient;
}
function getBlobServiceClientWithAccountAndKey(accountName, accountKey) {
    const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new storage_blob_1.BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
    return blobServiceClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVCbG9iU3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3NhdmluZy9henVyZUJsb2JTdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQXlJO0FBRXpJLHNGQUE4RDtBQUM5RCxzREFBaUQ7QUFDakQsOENBQXlEO0FBRXpELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRS9DLEtBQUssVUFBVSwwQkFBMEIsQ0FBQyxnQkFBd0IsRUFBRSxJQUFnQyxFQUFFLElBQVk7SUFDckgsSUFBSSxpQkFBb0MsQ0FBQztJQUN6QyxJQUFJLElBQUksRUFBRSxXQUFXLElBQUksSUFBSSxFQUFFLFVBQVUsRUFBRTtRQUN2QyxpQkFBaUIsR0FBRyxxQ0FBcUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFBLDBDQUFTLEVBQUMsSUFBSSxFQUFFLFVBQVUsSUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwSixNQUFNLENBQUMsS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7S0FDMUY7U0FBTSxJQUFJLGdCQUFnQixFQUFFO1FBQ3pCLGlCQUFpQixHQUFHLHdDQUF3QyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0UsTUFBTSxDQUFDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0tBQ2pGO1NBQU07UUFDSCxJQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDRKQUE0SixDQUFDLENBQUM7U0FDakw7UUFDRCxpQkFBaUIsR0FBRyw4Q0FBOEMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztLQUN0RjtJQUNELE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEYsTUFBTSxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxRQUFRLENBQUMsQ0FBQyxJQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUN2TCxNQUFNLGFBQWEsR0FBbUMsRUFBRSxDQUFDO0lBQ3pELElBQUcsSUFBSSxFQUFFLElBQUk7UUFBRSxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUM7SUFDL0MsTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBdkJELGdFQXVCQztBQUVELFNBQVMsd0NBQXdDLENBQUMsYUFBb0I7SUFDbEUsTUFBTSxNQUFNLEdBQXNCLGdDQUFpQixDQUFDLG9CQUFvQixDQUNwRSxhQUFhLENBQ2hCLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyw4Q0FBOEMsQ0FBQyxXQUFrQjtJQUN0RSxtQ0FBbUM7SUFDbkMsbUZBQW1GO0lBQ25GLE1BQU0sTUFBTSxHQUFzQixJQUFJLGdDQUFpQixDQUNuRCxXQUFXLFdBQVcsd0JBQXdCLEVBQzlDLElBQUksaUNBQXNCLEVBQUUsQ0FDL0IsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLDJDQUEyQyxDQUFDLFdBQWtCO0lBQ25FLE1BQU0sY0FBYyxHQUFHLFdBQVcsV0FBVyx3QkFBd0IsQ0FBQztJQUN0RSxNQUFNLGlCQUFpQixHQUFHLElBQUksZ0NBQWlCLENBQzNDLGNBQWMsRUFDZCxJQUFJLGtDQUFtQixFQUFFLENBQzVCLENBQUM7SUFDRixPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFTLHFDQUFxQyxDQUFDLFdBQWtCLEVBQUUsVUFBaUI7SUFDaEYsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLHlDQUEwQixDQUN0RCxXQUFXLEVBQ1gsVUFBVSxDQUNiLENBQUM7SUFDRixNQUFNLGlCQUFpQixHQUFHLElBQUksZ0NBQWlCLENBQzNDLFdBQVcsV0FBVyx3QkFBd0IsRUFDOUMsbUJBQW1CLENBQ3RCLENBQUM7SUFDRixPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUMifQ==