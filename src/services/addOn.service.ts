import { Provider, ProviderResource } from "../models/providerResource.models";
import { Header } from "../models/settingFile/header.models";
import { setRealPath, writeStringToJsonFile } from "../helpers/files"
const configuration = require('config');

const mainFolder = 'src';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs');

import {getNewLogger} from "./logger.service";
import { Capacity } from "../models/settingFile/capacity.models";
import { getEnvVar, setEnvVar } from "./manageVarEnvironnement.service";
import { getConfig } from "../helpers/loaderConfig";
const logger = getNewLogger("LoaderAddOnLogger");
const config = getConfig();

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
]

import { collectData as AWScollectData}  from "./addOn/awsGathering.service";
import { collectData as AzurecollectData}  from "./addOn/azureGathering.service";
import { collectData as GCPcollectData}  from "./addOn/gcpGathering.service";
import { collectData as KubernetescollectData}  from "./addOn/kubernetesGathering.service";
import { collectData as GithubcollectData}  from "./addOn/githubGathering.service";
import { collectData as GoogleDrivecollectData}  from "./addOn/googleDriveGathering.service";
import { collectData as GoogleWorkspacecollectData}  from "./addOn/googleWorkspaceGathering.service";
import { collectData as HttpcollectData}  from "./addOn/httpGathering.service";
import { collectData as O365collectData}  from "./addOn/o365Gathering.service";

const addOnCollect:{
    [key: string]: Function;
} = {
    "aws": AWScollectData,
    "azure": AzurecollectData,
    "gcp": GCPcollectData,
    "kubernetes": KubernetescollectData,
    "github": GithubcollectData,
    "googleDrive": GoogleDrivecollectData,
    "googleWorkspace": GoogleWorkspacecollectData,
    "http": HttpcollectData,
    "o365": O365collectData,
}


