"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("../helpers/files");
const addOn_service_1 = require("./addOn.service");
const analyse_service_1 = require("./analyse.service");
const axios_1 = __importDefault(require("axios"));
const fs = require("fs");
async function releaseCapability() {
    let rules = await (0, analyse_service_1.gatheringRules)("./src/rules", true);
    let freeRules = [...rules.map((rule) => {
            return rule.rules;
        })];
    let headers = await (0, addOn_service_1.extractHeaders)();
    freeRules.flat(1).forEach((rule) => {
        if (headers[rule.cloudProvider]) {
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });
    (0, files_1.writeStringToJsonFile)(JSON.stringify(headers, null, 4), "./capacity.json");
}
function updateVersion() {
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}
function updateREADME() {
    let readme = fs.readFileSync("./README.md", "utf8");
    let packageJson = require("../../capacity.json");
    const tab = "    ";
    let gaol = "\n\n";
    Object.keys(packageJson).forEach((key) => {
        gaol += `- ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:\n`;
        packageJson[key]["resources"].forEach((resource) => {
            gaol += `${tab}- ✅ ${resource}\n`;
        });
    });
    readme = readme.split("<div class='spliter_code'></div>");
    readme[1] = gaol + "\n";
    readme = readme.join("<div class='spliter_code'></div>");
    fs.writeFileSync("./README.md", readme);
}
/* ***************************** */
/*            PKG FOR AZURE      */
/* ***************************** */
async function fetchArmPackages() {
    try {
        const searchString = encodeURIComponent('@azure/arm-');
        let offset = 0;
        let allResults = [];
        let stringResults = [];
        while (true) {
            const response = await axios_1.default.get(`https://api.npms.io/v2/search?size=250&from=${offset}&q=${searchString}`);
            if (response.data.results.length === 0) {
                break;
            }
            allResults = allResults.concat(response.data.results);
            offset += 250;
        }
        const searchTerm = '@azure/arm-';
        const filteredResults = allResults.filter(result => result.package.name.startsWith(searchTerm));
        const finalResults = filteredResults.filter(result => !/\d/.test(result.package.name));
        let i = 0;
        finalResults.forEach((element) => {
            i++;
            const firstSlashIndex = element.package.name.indexOf('/');
            const extractedAlias = firstSlashIndex !== -1 ? element.package.name.substring(firstSlashIndex + 1) : element.package.name;
            const aliasName = extractedAlias.replace(/-/g, '');
            const obj = {
                packageName: element.package.name,
                aliasName: aliasName
            };
            stringResults.push(obj);
        });
        let fileContent = '';
        const fileName = "azurePackage.import.ts";
        stringResults.forEach((item) => {
            fileContent += `import * as ${item.aliasName} from '${item.packageName}';\n`;
        });
        fileContent += `export {\n`;
        stringResults.forEach((item, index) => {
            if (index === stringResults.length - 1) {
                fileContent += `${item.aliasName}`;
            }
            else {
                fileContent += `${item.aliasName},\n`;
            }
        });
        fileContent += `};\n`;
        try {
            fs.writeFileSync("Kexa/services/addOn/imports/" + fileName, fileContent);
            console.log('File created: azurePackage.import.ts');
        }
        catch (error) {
            console.error('Error writing file:', error);
        }
        console.log("total results Azure packages found : " + i);
        return stringResults;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function createAzureArmPkgImportList() {
    try {
        await fetchArmPackages();
        retrieveAzureArmClients();
    }
    catch (e) {
        console.error("Error fetching ARM Packages", e);
    }
}
const AzureImports = __importStar(require("./addOn/imports/azurePackage.import"));
const identity_1 = require("@azure/identity");
function createGenericClient(Client, credential, subscriptionId) {
    return new Client(credential, credential);
}
function callGenericClient(client) {
    const properties = Object.getOwnPropertyNames(client);
    return properties;
}
function extractClients(module) {
    const clients = {};
    const credentials = new identity_1.DefaultAzureCredential();
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
            try {
                clients[key] = callGenericClient(createGenericClient(module[key], credentials, null));
            }
            catch (e) {
                console.error("Error when using client constructor in update capability.", e);
            }
        }
    });
    return clients;
}
/* ********************************************* */
/*        GENERATING RESOURCES HEADER AZURE      */
/* ********************************************* */
let blackListObject = [
    "_requestContentType",
    "_endpoint",
    "_allowInsecureConnection",
    "_httpClient",
    "$host",
    "pipeline",
    "apiVersion",
    "subscriptionId"
];
const resource_models_1 = require("../models/azure/resource.models");
function displayTotalGatheredMessage(provider, amount) {
    console.log("------------------------------------------");
    console.log("Gathered " + provider + " objects : " + amount + " items.");
    console.log("------------------------------------------");
}
function generateResourceList(resources) {
    let concatedArray;
    concatedArray = [];
    Object.keys(resources).forEach(key => {
        let value = resources[key];
        if (Array.isArray(value)) {
            if (!(value.length == 1 && value[0] === "client") || (value.length <= 2)) {
                value.forEach((element) => {
                    if (!blackListObject.includes(element) && !(element.startsWith("_")))
                        concatedArray.push(key + "." + element);
                });
            }
        }
    });
    displayTotalGatheredMessage("Azure", concatedArray.length);
    for (const key of resource_models_1.stringKeys)
        concatedArray.push(key.toString());
    const resourceList = concatedArray.map(line => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}
function writeFileContent(outputFilePath, content) {
    try {
        fs.writeFileSync(outputFilePath, content, 'utf-8');
        console.log("Updated " + outputFilePath + " resources header.");
    }
    catch (e) {
        console.error("Error when writing to file: ", e);
    }
}
function readFileContent(inputFilePath) {
    try {
        const file = fs.readFileSync(inputFilePath, 'utf-8');
        return (file);
    }
    catch (e) {
        console.error("Error when reading file: ", e);
    }
}
async function fileReplaceContent(inputFilePath, outputFilePath, allClients) {
    try {
        const fileContent = await readFileContent(inputFilePath);
        const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
        const updatedContent = fileContent.replace(regex, `$1\n${generateResourceList(allClients)}\n$2`);
        writeFileContent(outputFilePath, updatedContent);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
function retrieveAzureArmClients() {
    let allClients = {};
    console.log("retrieve clients from arm pkg...");
    for (const key of Object.keys(AzureImports)) {
        const currentItem = AzureImports[key];
        const clientsFromModule = extractClients(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }
    console.log("Writing clients to header...");
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/azureGathering.service.ts");
    fileReplaceContent(filePath, filePath, allClients);
}
if (require.main === module) {
    releaseCapability();
    updateREADME();
    updateVersion();
    createAzureArmPkgImportList();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VwZGF0ZUNhcGFiaWxpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXlEO0FBR3pELG1EQUFpRDtBQUNqRCx1REFBbUQ7QUFDbkQsa0RBQTBCO0FBRTFCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixLQUFLLFVBQVUsaUJBQWlCO0lBQzVCLElBQUksS0FBSyxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLElBQUksT0FBTyxHQUFHLE1BQU0sSUFBQSw4QkFBYyxHQUFFLENBQUM7SUFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtRQUN0QyxJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUM7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFBLDZCQUFxQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxTQUFTLGFBQWE7SUFDbEIsSUFBSSxXQUFXLEdBQUcs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