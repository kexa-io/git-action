"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const logger_service_1 = require("../../logger.service");
const mongoose = require("mongoose");
const logger = (0, logger_service_1.getNewLogger)("mongoDBLogger");
async function save(save, result) {
    if (!save.urlName)
        throw new Error("urlName is required");
    if (!save.collectionName)
        throw new Error("collectionName is required");
    let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
    logger.info(`Saving to MongoDB`);
    let { resultModel, connectionMongoDB } = await setConnection(url, save.collectionName);
    await Promise.all(result.flat().map(async (resultScan) => {
        await saveResult(save, resultModel, resultScan);
    }));
    await closeConnection(connectionMongoDB);
}
exports.save = save;
const resultScanMongoose = new mongoose.Schema({
    objectContent: {
        type: Object,
        required: false,
    },
    rule: {
        type: Object,
        required: true,
    },
    error: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    loud: {
        type: Object,
        required: false,
    },
    origin: {
        type: String,
        required: false,
    },
    tags: {
        type: Object,
        required: false,
    },
    timestamp: {
        type: Number,
        required: true,
    },
});
async function setConnection(url, tableName) {
    let connectionMongoDB = await mongoose.createConnection(url);
    const resultModel = connectionMongoDB.model(tableName, resultScanMongoose, tableName);
    return { resultModel, connectionMongoDB };
}
async function saveResult(save, resultModel, result) {
    const resultToSave = new resultModel(result);
    if (save.tags)
        resultToSave.tags = save.tags;
    if (save.origin)
        resultToSave.origin = save.origin;
    resultToSave.timestamp = new Date().getTime();
    await resultToSave.save();
}
async function closeConnection(connectionMongoDB) {
    await connectionMongoDB.close();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQlNhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9zYXZlL21vbmdvREJTYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUZBQWlFO0FBQ2pFLHlEQUFvRDtBQUdwRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXRDLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBdUIsRUFBRSxNQUFzQjtJQUN0RSxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekQsSUFBRyxDQUFDLElBQUksQ0FBQyxjQUFjO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFBLDBDQUFTLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsSUFBSSxFQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxHQUFHLE1BQU0sYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckYsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1FBQ3JELE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLE1BQU0sZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0MsQ0FBQztBQVZELG9CQVVDO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDM0MsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFFSCxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVcsRUFBRSxTQUFpQjtJQUN2RCxJQUFJLGlCQUFpQixHQUFHLE1BQU0sUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdELE1BQU0sV0FBVyxHQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkYsT0FBTyxFQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxLQUFLLFVBQVUsVUFBVSxDQUFDLElBQXVCLEVBQUUsV0FBZ0IsRUFBRSxNQUFrQjtJQUNuRixNQUFNLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxJQUFHLElBQUksQ0FBQyxJQUFJO1FBQUUsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzVDLElBQUcsSUFBSSxDQUFDLE1BQU07UUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLE1BQU0sWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFFRCxLQUFLLFVBQVUsZUFBZSxDQUFDLGlCQUFzQjtJQUNqRCxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3BDLENBQUMifQ==