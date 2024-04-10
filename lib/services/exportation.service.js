"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportationData = void 0;
const logger_service_1 = require("./logger.service");
const addOn_service_1 = require("./addOn.service");
const loaderConfig_1 = require("../helpers/loaderConfig");
const configuration = (0, loaderConfig_1.getConfig)();
const logger = (0, logger_service_1.getNewLogger)("SaveLogger");
async function exportationData(resources) {
    if (!configuration.export)
        return [];
    const addOnExportation = (0, addOn_service_1.loadAddOnsCustomUtility)("exportation", "exportation", configuration.export.map((save) => save.type));
    if (!Array.isArray(configuration.save))
        configuration.save = [configuration.save];
    let promises = Promise.all(configuration.export.map(async (save) => {
        if (addOnExportation[save.type]) {
            try {
                await addOnExportation[save.type](save, resources);
            }
            catch (e) {
                logger.error("Error in exportation " + save.type + " : " + e.message);
                logger.debug(e);
            }
        }
        else {
            logger.warning('Unknown exportation type: ' + save.type);
        }
    }));
    return promises;
}
exports.exportationData = exportationData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0YXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9leHBvcnRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFnRDtBQUNoRCxtREFBMEQ7QUFFMUQsMERBQW9EO0FBR3BELE1BQU0sYUFBYSxHQUFHLElBQUEsd0JBQVMsR0FBRSxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxZQUFZLENBQUMsQ0FBQztBQUVuQyxLQUFLLFVBQVUsZUFBZSxDQUFDLFNBQTJCO0lBQzdELElBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLE1BQU0sZ0JBQWdCLEdBQWlDLElBQUEsdUNBQXVCLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hLLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFBRSxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQWdCLEVBQUUsRUFBRTtRQUMzRSxJQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUMzQixJQUFHO2dCQUNDLE1BQU0sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0RDtZQUFBLE9BQU0sQ0FBSyxFQUFDO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CO1NBQ0o7YUFBSTtZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFqQkQsMENBaUJDIn0=