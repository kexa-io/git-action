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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VwZGF0ZUNhcGFiaWxpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5RDtBQUd6RCxtREFBaUQ7QUFDakQsdURBQW1EO0FBR25ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixrREFBMEI7QUFFMUIsS0FBSyxVQUFVLGlCQUFpQjtJQUM1QixJQUFJLEtBQUssR0FBRyxNQUFNLElBQUEsZ0NBQWMsRUFBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFpQixFQUFFLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDSixJQUFJLE9BQU8sR0FBRyxNQUFNLElBQUEsOEJBQWMsR0FBRSxDQUFDO0lBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBVyxFQUFFLEVBQUU7UUFDdEMsSUFBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFDO1lBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBQSw2QkFBcUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBRUQsU0FBZ0IsYUFBYTtJQUN6QixJQUFJLFdBQVcsR0FB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