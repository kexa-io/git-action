"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const logger_service_1 = require("../../logger.service");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const logger = (0, logger_service_1.getNewLogger)("AzureBlobStorageLogger");
async function save(save, result) {
    throw new Error("Implementation not yet complete");
    if (!save.bucketName)
        throw new Error("bucketName is missing");
    await saveJsonToAmazonS3(save, result);
}
exports.save = save;
async function saveJsonToAmazonS3(save, result) {
    const client = new aws_sdk_1.default.S3();
    await client.putObject({
        Bucket: save.bucketName ?? "Kexa",
        Key: (save?.origin ?? "") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json",
        Body: JSON.stringify({ data: result }),
    }).promise();
    logger.info("Saved to Amazon S3");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hem9uUzNTYXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vc2F2ZS9hbWF6b25TM1NhdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSx5REFBb0Q7QUFFcEQsc0RBQTBCO0FBRTFCLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRS9DLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBd0IsRUFBRSxNQUFzQjtJQUN2RSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDbkQsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRTlELE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFMRCxvQkFLQztBQUVELEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxJQUF3QixFQUFFLE1BQXNCO0lBQzlFLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM1QixNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUUsTUFBTTtRQUMvQixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxHQUFHLE9BQU87UUFDbEcsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7S0FDdkMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3RDLENBQUMifQ==