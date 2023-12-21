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
const kubernetes_models_1 = require("../../models/kubernetes/kubernetes.models");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const files_1 = require("../../helpers/files");
const yaml = require('js-yaml');
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("KubernetesLogger");
const k8s = require('@kubernetes/client-node');
let currentConfig;
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
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    // const k8sExtensionsV1beta1Api = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    // const k8sRbacAuthorizationV1Api = kc.makeApiClient(k8s.rbacAuthorizationV1Api);
    const k8sStorageV1Api = kc.makeApiClient(k8s.StorageV1Api);
    const k8sApiregistrationV1Api = kc.makeApiClient(k8s.ApiregistrationV1Api);
    const k8CoordinationV1Api = kc.makeApiClient(k8s.CoordinationV1Api);
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
            collectComponentstatus(k8sApiCore, item.metadata.name)
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
        componentstatusData] = await Promise.all(promises);
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
            [componentstatusData, "componentstatus"], // work
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0dhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2t1YmVybmV0ZXNHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUErQkU7Ozs7OztBQUVGLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsY0FBYztBQUNkLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIsNEJBQTRCO0FBQzVCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMsMkJBQTJCO0FBQzNCLGlDQUFpQztBQUNqQywrQkFBK0I7QUFDL0IsdUJBQXVCO0FBQ3ZCLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFDN0Isa0JBQWtCO0FBQ2xCLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBRTVCLHNEQUEyQjtBQUMzQixpRkFBa0g7QUFDbEgsc0ZBQXNFO0FBQ3RFLCtDQUFpRjtBQUVqRixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFaEMsc0RBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQy9DLElBQUksYUFBOEIsQ0FBQztBQUU1QixLQUFLLFVBQVUsV0FBVyxDQUFDLGdCQUFtQztJQUNqRSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBdUIsQ0FBQztJQUNqRCxLQUFJLElBQUksTUFBTSxJQUFJLGdCQUFnQixJQUFFLEVBQUUsRUFBQztRQUNuQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFD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