"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveResult = void 0;
const storage_1 = require("@google-cloud/storage");
const logger_service_1 = require("./logger.service");
const addOn_service_1 = require("./addOn.service");
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
    await new storage_1.Storage().bucket(bucketName).file(objectKey).save(JSON.stringify(json));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3NhdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBZ0Q7QUFFaEQscURBQWdEO0FBQ2hELG1EQUEwRDtBQUcxRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdkQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0FBRW5DLEtBQUssVUFBVSxVQUFVLENBQUMsTUFBc0I7SUFDbkQsSUFBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJO1FBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakQsTUFBTSxTQUFTLEdBQWlDLElBQUEsdUNBQXVCLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pKLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFBRSxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLElBQUksb0JBQW9CLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2pELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLFVBQVUsR0FBRyxDQUFFLE1BQU0sRUFBRSxvQkFBb0IsQ0FBRSxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQWdCLEVBQUUsRUFBRTtRQUMxRCxJQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDcEIsSUFBRztnQkFDQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hGO1lBQUEsT0FBTSxDQUFLLEVBQUM7Z0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDSjthQUFJO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQztBQXRCRCxnQ0FzQkM7QUFFRCxLQUFLLFVBQVUsbUJBQW1CLENBQUMsVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQVk7SUFDbEYsTUFBTSxJQUFJLGlCQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEYsQ0FBQyJ9