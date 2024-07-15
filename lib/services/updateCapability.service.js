"use strict";
//import { writeStringToJsonFile } from "../helpers/files";
//import { Rules } from "../models/settingFile/rules.models";
//import { SettingFile } from "../models/settingFile/settingFile.models";
//import { extractHeaders } from "./addOn.service";
//import { gatheringRules } from "./analyse.service";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVersion = void 0;
const fs = require("fs");
//import axios from 'axios';
//async function releaseCapability(){
//    let rules = await gatheringRules("./src/rules", true);
//    let freeRules = [...rules.map((rule: SettingFile) => {
//        return rule.rules
//    })];
//    let headers = await extractHeaders();
//    freeRules.flat(1).forEach((rule: Rules) => {
//        if(headers[rule.cloudProvider]){
//            headers[rule.cloudProvider].freeRules.push(rule);
//        }
//    });
//    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
//}
function updateVersion() {
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}
exports.updateVersion = updateVersion;
//export function updateREADME(){
//    let readme = fs.readFileSync("./README.md", "utf8");
//    let capacityJson = require("../../capacity.json");
//    let goal = "\n\n"
//    Object.keys(capacityJson).forEach((key: string) => {
//        goal += `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`
//        capacityJson[key]["resources"].forEach((resource: string) => {
//            goal += `- ✅ ${resource}\n`
//        });
//        goal += `</details>\n`
//    });
//    readme = readme.split("<div class='spliter_code'></div>")
//    readme[1] = goal + "\n";
//    readme = readme.join("<div class='spliter_code'></div>")
//    fs.writeFileSync("./README.md", readme);
//}
if (require.main === module) {
    //releaseCapability();
    //updateREADME();
    updateVersion();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VwZGF0ZUNhcGFiaWxpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkRBQTJEO0FBQzNELDZEQUE2RDtBQUM3RCx5RUFBeUU7QUFDekUsbURBQW1EO0FBQ25ELHFEQUFxRDs7O0FBRXJELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6Qiw0QkFBNEI7QUFFNUIscUNBQXFDO0FBQ3JDLDREQUE0RDtBQUM1RCw0REFBNEQ7QUFDNUQsMkJBQTJCO0FBQzNCLFVBQVU7QUFDViwyQ0FBMkM7QUFDM0Msa0RBQWtEO0FBQ2xELDBDQUEwQztBQUMxQywrREFBK0Q7QUFDL0QsV0FBVztBQUNYLFNBQVM7QUFDVCxpRkFBaUY7QUFDakYsR0FBRztBQUVILFNBQWdCLGFBQWE7SUFDekIsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkQsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUxELHNDQUtDO0FBRUQsaUNBQWlDO0FBQ2pDLDBEQUEwRDtBQUMxRCx3REFBd0Q7QUFDeEQsdUJBQXVCO0FBQ3ZCLDBEQUEwRDtBQUMxRCwrR0FBK0c7QUFDL0csd0VBQXdFO0FBQ3hFLHlDQUF5QztBQUN6QyxhQUFhO0FBQ2IsZ0NBQWdDO0FBQ2hDLFNBQVM7QUFDVCwrREFBK0Q7QUFDL0QsOEJBQThCO0FBQzlCLDhEQUE4RDtBQUM5RCw4Q0FBOEM7QUFDOUMsR0FBRztBQUlILElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7SUFDekIsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixhQUFhLEVBQUUsQ0FBQztDQUNuQiJ9