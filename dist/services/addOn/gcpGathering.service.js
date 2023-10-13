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
/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
async function collectData(gcpConfig) {
    let resources = new Array();
    let defaultPathCred = await (0, manageVarEnvironnement_service_1.getEnvVar)("GOOGLE_APPLICATION_CREDENTIALS");
    for (let config of gcpConfig ?? []) {
        (0, manageVarEnvironnement_service_1.setEnvVar)("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        let prefix = config.prefix ?? (gcpConfig.indexOf(config) + "-");
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
            logger.error("GCP - Config '" + gcpConfig.indexOf(config) + "' Skipped - Regions '" + userRegions[i] + "' is not a valid GCP region.");
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
        logger.error("GCP : Error while retrieving all regions");
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
    let jsonData = [];
    try {
        const tasksClient = new CloudTasksClient();
        jsonData = await executeAllRegions(projectId, tasksClient.listQueuesAsync, tasksClient, regionsList, true);
    }
    catch (e) {
        logger.error("Error while retrieving GCP Tasks Queues");
    }
    return jsonData ?? null;
}
const compute = require('@google-cloud/compute');
async function listAllComputes(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Buckets Listing Done");
    return jsonReturn ?? null;
}
const container_1 = require("@google-cloud/container");
async function listAllClusters() {
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
        logger.error(e);
    }
    logger.info("GCP Clusters Listing Done");
    return jsonData ?? null;
}
const { ProjectsClient } = require('@google-cloud/resource-manager');
async function listAllProject() {
    let jsonData = [];
    try {
        const client = new ProjectsClient();
        const projects = client.searchProjectsAsync();
        for await (const project of projects) {
            jsonData = JSON.parse(JSON.stringify(project));
        }
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Projects Listing Done");
    return jsonData ?? null;
}
async function getBillingAccount(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Billing Accounts Listing Done");
    return jsonData ?? null;
}
async function listWorkflows(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Workflows Listing Done");
    return jsonData ?? null;
}
async function listWebSecurityConfig(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Web Security Configs Listing Done");
    return jsonData ?? null;
}
async function listVpcConnectors(projectId, regionsList) {
    const { VpcAccessServiceClient } = require('@google-cloud/vpc-access');
    let jsonData = [];
    try {
        const client = new VpcAccessServiceClient();
        jsonData = await executeAllRegions(projectId, client.listConnectors, client, regionsList, false);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP VPC Connectors Listing Done");
    return jsonData ?? null;
}
async function listVMWareEngine(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP VMWare Engine Listing Done");
    return jsonData ?? null;
}
async function listNamespaces(projectId, regionsList) {
    const { RegistrationServiceClient, } = require('@google-cloud/service-directory');
    let jsonData = [];
    try {
        const registrationServiceClient = new RegistrationServiceClient();
        jsonData = await executeAllRegions(projectId, registrationServiceClient.listNamespaces, registrationServiceClient, regionsList, true);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Namespaces Listing Done");
    return jsonData ?? null;
}
async function listSecrets(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Secrets Listing Done");
    return jsonData ?? null;
}
exports.listSecrets = listSecrets;
async function listConnectivityTests(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Connectivity Tests Listing Done");
    return jsonData ?? null;
}
async function listResourceSettings(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Resources Settings Listing Done");
    return jsonData ?? null;
}
async function listRedisInstances(projectId, regionsList) {
    const { CloudRedisClient } = require('@google-cloud/redis');
    let jsonData = [];
    try {
        const client = new CloudRedisClient();
        jsonData = await executeAllRegions(projectId, client.listInstances, client, regionsList, false);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Redis Instances Listing Done");
    return jsonData ?? null;
}
async function listOSConfig(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP OS Config Listing Done");
    return jsonData ?? null;
}
async function listOrgPolicyContraints(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}
async function listOrchestrationAirflow(projectId, regionsList) {
    const { ImageVersionsClient } = require('@google-cloud/orchestration-airflow');
    let jsonData = [];
    try {
        const client = new ImageVersionsClient();
        jsonData = await executeAllRegions(projectId, client.listImageVersions, client, regionsList, false);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}
async function listNotebookInstances(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Notebook Instances Listing Done");
    return jsonData ?? null;
}
async function listDashboards(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Dashboards Listing Done");
    return jsonData ?? null;
}
async function listIdentitiesDomain(projectId) {
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
        logger.error(e);
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
        logger.error(e);
    }
    logger.info("GCP Lineage Processes Listing Done");
    return jsonData ?? null;
}
async function listKMSCryptoKeys(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP KMS Crypto Keys Listing Done");
    return jsonData ?? null;
}
async function listKMSKeyRings(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP KMS Key Rings Listing Done");
    return jsonData ?? null;
}
async function listDomainsRegistration(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Domains Resgitration Listing Done");
    return jsonData ?? null;
}
async function listDnsZones(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP DNS Zones Listing Done");
    return jsonData ?? null;
}
async function listDeliveryPipelines(projectId, regionsList) {
    const { CloudDeployClient } = require('@google-cloud/deploy').v1;
    let jsonData = [];
    try {
        const deployClient = new CloudDeployClient();
        jsonData = await executeAllRegions(projectId, deployClient.listDeliveryPipelinesAsync, deployClient, regionsList, true);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Delivery Pipelines Listing Done");
    return jsonData ?? null;
}
async function listCertificates(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Certificates Listing Done");
    return jsonData ?? null;
}
async function listBatchJobs(projectId, regionsList) {
    let jsonData = [];
    const { BatchServiceClient } = require('@google-cloud/batch').v1;
    try {
        const batchClient = new BatchServiceClient();
        jsonData = await executeAllRegions(projectId, batchClient.listJobsAsync, batchClient, regionsList, true);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Batch Jobs Listing Done");
    return jsonData ?? null;
}
async function listWorkloads(projectId) {
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
        logger.error(e);
    }
    logger.info("GCP Workloads Listing Done");
    return jsonData ?? null;
}
async function listArtifactsRepositories(projectId, regionsList) {
    const { ArtifactRegistryClient } = require('@google-cloud/artifact-registry');
    let jsonData = [];
    try {
        const client = new ArtifactRegistryClient();
        jsonData = await executeAllRegions(projectId, client.listRepositories, client, regionsList, false);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Artifacts Repositories Listing Done");
    return jsonData ?? null;
}
async function listAppGateways(projectId, regionsList) {
    const { AppGatewaysServiceClient } = require('@google-cloud/appgateways').v1;
    let jsonData = [];
    try {
        const appgatewaysClient = new AppGatewaysServiceClient();
        jsonData = await executeAllRegions(projectId, appgatewaysClient.listAppGatewaysAsync, appgatewaysClient, regionsList, true);
    }
    catch (e) {
        logger.error(e);
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
    } catch (e:any) {
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
    } catch (e:any) {
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
    } catch (e:any) {
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
    } catch (e:any) {
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
    catch (e:any) {
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
    } catch (e:any) {
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
    } catch (e:any) {
        logger.error(e);
    }
    logger.info("GCP Private Certificates Listing Done");
    return jsonData ?? null;
}
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2NwR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7QUFFRixzRkFBNEY7QUFFNUYsbURBQThDO0FBQzlDLCtDQUFpRjtBQUdqRixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXpDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBR2xDLEtBQUssVUFBVSxXQUFXLENBQUMsU0FBcUI7SUFDbkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7SUFDMUMsSUFBSSxlQUFlLEdBQUcsTUFBTSxJQUFBLDBDQUFTLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUN4RSxLQUFLLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBRSxFQUFFLEVBQUU7UUFDOUIsSUFBQSwwQ0FBUyxFQUFDLGdDQUFnQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxZQUFZLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsV0FBVyxFQUFF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