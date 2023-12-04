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
exports.schedulesListing = exports.computeOperationsListing = exports.jobsListing = exports.mlListing = exports.networkSecurityGroup_analyse = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.aksListing = exports.ipListing = exports.getSPKeyInformation = exports.collectData = void 0;
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
                    "mlWorkspaces": [...azureResource["mlWorkspaces"] ?? [], ...mlList.workspaces ?? []],
                    "mlJobs": [...azureResource["mlJobs"] ?? [], ...mlList.jobs ?? []],
                    "mlComputes": [...azureResource["mlComputes"] ?? [], ...mlList.computes ?? []],
                    "mlSchedules": [...azureResource["mlSchedules"] ?? [], ...mlList.schedule ?? []],
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
        logger.debug("error in getSPKeyInformation:" + err);
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
        logger.debug("error in ipListing:" + e);
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
        logger.debug("error in aksListing:" + e);
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
        logger.debug("error in networkSecurityGroupListing:" + err);
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
        logger.debug("error in virtualNetworksListing:" + err);
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
        logger.debug("error in networkInterfacesListing:" + err);
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
        logger.debug("error in disksListing:" + err);
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
        logger.debug("error in virtualMachinesListing:" + err);
        return null;
    }
}
exports.virtualMachinesListing = virtualMachinesListing;
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
        logger.debug("error in resourceGroupListing:" + err);
        return null;
    }
}
exports.resourceGroupListing = resourceGroupListing;
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
        logger.debug("error" + e);
        return null;
    }
}
exports.networkSecurityGroup_analyse = networkSecurityGroup_analyse;
const arm_machinelearning_1 = require("@azure/arm-machinelearning");
async function mlListing(credential, subscriptionId) {
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
            logger.error("jobsList: " + JSON.stringify(jobsList));
            logger.error("computeOperationsList: " + JSON.stringify(computeOperationsList));
            logger.error("schedulesList: " + JSON.stringify(schedulesList));
            result.jobs = [...result.jobs ?? [], ...jobsList];
            result.computes = [...result.computes ?? [], ...computeOperationsList];
            result.schedule = [...result.schedule ?? [], ...schedulesList];
            logger.error("RESULT0: ");
            logger.error("RESULT0: " + JSON.stringify(result));
        }
        logger.error("RESULT1: " + JSON.stringify(result));
        return result;
    }
    catch (e) {
        logger.debug("error in mlListing:" + e);
        return null;
    }
}
exports.mlListing = mlListing;
async function jobsListing(client, resourceGroupName, workspaceName) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9henVyZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG9EQUs0QjtBQUM1QixvREFBbUY7QUFDbkYsd0RBQWdGO0FBQ2hGLHlHQUEyRjtBQUUzRiw4Q0FBeUQ7QUFDekQsc0ZBQWlGO0FBR2pGLHVHQUF1RztBQUN2RyxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUUxRSxzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRzNDLElBQUksYUFBc0MsQ0FBQztBQUMzQyxJQUFJLGVBQTBDLENBQUU7QUFDaEQsSUFBSSxhQUFzQyxDQUFDO0FBQzNDLHdHQUF3RztBQUN4Ryw0QkFBNEI7QUFDNUIsd0dBQXdHO0FBQ2pHLEtBQUssVUFBVSxXQUFXLENBQUMsV0FBeUI7SUFDdkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWtCLENBQUM7SUFDNUMsS0FBSSxJQUFJLE1BQU0sSUFBSSxXQUFXLElBQUUsRUFBRSxFQUFDO1FBQzlCLElBQUksYUFBYSxHQUFHO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ0ksQ0FBQztRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBRztZQUNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksY0FBYyxHQUFHLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0UsSUFBSSxhQUFhLEdBQUcsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0UsSUFBRyxhQUFhO2dCQUFFLElBQUEsMENBQVMsRUFBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7Z0JBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLHlCQUF5QixDQUFDLENBQUM7WUFDeEQsSUFBSSxpQkFBaUIsR0FBRyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JGLElBQUcsaUJBQWlCO2dCQUFFLElBQUEsMENBQVMsRUFBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztnQkFDckUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsNkJBQTZCLENBQUMsQ0FBQztZQUM1RCxJQUFJLGFBQWEsR0FBRyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3RSxJQUFHLGFBQWE7Z0JBQUUsSUFBQSwwQ0FBUyxFQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDOztnQkFDekQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcseUJBQXlCLENBQUMsQ0FBQztZQUN4RCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7WUFDWixJQUFJLGdCQUFnQixHQUFHLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEYsSUFBRyxnQkFBZ0I7Z0JBQUUsR0FBRyxHQUFHLEVBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztZQUN2RSxNQUFNLFVBQVUsR0FBRyxJQUFJLGlDQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUcsQ0FBQyxjQUFjLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEdBQUUsTUFBTSxHQUFHLG9DQUFvQyxDQUFDLENBQUM7YUFDcEY7aUJBQUk7Z0JBQ0QsMkJBQTJCO2dCQUMzQixlQUFlLEdBQUcsSUFBSSx3Q0FBd0IsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzNFLGFBQWEsR0FBSyxJQUFJLHFDQUF1QixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDMUUsYUFBYSxHQUFLLElBQUkscUNBQXVCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7Z0JBQ3RELHNJQUFzSTtnQkFFdEksTUFBTSxRQUFRLEdBQUc7b0JBQ2IsMkJBQTJCLENBQUMsYUFBYSxDQUFDO29CQUMxQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztvQkFDckMsWUFBWSxDQUFDLGFBQWEsQ0FBQztvQkFDM0Isc0JBQXNCLENBQUMsYUFBYSxDQUFDO29CQUNyQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztvQkFDdEMsU0FBUyxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsU0FBUyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7b0JBQ3JDLGlEQUFpRDtpQkFDcEQsQ0FBQztnQkFFRixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVTtnQkFDaEksTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhLEdBQUc7b0JBQ1osSUFBSSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxJQUFFLEVBQUUsQ0FBQztvQkFDakQsSUFBSSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxJQUFFLEVBQUUsQ0FBQztvQkFDakQsTUFBTSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsUUFBUSxJQUFFLEVBQUUsQ0FBQztvQkFDdkQsS0FBSyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxJQUFFLEVBQUUsQ0FBQztvQkFDcEQsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFFLEVBQUUsRUFBRSxHQUFHLGtCQUFrQixJQUFFLEVBQUUsQ0FBQztvQkFDckYsS0FBSyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxJQUFFLEVBQUUsQ0FBQztvQkFDcEQsSUFBSSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxJQUFFLEVBQUUsQ0FBQztvQkFDakQsY0FBYyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBRSxFQUFFLENBQUM7b0JBQ2hGLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFFLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUUsRUFBRSxDQUFDO29CQUM5RCxZQUFZLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFFLEVBQUUsQ0FBQztvQkFDMUUsYUFBYSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBRSxFQUFFLENBQUM7b0JBQzVFLGdEQUFnRDtpQkFDakMsQ0FBQzthQUN2QjtTQUNKO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxHQUFHLENBQUMsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7UUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxTQUFTLElBQUUsSUFBSSxDQUFDO0FBQzNCLENBQUM7QUE3RUQsa0NBNkVDO0FBRUQsdUNBQXVDO0FBQ2hDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxVQUFrQyxFQUFFLGNBQXNCO0lBQ2hHLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDNUMsSUFBSTtRQUNBLE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBVSxDQUFDO1FBQ2xDLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBZEQsa0RBY0M7QUFFRCxTQUFTO0FBQ0YsS0FBSyxVQUFVLFNBQVMsQ0FBQyxNQUE4QjtJQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbEMsSUFBRztRQUNDLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBVSxDQUFDO1FBQ2xDLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQSxPQUFNLENBQUMsRUFBQztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFaRCw4QkFZQztBQUVELFVBQVU7QUFDSCxLQUFLLFVBQVUsVUFBVSxDQUFDLFVBQWtDLEVBQUUsY0FBc0I7SUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25DLElBQUc7UUFDQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ25CO0lBQUEsT0FBTSxDQUFDLEVBQUM7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBYkQsZ0NBYUM7QUFFRCw2QkFBNkI7QUFDdEIsS0FBSyxVQUFVLDJCQUEyQixDQUFDLE1BQThCO0lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUNwRCxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUEyQixDQUFDO1FBQ25ELElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3RCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBYkQsa0VBYUM7QUFFRCxzQkFBc0I7QUFDZixLQUFLLFVBQVUsc0JBQXNCLENBQUMsTUFBOEI7SUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQy9DLElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQXFCLENBQUM7UUFDN0MsSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2RCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFiRCx3REFhQztBQUVELGNBQWM7QUFDUCxLQUFLLFVBQVUsd0JBQXdCLENBQUMsTUFBOEI7SUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2pELElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQXVCLENBQUM7UUFDL0MsSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3pELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVpELDREQVlDO0FBRUQsWUFBWTtBQUNMLEtBQUssVUFBVSxZQUFZLENBQUMsTUFBOEI7SUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3JDLElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQVcsQ0FBQztRQUNuQyxJQUFJLEtBQUssRUFBRSxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVpELG9DQVlDO0FBRUQseUJBQXlCO0FBQ2xCLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxNQUE4QjtJQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDL0MsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBcUIsQ0FBQztRQUM3QyxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFDO1lBQ3BELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFBLE9BQU8sR0FBRyxFQUFFO1FBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVpELHdEQVlDO0FBRU0sS0FBSyxVQUFVLG9CQUFvQixDQUFDLE1BQStCO0lBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUM3QyxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFvQixDQUFDO1FBQzVDLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUM7WUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQUEsT0FBTyxHQUFHLEVBQUU7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBWkQsb0RBWUM7QUFFTSxLQUFLLFVBQVUsNEJBQTRCLENBQUMsT0FBb0M7SUFDbkYsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBMkQsQ0FBQztRQUNuRixJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUM7WUFDM0IsSUFBSSxXQUFXLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQzdFLFdBQVcsQ0FBQyxRQUFRLEdBQUUsSUFBSSxDQUFDO1lBQzNCLFdBQVcsQ0FBQyxZQUFZLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNwQywwREFBMEQ7WUFDMUQsV0FBVyxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7WUFDNUIscUJBQXFCO1lBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFBLE9BQU8sQ0FBQyxFQUFFO1FBQ1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFqQkQsb0VBaUJDO0FBRUQsb0VBQTRFO0FBQ3JFLEtBQUssVUFBVSxTQUFTLENBQUMsVUFBa0MsRUFBRSxjQUFzQjtJQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbEMsSUFBRztRQUNDLE1BQU0sTUFBTSxHQUFHLElBQUksb0RBQThCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sTUFBTSxHQUFHO1lBQ1gsWUFBWSxFQUFFLElBQUksS0FBSyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBRTtZQUNuQixVQUFVLEVBQUUsSUFBSSxLQUFLLEVBQUU7WUFDdkIsVUFBVSxFQUFFLElBQUksS0FBSyxFQUFFO1NBQzFCLENBQUE7UUFDRCxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDM0QsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7WUFDckMsTUFBTSxRQUFRLEdBQUc7Z0JBQ2IsV0FBVyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUM7Z0JBQ3JELHdCQUF3QixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUM7Z0JBQ2xFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUM7YUFDN0QsQ0FBQztZQUNGLE1BQU0sQ0FBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBRSxFQUFFLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUUsRUFBRSxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakQsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFBQSxPQUFNLENBQUMsRUFBQztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFuQ0QsOEJBbUNDO0FBRU0sS0FBSyxVQUFVLFdBQVcsQ0FBQyxNQUFzQyxFQUFFLGlCQUF5QixFQUFFLGFBQXFCO0lBQ3RILHNDQUFzQztJQUN0QyxJQUFHO1FBQ0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUN2RSxJQUFJLE1BQU0sR0FBTyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDakMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNuQjtJQUFBLE9BQU0sQ0FBQyxFQUFDO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQztLQUNiO0FBQ0wsQ0FBQztBQWZELGtDQWVDO0FBRU0sS0FBSyxVQUFVLHdCQUF3QixDQUFDLE1BQXNDLEVBQUUsaUJBQXlCLEVBQUUsYUFBcUI7SUFDbkksbURBQW1EO0lBQ25ELElBQUc7UUFDQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLEVBQUU7WUFDcEYsSUFBSSxNQUFNLEdBQU8sSUFBSSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztZQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFBQSxPQUFNLENBQUMsRUFBQztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNMLENBQUM7QUFmRCw0REFlQztBQUVNLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxNQUFzQyxFQUFFLGlCQUF5QixFQUFFLGFBQXFCO0lBQzNILDJDQUEyQztJQUMzQyxJQUFHO1FBQ0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUM1RSxJQUFJLE1BQU0sR0FBTyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDakMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNuQjtJQUFBLE9BQU0sQ0FBQyxFQUFDO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQztLQUNiO0FBQ0wsQ0FBQztBQWZELDRDQWVDIn0=