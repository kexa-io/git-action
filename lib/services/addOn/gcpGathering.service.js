"use strict";
/*
    * Provider : gcp
    * Thumbnail : https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/google-cloud-square.png
    * Documentation : https://cloud.google.com/nodejs/docs/reference
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - tasks_queue
    *     - compute
    *     - storage
    *     - project
    *     - billingAccount
    *     - cluster
    *     - workflows
    *     - websecurity
    *     - connector
    *     - vmware-engine
    *     - namespace
    *     - certificate
    *     - secret
    *     - connectivity_test
    *     - resource_settings
    *     - redis_instance
    *     - os_config
    *     - org_policy_constraint
    *     - airflow_image_version
    *     - disk
    *     - compute_item
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSecrets = exports.collectData = void 0;
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const storage_1 = require("@google-cloud/storage");
const files_1 = require("../../helpers/files");
const jsonStringify_1 = require("../../helpers/jsonStringify");
////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("GcpLogger");
let currentConfig;
/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
async function collectData(gcpConfig) {
    let resources = new Array();
    let defaultPathCred = await (0, manageVarEnvironnement_service_1.getEnvVar)("GOOGLE_APPLICATION_CREDENTIALS");
    for (let config of gcpConfig ?? []) {
        currentConfig = config;
        (0, manageVarEnvironnement_service_1.setEnvVar)("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        let prefix = config.prefix ?? (gcpConfig.indexOf(config).toString());
        let gcpResources = {
            "bucket": null,
            "tasks_queue": null,
            "compute": null,
            "project": null,
            "billingAccount": null,
            "cluster": null,
            "workflow": null,
            "websecurity": null,
            "connector": null,
            "vmware_engine": null,
            "namespace": null,
            "secret": null,
            "connectivity_test": null,
            "resource_settings": null,
            "redis_instance": null,
            "os_config": null,
            "org_policy_contraint": null,
            "airflow_image_version": null,
            "notebook": null,
            "lineage_process": null,
            "dashboard": null,
            "identity_domain": null,
            "kms_crypto_key": null,
            "kms_key_ring": null,
            "domain_registration": null,
            "dns_zone": null,
            "pipeline": null,
            "certificate": null,
            "batch_job": null,
            "workload": null,
            "artifact_repository": null,
            "app_gateway": null,
            "disk": null,
            "compute_item": null
        };
        let projectId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "GOOGLE_PROJECT_ID", prefix);
        let googleCred = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "GOOGLE_APPLICATION_CREDENTIALS", prefix);
        if (projectId && googleCred)
            (0, files_1.writeStringToJsonFile)(googleCred, "./config/gcp.json");
        else {
            (0, manageVarEnvironnement_service_1.setEnvVar)("GOOGLE_APPLICATION_CREDENTIALS", defaultPathCred);
            projectId = JSON.parse((0, files_1.getFile)(defaultPathCred) ?? "")?.project_id;
        }
        let regionsList = new Array();
        await retrieveAllRegions(projectId, regionsList);
        if ('regions' in config) {
            const userRegions = config.regions;
            if (userRegions.length <= 0) {
                logger.info("GCP - No Regions found in Config, gathering all regions...");
            }
            else if (!(compareUserAndValidRegions(userRegions, regionsList, gcpConfig, config)))
                continue;
            else {
                regionsList = userRegions;
            }
        }
        else {
            logger.info("GCP - No Regions found in Config, gathering all regions...");
        }
        try {
            logger.info("- listing GCP resources -");
            const promises = [
                listTasks(projectId, regionsList),
                listAllComputes(projectId),
                listAllBucket(),
                listAllProject(),
                getBillingAccount(projectId),
                listAllClusters(),
                listWorkflows(projectId),
                listWebSecurityConfig(projectId),
                listVpcConnectors(projectId, regionsList),
                listVMWareEngine(projectId),
                listNamespaces(projectId, regionsList),
                listSecrets(projectId),
                listConnectivityTests(projectId),
                listResourceSettings(projectId),
                listRedisInstances(projectId, regionsList),
                listOSConfig(projectId),
                listOrgPolicyContraints(projectId),
                listOrchestrationAirflow(projectId, regionsList),
                listNotebookInstances(projectId),
                listLineageProcesses(projectId),
                listDashboards(projectId),
                listIdentitiesDomain(projectId),
                listKMSCryptoKeys(projectId),
                listKMSKeyRings(projectId),
                listDomainsRegistration(projectId),
                listDnsZones(projectId),
                listDeliveryPipelines(projectId, regionsList),
                listCertificates(projectId),
                listBatchJobs(projectId, regionsList),
                listWorkloads(projectId),
                listArtifactsRepositories(projectId, regionsList),
                listAppGateways(projectId, regionsList),
                listPersistentDisks(projectId),
                listSSHKey(projectId)
            ];
            const [taskList, computeList, bucketList, projectList, billingAccountList, clusterList, workflowList, webSecurityList, connectorList, engineList, namespaceList, secretList, connectivityTestList, resourceSettingsList, redisIntanceList, os_configList, org_policy_contraintList, airflow_image_versionList, notebookList, lineage_processList, dashboardList, identity_domainList, kms_crypto_keyList, kms_key_ringList, domain_registrationList, dns_zoneList, pipelineList, certificateList, batchJobList, workloadList, artifactRepoList, app_gatewayList, diskList, compute_itemList] = await Promise.all(promises);
            logger.info("- listing cloud resources done -");
            ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
            //const client = new CloudTasksClient();
            gcpResources = {
                tasks_queue: taskList,
                compute: computeList,
                bucket: bucketList,
                project: projectList,
                billingAccount: billingAccountList,
                cluster: clusterList,
                workflow: workflowList,
                websecurity: webSecurityList,
                connector: connectorList,
                vmware_engine: engineList,
                namespace: namespaceList,
                secret: secretList,
                connectivity_test: connectivityTestList,
                resource_settings: resourceSettingsList,
                redis_instance: redisIntanceList,
                os_config: os_configList,
                org_policy_contraint: org_policy_contraintList,
                airflow_image_version: airflow_image_versionList,
                notebook: notebookList,
                lineage_process: lineage_processList,
                dashboard: dashboardList,
                identity_domain: identity_domainList,
                kms_crypto_key: kms_crypto_keyList,
                kms_key_ring: kms_key_ringList,
                domain_registration: domain_registrationList,
                dns_zone: dns_zoneList,
                pipeline: pipelineList,
                certificate: certificateList,
                batch_job: batchJobList,
                workload: workloadList,
                artifact_repository: artifactRepoList,
                app_gateway: app_gatewayList,
                disk: diskList,
                compute_item: compute_itemList
            };
        }
        catch (e) {
            logger.error("error in collectGCPData: " + projectId);
            logger.error(e);
        }
        (0, files_1.deleteFile)("./config/gcp.json");
        resources.push(gcpResources);
    }
    return resources ?? null;
}
exports.collectData = collectData;
///////////////////////////////////////////////     The following functions are used to gather informations
///// FUNCTIONS FOR ALL REGIONS GATHERING /////     from all required regions.
///////////////////////////////////////////////
function compareUserAndValidRegions(userRegions, validRegions, gcpConfig, config) {
    for (let i = 0; i < userRegions.length; i++) {
        if (validRegions.includes(userRegions[i]))
            continue;
        else {
            logger.warning("GCP - Config '" + gcpConfig.indexOf(config) + "' Skipped - Regions '" + userRegions[i] + "' is not a valid GCP region.");
            return (false);
        }
    }
    logger.info("GCP - Config n°" + gcpConfig.indexOf(config) + " correctly loaded user regions.");
    return (true);
}
function addRegionGCP(response, region) {
    response.region = region;
    return response;
}
async function retrieveAllRegions(projectId, regionsList) {
    const { RegionsClient } = require('@google-cloud/compute').v1;
    try {
        const computeClient = new RegionsClient();
        const request = {
            project: projectId
        };
        const iterable = await computeClient.listAsync(request);
        for await (const response of iterable) {
            regionsList.push(response.name);
        }
    }
    catch (e) {
        logger.debug("GCP : Error while retrieving all regions");
    }
}
/////////////////////////////////////////////////////////    This function is the main gathering function,
/////  ASYNC REGIONS GATHERING FOR FASTER EXECUTION /////    it iterate async to gather all.
/////////////////////////////////////////////////////////
async function executeAllRegions(projectId, serviceFunction, client, regionsList, isIterable) {
    const processRegion = async (currentRegion) => {
        const parent = 'projects/' + projectId + '/locations/' + currentRegion;
        try {
            const jsonResponses = [];
            const request = { parent };
            if (!isIterable) {
                let response = await serviceFunction.call(client, request);
                let jsonTmp = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
                if (jsonTmp != null && jsonTmp.length > 0) {
                    jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                }
            }
            else {
                const iterable = await serviceFunction.call(client, request);
                for await (const response of iterable) {
                    let jsonTmp = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
                    if (jsonTmp != null && jsonTmp.length > 0) {
                        jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                    }
                }
            }
            return jsonResponses;
        }
        catch (e) {
            logger.warning(`GCP : Error while retrieving data in multiple regions - Region: ${currentRegion} not found or access not authorized for ${serviceFunction.name}`);
        }
    };
    const processingPromises = regionsList.map(processRegion);
    const jsonDataArrays = await Promise.all(processingPromises);
    const jsonData = jsonDataArrays.reduce((acc, jsonResponses) => {
        if (jsonResponses) {
            if (acc != null)
                acc.push(...jsonResponses);
        }
        return acc;
    }, []);
    if (jsonData)
        return jsonData ?? null;
    else
        return (new Array());
}
////////////////////////////////////////////////////////////////
//////   ALL SERVICES FUNCTIONS FOR RESOURCES GATHERING   //////
////////////////////////////////////////////////////////////////
const { CloudTasksClient } = require('@google-cloud/tasks').v2;
async function listTasks(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("tasks_queue"))
        return null;
    let jsonData = [];
    try {
        const tasksClient = new CloudTasksClient();
        jsonData = await executeAllRegions(projectId, tasksClient.listQueuesAsync, tasksClient, regionsList, true);
    }
    catch (e) {
        logger.debug("Error while retrieving GCP Tasks Queues");
    }
    return jsonData ?? null;
}
const compute = require('@google-cloud/compute');
async function listAllComputes(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("compute"))
        return null;
    let jsonData = [];
    const instancesClient = new compute.InstancesClient();
    const aggListRequest = await instancesClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;
        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(instances[i].metadata.items.length)));
            }
        }
    }
    logger.info("GCP Compute Listing Done");
    return jsonData ?? null;
}
async function listSSHKey(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("compute_item"))
        return null;
    let jsonData = [];
    const instancesClient = new compute.InstancesClient();
    const aggListRequest = await instancesClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;
        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(instances[i].metadata?.items)));
            }
        }
    }
    return jsonData ?? null;
}
async function listPersistentDisks(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("disk"))
        return null;
    let jsonData = [];
    const disksClient = new compute.DisksClient();
    const aggListRequest = await disksClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, diskObject] of aggListRequest) {
        const disks = diskObject.disks;
        if (disks && disks.length > 0) {
            for (let i = 0; i < disks.length; i++) {
                jsonData.push(JSON.parse((0, jsonStringify_1.jsonStringify)(disks[i])));
            }
        }
    }
    logger.info("GCP Persistent Disks Listing Done");
    return jsonData ?? null;
}
async function listAllBucket() {
    if (!currentConfig.ObjectNameNeed?.includes("bucket"))
        return null;
    let jsonReturn = [];
    try {
        const storage = new storage_1.Storage();
        const [buckets] = await storage.getBuckets();
        for (let i = 0; i < buckets.length; i++) {
            const current_bucket = await storage.bucket(buckets[i].name).get();
            const jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(current_bucket));
            jsonReturn.push(jsonData);
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Buckets Listing Done");
    return jsonReturn ?? null;
}
const container_1 = require("@google-cloud/container");
async function listAllClusters() {
    if (!currentConfig.ObjectNameNeed?.includes("cluster"))
        return null;
    let jsonData = [];
    try {
        const cnt = new container_1.ClusterManagerClient();
        const projectId = await cnt.getProjectId();
        const request = {
            projectId: projectId,
            zone: "-",
        };
        const [response] = await cnt.listClusters(request);
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Clusters Listing Done");
    return jsonData ?? null;
}
async function listAllProject() {
    const { ProjectsClient } = require('@google-cloud/resource-manager');
    if (!currentConfig.ObjectNameNeed?.includes("project"))
        return null;
    let jsonData = [];
    try {
        const client = new ProjectsClient();
        const projects = client.searchProjectsAsync();
        for await (const project of projects) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(project));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Projects Listing Done");
    return jsonData ?? null;
}
async function getBillingAccount(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("billingAccount"))
        return null;
    const { CloudBillingClient } = require('@google-cloud/billing');
    let jsonData = [];
    try {
        const client = new CloudBillingClient();
        const [accounts] = await client.listBillingAccounts({
            projectId,
        });
        for (const account of accounts) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(account));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Billing Accounts Listing Done");
    return jsonData ?? null;
}
async function listWorkflows(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("workflow"))
        return null;
    const { WorkflowsClient } = require('@google-cloud/workflows');
    let jsonData = [];
    try {
        const client = new WorkflowsClient();
        const [workflows] = await client.listWorkflows({
            parent: client.locationPath(projectId, '-'),
        });
        for (const workflow of workflows) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(workflow));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Workflows Listing Done");
    return jsonData ?? null;
}
async function listWebSecurityConfig(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("websecurity"))
        return null;
    const { WebSecurityScannerClient } = require('@google-cloud/web-security-scanner');
    let jsonData = [];
    try {
        const client = new WebSecurityScannerClient();
        const stats = await client.listScanConfigs({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(stats));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Web Security Configs Listing Done");
    return jsonData ?? null;
}
async function listVpcConnectors(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("connector"))
        return null;
    const { VpcAccessServiceClient } = require('@google-cloud/vpc-access');
    let jsonData = [];
    try {
        const client = new VpcAccessServiceClient();
        jsonData = await executeAllRegions(projectId, client.listConnectors, client, regionsList, false);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP VPC Connectors Listing Done");
    return jsonData ?? null;
}
async function listVMWareEngine(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("vmware_engine"))
        return null;
    const { VmwareEngineClient } = require('@google-cloud/vmwareengine').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';
    try {
        const vmwareengineClient = new VmwareEngineClient();
        const request = {
            parent,
        };
        const iterable = await vmwareengineClient.listVmwareEngineNetworksAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP VMWare Engine Listing Done");
    return jsonData ?? null;
}
async function listNamespaces(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("namespace"))
        return null;
    const { RegistrationServiceClient, } = require('@google-cloud/service-directory');
    let jsonData = [];
    try {
        const registrationServiceClient = new RegistrationServiceClient();
        jsonData = await executeAllRegions(projectId, registrationServiceClient.listNamespaces, registrationServiceClient, regionsList, true);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Namespaces Listing Done");
    return jsonData ?? null;
}
async function listSecrets(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("secret"))
        return null;
    const { SecretManagerServiceClient, } = require('@google-cloud/secret-manager').v1;
    const parent = 'projects/globalInnovtech';
    let jsonData = [];
    try {
        const secretmanagerClient = new SecretManagerServiceClient();
        const request = { parent };
        const iterable = await secretmanagerClient.listSecretsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Secrets Listing Done");
    return jsonData ?? null;
}
exports.listSecrets = listSecrets;
async function listConnectivityTests(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("connectivity_test"))
        return null;
    const { ReachabilityServiceClient } = require('@google-cloud/network-management');
    let jsonData = [];
    try {
        const client = new ReachabilityServiceClient();
        const tests = await client.listConnectivityTests({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(tests));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Connectivity Tests Listing Done");
    return jsonData ?? null;
}
async function listResourceSettings(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("resource_settings"))
        return null;
    let jsonData = [];
    const { ResourceSettingsServiceClient } = require('@google-cloud/resource-settings');
    try {
        const client = new ResourceSettingsServiceClient();
        const settings = await client.listSettings({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(settings));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Resources Settings Listing Done");
    return jsonData ?? null;
}
async function listRedisInstances(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("redis_instance"))
        return null;
    const { CloudRedisClient } = require('@google-cloud/redis');
    let jsonData = [];
    try {
        const client = new CloudRedisClient();
        jsonData = await executeAllRegions(projectId, client.listInstances, client, regionsList, false);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Redis Instances Listing Done");
    return jsonData ?? null;
}
async function listOSConfig(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("os_config"))
        return null;
    const { OsConfigServiceClient } = require('@google-cloud/os-config');
    let jsonData = [];
    try {
        const client = new OsConfigServiceClient();
        const [deployments] = await client.listPatchDeployments({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(deployments));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP OS Config Listing Done");
    return jsonData ?? null;
}
async function listOrgPolicyContraints(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("org_policy_constraint"))
        return null;
    const { OrgPolicyClient } = require('@google-cloud/org-policy');
    let jsonData = [];
    try {
        const client = new OrgPolicyClient();
        const constraints = await client.listConstraints({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(constraints));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}
async function listOrchestrationAirflow(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("airflow_image_version"))
        return null;
    const { ImageVersionsClient } = require('@google-cloud/orchestration-airflow');
    let jsonData = [];
    try {
        const client = new ImageVersionsClient();
        jsonData = await executeAllRegions(projectId, client.listImageVersions, client, regionsList, false);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}
async function listNotebookInstances(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("notebook"))
        return null;
    const { NotebookServiceClient } = require('@google-cloud/notebooks');
    let jsonData = [];
    try {
        const client = new NotebookServiceClient();
        const [instances] = await client.listInstances({
            parent: `projects/${projectId}/locations/-`,
        });
        for (const instance of instances) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(instance));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Notebook Instances Listing Done");
    return jsonData ?? null;
}
async function listDashboards(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("dashboard"))
        return null;
    const { DashboardsServiceClient } = require('@google-cloud/monitoring-dashboards');
    const parent = 'projects/' + projectId;
    let jsonData = [];
    try {
        const ds = new DashboardsServiceClient();
        const [dashboards] = await ds.listDashboards({ parent, });
        for (const dashboard of dashboards) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(dashboard));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Dashboards Listing Done");
    return jsonData ?? null;
}
async function listIdentitiesDomain(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("identity_domain"))
        return null;
    const { ManagedIdentitiesServiceClient } = require('@google-cloud/managed-identities');
    let jsonData = [];
    try {
        const client = new ManagedIdentitiesServiceClient();
        const domains = await client.listDomains({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(domains));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Identities Domains Listing Done");
    return jsonData ?? null;
}
async function listLineageProcesses(projectId) {
    const { LineageClient } = require('@google-cloud/lineage').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];
    try {
        const lineageClient = new LineageClient();
        const request = { parent };
        const iterable = await lineageClient.listProcessesAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Lineage Processes Listing Done");
    return jsonData ?? null;
}
async function listKMSCryptoKeys(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("kms_crypto_key"))
        return null;
    const { KeyDashboardServiceClient } = require('@google-cloud/kms-inventory').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId;
    try {
        const inventoryClient = new KeyDashboardServiceClient();
        const request = { parent };
        const [response] = await inventoryClient.listCryptoKeys(request, {
            maxResults: 50,
            autoPaginate: false,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP KMS Crypto Keys Listing Done");
    return jsonData ?? null;
}
async function listKMSKeyRings(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("kms_key_ring"))
        return null;
    const { KeyManagementServiceClient } = require('@google-cloud/kms');
    let jsonData = [];
    try {
        const client = new KeyManagementServiceClient();
        const locationName = client.locationPath(projectId, "global");
        const [keyRings] = await client.listKeyRings({
            parent: locationName
        });
        for (const keyRing of keyRings) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(keyRing));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP KMS Key Rings Listing Done");
    return jsonData ?? null;
}
async function listDomainsRegistration(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("domain_registration"))
        return null;
    const { DomainsClient } = require('@google-cloud/domains');
    let jsonData = [];
    try {
        const client = new DomainsClient();
        const [registrations] = await client.listRegistrations({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(registrations));
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Domains Resgitration Listing Done");
    return jsonData ?? null;
}
async function listDnsZones(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("dns_zone"))
        return null;
    const { DNS } = require('@google-cloud/dns');
    let jsonData = [];
    try {
        const dns = new DNS();
        const [zones] = await dns.getZones();
        for (const zone of zones) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(zone));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP DNS Zones Listing Done");
    return jsonData ?? null;
}
async function listDeliveryPipelines(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("pipeline"))
        return null;
    const { CloudDeployClient } = require('@google-cloud/deploy').v1;
    let jsonData = [];
    try {
        const deployClient = new CloudDeployClient();
        jsonData = await executeAllRegions(projectId, deployClient.listDeliveryPipelinesAsync, deployClient, regionsList, true);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Delivery Pipelines Listing Done");
    return jsonData ?? null;
}
async function listCertificates(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("certificate"))
        return null;
    const { CertificateManagerClient } = require('@google-cloud/certificate-manager').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/global';
    try {
        const certificatemanagerClient = new CertificateManagerClient();
        const request = { parent };
        const iterable = await certificatemanagerClient.listCertificatesAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse((0, jsonStringify_1.jsonStringify)(response));
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Certificates Listing Done");
    return jsonData ?? null;
}
async function listBatchJobs(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("batch_job"))
        return null;
    let jsonData = [];
    const { BatchServiceClient } = require('@google-cloud/batch').v1;
    try {
        const batchClient = new BatchServiceClient();
        jsonData = await executeAllRegions(projectId, batchClient.listJobsAsync, batchClient, regionsList, true);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Batch Jobs Listing Done");
    return jsonData ?? null;
}
async function listWorkloads(projectId) {
    if (!currentConfig.ObjectNameNeed?.includes("workload"))
        return null;
    const { AssuredWorkloadsServiceClient } = require('@google-cloud/assured-workloads');
    const { ProjectsClient } = require('@google-cloud/resource-manager').v3;
    let jsonData;
    try {
        /*   const resource = new ProjectsClient();
           const response = await resource.getProject(projectId);
           const client = new AssuredWorkloadsServiceClient();
           const [workloads] = await client.listWorkloads({
               parent: `organizations/${projectId}`,
           });
           for (const workload of workloads) {
               jsonData = JSON.parse(jsonStringify(workload));
           }*/
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Workloads Listing Done");
    return jsonData ?? null;
}
async function listArtifactsRepositories(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("artifact_repository"))
        return null;
    const { ArtifactRegistryClient } = require('@google-cloud/artifact-registry');
    let jsonData = [];
    try {
        const client = new ArtifactRegistryClient();
        jsonData = await executeAllRegions(projectId, client.listRepositories, client, regionsList, false);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Artifacts Repositories Listing Done");
    return jsonData ?? null;
}
async function listAppGateways(projectId, regionsList) {
    if (!currentConfig.ObjectNameNeed?.includes("app_gateway"))
        return null;
    const { AppGatewaysServiceClient } = require('@google-cloud/appgateways').v1;
    let jsonData = [];
    try {
        const appgatewaysClient = new AppGatewaysServiceClient();
        jsonData = await executeAllRegions(projectId, appgatewaysClient.listAppGatewaysAsync, appgatewaysClient, regionsList, true);
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP App Gateways Listing Done");
    return jsonData ?? null;
}
/////////////////////////////////////////////////////////
/// THE FOLLOWINGS RESOURCES HAVE NOT BEEN TESTED YET ///
/////////////////////////////////////////////////////////
/*
async function listAppConnectors(projectId: any): Promise<Array<any> | null> {
    const {AppConnectorsServiceClient} = require('@google-cloud/appconnectors').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];

    try {
        const appconnectorsClient = new AppConnectorsServiceClient();
        const request = {parent};
        const iterable = await appconnectorsClient.listAppConnectorsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(jsonStringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP App Connectors Listing Done");
    return jsonData ?? null;
}
*/
/*
async function listApiKeys(projectId: any): Promise<Array<any> | null> {
    const {ApiKeysClient} = require('@google-cloud/apikeys').v2;
    const parent = 'projects/' + projectId;
    let jsonData = [];

    try {
        const apikeysClient = new ApiKeysClient();
        const request = { parent };
        const iterable = await apikeysClient.listKeysAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(jsonStringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Keys Listing Done");
    return jsonData ?? null;
}*/
/*
async function listApi(projectId: any): Promise<Array<any> | null> {
    const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
    let jsonData = [];

    try {
        const client = new ApiGatewayServiceClient();
        const [apis] = await client.listApis({
            parent: `projects/${projectId}/locations/global`,
        });
        for (const api of apis) {
            jsonData = JSON.parse(jsonStringify(api));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Listing Done");
    return jsonData ?? null;
}*/
/*
async function listAccessPolicy(projectId: any): Promise<Array<any> | null> {
    const {AccessApprovalClient} = require('@google-cloud/access-approval');
    let jsonData = [];

    try {
        const client = new AccessApprovalClient();
        const requests = await client.listApprovalRequests({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(jsonStringify(requests));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Listing Done");
    return jsonData ?? null;
}
*/
// Workstations : timeout because no instance to be tested //
/*
async function listWorkstations(projectId: any, regionsList: Array<string>): Promise<Array<any>|null> { // KO
    const {WorkstationsClient} = require('@google-cloud/workstations').v1;
    let jsonData;
    try {
        const workstationsClient = new WorkstationsClient();
        jsonData = await executeAllRegions(projectId, workstationsClient.listWorkstationsAsync, workstationsClient, regionsList,true);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Workstations Listing Done");
    return jsonData ?? null;
}
*/
// Storage Config : Deadline/Timeout //
/*
async function listStorageConfig(projectId: any): Promise<Array<any>|null> {
    const {StorageInsightsClient} = require('@google-cloud/storageinsights').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';

    try {
        const storageinsightsClient = new StorageInsightsClient();
        const request = {
            parent,
        };
        const iterable = await storageinsightsClient.listReportConfigsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(jsonStringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Storage Configs Listing Done");
    return jsonData ?? null;
}
*/
// Private CA : Timeout //
/*
async function listPrivateCertificates(projectId: any): Promise<Array<any>|null> {
    const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
    let jsonData = [];

    try {
        const client = new CertificateAuthorityServiceClient();
        const res = await client.listCertificates({
            parent: `projects/${projectId}/locations/-/caPools/-`,
        });
        jsonData = JSON.parse(jsonStringify(res));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Private Certificates Listing Done");
    return jsonData ?? null;
}
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2NwR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7QUFFRixzRkFBNEY7QUFFNUYsbURBQThDO0FBQzlDLCtDQUFpRjtBQUVqRiwrREFBNEQ7QUFFNUQsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxXQUFXLENBQUMsQ0FBQztBQUN6QyxJQUFJLGFBQXdCLENBQUM7QUFFN0IseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFHbEMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFxQjtJQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxJQUFJLGVBQWUsR0FBRyxNQUFNLElBQUEsMENBQVMsRUFBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3hFLEtBQUssSUFBSSxNQUFNLElBQUksU0FBUyxJQUFFLEVBQUUsRUFBRTtRQUM5QixhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUEsMENBQVMsRUFBQyxnQ0FBZ0MsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxZQUFZLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFNBQVMs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