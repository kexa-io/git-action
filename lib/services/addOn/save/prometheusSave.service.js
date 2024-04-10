"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.save = void 0;
//const manageVarEnvironnement_service_1 = require("../../manageVarEnvironnement.service");
//const logger_service_1 = require("../../logger.service");
//const addOn_service_1 = require("../../addOn.service");
//const axios = require('axios');
//const logger = (0, logger_service_1.getNewLogger)("prometheusLogger");
//const addOnPropertyToSend = (0, addOn_service_1.loadAddOnsCustomUtility)("display", "propertyToSend");
//async function save(save, result) {
//    throw new Error("Implementation not yet complete");
//    if (!save.urlName)
//        throw new Error("urlName is required");
//    let url = (await (0, manageVarEnvironnement_service_1.getEnvVar)(save.urlName)) ?? save.urlName;
//    logger.info(`Saving to Prometheus`);
//    const metrics = await Promise.all(result.flat().map(async (resultScan) => {
//        return convertResultScanToEventMetric(resultScan);
//    }));
//    await sendMetrics(url, metrics);
//}
//exports.save = save;
//async function sendMetrics(prometheusURL, metrics) {
//    const formattedMetrics = metrics.map(metric => {
//        return `kexa_event_total{level="${metric.level}"} 1 ${metric.ruleName} ${metric.identifier} ${metric.timestamp}`;
//    }).join('\n');
//    await axios.post(`${prometheusURL}/metrics/job/event_metrics`, formattedMetrics);
//}
//;
//function convertResultScanToEventMetric(resultScan) {
//    return {
//        level: resultScan.rule.level,
//        timestamp: new Date().getTime(),
//        identifier: addOnPropertyToSend[resultScan.rule.cloudProvider](resultScan),
//        ruleName: resultScan.rule.name ?? "",
//    };
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWV0aGV1c1NhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9zYXZlL3Byb21ldGhldXNTYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUZBQWlFO0FBQ2pFLHlEQUFvRDtBQUdwRCx1REFBOEQ7QUFFOUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sbUJBQW1CLEdBQWlDLElBQUEsdUNBQXVCLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFeEcsS0FBSyxVQUFVLElBQUksQ0FBQyxJQUEwQixFQUFFLE1BQXNCO0lBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNuRCxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwQyxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7UUFDckUsT0FBTyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFURCxvQkFTQztBQUVELEtBQUssVUFBVSxXQUFXLENBQUUsYUFBb0IsRUFBRSxPQUFzQjtJQUNwRSxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDMUMsT0FBTywyQkFBMkIsTUFBTSxDQUFDLEtBQUssUUFBUSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVkLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBQUEsQ0FBQztBQUVGLFNBQVMsOEJBQThCLENBQUMsVUFBc0I7SUFDMUQsT0FBTztRQUNILEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDNUIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQy9CLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUMxRSxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsRUFBRTtLQUNyQyxDQUFDO0FBQ04sQ0FBQyJ9