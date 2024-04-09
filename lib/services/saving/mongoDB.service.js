"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.saveData = exports.setConnection = void 0;
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const mongoose_1 = require("mongoose");
async function setConnection(url, tableName, mongooseSchema) {
    let connectionMongoDB = await (0, mongoose_1.createConnection)(url);
    const dataModel = connectionMongoDB.model(tableName, mongooseSchema, tableName);
    return { dataModel, connectionMongoDB };
}
exports.setConnection = setConnection;
async function saveData(save, modelMongoose, data) {
    const dataToSave = new modelMongoose(data);
    if (save.tags)
        dataToSave.tags = save.tags;
    let origin = (await (0, manageVarEnvironnement_service_1.getEnvVar)("ORIGIN")) ?? save?.origin;
    if (origin)
        dataToSave.origin = origin;
    dataToSave.timestamp = new Date().getTime();
    await dataToSave.save();
}
exports.saveData = saveData;
async function closeConnection(connectionMongoDB) {
    await connectionMongoDB.close();
}
exports.closeConnection = closeConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3NhdmluZy9tb25nb0RCLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0ZBQThEO0FBRzlELHVDQUE0QztBQUVyQyxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVcsRUFBRSxTQUFpQixFQUFFLGNBQW1CO0lBQ25GLElBQUksaUJBQWlCLEdBQUcsTUFBTSxJQUFBLDJCQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sU0FBUyxHQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztBQUM1QyxDQUFDO0FBSkQsc0NBSUM7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLElBQXVCLEVBQUUsYUFBa0IsRUFBRSxJQUFTO0lBQ2pGLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLElBQUcsSUFBSSxDQUFDLElBQUk7UUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxRQUFRLENBQUMsQ0FBQyxJQUFFLElBQUksRUFBRSxNQUFNLENBQUM7SUFDdkQsSUFBRyxNQUFNO1FBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFQRCw0QkFPQztBQUVNLEtBQUssVUFBVSxlQUFlLENBQUMsaUJBQXNCO0lBQ3hELE1BQU0saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUZELDBDQUVDIn0=