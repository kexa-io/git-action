"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportation = void 0;
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const logger_service_1 = require("../../logger.service");
const mySQL_service_1 = require("../../saving/mySQL.service");
const loaderConfig_1 = require("../../../helpers/loaderConfig");
const logger = (0, logger_service_1.getNewLogger)("mySQLExportLogger");
async function exportation(save, resources) {
    let mySQL = new mySQL_service_1.MySQLClass();
    try {
        if (!save.urlName)
            throw new Error("urlName is required");
        let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
        const config = (0, loaderConfig_1.getConfig)();
        await mySQL.createTables({
            uri: url
        });
        let providers = await mySQL.createAndGetProviders(Object.keys(resources));
        await Promise.all(Object.keys(resources).map(async (providerName) => {
            let providerId = providers[providerName];
            let providerResource = resources[providerName];
            await Promise.all(providerResource.map(async (resources, indexEnvironnement) => {
                let dataEnvironnementConfig = config[providerName][indexEnvironnement];
                const [originId, providerItemsId] = await Promise.all([
                    mySQL.createAndGetOrigin(dataEnvironnementConfig),
                    mySQL.createAndGetProviderItems(providerId, Object.keys(resources))
                ]);
                await Promise.all(Object.keys(resources).map(async (resourceName) => {
                    await mySQL.createAndGetResources(resources[resourceName], originId, providerItemsId[resourceName]);
                }));
            }));
        }));
        logger.info("All data exported in MySQL");
        await mySQL.disconnect();
    }
    catch (e) {
        await mySQL.disconnect(true);
        throw e;
    }
}
exports.exportation = exportation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlTUUxFeHBvcnRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2V4cG9ydGF0aW9uL215U1FMRXhwb3J0YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5RkFBaUU7QUFDakUseURBQW9EO0FBRXBELDhEQUF3RDtBQUN4RCxnRUFBMEQ7QUFFMUQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFMUMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUFxQixFQUFFLFNBQTJCO0lBQ2hGLElBQUksS0FBSyxHQUFHLElBQUksMEJBQVUsRUFBRSxDQUFDO0lBQzdCLElBQUc7UUFDQyxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUEsd0JBQVMsR0FBRSxDQUFDO1FBQzNCLE1BQU0sS0FBSyxDQUFDLFlBQVksQ0FBQztZQUNyQixHQUFHLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFO1lBQ2hFLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6QyxJQUFJLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsRUFBRTtnQkFDM0UsSUFBSSx1QkFBdUIsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDdkUsTUFBTSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ2xELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDakQsS0FBSyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN0RSxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTtvQkFDaEUsTUFBTSxLQUFLLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDeEcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzVCO0lBQUEsT0FBTSxDQUFLLEVBQUM7UUFDVCxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLENBQUM7S0FDWDtBQUNMLENBQUM7QUE5QkQsa0NBOEJDIn0=