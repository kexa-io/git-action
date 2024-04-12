"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHeaders = exports.hasValidHeader = exports.loadAddOnsCustomUtility = exports.loadAddOns = void 0;
const files_1 = require("../helpers/files");
const configuration = require('config');
const mainFolder = 'src';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs');
const logger_service_1 = require("./logger.service");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
const loaderConfig_1 = require("../helpers/loaderConfig");
const logger = (0, logger_service_1.getNewLogger)("LoaderAddOnLogger");
const config = (0, loaderConfig_1.getConfig)();
const addOnName = [
    "aws",
    "azure",
    "gcp",
    "kubernetes",
    "github",
    "googleDrive",
    "googleWorkspace",
    "http",
    "o365"
];
const awsGathering_service_1 = require("./addOn/awsGathering.service");
const azureGathering_service_1 = require("./addOn/azureGathering.service");
const gcpGathering_service_1 = require("./addOn/gcpGathering.service");
const kubernetesGathering_service_1 = require("./addOn/kubernetesGathering.service");
const githubGathering_service_1 = require("./addOn/githubGathering.service");
const googleDriveGathering_service_1 = require("./addOn/googleDriveGathering.service");
const googleWorkspaceGathering_service_1 = require("./addOn/googleWorkspaceGathering.service");
const httpGathering_service_1 = require("./addOn/httpGathering.service");
const o365Gathering_service_1 = require("./addOn/o365Gathering.service");
const addOnCollect = {
    "aws": awsGathering_service_1.collectData,
    "azure": azureGathering_service_1.collectData,
    "gcp": gcpGathering_service_1.collectData,
    "kubernetes": kubernetesGathering_service_1.collectData,
    "github": githubGathering_service_1.collectData,
    "googleDrive": googleDriveGathering_service_1.collectData,
    "googleWorkspace": googleWorkspaceGathering_service_1.collectData,
    "http": httpGathering_service_1.collectData,
    "o365": o365Gathering_service_1.collectData,
};
async function loadAddOns(resources) {
    logger.info("Loading addOns");
    const promises = addOnName.map(async (file) => {
        if (config?.[file]) {
            return await loadAddOn(file);
        }
        return null;
    });
    const results = await Promise.all(promises);
    let addOnShortCollect = [];
    results.forEach((result) => {
        if (!result)
            return;
        if (result?.data) {
            resources[result.key] = result.data;
        }
        logger.debug(`AddOn ${result.key} delta in ${result.delta}ms`);
        if ((result?.delta) ?? 0 > 15) {
            logger.info(`AddOn ${result.key} collect in ${result.delta}ms`);
        }
        else if (result?.delta)
            addOnShortCollect.push(result.key);
    });
    if (addOnShortCollect.length > 0) {
        logger.info(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
    }
    return resources;
}
exports.loadAddOns = loadAddOns;
async function loadAddOn(nameAddOn) {
    try {
        //const { collectData } = await import(`./addOn/${nameAddOn}Gathering.service.js`);
        const collectData = addOnCollect[nameAddOn];
        let start = Date.now();
        const addOnConfig = (configuration.has(nameAddOn)) ? configuration.get(nameAddOn) : null;
        const data = await collectData(addOnConfig);
        logger.info("data collected for " + nameAddOn);
        logger.info(checkIfDataIsProvider(data));
        logger.info(data);
        let delta = Date.now() - start;
        return {
            key: nameAddOn,
            data: data,
            delta
        };
    }
    catch (e) {
        logger.warning(e);
    }
    return null;
}
const addOnNameCustomUtility = {
    "display": [
        "aws",
        "azure",
        "gcp",
        "kubernetes",
        "github",
        "googleDrive",
        "googleWorkspace",
        "http",
        "o365"
    ],
    "save": [
        "amazonS3",
        "azureBlobStorage",
        "mongoDB",
        //"prometheus",
    ],
    "exportation": [
        "azureBlobStorage",
        "mongoDB",
        "mySQL",
    ]
};
const awsDisplay_service_1 = require("./addOn/display/awsDisplay.service");
const azureDisplay_service_1 = require("./addOn/display/azureDisplay.service");
const gcpDisplay_service_1 = require("./addOn/display/gcpDisplay.service");
const kubernetesDisplay_service_1 = require("./addOn/display/kubernetesDisplay.service");
const githubDisplay_service_1 = require("./addOn/display/githubDisplay.service");
const googleDriveDisplay_service_1 = require("./addOn/display/googleDriveDisplay.service");
const googleWorkspaceDisplay_service_1 = require("./addOn/display/googleWorkspaceDisplay.service");
const httpDisplay_service_1 = require("./addOn/display/httpDisplay.service");
const o365Display_service_1 = require("./addOn/display/o365Display.service");
const amazonS3Save_service_1 = require("./addOn/save/amazonS3Save.service");
const azureBlobStorageSave_service_1 = require("./addOn/save/azureBlobStorageSave.service");
const mongoDBSave_service_1 = require("./addOn/save/mongoDBSave.service");
const azureBlobStorageExportation_service_1 = require("./addOn/exportation/azureBlobStorageExportation.service");
const mongoDBExportation_service_1 = require("./addOn/exportation/mongoDBExportation.service");
const mySQLExportation_service_1 = require("./addOn/exportation/mySQLExportation.service");
const addOnCustomUtility = {
    "display": {
        "aws": awsDisplay_service_1.propertyToSend,
        "azure": azureDisplay_service_1.propertyToSend,
        "gcp": gcpDisplay_service_1.propertyToSend,
        "kubernetes": kubernetesDisplay_service_1.propertyToSend,
        "github": githubDisplay_service_1.propertyToSend,
        "googleDrive": googleDriveDisplay_service_1.propertyToSend,
        "googleWorkspace": googleWorkspaceDisplay_service_1.propertyToSend,
        "http": httpDisplay_service_1.propertyToSend,
        "o365": o365Display_service_1.propertyToSend,
    },
    "save": {
        "amazonS3": amazonS3Save_service_1.save,
        "azureBlobStorage": azureBlobStorageSave_service_1.save,
        "mongoDB": mongoDBSave_service_1.save,
        //"prometheus": savePrometheus,
    },
    "exportation": {
        "azureBlobStorage": azureBlobStorageExportation_service_1.exportation,
        "mongoDB": mongoDBExportation_service_1.exportation,
        "mySQL": mySQLExportation_service_1.exportation,
    }
};
function loadAddOnsCustomUtility(usage, funcName, onlyFiles = null) {
    const core = require('@actions/core');
    core.addPath('./config');
    core.addPath('./src');
    core.addPath('./lib');
    let customRules = core.getInput["MYOWNRULES"];
    if (customRules != "NO") {
        (0, manageVarEnvironnement_service_1.setEnvVar)("RULESDIRECTORY", customRules);
    }
    let dictFunc = {};
    const files = addOnNameCustomUtility[usage];
    files.map((file) => {
        if (onlyFiles && !onlyFiles.some((onlyFile) => { return file.includes(onlyFile); }))
            return;
        let result = loadAddOnCustomUtility(file.replace(".ts", ".js"), usage, funcName);
        if (result?.data) {
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}
exports.loadAddOnsCustomUtility = loadAddOnsCustomUtility;
function loadAddOnCustomUtility(file, usage, funcName) {
    try {
        let formatUsage = usage.slice(0, 1).toUpperCase() + usage.slice(1);
        //const moduleExports = require(`./addOn/${usage}/${file}${formatUsage}.service.js`);
        //const funcCall = moduleExports[funcName];
        const funcCall = addOnCustomUtility[usage][file];
        return { key: file, data: funcCall };
    }
    catch (e) {
        logger.warning("Error loading addOn " + file + " : " + e);
    }
    return null;
}
function checkIfDataIsProvider(data) {
    if (data === null || !Array.isArray(data)) {
        return false;
    }
    for (const index in data) {
        if (data[index] === null) {
            return false;
        }
    }
    return true;
}
function hasValidHeader(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let header = {
            provider: '',
            thumbnail: '',
            resources: []
        };
        let hasProvider = false;
        let hasResources = false;
        let hasThumbnail = false;
        let hasDocumentation = false;
        let nextLineIsResources = false;
        let countResources = [];
        for (const line of lines) {
            const trimmedLine = line.trim().replace(" ", "").replace("\t", "");
            if (trimmedLine.startsWith('*Provider')) {
                hasProvider = true;
                header.provider = trimmedLine.split(':')[1];
                continue;
            }
            if (trimmedLine.startsWith('*Thumbnail')) {
                hasThumbnail = true;
                header.thumbnail = trimmedLine.split(':').slice(1).join(':').trim();
                continue;
            }
            if (trimmedLine.startsWith('*Documentation')) {
                header.documentation = trimmedLine.split(':').slice(1).join(':').trim();
                continue;
            }
            if (trimmedLine.startsWith('*Name')) {
                header.customName = trimmedLine.split(':')[1];
                continue;
            }
            if (trimmedLine.startsWith('*Resources')) {
                hasResources = true;
                nextLineIsResources = true;
                continue;
            }
            if (nextLineIsResources) {
                if (/\s*\*\s*-\s*\s*[a-zA-Z0-9]+\s*/.test(trimmedLine)) {
                    countResources.push(trimmedLine.split('-')[1].trim().replace(" ", "").replace("\t", ""));
                    continue;
                }
                nextLineIsResources = false;
                continue;
            }
            if (hasThumbnail && hasProvider && hasResources && countResources.length > 0) {
                header.resources = countResources;
                return header;
            }
        }
        return `Invalid header in ${filePath} file. Please check the header. Have you added the Resources and Provider?`;
    }
    catch (error) {
        return 'Error reading file:' + error;
    }
}
exports.hasValidHeader = hasValidHeader;
async function extractHeaders() {
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file) => {
        return await extractHeader(file);
    });
    const results = await Promise.all(promises);
    let finalData = {};
    results.forEach((result) => {
        if (result?.provider && result?.resources && result?.thumbnail) {
            finalData[result.provider] = {
                "resources": result.resources,
                "thumbnail": result.thumbnail,
                "customName": result.customName,
                "documentation": result.documentation,
                "freeRules": [],
            };
        }
    });
    (0, files_1.writeStringToJsonFile)(JSON.stringify(finalData), "./config/headers.json");
    return finalData;
}
exports.extractHeaders = extractHeaders;
async function extractHeader(file) {
    try {
        if (file.endsWith('Gathering.service.ts')) {
            let nameAddOn = file.split('Gathering.service.ts')[0];
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                return null;
            }
            header.provider = nameAddOn;
            return header;
        }
    }
    catch (e) {
        logger.warning(e);
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUFxRTtBQUNyRSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFeEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQUMvRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIscURBQThDO0FBRTlDLHFGQUF3RTtBQUN4RSwwREFBb0Q7QUFDcEQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBQSx3QkFBUyxHQUFFLENBQUM7QUFFM0IsTUFBTSxTQUFTLEdBQUc7SUFDZCxLQUFLO0lBQ0wsT0FBTztJQUNQLEtBQUs7SUFDTCxZQUFZO0lBQ1osUUFBUTtJQUNSLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsTUFBTTtJQUNOLE1BQU07Q0FDVCxDQUFBO0FBRUQsdUVBQTZFO0FBQzdFLDJFQUFpRjtBQUNqRix1RUFBNkU7QUFDN0UscUZBQTJGO0FBQzNGLDZFQUFtRjtBQUNuRix1RkFBNkY7QUFDN0YsK0ZBQXFHO0FBQ3JHLHlFQUErRTtBQUMvRSx5RUFBK0U7QUFFL0UsTUFBTSxZQUFZLEdBRWQ7SUFDQSxLQUFLLEVBQUUsa0NBQWM7SUFDckIsT0FBTyxFQUFFLG9DQUFnQjtJQUN6QixLQUFLLEVBQUUsa0NBQWM7SUFDckIsWUFBWSxFQUFFLHlDQUFxQjtJQUNuQyxRQUFRLEVBQUUscUNBQWlCO0lBQzNCLGFBQWEsRUFBRSwwQ0FBc0I7SUFDckMsaUJBQWlCLEVBQUUsOENBQTBCO0lBQzdDLE1BQU0sRUFBRSxtQ0FBZTtJ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