export async function loadAddOns(resources: ProviderResource, settingFileList:SettingFile[]): Promise<ProviderResource>{
    logger.info("Loading addOns");
    const addOnNeed = extractAddOnNeed(settingFileList);
    const promises = addOnName.map(async (file: string) => {
        if(config?.[file]){
            return await loadAddOn(file, addOnNeed);
        }
        return null;
    });
    const results:any = await Promise.all(promises);
    let addOnShortCollect: string[] = [];
    results.forEach((result: { key: string; data: Provider[]; delta: number }) => {
        if(!result) return;
        if (result?.data) {
            resources[result.key] = result.data;
        }
        logger.debug(`AddOn ${result.key} delta in ${result.delta}ms`)
        if((result?.delta)??0 > 15){
            logger.info(`AddOn ${result.key} collect in ${result.delta}ms`);
        }else if(result?.delta) addOnShortCollect.push(result.key);
    });
    if(addOnShortCollect.length > 0){
        logger.info(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
    }
    return resources;
}

function extractAddOnNeed(settingFileList: SettingFile[]){
    let providerList = new Array<string>();
    let objectNameList:any = {};
    settingFileList.forEach((ruleFile) => {
        objectNameList[ruleFile.alert.global.name] = {};
        ruleFile.rules.forEach((rule: Rules) => {
            if(rule.applied === false) return;
            if(!providerList.includes(rule.cloudProvider)) providerList.push(rule.cloudProvider);
            if(!objectNameList[ruleFile.alert.global.name][rule.cloudProvider]) objectNameList[ruleFile.alert.global.name][rule.cloudProvider] = new Array<string>();
            if(!objectNameList[ruleFile.alert.global.name][rule.cloudProvider].includes(rule.objectName)) objectNameList[ruleFile.alert.global.name][rule.cloudProvider].push(rule.objectName);
        });
    });
    return { "addOn" : providerList, "objectNameNeed": objectNameList };
}

async function loadAddOn(nameAddOn: string, addOnNeed:{addOn: string[];objectNameNeed: any;}): Promise<{ key: string; data: Provider|null; delta: number } | null> {
    try{
        //const { collectData } = await import(`./addOn/${nameAddOn}Gathering.service.js`);
        const collectData = addOnCollect[nameAddOn];
        let start = Date.now();
        const addOnConfig = (configuration.has(nameAddOn))?configuration.get(nameAddOn):null;
        addOnConfig?.forEach((config: any) => {
            config.ObjectNameNeed = []
            config.rules.forEach((rulesName: string) => {
                let addOnNeedRules = addOnNeed["objectNameNeed"][rulesName];
                if(addOnNeedRules){
                    addOnNeedRules = addOnNeedRules[nameAddOn];
                    if(addOnNeedRules){
                        config.ObjectNameNeed = [...config.ObjectNameNeed, ...addOnNeedRules];
                    }
                }
            });
        });
        const data = await collectData(addOnConfig);
        let delta = Date.now() - start;
        return { 
            key: nameAddOn,
            data:data, // (checkIfDataIsProvider(data) ? data : null)
            delta
        };
    }catch(e:any){
        logger.warning(e);
    }
    return null;
}

const addOnNameCustomUtility:{ [key: string]: string[]; } = {
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
}

import { propertyToSend as displayAWS}  from "./addOn/display/awsDisplay.service";
import { propertyToSend as displayAzure}  from "./addOn/display/azureDisplay.service";
import { propertyToSend as displayGCP}  from "./addOn/display/gcpDisplay.service";
import { propertyToSend as displayKubernetes}  from "./addOn/display/kubernetesDisplay.service";
import { propertyToSend as displayGithub}  from "./addOn/display/githubDisplay.service";
import { propertyToSend as displayGoogleDrive}  from "./addOn/display/googleDriveDisplay.service";
import { propertyToSend as displayGoogleWorkspace}  from "./addOn/display/googleWorkspaceDisplay.service";
import { propertyToSend as displayHttp}  from "./addOn/display/httpDisplay.service";
import { propertyToSend as displayO365}  from "./addOn/display/o365Display.service";
import { save as saveAmazonS3}  from "./addOn/save/amazonS3Save.service";
import { save as saveAzureBlobStorage}  from "./addOn/save/azureBlobStorageSave.service";
import { save as saveMongoDB}  from "./addOn/save/mongoDBSave.service";
import { exportation as exportAzureBlobStorage}  from "./addOn/exportation/azureBlobStorageExportation.service";
import { exportation as exportMongoDB}  from "./addOn/exportation/mongoDBExportation.service";
import { exportation as exportMySQL}  from "./addOn/exportation/mySQLExportation.service";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { Rules } from "../models/settingFile/rules.models";

const addOnCustomUtility: {
    [key: string]: { [key: string]: Function; };
} = {
    "display": {
        "aws": displayAWS,
        "azure": displayAzure,
        "gcp": displayGCP,
        "kubernetes": displayKubernetes,
        "github": displayGithub,
        "googleDrive": displayGoogleDrive,
        "googleWorkspace": displayGoogleWorkspace,
        "http": displayHttp,
        "o365": displayO365,
    },
    "save": {
        "amazonS3": saveAmazonS3,
        "azureBlobStorage": saveAzureBlobStorage,
        "mongoDB": saveMongoDB,
        //"prometheus": savePrometheus,
    },
    "exportation": {
        "azureBlobStorage": exportAzureBlobStorage,
        "mongoDB": exportMongoDB,
        "mySQL": exportMySQL,
    }
}

export function loadAddOnsCustomUtility(usage: string, funcName:string, onlyFiles: string[]|null = null) : { [key: string]: Function; }{
    const core = require('@actions/core');
    core.addPath('./config');
    core.addPath('./src');
    core.addPath('./lib');
    let customRules =core.getInput["MYOWNRULES"];
    if(customRules != "NO"){
        setEnvVar("RULESDIRECTORY", customRules);
    }
    let dictFunc: { [key: string]: Function; } = {};
    const files = addOnNameCustomUtility[usage]
    files.map((file: string) => {
        if(onlyFiles && !onlyFiles.some((onlyFile:string) => {return file.includes(onlyFile)})) return;
        let result = loadAddOnCustomUtility(file.replace(".ts", ".js"), usage, funcName);
        if(result?.data){
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}

function loadAddOnCustomUtility(file: string, usage: string, funcName:string): { key: string; data: Function; } | null {
    try{
        let formatUsage = usage.slice(0,1).toUpperCase() + usage.slice(1);
        //const moduleExports = require(`./addOn/${usage}/${file}${formatUsage}.service.js`);
        //const funcCall = moduleExports[funcName];
        const funcCall = addOnCustomUtility[usage][file];
        return { key: file, data:funcCall};
    }catch(e){
        logger.warning("Error loading addOn " + file + " : " + e);
    }
    return null;
}

function checkIfDataIsProvider(data: any): data is Provider {
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

export function hasValidHeader(filePath: string): string | Header {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let header:Header = {
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

            if(hasThumbnail && hasProvider && hasResources && countResources.length > 0) {
                header.resources = countResources;
                return header;
            }
        }

        return `Invalid header in ${filePath} file. Please check the header. Have you added the Resources and Provider?`;
    } catch (error) {
        return 'Error reading file:' + error;
    }
}

export async function extractHeaders(): Promise<Capacity>{
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file: string) => {
        return await extractHeader(file);
    });
    const results = await Promise.all(promises);
    let finalData:any = {};
    results.forEach((result: Header | null) => {
        if(result?.provider && result?.resources && result?.thumbnail){
            finalData[result.provider] = {
                "resources": result.resources,
                "thumbnail": result.thumbnail,
                "customName": result.customName,
                "documentation": result.documentation,
                "freeRules": [],
            };
        }
    });
    writeStringToJsonFile(JSON.stringify(finalData), "./config/headers.json");
    return finalData;
}

async function extractHeader(file: string): Promise<Header|null> {
    try{
        if (file.endsWith('Gathering.service.ts')){
            let nameAddOn = file.split('Gathering.service.ts')[0];
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                return null;
            }
            header.provider = nameAddOn;
            return header;
        }
    }catch(e:any){
        logger.warning(e);
    }
    return null;
}