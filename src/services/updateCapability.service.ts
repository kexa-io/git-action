import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";

const fs = require("fs");
import axios from 'axios';

async function releaseCapability(){
    let rules = await gatheringRules("./src/rules", true);
    let freeRules = [...rules.map((rule: SettingFile) => {
        return rule.rules
    })];
    let headers = await extractHeaders();
    freeRules.flat(1).forEach((rule: Rules) => {
        if(headers[rule.cloudProvider]){
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });
    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
}

export function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}

export function updateREADME(){
    let readme = fs.readFileSync("./README.md", "utf8");
    let capacityJson = require("../../capacity.json");
    let goal = "\n\n"
    Object.keys(capacityJson).forEach((key: string) => {
        goal += `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`
        capacityJson[key]["resources"].forEach((resource: string) => {
            goal += `- ✅ ${resource}\n`
        });
        goal += `</details>\n`
    });
    readme = readme.split("<div class='spliter_code'></div>")
    readme[1] = goal + "\n";
    readme = readme.join("<div class='spliter_code'></div>")
    fs.writeFileSync("./README.md", readme);
}



if (require.main === module) {
    releaseCapability();
    updateREADME();
    updateVersion();
}