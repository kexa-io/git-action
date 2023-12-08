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
    *     - mlWorkspace
    *     - mlJobs
    *     - mlComputes
    *     - mlSchedule
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
exports.schedulesListing = exports.computeOperationsListing = exports.jobsListing = exports.mlListing = exports.networkSecurityGroup_analyze = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.aksListing = exports.ipListing = exports.getSPKeyInformation = exports.collectData = void 0;
const arm_network_1 = require("@azure/arm-network");
const arm_compute_1 = require("@azure/arm-compute");
const arm_resources_1 = require("@azure/arm-resources");
const arm_machinelearning_1 = require("@azure/arm-machinelearning");
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
let currentConfig;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectData(azureConfig) {
    let resources = new Array();
    for (let config of azureConfig ?? []) {
        currentConfig = config;
        let azureResource = {
            "vm": null,
            "rg": null,
            "disk": null,
            "nsg": null,
            "virtualNetwork": null,
            "networkInterfaces": null,
            "aks": null,
            "mlWorkspaces": null,
            "mlJobs": null,
            "mlComputes": null,
            "mlSchedules": null,
        };
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix ?? (azureConfig.indexOf(config).toString());
        try {
            logger.debug("prefix: " + prefix);
            let subscriptionId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTID", prefix);
            if (azureClientId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_ID", azureClientId);
            else
                logger.warning(prefix + "AZURECLIENTID not found");
            let azureClientSecret = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTSECRET", prefix);
            if (azureClientSecret)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_SECRET", azureClientSecret);
            else
                logger.warning(prefix + "AZURECLIENTSECRET not found");
            let azureTenantId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURETENANTID", prefix);
            if (azureTenantId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_TENANT_ID", azureTenantId);
            else
                logger.warning(prefix + "AZURETENANTID not found");
            let UAI = {};
            let useAzureIdentity = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "USERAZUREIDENTITYID", prefix);
            if (useAzureIdentity)
                UAI = { managedIdentityClientId: useAzureIdentity };
            const credential = new identity_1.DefaultAzureCredential(UAI);
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
                    mlListing(credential, subscriptionId),
                    //getSPKeyInformation(credential, subscriptionId)
                ];
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, aksList, ipList, mlList] = await Promise.all(promises); //, SPList
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"] ?? [], ...vmList ?? []],
                    "rg": [...azureResource["rg"] ?? [], ...rgList ?? []],
                    "disk": [...azureResource["disk"] ?? [], ...diskList ?? []],
                    "nsg": [...azureResource["nsg"] ?? [], ...nsgList ?? []],
                    "virtualNetwork": [...azureResource["virtualNetwork"] ?? [], ...virtualNetworkList ?? []],
                    "aks": [...azureResource["aks"] ?? [], ...aksList ?? []],
                    "ip": [...azureResource["ip"] ?? [], ...ipList ?? []],
                    "mlWorkspaces": [...azureResource["mlWorkspaces"] ?? [], ...mlList?.workspaces ?? []],
                    "mlJobs": [...azureResource["mlJobs"] ?? [], ...mlList?.jobs ?? []],
                    "mlComputes": [...azureResource["mlComputes"] ?? [], ...mlList?.computes ?? []],
                    "mlSchedules": [...azureResource["mlSchedules"] ?? [], ...mlList?.schedule ?? []],
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
    if (!currentConfig.ObjectNameNeed?.includes("sp"))
        return null;
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
        logger.debug("error in getSPKeyInformation:" + err);
        return null;
    }
}
exports.getSPKeyInformation = getSPKeyInformation;
//ip list
async function ipListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("ip"))
        return null;
    logger.info("starting ipListing");
    try {
        const resultList = new Array;
        for await (const item of client.publicIPAddresses.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (e) {
        logger.debug("error in ipListing:" + e);
        return null;
    }
}
exports.ipListing = ipListing;
//aks list
async function aksListing(credential, subscriptionId) {
    if (!currentConfig.ObjectNameNeed?.includes("aks"))
        return null;
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
        logger.debug("error in aksListing:" + e);
        return null;
    }
}
exports.aksListing = aksListing;
//network security group list
async function networkSecurityGroupListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("nsg"))
        return null;
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
        logger.debug("error in networkSecurityGroupListing:" + err);
        return null;
    }
}
exports.networkSecurityGroupListing = networkSecurityGroupListing;
//virtual network list
async function virtualNetworksListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("virtualNetwork"))
        return null;
    logger.info("starting virtualNetworksListing");
    try {
        const resultList = new Array;
        for await (const item of client.virtualNetworks.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.debug("error in virtualNetworksListing:" + err);
        return null;
    }
}
exports.virtualNetworksListing = virtualNetworksListing;
//network list
async function networkInterfacesListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("networkInterfaces"))
        return null;
    logger.info("starting networkInterfacesListing");
    try {
        const resultList = new Array;
        for await (const item of client.networkInterfaces.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.debug("error in networkInterfacesListing:" + err);
        return null;
    }
}
exports.networkInterfacesListing = networkInterfacesListing;
//disks.list
async function disksListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("disk"))
        return null;
    logger.info("starting disksListing");
    try {
        const resultList = new Array;
        for await (const item of client.disks.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.debug("error in disksListing:" + err);
        return null;
    }
}
exports.disksListing = disksListing;
//virtualMachines.listAll
async function virtualMachinesListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("vm"))
        return null;
    logger.info("starting virtualMachinesListing");
    try {
        const resultList = new Array;
        for await (let item of client.virtualMachines.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.debug("error in virtualMachinesListing:" + err);
        return null;
    }
}
exports.virtualMachinesListing = virtualMachinesListing;
async function resourceGroupListing(client) {
    if (!currentConfig.ObjectNameNeed?.includes("rg"))
        return null;
    logger.info("starting resourceGroupListing");
    try {
        const resultList = new Array;
        for await (let item of client.resourceGroups.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.debug("error in resourceGroupListing:" + err);
        return null;
    }
}
exports.resourceGroupListing = resourceGroupListing;
async function networkSecurityGroup_analyze(nsgList) {
    if (!currentConfig.ObjectNameNeed?.includes("nsg_analyze"))
        return null;
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
        logger.debug("error" + e);
        return null;
    }
}
exports.networkSecurityGroup_analyze = networkSecurityGroup_analyze;
async function mlListing(credential, subscriptionId) {
    if (!currentConfig.ObjectNameNeed?.includes("mlWorkspaces")
        && !currentConfig.ObjectNameNeed?.includes("mlJobs")
        && !currentConfig.ObjectNameNeed?.includes("mlComputes")
        && !currentConfig.ObjectNameNeed?.includes("mlSchedules"))
        return null;
    logger.info("starting mlListing");
    try {
        const client = new arm_machinelearning_1.AzureMachineLearningWorkspaces(credential, subscriptionId);
        const result = {
            "workspaces": new Array(),
            "jobs": new Array(),
            "computes": new Array(),
            "schedule": new Array(),
        };
        for await (let item of client.workspaces.listBySubscription()) {
            result.workspaces = [...result.workspaces ?? [], item];
            let resourceGroupName = item?.id?.split("/")[4] ?? "";
            let workspaceName = item?.name ?? "";
            const promises = [
                jobsListing(client, resourceGroupName, workspaceName),
                computeOperationsListing(client, resourceGroupName, workspaceName),
                schedulesListing(client, resourceGroupName, workspaceName),
            ];
            const [jobsList, computeOperationsList, schedulesList] = await Promise.all(promises);
            result.jobs = [...result.jobs ?? [], ...jobsList];
            result.computes = [...result.computes ?? [], ...computeOperationsList];
            result.schedule = [...result.schedule ?? [], ...schedulesList];
        }
        return result;
    }
    catch (e) {
        logger.debug("error in mlListing:" + e);
        return null;
    }
}
exports.mlListing = mlListing;
async function jobsListing(client, resourceGroupName, workspaceName) {
    if (!currentConfig.ObjectNameNeed?.includes("mlJobs"))
        return [];
    //logger.info("starting jobsListing");
    try {
        const resArray = new Array();
        for await (let item of client.jobs.list(resourceGroupName, workspaceName)) {
            let result = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(result);
        }
        return resArray;
    }
    catch (e) {
        logger.debug("error in jobsListing:" + e);
        return [];
    }
}
exports.jobsListing = jobsListing;
async function computeOperationsListing(client, resourceGroupName, workspaceName) {
    if (!currentConfig.ObjectNameNeed?.includes("mlComputes"))
        return [];
    //logger.info("starting computeOperationsListing");
    try {
        const resArray = new Array();
        for await (let item of client.computeOperations.list(resourceGroupName, workspaceName)) {
            let result = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(item);
        }
        return resArray;
    }
    catch (e) {
        logger.debug("error in computeOperationsListing:" + e);
        return [];
    }
}
exports.computeOperationsListing = computeOperationsListing;
async function schedulesListing(client, resourceGroupName, workspaceName) {
    if (!currentConfig.ObjectNameNeed?.includes("mlSchedules"))
        return [];
    //logger.info("starting schedulesListing");
    try {
        const resArray = new Array();
        for await (let item of client.schedules.list(resourceGroupName, workspaceName)) {
            let result = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(item);
        }
        return resArray;
    }
    catch (e) {
        logger.debug("error in schedulesListing:" + e);
        return [];
    }
}
exports.schedulesListing = schedulesListing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9henVyZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG9EQUs0QjtBQUM1QixvREFBbUY7QUFDbkYsd0RBQWdGO0FBQ2hGLG9FQUE0RTtBQUM1RSx5R0FBMkY7QUFFM0YsOENBQXlEO0FBQ3pELHNGQUFpRjtBQUdqRix1R0FBdUc7QUFDdkcsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFFMUUsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxhQUFhLENBQUMsQ0FBQztBQUUzQyxJQUFJLGFBQXNDLENBQUM7QUFDM0MsSUFBSSxlQUEwQyxDQUFFO0FBQ2hELElBQUksYUFBc0MsQ0FBQztBQUMzQyxJQUFJLGFBQTBCLENBQUM7QUFDL0Isd0dBQXdHO0FBQ3hHLDRCQUE0QjtBQUM1Qix3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxXQUF5QjtJQUN2RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztJQUM1QyxLQUFJLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBRSxFQUFFLEVBQUM7UUFDOUIsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLGFBQWEsR0FBRztZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtZQUNYLGNBQWMsRUFBRSxJQUFJO1lB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