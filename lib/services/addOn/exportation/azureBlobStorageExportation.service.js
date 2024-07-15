"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportation = void 0;
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const azureBlobStorage_service_1 = require("../../saving/azureBlobStorage.service");
async function exportation(save, result) {
    if (!save.containerName)
        throw new Error("containerName is missing");
    let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
    await (0, azureBlobStorage_service_1.saveJsonToAzureBlobStorage)(url, save, result);
}
exports.exportation = exportation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVCbG9iU3RvcmFnZUV4cG9ydGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZXhwb3J0YXRpb24vYXp1cmVCbG9iU3RvcmFnZUV4cG9ydGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEseUZBQWlFO0FBQ2pFLG9GQUFtRjtBQUU1RSxLQUFLLFVBQVUsV0FBVyxDQUFDLElBQWdDLEVBQUUsTUFBd0I7SUFDeEYsSUFBRyxDQUFDLElBQUksQ0FBQyxhQUFhO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3BFLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFBLDBDQUFTLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4RCxNQUFNLElBQUEscURBQTBCLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBSkQsa0NBSUMifQ==