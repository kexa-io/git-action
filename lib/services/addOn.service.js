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
const logger = (0, logger_service_1.getNewLogger)("LoaderAddOnLogger");
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
        return await loadAddOn(file);
    });
    const results = await Promise.all(promises);
    results.forEach((result) => {
        if (result?.data) {
            resources[result.key] = result.data;
        }
    });
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
        logger.info(`AddOn ${nameAddOn} collect in ${delta}ms`);
        return { key: nameAddOn, data: (checkIfDataIsProvider(data) ? data : null) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNENBQXFFO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixDQUFDO0FBQy9ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixxREFBOEM7QUFFOUMscUZBQXdFO0FBQ3hFLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQU0sU0FBUyxHQUFHO0lBQ2QsS0FBSztJQUNMLE9BQU87SUFDUCxLQUFLO0lBQ0wsWUFBWTtJQUNaLFFBQVE7SUFDUixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLE1BQU07SUFDTixNQUFNO0NBQ1QsQ0FBQTtBQUVNLEtBQUssVUFBVSxVQUFVLENBQUMsU0FBMkI7SUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO1FBQ2xELE9BQU8sTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLE9BQU8sR0FBTyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQTBDLEVBQUUsRUFBRTtRQUMzRCxJQUFJLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDZCxTQUFTLENB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