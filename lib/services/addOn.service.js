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
const jsonStringify_1 = require("../helpers/jsonStringify");
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
async function loadAddOns(resources, settingFileList) {
    logger.info("Loading addOns");
    const addOnNeed = extractAddOnNeed(settingFileList);
    const promises = addOnName.map(async (file) => {
        if (config?.[file]) {
            return await loadAddOn(file, addOnNeed);
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
function extractAddOnNeed(settingFileList) {
    let providerList = new Array();
    let objectNameList = {};
    settingFileList.forEach((ruleFile) => {
        objectNameList[ruleFile.alert.global.name] = {};
        ruleFile.rules.forEach((rule) => {
            if (rule.applied === false)
                return;
            if (!providerList.includes(rule.cloudProvider))
                providerList.push(rule.cloudProvider);
            if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider])
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider] = new Array();
            if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider].includes(rule.objectName))
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider].push(rule.objectName);
        });
    });
    return { "addOn": providerList, "objectNameNeed": objectNameList };
}
async function loadAddOn(nameAddOn, addOnNeed) {
    try {
        //const { collectData } = await import(`./addOn/${nameAddOn}Gathering.service.js`);
        const collectData = addOnCollect[nameAddOn];
        let start = Date.now();
        const addOnConfig = (configuration.has(nameAddOn)) ? configuration.get(nameAddOn) : null;
        addOnConfig?.forEach((config) => {
            config.ObjectNameNeed = [];
            config.rules.forEach((rulesName) => {
                let addOnNeedRules = addOnNeed["objectNameNeed"][rulesName];
                if (addOnNeedRules) {
                    addOnNeedRules = addOnNeedRules[nameAddOn];
                    if (addOnNeedRules) {
                        config.ObjectNameNeed = [...config.ObjectNameNeed, ...addOnNeedRules];
                    }
                }
            });
        });
        const data = await collectData(addOnConfig);
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
    (0, files_1.writeStringToJsonFile)((0, jsonStringify_1.jsonStringify)(finalData), "./config/headers.json");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUFxRTtBQUNyRSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFeEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQUMvRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIscURBQThDO0FBRTlDLHFGQUF3RTtBQUN4RSwwREFBb0Q7QUFDcEQsNERBQXlEO0FBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUEsd0JBQVMsR0FBRSxDQUFDO0FBRTNCLE1BQU0sU0FBUyxHQUFHO0lBQ2QsS0FBSztJQUNMLE9BQU87SUFDUCxLQUFLO0lBQ0wsWUFBWTtJQUNaLFFBQVE7SUFDUixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLE1BQU07SUFDTixNQUFNO0NBQ1QsQ0FBQTtBQUVELHVFQUE2RTtBQUM3RSwyRUFBaUY7QUFDakYsdUVBQTZFO0FBQzdFLHFGQUEyRjtBQUMzRiw2RUFBbUY7QUFDbkYsdUZBQTZGO0FBQzdGLCtGQUFxRztBQUNyRyx5RUFBK0U7QUFDL0UseUVBQStFO0FBRS9FLE1BQU0sWUFBWSxHQUVkO0lBQ0EsS0FBSyxFQUFFLGtDQUFjO0lBQ3JCLE9BQU8sRUFBRSxvQ0FBZ0I7SUFDekIsS0FBSyxFQUFFLGtDQUFjO0lBQ3JCLFlBQVksRUFBRSx5Q0FBcUI7SUFDbkMsUUFBUSxFQUFFLHFDQUFpQjtJQUMzQixhQUFhLEVBQUUsMENBQXNCO0lBQ3JDLGlCQUFpQixFQUFFLDhDQUEwQjtJQUM3QyxNQUFN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