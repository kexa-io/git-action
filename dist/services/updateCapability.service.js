"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("../helpers/files");
const addOn_service_1 = require("./addOn.service");
const analyse_service_1 = require("./analyse.service");
const fs = require("fs");
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
function updateVersion() {
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}
if (require.main === module) {
    releaseCapability();
    updateVersion();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VwZGF0ZUNhcGFiaWxpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUF5RDtBQUd6RCxtREFBaUQ7QUFDakQsdURBQW1EO0FBRW5ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixLQUFLLFVBQVUsaUJBQWlCO0lBQzVCLElBQUksS0FBSyxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLElBQUksT0FBTyxHQUFHLE1BQU0sSUFBQSw4QkFBYyxHQUFFLENBQUM7SUFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtRQUN0QyxJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUM7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUEsNkJBQXFCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNsQixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNoRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRCxXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsRUFBRSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUN6QixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGFBQWEsRUFBRSxDQUFDO0NBQ25CIn0=