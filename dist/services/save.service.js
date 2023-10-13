"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_blob_1 = require("@azure/storage-blob");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storage_1 = require("@google-cloud/storage");
async function saveJsonToAzureBlobStorage(connectionString, containerName, blobName, json) {
    const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const jsonString = JSON.stringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(jsonString, jsonString.length);
}
async function saveJsonToAwsS3Bucket(bucketName, objectKey, json) {
    const s3 = new aws_sdk_1.default.S3();
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: JSON.stringify(json)
    };
    await s3.putObject(params).promise();
}
async function saveJsonToGcpBucket(bucketName, objectKey, json) {
    await new storage_1.Storage().bucket(bucketName).file(objectKey).save(JSON.stringify(json));
}
async function saveJsonToMongoDB(connectionString, databaseName, collectionName, json) {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    await collection.insertOne(json);
    await client.close();
}
async function saveJsonToPrometheus(prometheusUrl, prometheusPort, prometheusPath, json) {
    const axios = require('axios');
    const url = prometheusUrl + ':' + prometheusPort + prometheusPath;
    await axios.post(url, json);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3NhdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUF3RDtBQUN4RCxzREFBMEI7QUFDMUIsbURBQWdEO0FBRWhELEtBQUssVUFBVSwwQkFBMEIsQ0FBQyxnQkFBd0IsRUFBRSxhQUFxQixFQUFFLFFBQWdCLEVBQUUsSUFBWTtJQUNySCxNQUFNLGlCQUFpQixHQUFHLGdDQUFpQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkYsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUUsTUFBTSxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRSxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsS0FBSyxVQUFVLHFCQUFxQixDQUFDLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxJQUFZO0lBQ3BGLE1BQU0sRUFBRSxHQUFHLElBQUksaUJBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN4QixNQUFNLE1BQU0sR0FBRztRQUNYLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLEdBQUcsRUFBRSxTQUFTO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzdCLENBQUM7SUFDRixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekMsQ0FBQztBQUVELEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsSUFBWTtJQUNsRixNQUFNLElBQUksaUJBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBRUQsS0FBSyxVQUFVLGlCQUFpQixDQUFDLGdCQUF3QixFQUFFLFlBQW9CLEVBQUUsY0FBc0IsRUFBRSxJQUFZO0lBQ2pILE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEcsTUFBTSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBRUQsS0FBSyxVQUFVLG9CQUFvQixDQUFDLGFBQXFCLEVBQUUsY0FBc0IsRUFBRSxjQUFzQixFQUFFLElBQVk7SUFDbkgsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLE1BQU0sR0FBRyxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUNsRSxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==