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
exports.extractObjectsOrFunctionsAws = exports.extractObjectBetween = exports.extractObjectFromOutputCommand = exports.extractClientsAws = exports.updateREADME = exports.updateVersion = void 0;
const files_1 = require("../helpers/files");
const addOn_service_1 = require("./addOn.service");
const analyse_service_1 = require("./analyse.service");
const fs = require("fs");
const axios_1 = __importDefault(require("axios"));
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
exports.updateVersion = updateVersion;
function updateREADME() {
    let readme = fs.readFileSync("./README.md", "utf8");
    let capacityJson = require("../../capacity.json");
    const tab = "    ";
    let goal = "\n\n";
    Object.keys(capacityJson).forEach((key) => {
        goal += `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`;
        capacityJson[key]["resources"].forEach((resource) => {
            goal += `- ✅ ${resource}\n`;
        });
        goal += `</details>\n`;
    });
    readme = readme.split("<div class='spliter_code'></div>");
    readme[1] = goal + "\n";
    readme = readme.join("<div class='spliter_code'></div>");
    fs.writeFileSync("./README.md", readme);
}
exports.updateREADME = updateREADME;
/* ************************************ */
/*        GENERIC PACKAGE FETCH         */
/*  this can be used by many addons for */
/*          automatization              */
/* ************************************ */
async function fetchArmPackages(packageNeedle, destFile, destFileScript, exceptionEndNeedles) {
    try {
        const searchString = encodeURIComponent(packageNeedle);
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
        const searchTerm = packageNeedle;
        let filteredResults;
        if (exceptionEndNeedles) {
            filteredResults = allResults.filter(result => {
                const packageName = result.package.name;
                const startsWithSearchTerm = packageName.startsWith(searchTerm);
                const endsWithExcludedTerm = exceptionEndNeedles.some(term => packageName.endsWith(term));
                return startsWithSearchTerm && !endsWithExcludedTerm;
            });
        }
        else {
            filteredResults = allResults.filter(result => result.package.name.startsWith(searchTerm));
        }
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
        /* ********************************************* */
        /* *  Generate the addonPackage.import.ts file * */
        /* ********************************************* */
        let fileContent = '// This file was auto-generated by updateCapability.service.ts\n\n';
        const fileName = destFile;
        stringResults.forEach((item) => {
            fileContent += `import * as ${item.aliasName} from '${item.packageName}';\n`;
        });
        if (packageNeedle == "@aws-sdk/client-") {
            additionalAwsImports.forEach((element) => {
                fileContent += element;
            });
        }
        fileContent += `export {\n`;
        if (packageNeedle == "@aws-sdk/client-") {
            additionalAwsImportsKeys.forEach((element) => {
                fileContent += `${element},\n`;
            });
        }
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
            console.log('File created: ' + destFile);
        }
        catch (error) {
            console.error('Error writing file:', error);
        }
        /* ************************************************ */
        /* *  Write the addonPackageImport.script.sh      * */
        /* ************************************************ */
        try {
            fs.writeFileSync("Kexa/services/addOn/imports/scripts/" + destFileScript, generateShellScript(stringResults));
            console.log('File created: ' + destFileScript);
        }
        catch (error) {
            console.error('Error writing file:', error);
        }
        return stringResults;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
/* Generate a Shell script to install easily all the packages */
/* if they're not already in package.json, this could also be */
/* use to make modulable dependencies                         */
function generateShellScript(stringResults) {
    const packageNames = stringResults.map((item) => item.packageName);
    let scriptContentHeader = `# This script was auto-generated by updateCapability.service.ts\n`;
    const scriptContent = scriptContentHeader += `packages=(
${packageNames.map((pkg) => `    '${pkg}'`).join('\n')}
)

for pkg in "\${packages[@]}"
do
    npm install "\$pkg" || echo "Failed to install \$pkg"
    echo "done for \$pkg"
done`;
    return scriptContent;
}
const AzureImports = __importStar(require("./addOn/imports/azurePackage.import"));
const identity_1 = require("@azure/identity");
async function createAzureArmPkgImportList() {
    try {
        //  await fetchArmPackages('@azure/arm-', 'azurePackage.import.ts', 'azurePackageInstall.script.sh');
        retrieveAzureArmClients();
    }
    catch (e) {
        console.error("Error fetching Azure Packages", e);
    }
}
/* Here we're creating the Azure client from their */
/* constructors, so we can retrieve the objects    */
/* name they contains                              */
function createGenericClient(Client, credential, subscriptionId) {
    return new Client(credential, credential);
}
function callGenericClient(client) {
    const properties = Object.getOwnPropertyNames(client);
    return properties;
}
function extractClientsAzure(module) {
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
/* Add matching string you want to bannish when gathering object */
/* from Azure clients                                            */
let blackListObjectAzure = [
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
function generateResourceListAzure(resources) {
    let concatedArray;
    concatedArray = [];
    Object.keys(resources).forEach(key => {
        let value = resources[key];
        if (Array.isArray(value)) {
            if (!(value.length == 1 && value[0] === "client") || (value.length <= 2)) {
                value.forEach((element) => {
                    if (!blackListObjectAzure.includes(element) && !(element.startsWith("_")))
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
/* Those two read & write functions are for      */
/* the auto-generated header in addon.service.ts */
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
async function fileReplaceContentAzure(inputFilePath, outputFilePath, allClients) {
    try {
        const fileContent = await readFileContent(inputFilePath);
        const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
        const updatedContent = fileContent.replace(regex, `$1\n${generateResourceListAzure(allClients)}\n$2`);
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
        const clientsFromModule = extractClientsAzure(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }
    console.log("Writing clients to header...");
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/azureGathering.service.ts");
    fileReplaceContentAzure(filePath, filePath, allClients);
}
if (require.main === module) {
    releaseCapability();
    updateREADME();
    updateVersion();
    createAzureArmPkgImportList();
    createAwsArmPkgImportList();
}
/* ***************************** */
/*                               */
/*      Amazon Web Services      */
/*                               */
/* ***************************** */
const AwsImports = __importStar(require("./addOn/imports/awsPackage.import"));
const additionalAwsImports = ["import * as clientec2 from '@aws-sdk/client-ec2';\n",
    "import * as clients3 from '@aws-sdk/client-s3';\n"];
const additionalAwsImportsKeys = ["clientec2", "clients3"];
async function createAwsArmPkgImportList() {
    try {
        await fetchArmPackages('@aws-sdk/client-', 'awsPackage.import.ts', 'awsPackageInstall.script.sh', ["data", "browser", "node", "catalog", "service", "generator", "redshift-serverless"]);
        retrieveAwsClients();
    }
    catch (e) {
        console.error("Error fetching AWS Packages", e);
    }
}
function extractClientsAws(module) {
    const clients = {};
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
        }
    });
    return clients;
}
exports.extractClientsAws = extractClientsAws;
const extractObjectFromOutputCommand = (listingCommand) => {
    const outputCommand = listingCommand + "Output";
    console.log(outputCommand);
    return null;
};
exports.extractObjectFromOutputCommand = extractObjectFromOutputCommand;
/* For getting objects name in AWS, we extract the name between                 */
/* the two researched string when extracting function (ex : "List" & "Command") */
const extractObjectBetween = (inputString, startStrings, endString) => {
    let startIndex = -1;
    let foundStartString;
    if (startStrings.length == 0)
        startIndex = 0;
    else {
        for (const element of startStrings) {
            const index = inputString.indexOf(element);
            if (index !== -1 && (startIndex === -1 || index < startIndex)) {
                startIndex = index;
                foundStartString = element;
            }
        }
    }
    if (startIndex === -1 || inputString.indexOf(endString, startIndex) === -1) {
        return null;
    }
    let extractedContent;
    if (startIndex == 0 && !foundStartString) {
        const endIndex = inputString.indexOf(endString, startIndex);
        extractedContent = inputString.substring(startIndex, endIndex);
    }
    else if (!foundStartString)
        return null;
    else {
        const endIndex = inputString.indexOf(endString, startIndex);
        extractedContent = inputString.substring(startIndex + foundStartString.length, endIndex);
    }
    return extractedContent;
};
exports.extractObjectBetween = extractObjectBetween;
function extractObjectsOrFunctionsAws(module, isObject) {
    const clients = {};
    let clientsMatch = [];
    /* Start and End string to match for extract client listing functions */
    /* You can edit those as you wish, addind as much startStrings as you want */
    const startStrings = ["Get", "List", "Describe"];
    const endString = "Command";
    let clientName;
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clientName = module[key].name;
            if (clientName != "Client") {
                clientsMatch.push(clientName);
                if (clientsMatch.length > 1)
                    console.warn("WARNING: Multiple client found for AWS objects, header & gather could be wrong.");
                else if (clientsMatch.length < 1)
                    console.warn("WARNING: No client found for AWS objects, header & gather could be wrong.");
            }
        }
    });
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined
            && module[key].name.endsWith(endString) && startStrings.some(startString => module[key].name.startsWith(startString)))) {
            if (isObject) {
                //extractObjectFromOutputCommand(module[key].name);
                const objectName = (0, exports.extractObjectBetween)(module[key].name, startStrings, endString);
                if (clientsMatch.length < 1)
                    clients[key] = objectName;
                else
                    clients[key] = clientsMatch[clientsMatch.length - 1] + "." + objectName;
            }
            else
                clients[key] = module[key];
        }
    });
    return clients;
}
exports.extractObjectsOrFunctionsAws = extractObjectsOrFunctionsAws;
function retrieveAwsClients() {
    let allClients = {};
    let allObjects = [];
    console.log("retrieve clients from aws pkg...");
    for (const key of Object.keys(AwsImports)) {
        const currentItem = AwsImports[key];
        const clientsFromModule = extractClientsAws(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }
    for (const key of Object.keys(AwsImports)) {
        const currentItem = AwsImports[key];
        const clientsFromModule = extractObjectsOrFunctionsAws(currentItem, true);
        allObjects.push(clientsFromModule);
    }
    console.log("Writing clients to header...");
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/awsGathering.service.ts");
    fileReplaceContentAws(filePath, filePath, allObjects);
}
async function fileReplaceContentAws(inputFilePath, outputFilePath, allObjects) {
    try {
        const fileContent = await readFileContent(inputFilePath);
        const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
        const updatedContent = fileContent.replace(regex, `$1\n${generateResourceListAws(allObjects)}\n${generateCustomResourceListAws()}\n$2`);
        writeFileContent(outputFilePath, updatedContent);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
const ressource_models_1 = require("../models/aws/ressource.models");
function generateResourceListAws(resources) {
    let concatedArray = [];
    resources.forEach((element) => {
        Object.keys(element).forEach(key => {
            concatedArray.push(element[key]);
        });
    });
    displayTotalGatheredMessage("Aws", concatedArray.length);
    const resourceList = concatedArray.map(line => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}
function generateCustomResourceListAws() {
    const resourceList = ressource_models_1.stringKeys.map((line) => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VwZGF0ZUNhcGFiaWxpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5RDtBQUd6RCxtREFBaUQ7QUFDakQsdURBQW1EO0FBR25ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixrREFBMEI7QUFFMUIsS0FBSyxVQUFVLGlCQUFpQjtJQUM1QixJQUFJLEtBQUssR0FBRyxNQUFNLElBQUEsZ0NBQWMsRUFBQywrREFBK0QsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RyxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLElBQUksT0FBTyxHQUFHLE1BQU0sSUFBQSw4QkFBYyxHQUFFLENBQUM7SUFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtRQUN0QyxJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUM7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFBLDZCQUFxQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxTQUFnQixhQUFhO0lBQ3pCLElBQUksV0FBVyxH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