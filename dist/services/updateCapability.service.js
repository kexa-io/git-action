"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("../helpers/files");
const addOn_service_1 = require("./addOn.service");
const analyse_service_1 = require("./analyse.service");
async function releaseCapability() {
    let rules = await (0, analyse_service_1.gatheringRules)("./Kexa/rules", true);
    let freeRules = [...rules.map((rule) => {
            return rule.rules;
        })];
    let headers = await (0, addOn_service_1.extractHeaders)();
    freeRules.flat(1).forEach((rule) => {
        if (headers[rule.cloudProvider]) {
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });
    console.log(JSON.stringify(headers, null, 4));
    (0, files_1.writeStringToJsonFile)(JSON.stringify(headers, null, 4), "./capacity.json");
}
if (require.main === module) {
    releaseCapability();
}
//# sourceMappingURL=updateCapability.service.js.map