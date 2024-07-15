"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveResult = void 0;
const storage_1 = require("@google-cloud/storage");
const logger_service_1 = require("./logger.service");
const addOn_service_1 = require("./addOn.service");
const jsonStringify_1 = require("../helpers/jsonStringify");
const configuration = require('node-config-ts').config;
const logger = (0, logger_service_1.getNewLogger)("SaveLogger");
async function saveResult(result) {
    if (!configuration.save)
        return Promise.resolve();
    const addOnSave = (0, addOn_service_1.loadAddOnsCustomUtility)("save", "save", configuration.save.map((save) => save.type));
    if (!Array.isArray(configuration.save))
        configuration.save = [configuration.save];
    let resultOnlyWithErrors = result.map((resultScan) => {
        return resultScan.filter((resultScan) => {
            return resultScan.error.length > 0;
        });
    });
    let dataToSave = [result, resultOnlyWithErrors];
    Promise.all(configuration.save.map(async (save) => {
        if (addOnSave[save.type]) {
            try {
                await addOnSave[save.type](save, dataToSave[save.onlyErrors ?? false ? 1 : 0]);
            }
            catch (e) {
                logger.error("Error in save " + save.type + " : " + e.message);
                logger.debug(e);
            }
        }
        else {
            logger.warning('Unknown save type: ' + save.type);
        }
    }));
}
exports.saveResult = saveResult;
async function saveJsonToGcpBucket(bucketName, objectKey, json) {
    await new storage_1.Storage().bucket(bucketName).file(objectKey).save((0, jsonStringify_1.jsonStringify)(json));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3NhdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBZ0Q7QUFFaEQscURBQWdEO0FBQ2hELG1EQUEwRDtBQUUxRCw0REFBeUQ7QUFFekQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxZQUFZLENBQUMsQ0FBQztBQUVuQyxLQUFLLFVBQVUsVUFBVSxDQUFDLE1BQXNCO0lBQ25ELElBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSTtRQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pELE1BQU0sU0FBUyxHQUFpQyxJQUFBLHVDQUF1QixFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqSixJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQUUsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRixJQUFJLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNqRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNwQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxVQUFVLEdBQUcsQ0FBRSxNQUFNLEVBQUUsb0JBQW9CLENBQUUsQ0FBQztJQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFnQixFQUFFLEVBQUU7UUFDMUQsSUFBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ3BCLElBQUc7Z0JBQ0MsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRjtZQUFBLE9BQU0sQ0FBSyxFQUFDO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CO1NBQ0o7YUFBSTtZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUM7QUF0QkQsZ0NBc0JDO0FBRUQsS0FBSyxVQUFVLG1CQUFtQixDQUFDLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxJQUFZO0lBQ2xGLE1BQU0sSUFBSSxpQkFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBQSw2QkFBYSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckYsQ0FBQyJ9