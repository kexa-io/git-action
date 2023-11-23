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
    let context = (0, logger_service_1.getContext)();
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
                context?.log("GCP - No Regions found in Config, gathering all regions...");
                logger.info("GCP - No Regions found in Config, gathering all regions...");
            }
            else if (!(compareUserAndValidRegions(userRegions, regionsList, gcpConfig, config)))
                continue;
            else {
                regionsList = userRegions;
            }
        }
        else {
            context?.log("GCP - No Regions found in Config, gathering all regions...");
            logger.info("GCP - No Regions found in Config, gathering all regions...");
        }
        try {
            context?.log("- listing GCP resources -");
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
            context?.log("- listing cloud resources done -");
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
            logger.warn("GCP - Config '" + gcpConfig.indexOf(config) + "' Skipped - Regions '" + userRegions[i] + "' is not a valid GCP region.");
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
            logger.warn(`GCP : Error while retrieving data in multiple regions - Region: ${currentRegion} not found or access not authorized for ${serviceFunction.name}`);
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
        logger.debug("Error while retrieving GCP Tasks Queues");
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
        logger.debug(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2NwR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7QUFFRixzRkFBNEY7QUFFNUYsbURBQThDO0FBQzlDLCtDQUFpRjtBQUdqRixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxzREFBMkQ7QUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXpDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBR2xDLEtBQUssVUFBVSxXQUFXLENBQUMsU0FBcUI7SUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBQSwyQkFBVSxHQUFFLENBQUM7SUFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7SUFDMUMsSUFBSSxlQUFlLEdBQUcsTUFBTSxJQUFBLDBDQUFTLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUN4RSxLQUFLLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBRSxFQUFFLEVBQUU7UUFDOUIsSUFBQSwwQ0FBUyxFQUFDLGdDQUFnQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLFlBQVksR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLElBQUk7WUFDZixVQUFV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