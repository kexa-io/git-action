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
    *     - podsConsumption
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
let globalConfiguration = (0, loaderConfig_1.getConfig)().global ?? {};
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
                "podLogs": kubernetesList["podLogs"],
                "podsConsumption": kubernetesList["podsConsumption"],
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
    const metricsClient = new k8s.Metrics(kc);
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
            collectPodLogs(k8sLog, k8sApiCore, item.metadata.name),
            collectPodsConsumption(k8sApiCore, metricsClient, item.metadata.name)
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
        componentstatusData, hpa, podLogs, podsConsumption] = await Promise.all(promises);
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
            [podLogs, "podLogs"],
            [podsConsumption, "podsConsumption"]
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
    if (!currentConfig?.ObjectNameNeed?.includes("helm"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("pods"))
        return [];
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods?.body?.items;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
async function collectPodsConsumption(k8sApiCore, metricsClient, namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("podsConsumption"))
        return [];
    let podsAndContainersColumns;
    try {
        const topPodsRes2 = await k8s.topPods(k8sApiCore, metricsClient, namespace);
        podsAndContainersColumns = topPodsRes2.flatMap((pod) => {
            return pod.Containers.map((containerUsage) => {
                return {
                    pod: pod.Pod.metadata.name,
                    name: containerUsage.Container,
                    CPUUsage: containerUsage.CPUUsage,
                    MemoryUsage: containerUsage.MemoryUsage,
                };
            });
        });
    }
    catch (err) {
        logger.debug(err);
    }
    const combinedData = {
        data: podsAndContainersColumns,
        metadata: {},
    };
    return [combinedData];
}
async function collectServices(k8sApiCore, namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("services"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("configmap"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("deployment"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("replicaset"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("statefulset"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("daemonset"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("job"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("cronjob"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("ingress"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("persistentvolume"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("persistentvolumeclaim"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("secret"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("serviceaccount"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("role"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("rolebinding"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("clusterrole"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("clusterrolebinding"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("storageclass"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("networkpolicy"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("podsecuritypolicy"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("limitrange"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("resourcequota"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("horizontalpodautoscaler"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("verticalpodautoscaler"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("priorityclass"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("customresourcedefinition"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("poddisruptionbudget"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("event"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("endpoint"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("node"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("podtemplate"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("mutatingwebhookconfiguration"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("validatingwebhookconfiguration"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("apiservice"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("controllerrevision"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("lease"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("certificate"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("certificateSigningRequest"))
        return [];
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
    if (!currentConfig?.ObjectNameNeed?.includes("componentstatus"))
        return [];
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
    if (globalConfiguration?.scanDelay == null)
        globalConfiguration.scanDelay = 3600;
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        const stream = require('stream');
        const logsData = [];
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await Promise.all(pods?.body?.items.map(async (pod) => {
            const logStream = new stream.PassThrough();
            const currDate = new Date();
            const interval = new Date(currDate.getTime() - (globalConfiguration?.scanDelay ?? 3600) * 1000);
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
                    sinceSeconds: globalConfiguration?.scanDelay ?? 3600
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0dhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2t1YmVybmV0ZXNHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQ0U7Ozs7OztBQUVGLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsY0FBYztBQUNkLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIsNEJBQTRCO0FBQzVCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMsMkJBQTJCO0FBQzNCLGlDQUFpQztBQUNqQywrQkFBK0I7QUFDL0IsdUJBQXVCO0FBQ3ZCLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFDN0Isa0JBQWtCO0FBQ2xCLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBRTVCLHNEQUEyQjtBQUMzQiw2REFBdUQ7QUFFdkQsaUZBQWtIO0FBQ2xILHNGQUFzRTtBQUN0RSwrQ0FBaUY7QUFFakYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWhDLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUMvQyxJQUFJLGFBQThCLENBQUM7QUFDbkMsSUFBSSxtQkFBbUIsR0FBRyxJQUFBLHdCQUFTLEdBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0FBRTVDLEtBQUssVUFBVSxXQUFXLENBQUMsZ0JBQW1DO0lBQ2pFLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUF1QixDQUFDO0lBQ2pELEtBQUksSUFBSSxNQUFNLElBQUksZ0JBQWdCLElBQUUsRUFBRSxFQUFDO1FBQ25DLGFBQWEsR0FBRyxNQUFNLENB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