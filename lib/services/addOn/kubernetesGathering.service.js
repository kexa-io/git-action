"use strict";
/*
    * Provider : kubernetes
    * Thumbnail : https://logos-download.com/wp-content/uploads/2018/09/Kubernetes_Logo.png
    * Documentation : https://github.com/kubernetes-client/javascript
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - namespaces
    *     - pods
    *     - services
    *     - helm
    *     - configmap
    *     - deployment
    *     - replicaset
    *     - statefulset
    *     - daemonset
    *     - ingress
    *     - persistentvolume
    *     - persistentvolumeclaim
    *     - secret
    *     - serviceaccount
    *     - storageclass
    *     - networkpolicy
    *     - event
    *     - node
    *     - apiservice
    *     - lease
    *     - componentstatus
    *     - limitrange
    *     - resourcequota
    *     - podtemplate
    *     - hpa
    *     - podLogs
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kubernetesListing = exports.collectData = void 0;
//*     - job
//*     - cronjob
//*     - role
//*     - rolebinding
//*     - clusterrole
//*     - clusterrolebinding
//*     - certificate
//*     - certificateSigningRequest
//*     - podsecuritypolicy
//*     - horizontalpodautoscaler
//*     - verticalpodautoscaler
//*     - priorityclass
//*     - customresourcedefinition
//*     - poddisruptionbudget
//*     - endpoint
//*     - mutatingwebhookconfiguration
//*     - validatingwebhookconfiguration
//*     - controllerrevision
const helm_ts_1 = __importDefault(require("helm-ts"));
const loaderConfig_1 = require("../../helpers/loaderConfig");
const kubernetes_models_1 = require("../../models/kubernetes/kubernetes.models");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const files_1 = require("../../helpers/files");
const yaml = require('js-yaml');
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("KubernetesLogger");
const k8s = require('@kubernetes/client-node');
let currentConfig;
const globalConfiguration = (0, loaderConfig_1.getConfig)().global ?? null;
async function collectData(kubernetesConfig) {
    let resources = new Array();
    for (let config of kubernetesConfig ?? []) {
        currentConfig = config;
        let prefix = config.prefix ?? (kubernetesConfig.indexOf(config).toString());
        try {
            let pathKubeFile = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "KUBECONFIG", prefix);
            (0, files_1.writeStringToJsonFile)(JSON.stringify(yaml.load((0, files_1.getFile)(pathKubeFile ?? "")), null, 2), "./config/kubernetes.json");
            const promises = [
                kubernetesListing(pathKubeFile),
            ];
            const [kubernetesList] = await Promise.all(promises);
            let kubernetesResource = {
                "namespaces": kubernetesList["namespaces"],
                "pods": kubernetesList["pods"],
                "services": kubernetesList["services"],
                "helm": kubernetesList["helm"],
                "configmap": kubernetesList["configmap"],
                "deployment": kubernetesList["deployment"],
                "replicaset": kubernetesList["replicaset"],
                "statefulset": kubernetesList["statefulset"],
                "daemonset": kubernetesList["daemonset"],
                "job": kubernetesList["job"],
                "cronjob": kubernetesList["cronjob"],
                "ingress": kubernetesList["ingress"],
                "persistentvolume": kubernetesList["persistentvolume"],
                "persistentvolumeclaim": kubernetesList["persistentvolumeclaim"],
                "secret": kubernetesList["secret"],
                "serviceaccount": kubernetesList["serviceaccount"],
                "role": kubernetesList["role"],
                "rolebinding": kubernetesList["rolebinding"],
                "clusterrole": kubernetesList["clusterrole"],
                "clusterrolebinding": kubernetesList["clusterrolebinding"],
                "storageclass": kubernetesList["storageclass"],
                "networkpolicy": kubernetesList["networkpolicy"],
                "podsecuritypolicy": kubernetesList["podsecuritypolicy"],
                "limitrange": kubernetesList["limitrange"],
                "resourcequota": kubernetesList["resourcequota"],
                "horizontalpodautoscaler": kubernetesList["horizontalpodautoscaler"],
                "verticalpodautoscaler": kubernetesList["verticalpodautoscaler"],
                "priorityclass": kubernetesList["priorityclass"],
                "customresourcedefinition": kubernetesList["customresourcedefinition"],
                "poddisruptionbudget": kubernetesList["poddisruptionbudget"],
                "event": kubernetesList["event"],
                "endpoint": kubernetesList["endpoint"],
                "node": kubernetesList["node"],
                "podtemplate": kubernetesList["podtemplate"],
                "mutatingwebhookconfiguration": kubernetesList["mutatingwebhookconfiguration"],
                "validatingwebhookconfiguration": kubernetesList["validatingwebhookconfiguration"],
                "apiservice": kubernetesList["apiservice"],
                "controllerrevision": kubernetesList["controllerrevision"],
                "lease": kubernetesList["lease"],
                "certificate": kubernetesList["certificate"],
                "certificateSigningRequest": kubernetesList["certificateSigningRequest"],
                "componentstatus": kubernetesList["componentstatus"],
                "hpa": kubernetesList["hpa"],
                "podLogs": kubernetesList["podLogs"]
            };
            resources.push(kubernetesResource);
        }
        catch (e) {
            logger.error(e);
        }
        (0, files_1.deleteFile)("./config/kubernetes.json");
    }
    return resources ?? null;
}
exports.collectData = collectData;
//kubernetes list
async function kubernetesListing(isPathKubeFile) {
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    (isPathKubeFile) ? kc.loadFromFile("./config/kubernetes.json") : kc.loadFromDefault();
    //opening different api to get kubernetes resources
    const autoscalingV1Api = kc.makeApiClient(k8s.AutoscalingV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    // const k8sExtensionsV1beta1Api = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    // const k8sRbacAuthorizationV1Api = kc.makeApiClient(k8s.rbacAuthorizationV1Api);
    const k8sStorageV1Api = kc.makeApiClient(k8s.StorageV1Api);
    const k8sApiregistrationV1Api = kc.makeApiClient(k8s.ApiregistrationV1Api);
    const k8CoordinationV1Api = kc.makeApiClient(k8s.CoordinationV1Api);
    const k8sLog = new k8s.Log(kc);
    //const k8scertificatesV1Api = kc.makeApiClient(k8s.certificatesV1Api);
    /////////////////////////////////////////////////////////////////////////////////
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources = (0, kubernetes_models_1.createKubernetesResourcesDefault)();
    kubResources.namespaces = namespaces.body.items;
    const namespacePromises = namespaces.body.items.map(async (item) => {
        const promises = [
            collectHelm(item.metadata.name),
            collectPods(k8sApiCore, item.metadata.name),
            collectServices(k8sApiCore, item.metadata.name),
            collectConfigmap(k8sApiCore, item.metadata.name),
            collectDeployment(k8sAppsV1Api, item.metadata.name),
            collectReplicaset(k8sAppsV1Api, item.metadata.name),
            collectStatefulset(k8sAppsV1Api, item.metadata.name),
            collectDaemonset(k8sAppsV1Api, item.metadata.name),
            //collectJob(k8sApiCore, item.metadata.name),
            //collectCronjob(k8sApiCore, item.metadata.name),
            collectIngress(k8sNetworkingV1Api, item.metadata.name),
            collectPersistentvolume(k8sApiCore, item.metadata.name),
            collectPersistentvolumeclaim(k8sApiCore, item.metadata.name),
            collectSecret(k8sApiCore, item.metadata.name),
            collectServiceaccount(k8sApiCore, item.metadata.name),
            //collectRole(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectRolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectClusterrole(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectClusterrolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            collectStorageclass(k8sStorageV1Api, item.metadata.name),
            collectNetworkpolicy(k8sNetworkingV1Api, item.metadata.name),
            //collectPodsecuritypolicy(k8sApiCore, item.metadata.name),
            //collectLimitrange(k8sApiCore, item.metadata.name),
            //collectResourcequota(k8sApiCore, item.metadata.name),
            //collectHorizontalpodautoscaler(k8sApiCore, item.metadata.name),
            //collectVerticalpodautoscaler(k8sApiCore, item.metadata.name),
            //collectPriorityclass(k8sApiCore, item.metadata.name),
            //collectCustomresourcedefinition(k8sApiCore, item.metadata.name),
            //collectPoddisruptionbudget(k8sApiCore, item.metadata.name),
            collectEvent(k8sApiCore, item.metadata.name),
            //collectEndpoint(k8sApiCore, item.metadata.name),
            collectNode(k8sApiCore, item.metadata.name),
            //collectPodtemplate(k8sApiCore, item.metadata.name),
            //collectMutatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            //collectValidatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            collectApiservice(k8sApiregistrationV1Api, item.metadata.name),
            //collectControllerrevision(k8sApiCore, item.metadata.name),
            collectLease(k8CoordinationV1Api, item.metadata.name),
            //collectCertificate(k8scertificatesV1Api, item.metadata.name),
            //collectCertificateSigningRequest(k8scertificatesV1Api, item.metadata.name),
            collectComponentstatus(k8sApiCore, item.metadata.name),
            collectHorizontalPodAutoscaler(autoscalingV1Api, item.metadata.name),
            collectPodLogs(k8sLog, k8sApiCore, item.metadata.name)
        ];
        const [helmData, pods, serviceData, configmapData, deploymentData, replicasetData, statefulsetData, daemonsetData, 
        //jobData,
        //cronjobData,
        ingressData, persistentvolumeData, persistentvolumeclaimData, secretData, serviceaccountData, 
        //roleData,
        //rolebindingData,
        //clusterroleData,
        //clusterrolebindingData,
        storageclassData, networkpolicyData, 
        //podsecuritypolicyData,
        //limitrangeData,
        //resourcequotaData,
        //horizontalpodautoscalerData,
        //verticalpodautoscalerData,
        //priorityclassData,
        //customresourcedefinitionData,
        //poddisruptionbudgetData,
        eventData, 
        //endpointData,
        nodeData, 
        //podtemplateData,
        //mutatingwebhookconfigurationData,
        //validatingwebhookconfigurationData,
        apiserviceData, 
        //controllerrevisionData,
        leaseData, 
        //certificateData,
        //certificateSigningRequestData,
        componentstatusData, hpa, podLogs] = await Promise.all(promises);
        const resourcesToAddNamespace = [
            [pods, "pods"],
            [serviceData, "services"],
            [configmapData, "configmap"],
            [deploymentData, "deployment"],
            [replicasetData, "replicaset"],
            [statefulsetData, "statefulset"],
            [daemonsetData, "daemonset"],
            //[jobData, "job"],
            //[cronjobData, "cronjob"],
            [ingressData, "ingress"],
            [persistentvolumeData, "persistentvolume"],
            [persistentvolumeclaimData, "persistentvolumeclaim"],
            [secretData, "secret"],
            [serviceaccountData, "serviceaccount"],
            //[roleData, "role"],
            //[rolebindingData, "rolebinding"],
            //[clusterroleData, "clusterrole"],
            //[clusterrolebindingData, "clusterrolebinding"],
            [storageclassData, "storageclass"],
            [networkpolicyData, "networkpolicy"],
            //[podsecuritypolicyData, "podsecuritypolicy"],
            //[limitrangeData, "limitrange"], // no crash but no data
            //[resourcequotaData, "resourcequota"], // no crash but no data
            //[horizontalpodautoscalerData, "horizontalpodautoscaler"],
            //[verticalpodautoscalerData, "verticalpodautoscaler"],
            //[priorityclassData, "priorityclass"],
            //[customresourcedefinitionData, "customresourcedefinition"],
            //[poddisruptionbudgetData, "poddisruptionbudget"],
            [eventData, "event"],
            //[endpointData, "endpoint"],
            [nodeData, "node"],
            //[podtemplateData, "podtemplate"], // no crash but no data
            //[mutatingwebhookconfigurationData, "mutatingwebhookconfiguration"],
            //[validatingwebhookconfigurationData, "validatingwebhookconfiguration"],
            [apiserviceData, "apiservice"],
            //[controllerrevisionData, "controllerrevision"],
            [leaseData, "lease"],
            //[certificateData, "certificate"],
            //[certificateSigningRequestData, "certificateSigningRequest"],
            [componentstatusData, "componentstatus"],
            [hpa, "hpa"],
            [podLogs, "podLogs"]
        ];
        Promise.all(resourcesToAddNamespace.map(async (resource) => {
            kubResources = await getAllElementsWithNameSpace(resource, item.metadata.name, kubResources);
        }));
        helmData?.forEach((helmItem) => {
            kubResources["helm"].push(helmItem);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}
exports.kubernetesListing = kubernetesListing;
async function getAllElementsWithNameSpace(resources, namespace, kubResources) {
    const [resourceData, resourceName] = resources;
    if (resourceData == null)
        return kubResources;
    await Promise.all(resourceData.map(async (resource) => {
        resource.metadata.namespace = namespace;
        kubResources[resourceName].push(resource);
    }));
    return kubResources;
}
async function collectHelm(namespace) {
    try {
        let helmData = await helm_ts_1.default.list({ namespace: namespace });
        return helmData;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPods(k8sApiCore, namespace) {
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectServices(k8sApiCore, namespace) {
    try {
        const services = await k8sApiCore.listNamespacedService(namespace);
        return services?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectConfigmap(k8sApiCore, namespace) {
    try {
        const configmap = await k8sApiCore.listNamespacedConfigMap(namespace);
        return configmap?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectDeployment(k8sAppsV1Api, namespace) {
    try {
        const deployment = await k8sAppsV1Api.listNamespacedDeployment(namespace);
        return deployment?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectReplicaset(k8sAppsV1Api, namespace) {
    try {
        const replicasets = await k8sAppsV1Api.listNamespacedReplicaSet(namespace);
        return replicasets?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectStatefulset(k8sAppsV1Api, namespace) {
    try {
        const statefulsets = await k8sAppsV1Api.listNamespacedStatefulSet(namespace);
        return statefulsets?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectDaemonset(k8sAppsV1Api, namespace) {
    try {
        const daemonsets = await k8sAppsV1Api.listNamespacedDaemonSet(namespace);
        return daemonsets?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//TODO:find a way to get jobs
async function collectJob(k8sApiCore, namespace) {
    try {
        const jobs = await k8sApiCore.listNamespacedJob(namespace);
        return jobs?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//TODO:find a way to get cronjobs
async function collectCronjob(k8sApiCore, namespace) {
    try {
        const cronjobs = await k8sApiCore.listNamespacedCronJob(namespace);
        return cronjobs?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectIngress(k8sNetworkingV1Api, namespace) {
    try {
        const ingress = await k8sNetworkingV1Api.listNamespacedIngress(namespace);
        return ingress?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPersistentvolume(k8sApiCore, namespace) {
    try {
        const persistentVolumes = await k8sApiCore.listPersistentVolume(namespace);
        return persistentVolumes?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPersistentvolumeclaim(k8sApiCore, namespace) {
    try {
        const persistentVolumeClaims = await k8sApiCore.listNamespacedPersistentVolumeClaim(namespace);
        return persistentVolumeClaims?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectSecret(k8sApiCore, namespace) {
    try {
        const secrets = await k8sApiCore.listNamespacedSecret(namespace);
        return secrets?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectServiceaccount(k8sApiCore, namespace) {
    try {
        const serviceAccounts = await k8sApiCore.listNamespacedServiceAccount(namespace);
        return serviceAccounts?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectRole(k8sRbacAuthorizationV1Api, namespace) {
    try {
        const roles = await k8sRbacAuthorizationV1Api.listNamespacedRole(namespace);
        return roles?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectRolebinding(k8sRbacAuthorizationV1Api, namespace) {
    try {
        const roleBindings = await k8sRbacAuthorizationV1Api.listNamespacedRoleBinding(namespace);
        return roleBindings?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectClusterrole(k8sRbacAuthorizationV1Api, namespace) {
    try {
        const clusterRoles = await k8sRbacAuthorizationV1Api.listClusterRole();
        return clusterRoles?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectClusterrolebinding(k8sRbacAuthorizationV1Api, namespace) {
    try {
        const clusterRoleBindings = await k8sRbacAuthorizationV1Api.listClusterRoleBinding();
        return clusterRoleBindings?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectStorageclass(k8sStorageV1Api, namespace) {
    try {
        const storageClasses = await k8sStorageV1Api.listStorageClass();
        return storageClasses?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectNetworkpolicy(k8sNetworkingV1Api, namespace) {
    try {
        const networkPolicies = await k8sNetworkingV1Api.listNamespacedNetworkPolicy(namespace);
        return networkPolicies?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get podsecuritypolicy
async function collectPodsecuritypolicy(k8sApiCore, namespace) {
    try {
        const podSecurityPolicies = await k8sApiCore.listPodSecurityPolicy();
        return podSecurityPolicies?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectLimitrange(k8sApiCore, namespace) {
    try {
        const limitRanges = await k8sApiCore.listNamespacedLimitRange(namespace);
        return limitRanges?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectResourcequota(k8sApiCore, namespace) {
    try {
        const resourceQuotas = await k8sApiCore.listNamespacedResourceQuota(namespace);
        return resourceQuotas?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get horizontalpodautoscaler
async function collectHorizontalpodautoscaler(k8sApiCore, namespace) {
    try {
        const horizontalPodAutoscalers = await k8sApiCore.listNamespacedHorizontalPodAutoscaler(namespace);
        return horizontalPodAutoscalers?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get verticalpodautoscaler
async function collectVerticalpodautoscaler(k8sApiCore, namespace) {
    try {
        const verticalPodAutoscalers = await k8sApiCore.listNamespacedVerticalPodAutoscaler(namespace);
        return verticalPodAutoscalers?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get priorityclass
async function collectPriorityclass(k8sApiCore, namespace) {
    try {
        const priorityClasses = await k8sApiCore.listPriorityClass();
        return priorityClasses?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get customresourcedefinition
async function collectCustomresourcedefinition(k8sApiCore, namespace) {
    try {
        const customResourceDefinitions = await k8sApiCore.listCustomResourceDefinition();
        return customResourceDefinitions?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get poddisruptionbudget
async function collectPoddisruptionbudget(k8sApiCore, namespace) {
    try {
        const podDisruptionBudgets = await k8sApiCore.listNamespacedPodDisruptionBudget(namespace);
        return podDisruptionBudgets?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectEvent(k8sApiCore, namespace) {
    try {
        const events = await k8sApiCore.listNamespacedEvent(namespace);
        return events?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectEndpoint(k8sApiCore, namespace) {
    try {
        const endpoints = await k8sApiCore.listNamespacedEndpoint(namespace);
        return endpoints?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectNode(k8sApiCore, namespace) {
    try {
        const nodes = await k8sApiCore.listNode();
        return nodes?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPodtemplate(k8sApiCore, namespace) {
    try {
        const podTemplates = await k8sApiCore.listNamespacedPodTemplate(namespace);
        return podTemplates?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectMutatingwebhookconfiguration(k8sApiCore, namespace) {
    try {
        const mutatingWebhookConfigurations = await k8sApiCore.listMutatingWebhookConfiguration();
        return mutatingWebhookConfigurations?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get validatingwebhookconfiguration
async function collectValidatingwebhookconfiguration(k8sApiCore, namespace) {
    try {
        const validatingWebhookConfigurations = await k8sApiCore.listValidatingWebhookConfiguration();
        return validatingWebhookConfigurations?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectApiservice(k8sApiregistrationV1Api, namespace) {
    try {
        const apiServices = await k8sApiregistrationV1Api.listAPIService();
        return apiServices?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get controllerrevision
async function collectControllerrevision(k8sApiCore, namespace) {
    try {
        const controllerRevisions = await k8sApiCore.listNamespacedControllerRevision(namespace);
        return controllerRevisions?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectLease(k8CoordinationV1Api, namespace) {
    try {
        const leases = await k8CoordinationV1Api.listNamespacedLease(namespace);
        return leases?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get certificate
async function collectCertificate(k8sApiCore, namespace) {
    try {
        const certificates = await k8sApiCore.listNamespacedCertificate(namespace);
        return certificates?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectCertificateSigningRequest(k8scertificatesV1Api, namespace) {
    try {
        const certificateSigningRequests = await k8scertificatesV1Api.listCertificateSigningRequest();
        return certificateSigningRequests?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
//todo: find a way to get componentstatus
async function collectComponentstatus(k8sApiCore, namespace) {
    try {
        const componentStatuses = await k8sApiCore.listComponentStatus();
        return componentStatuses?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPodLogs(k8sLog, k8sApiCore, namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("podLogs"))
        return [];
    if (globalConfiguration.scanDelay == null)
        globalConfiguration.scanDelay = 3600;
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        const stream = require('stream');
        const logsData = [];
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await Promise.all(pods?.body?.items.map(async (pod) => {
            const logStream = new stream.PassThrough();
            const currDate = new Date();
            const interval = new Date(currDate.getTime() - globalConfiguration.scanDelay * 1000);
            logStream.on('data', (chunk) => {
                const logEntries = chunk.toString();
                logsData.push({
                    metadata: pod.metadata,
                    logs: logEntries.split('\n').map((line) => ({ line })),
                    interval: interval
                });
            });
            try {
                const req = await k8sLog.log(namespace, pod.metadata.name, null, logStream, {
                    follow: true,
                    tailLines: 50,
                    pretty: false,
                    timestamps: true,
                    sinceSeconds: globalConfiguration.scanDelay
                });
                if (req) {
                    await delay(2000);
                    req.abort();
                }
            }
            catch (err) {
                logger.debug("error when retrieving log on pod :" + pod.metadata.name);
                logger.silly(err);
            }
        }));
        return logsData;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectHorizontalPodAutoscaler(autoscalingV1Api, namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("hpa"))
        return [];
    try {
        const hpa = await autoscalingV1Api.listNamespacedHorizontalPodAutoscaler(namespace);
        return hpa?.body?.items;
    }
    catch (error) {
        console.error("Error getting Pod:", error);
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0dhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2t1YmVybmV0ZXNHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWlDRTs7Ozs7O0FBRUYsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixjQUFjO0FBQ2QscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0IsaUNBQWlDO0FBQ2pDLCtCQUErQjtBQUMvQix1QkFBdUI7QUFDdkIsa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QixrQkFBa0I7QUFDbEIsc0NBQXNDO0FBQ3RDLHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFFNUIsc0RBQTJCO0FBQzNCLDZEQUF1RDtBQUV2RCxpRkFBa0g7QUFDbEgsc0ZBQXNFO0FBQ3RFLCtDQUFpRjtBQUVqRixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQy9DLElBQUksYUFBOEIsQ0FBQztBQUNuQyxNQUFNLG1CQUFtQixHQUFHLElBQUEsd0JBQVMsR0FBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7QUFFaEQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxnQkFBbUM7SUFDakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXVCLENBQUM7SUFDakQsS0FBSSxJQUFJLE1BQU0sSUFBSSxnQkFBZ0IsSUFBRSxFQUFFLEVBQUM7UUFDbkMsYUFBYSxHQUFHLE1BQU0sQ0FB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