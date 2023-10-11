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
//# sourceMappingURL=save.service.js.map