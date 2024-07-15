"use strict";
//import { ResultScan } from "../../../models/resultScan.models";
//import { getEnvVar } from "../../manageVarEnvironnement.service";
//import { getNewLogger } from "../../logger.service";
//import { PrometheusSaveConfig } from "../../../models/export/prometheus/config.models";
//import { EventMetric } from "../../../models/export/prometheus/eventMetric.models";
//import { loadAddOnsCustomUtility } from "../../addOn.service";
//
//const axios = require('axios');
//const logger = getNewLogger("prometheusLogger");
//const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");
//
//export async function save(save: PrometheusSaveConfig, result: ResultScan[][]): Promise<void>{
//    throw new Error("Implementation not yet complete");
//    if(!save.urlName) throw new Error("urlName is required");
//    let url = (await getEnvVar(save.urlName))??save.urlName;
//    logger.info(`Saving to Prometheus`);
//    const metrics = await Promise.all(result.flat().map(async (resultScan) => {
//        return convertResultScanToEventMetric(resultScan);
//    }));
//    await sendMetrics(url, metrics);
//}
//
//async function sendMetrics (prometheusURL:string, metrics: EventMetric[]) {
//    const formattedMetrics = metrics.map(metric => {
//        return `kexa_event_total{level="${metric.level}"} 1 ${metric.ruleName} ${metric.identifier} ${metric.timestamp}`;
//    }).join('\n');
//
//    await axios.post(`${prometheusURL}/metrics/job/event_metrics`, formattedMetrics);
//};
//
//function convertResultScanToEventMetric(resultScan: ResultScan): EventMetric {
//    return {
//        level: resultScan.rule.level,
//        timestamp: new Date().getTime(),
//        identifier: addOnPropertyToSend[resultScan.rule.cloudProvider](resultScan),
//        ruleName: resultScan.rule.name??"",
//    };
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWV0aGV1c1NhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9zYXZlL3Byb21ldGhldXNTYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlFQUFpRTtBQUNqRSxtRUFBbUU7QUFDbkUsc0RBQXNEO0FBQ3RELHlGQUF5RjtBQUN6RixxRkFBcUY7QUFDckYsZ0VBQWdFO0FBQ2hFLEVBQUU7QUFDRixpQ0FBaUM7QUFDakMsa0RBQWtEO0FBQ2xELGlIQUFpSDtBQUNqSCxFQUFFO0FBQ0YsZ0dBQWdHO0FBQ2hHLHlEQUF5RDtBQUN6RCwrREFBK0Q7QUFDL0QsOERBQThEO0FBQzlELDBDQUEwQztBQUMxQyxpRkFBaUY7QUFDakYsNERBQTREO0FBQzVELFVBQVU7QUFDVixzQ0FBc0M7QUFDdEMsR0FBRztBQUNILEVBQUU7QUFDRiw2RUFBNkU7QUFDN0Usc0RBQXNEO0FBQ3RELDJIQUEySDtBQUMzSCxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHVGQUF1RjtBQUN2RixJQUFJO0FBQ0osRUFBRTtBQUNGLGdGQUFnRjtBQUNoRixjQUFjO0FBQ2QsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUMxQyxxRkFBcUY7QUFDckYsNkNBQTZDO0FBQzdDLFFBQVE7QUFDUixHQUFHIn0=