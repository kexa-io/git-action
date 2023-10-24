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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2NwR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7QUFFRixzRkFBNEY7QUFFNUYsbURBQThDO0FBQzlDLCtDQUFpRjtBQUdqRixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXpDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBR2xDLEtBQUssVUFBVSxXQUFXLENBQUMsU0FBcUI7SUFDbkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7SUFDMUMsSUFBSSxlQUFlLEdBQUcsTUFBTSxJQUFBLDBDQUFTLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUN4RSxLQUFLLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBRSxFQUFFLEVBQUU7UUFDOUIsSUFBQSwwQ0FBUyxFQUFDLGdDQUFnQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLFlBQVksR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFX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