"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const logger_service_1 = require("../../logger.service");
const identity_1 = require("@azure/identity");
const logger = (0, logger_service_1.getNewLogger)("AzureBlobStorageLogger");
async function save(save, result) {
    if (!save.containerName)
        throw new Error("containerName is missing");
    let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
    await saveJsonToAzureBlobStorage(url, save, { data: result });
}
exports.save = save;
async function saveJsonToAzureBlobStorage(connectionString, save, json) {
    let blobServiceClient;
    if (save?.accountName && save?.accountKey) {
        blobServiceClient = getBlobServiceClientWithAccountAndKey(save?.accountName ?? "", ((await (0, manageVarEnvironnement_service_1.getEnvVar)(save?.accountKey ?? "")) ?? save?.accountKey) ?? "");
    }
    else if (connectionString) {
        blobServiceClient = getBlobServiceClientFromConnectionString(connectionString);
    }
    else {
        if (!save?.accountName) {
            throw new Error("accountName is missing; It is required to authenticate to Azure Blob Storage. Maybe you forgot to set it in the config file or in the environment variable");
        }
        blobServiceClient = getBlobServiceClientFromDefaultAzureCredential(save?.accountName ?? "");
    }
    const containerClient = blobServiceClient.getContainerClient(save?.containerName ?? "");
    await containerClient.createIfNotExists();
    const jsonString = JSON.stringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient((save?.origin ?? "") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json");
    const uploadOptions = {
        tags: save.tags
    };
    await blockBlobClient.upload(jsonString, jsonString.length, uploadOptions);
    logger.info("Saved to Azure Blob Storage");
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVCbG9iU3RvcmFnZVNhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9zYXZlL2F6dXJlQmxvYlN0b3JhZ2VTYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQWlLO0FBR2pLLHlGQUFpRTtBQUNqRSx5REFBb0Q7QUFDcEQsOENBQXlEO0FBRXpELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRS9DLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBZ0MsRUFBRSxNQUFzQjtJQUMvRSxJQUFHLENBQUMsSUFBSSxDQUFDLGFBQWE7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDcEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hELE1BQU0sMEJBQTBCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFKRCxvQkFJQztBQUVELEtBQUssVUFBVSwwQkFBMEIsQ0FBQyxnQkFBd0IsRUFBRSxJQUFnQyxFQUFFLElBQVk7SUFDOUcsSUFBSSxpQkFBb0MsQ0FBQztJQUN6QyxJQUFJLElBQUksRUFBRSxXQUFXLElBQUksSUFBSSxFQUFFLFVBQVUsRUFBRTtRQUN2QyxpQkFBaUIsR0FBRyxxQ0FBcUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFBLDBDQUFTLEVBQUMsSUFBSSxFQUFFLFVBQVUsSUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2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