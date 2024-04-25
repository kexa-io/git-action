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
                let jsonTmp = JSON.parse(JSON.stringify(response));
                if (jsonTmp != null && jsonTmp.length > 0) {
                    jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                }
            }
            else {
                const iterable = await serviceFunction.call(client, request);
                for await (const response of iterable) {
                    let jsonTmp = JSON.parse(JSON.stringify(response));
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
                jsonData.push(JSON.parse(JSON.stringify(instances[i].metadata.items.length)));
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
                jsonData.push(JSON.parse(JSON.stringify(instances[i].metadata?.items)));
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
                jsonData.push(JSON.parse(JSON.stringify(disks[i])));
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
            const jsonData = JSON.parse(JSON.stringify(current_bucket));
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
        jsonData = JSON.parse(JSON.stringify(response));
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
            jsonData = JSON.parse(JSON.stringify(project));
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
            jsonData = JSON.parse(JSON.stringify(account));
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
            jsonData = JSON.parse(JSON.stringify(workflow));
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
        jsonData = JSON.parse(JSON.stringify(stats));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
        jsonData = JSON.parse(JSON.stringify(tests));
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
        jsonData = JSON.parse(JSON.stringify(settings));
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
        jsonData = JSON.parse(JSON.stringify(deployments));
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
        jsonData = JSON.parse(JSON.stringify(constraints));
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
            jsonData = JSON.parse(JSON.stringify(instance));
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
            jsonData = JSON.parse(JSON.stringify(dashboard));
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
        jsonData = JSON.parse(JSON.stringify(domains));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
        jsonData = JSON.parse(JSON.stringify(response));
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
            jsonData = JSON.parse(JSON.stringify(keyRing));
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
        jsonData = JSON.parse(JSON.stringify(registrations));
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
            jsonData = JSON.parse(JSON.stringify(zone));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
               jsonData = JSON.parse(JSON.stringify(workload));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
            jsonData = JSON.parse(JSON.stringify(api));
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
        jsonData = JSON.parse(JSON.stringify(requests));
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
            jsonData = JSON.parse(JSON.stringify(response));
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
        jsonData = JSON.parse(JSON.stringify(res));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Private Certificates Listing Done");
    return jsonData ?? null;
}
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2NwR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7QUFFRixzRkFBNEY7QUFFNUYsbURBQThDO0FBQzlDLCtDQUFpRjtBQUdqRixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pDLElBQUksYUFBd0IsQ0FBQztBQUU3Qix5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUdsQyxLQUFLLFVBQVUsV0FBVyxDQUFDLFNBQXFCO0lBQ25ELElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO0lBQzFDLElBQUksZUFBZSxHQUFHLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDeEUsS0FBSyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUUsRUFBRSxFQUFFO1FBQzlCLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBQSwwQ0FBUyxFQUFDLGdDQUFnQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLFlBQVksR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLElBQUk7WUFD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