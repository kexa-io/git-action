"use strict";
/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - vm
    *     - rg
    *     - disk
    *     - nsg
    *     - virtualNetwork
    *     - networkInterfaces
    *     - aks
*/
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
exports.networkSecurityGroup_analyse = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.aksListing = exports.ipListing = exports.getSPKeyInformation = exports.collectData = void 0;
const arm_network_1 = require("@azure/arm-network");
const arm_compute_1 = require("@azure/arm-compute");
const arm_resources_1 = require("@azure/arm-resources");
const ckiNetworkSecurityClass = __importStar(require("../../class/azure/ckiNetworkSecurityGroup.class"));
const identity_1 = require("@azure/identity");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
///////////////////////////////////////////////////////////////////////////////////////////////////////
const { ContainerServiceClient } = require("@azure/arm-containerservice");
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("AzureLogger");
let computeClient;
let resourcesClient;
let networkClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectData(azureConfig) {
    let resources = new Array();
    for (let config of azureConfig ?? []) {
        let azureResource = {
            "vm": null,
            "rg": null,
            "disk": null,
            "nsg": null,
            "virtualNetwork": null,
            "networkInterfaces": null,
            "aks": null,
        };
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix ?? (azureConfig.indexOf(config) + "-");
        try {
            logger.debug("prefix: " + prefix);
            let subscriptionId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTID", prefix);
            if (azureClientId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_ID", azureClientId);
            else
                logger.warn(prefix + "AZURECLIENTID not found in config file");
            let azureClientSecret = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTSECRET", prefix);
            if (azureClientSecret)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_SECRET", azureClientSecret);
            else
                logger.warn(prefix + "AZURECLIENTSECRET not found in config file");
            let azureTenantId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURETENANTID", prefix);
            if (azureTenantId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_TENANT_ID", azureTenantId);
            else
                logger.warn(prefix + "AZURETENANTID not found in config file");
            const credential = new identity_1.DefaultAzureCredential();
            if (!subscriptionId) {
                throw new Error("- Please pass " + prefix + "SUBSCRIPTIONID in your config file");
            }
            else {
                //getting clients for azure
                resourcesClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
                computeClient = new arm_compute_1.ComputeManagementClient(credential, subscriptionId);
                networkClient = new arm_network_1.NetworkManagementClient(credential, subscriptionId);
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
                const promises = [
                    networkSecurityGroupListing(networkClient),
                    virtualMachinesListing(computeClient),
                    resourceGroupListing(resourcesClient),
                    disksListing(computeClient),
                    virtualNetworksListing(networkClient),
                    aksListing(credential, subscriptionId),
                    ipListing(networkClient),
                    //getSPKeyInformation(credential, subscriptionId)
                ];
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, aksList, ipList] = await Promise.all(promises); //, SPList
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"] ?? [], ...vmList],
                    "rg": [...azureResource["rg"] ?? [], ...rgList],
                    "disk": [...azureResource["disk"] ?? [], ...diskList],
                    "nsg": [...azureResource["nsg"] ?? [], ...nsgList],
                    "virtualNetwork": [...azureResource["virtualNetwork"] ?? [], ...virtualNetworkList],
                    "aks": [...azureResource["aks"] ?? [], ...aksList],
                    "ip": [...azureResource["ip"] ?? [], ...ipList],
                    //"sp": [...azureResource["sp"]??[], ...SPList],
                };
            }
        }
        catch (e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix)) ?? null);
            logger.error(e);
        }
        resources.push(azureResource);
    }
    return resources ?? null;
}
exports.collectData = collectData;
//get service principal key information
async function getSPKeyInformation(credential, subscriptionId) {
    const { GraphRbacManagementClient } = require("@azure/graph");
    logger.info("starting getSPKeyInformation");
    try {
        const client = new GraphRbacManagementClient(credential, subscriptionId);
        const resultList = new Array;
        for await (const item of client.servicePrincipals.list('')) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in getSPKeyInformation:" + err);
        return null;
    }
}
exports.getSPKeyInformation = getSPKeyInformation;
//ip list
async function ipListing(client) {
    logger.info("starting ipListing");
    try {
        const resultList = new Array;
        for await (const item of client.publicIPAddresses.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (e) {
        logger.error("error in ipListing:" + e);
        return null;
    }
}
exports.ipListing = ipListing;
//aks list
async function aksListing(credential, subscriptionId) {
    logger.info("starting aksListing");
    try {
        const client = new ContainerServiceClient(credential, subscriptionId);
        const resArray = new Array();
        for await (let item of client.managedClusters.list()) {
            resArray.push(item);
        }
        return resArray;
    }
    catch (e) {
        logger.error("error in aksListing:" + e);
        return null;
    }
}
exports.aksListing = aksListing;
//network security group list
async function networkSecurityGroupListing(client) {
    logger.info("starting networkSecurityGroupListing");
    try {
        const resultList = new Array;
        for await (const item of client.networkSecurityGroups.listAll()) {
            resultList.push(item);
        }
        logger.info("ended networkSecurityGroupListing");
        return resultList;
    }
    catch (err) {
        logger.error("error in networkSecurityGroupListing:" + err);
        return null;
    }
}
exports.networkSecurityGroupListing = networkSecurityGroupListing;
//virtual network list
async function virtualNetworksListing(client) {
    logger.info("starting virtualNetworksListing");
    try {
        const resultList = new Array;
        for await (const item of client.virtualNetworks.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in virtualNetworksListing:" + err);
        return null;
    }
}
exports.virtualNetworksListing = virtualNetworksListing;
//network list
async function networkInterfacesListing(client) {
    logger.info("starting networkInterfacesListing");
    try {
        const resultList = new Array;
        for await (const item of client.networkInterfaces.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in networkInterfacesListing:" + err);
        return null;
    }
}
exports.networkInterfacesListing = networkInterfacesListing;
//disks.list
async function disksListing(client) {
    logger.info("starting disksListing");
    try {
        const resultList = new Array;
        for await (const item of client.disks.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in disksListing:" + err);
        return null;
    }
}
exports.disksListing = disksListing;
//virtualMachines.listAll
async function virtualMachinesListing(client) {
    logger.info("starting virtualMachinesListing");
    try {
        const resultList = new Array;
        for await (let item of client.virtualMachines.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in virtualMachinesListing:" + err);
        return null;
    }
}
exports.virtualMachinesListing = virtualMachinesListing;
//resourceGroups.list
async function resourceGroupListing(client) {
    logger.info("starting resourceGroupListing");
    try {
        const resultList = new Array;
        for await (let item of client.resourceGroups.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in resourceGroupListing:" + err);
        return null;
    }
}
exports.resourceGroupListing = resourceGroupListing;
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function networkSecurityGroup_analyse(nsgList) {
    try {
        const resultList = new Array;
        for await (let item of nsgList) {
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed = true;
            nsgAnalysed.scanningDate = new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel = 0;
            //check default rules
            resultList.push(nsgAnalysed);
        }
        return resultList;
    }
    catch (e) {
        logger.error("error" + e);
        return null;
    }
}
exports.networkSecurityGroup_analyse = networkSecurityGroup_analyse;
//# sourceMappingURL=azureGathering.service.js.map