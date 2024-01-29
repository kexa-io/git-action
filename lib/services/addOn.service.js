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
    var _a;
    try {
        const { collectData } = await (_a = `./addOn/${nameAddOn}Gathering.service.js`, Promise.resolve().then(() => __importStar(require(_a))));
        let start = Date.now();
        const addOnConfig = (configuration.has(nameAddOn)) ? configuration.get(nameAddOn) : null;
        const data = await collectData(addOnConfig);
        let delta = Date.now() - start;
        return { key: nameAddOn, data: (checkIfDataIsProvider(data) ? data : null), delta };
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
        "prometheus",
    ],
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
        const moduleExports = require(`./addOn/${usage}/${file}${formatUsage}.service.js`);
        const funcCall = moduleExports[funcName];
        return { key: file, data: funcCall };
    }
    catch (e) {
        logger.warn("Error loading addOn " + file + " : " + e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNENBQXFFO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixDQUFDO0FBQy9ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixxREFBOEM7QUFFOUMscUZBQXdFO0FBQ3hFLDBEQUFvRDtBQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFTLEdBQUUsQ0FBQztBQUUzQixNQUFNLFNBQVMsR0FBRztJQUNkLEtBQUs7SUFDTCxPQUFPO0lBQ1AsS0FBSztJQUNMLFlBQVk7SUFDWixRQUFRO0lBQ1IsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixNQUFNO0lBQ04sTUFBTTtDQUNULENBQUE7QUFFTSxLQUFLLFVBQVUsVUFBVSxDQUFDLFNBQTJCO0lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtRQUNsRCxJQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ2QsT0FBTyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQU8sTUFBTSxPQUFP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