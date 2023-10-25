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
exports.extractHeaders = exports.hasValidHeader = exports.loadAddOnsDisplay = exports.loadAddOns = void 0;
const files_1 = require("../helpers/files");
const configuration = require('config');
const mainFolder = 'src';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs');
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("LoaderAddOnLogger");
async function loadAddOns(resources) {
    logger.info("Loading addOns");
    const addOnNeed = require('../../config/addOnNeed.json');
    logger.info(fs.readdirSync("./src"));
    logger.info(fs.readdirSync("./src/services"));
    logger.info(fs.readdirSync("./src/services/addOn"));
    logger.info(fs.readdirSync("./src/services/addOn/display"));
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file) => {
        return await loadAddOn(file, addOnNeed);
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
async function loadAddOn(file, addOnNeed) {
    var _a;
    try {
        if (file.endsWith('Gathering.service.ts')) {
            let nameAddOn = file.split('Gathering.service.ts')[0];
            if (!addOnNeed["addOn"].includes(nameAddOn))
                return null;
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                return null;
            }
            const { collectData } = await (_a = `./addOn/${file.replace(".ts", ".js")}`, Promise.resolve().then(() => __importStar(require(_a))));
            let start = Date.now();
            const addOnConfig = (configuration.has(nameAddOn)) ? configuration.get(nameAddOn) : null;
            const data = await collectData(addOnConfig);
            let delta = Date.now() - start;
            logger.info(`AddOn ${nameAddOn} collect in ${delta}ms`);
            return { key: nameAddOn, data: (checkIfDataIsProvider(data) ? data : null) };
        }
    }
    catch (e) {
        logger.warning(e);
    }
    return null;
}
function loadAddOnsDisplay() {
    let dictFunc = {};
    const files = fs.readdirSync(serviceAddOnPath + "/display");
    files.map((file) => {
        let result = loadAddOnDisplay(file.replace(".ts", ".js"));
        if (result?.data) {
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}
exports.loadAddOnsDisplay = loadAddOnsDisplay;
function loadAddOnDisplay(file) {
    try {
        if (file.endsWith('Display.service.js')) {
            let nameAddOn = file.split('Display.service.js')[0];
            const moduleExports = require(`./addOn/display/${nameAddOn}Display.service.js`);
            const displayFn = moduleExports.propertyToSend;
            return { key: nameAddOn, data: displayFn };
        }
    }
    catch (e) {
        logger.warning(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNENBQXdEO0FBQ3hELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixDQUFDO0FBQy9ELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixxREFBOEM7QUFFOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFMUMsS0FBSyxVQUFVLFVBQVUsQ0FBQyxTQUEyQjtJQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7SUFDNUQsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENB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