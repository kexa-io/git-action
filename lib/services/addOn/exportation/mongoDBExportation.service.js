"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportation = void 0;
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const logger_service_1 = require("../../logger.service");
const mongoDB_service_1 = require("../../saving/mongoDB.service");
const mongoose_1 = __importDefault(require("mongoose"));
const logger = (0, logger_service_1.getNewLogger)("mongoDBExportLogger");
const providerResourcesGatherMongoose = new mongoose_1.default.Schema({
    timestamp: Number,
    origin: String,
    tags: [String],
}, { strict: false });
async function exportation(save, resources) {
    if (!save.urlName)
        throw new Error("urlName is required");
    if (!save.collectionName)
        throw new Error("collectionName is required");
    let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
    logger.info(`Export to MongoDB`);
    let { dataModel, connectionMongoDB } = await (0, mongoDB_service_1.setConnection)(url, save.collectionName, providerResourcesGatherMongoose);
    await (0, mongoDB_service_1.saveData)(save, dataModel, resources);
    await (0, mongoDB_service_1.closeConnection)(connectionMongoDB);
}
exports.exportation = exportation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQkV4cG9ydGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZXhwb3J0YXRpb24vbW9uZ29EQkV4cG9ydGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseUZBQWlFO0FBQ2pFLHlEQUFvRDtBQUVwRCxrRUFBd0Y7QUFDeEYsd0RBQXNEO0FBRXRELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRW5ELE1BQU0sK0JBQStCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUN4RCxTQUFTLEVBQUUsTUFBTTtJQUNqQixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztDQUNqQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFFZixLQUFLLFVBQVUsV0FBVyxDQUFDLElBQXVCLEVBQUUsU0FBMkI7SUFDbEYsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELElBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN2RSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pDLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLElBQUEsK0JBQWEsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0lBQ3RILE1BQU0sSUFBQSwwQkFBUSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsTUFBTSxJQUFBLGlDQUFlLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBUkQsa0NBUUMifQ==