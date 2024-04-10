"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
const logger_service_1 = require("../../logger.service");
const mySQL_service_1 = require("../../saving/mySQL.service");
const logger = (0, logger_service_1.getNewLogger)("mySQLSaveLogger");
async function save(save, result) {
    let mySQL = new mySQL_service_1.MySQLClass();
    try {
        if (!save.urlName)
            throw new Error("urlName is required");
        let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
        await mySQL.createTables({
            uri: url
        });
        await Promise.all(result.flat().map(async (resultScan) => {
            await saveResultScan(resultScan, save, mySQL);
        }));
        logger.info("All data saved in MySQL");
        await mySQL.disconnect();
    }
    catch (e) {
        await mySQL.disconnect(true);
        throw e;
    }
}
exports.save = save;
async function saveResultScan(resultScan, save, mySQL) {
    let providerId = await mySQL.createAndGetProvider(resultScan.rule.cloudProvider);
    let providerItemId = (await mySQL.getProviderItemsByNameAndProvider(providerId, resultScan.rule.objectName)).ID;
    let ruleId = await mySQL.createAndGetRule(resultScan.rule, providerId, providerItemId);
    let originId = await mySQL.createAndGetOrigin({ name: save.origin ?? "Unknown" });
    let resourceId = await mySQL.createAndGetResource(resultScan.objectContent, originId, providerItemId);
    await mySQL.createScan(resultScan, resourceId, ruleId);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlTUUxTYXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vc2F2ZS9teVNRTFNhdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RkFBaUU7QUFDakUseURBQW9EO0FBRXBELDhEQUF3RDtBQUd4RCxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV4QyxLQUFLLFVBQVUsSUFBSSxDQUFDLElBQXFCLEVBQUUsTUFBc0I7SUFDcEUsSUFBSSxLQUFLLEdBQUcsSUFBSSwwQkFBVSxFQUFFLENBQUM7SUFDN0IsSUFBRztRQUNDLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEQsTUFBTSxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3JCLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ3JELE1BQU0sY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUM1QjtJQUFBLE9BQU0sQ0FBSyxFQUFDO1FBQ1QsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDO0tBQ1g7QUFDTCxDQUFDO0FBbEJELG9CQWtCQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsVUFBc0IsRUFBRSxJQUFxQixFQUFFLEtBQWdCO0lBQ3pGLElBQUksVUFBVSxHQUFHLE1BQU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakYsSUFBSSxjQUFjLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoSCxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN2RixJQUFJLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDdEcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0QsQ0FBQyJ9