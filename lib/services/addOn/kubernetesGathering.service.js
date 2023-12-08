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
    *     - helm
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kubernetesListing = exports.collectData = void 0;
const helm_ts_1 = __importDefault(require("helm-ts"));
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
                "helm": kubernetesList["helm"],
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
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["helm"] = [];
    const namespacePromises = namespaces.body.items.map(async (item) => {
        const promises = [
            collectHelm(item.metadata.name),
            collectPods(k8sApiCore, item.metadata.name),
        ];
        const [helmData, pods] = await Promise.all(promises);
        helmData?.forEach((helmItem) => {
            kubResources["helm"].push(helmItem);
        });
        pods?.body?.items?.forEach((pod) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}
exports.kubernetesListing = kubernetesListing;
async function collectHelm(namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("helm"))
        return null;
    try {
        let helmData = await helm_ts_1.default.list({ namespace: namespace });
        return helmData;
    }
    catch (e) {
        logger.debug(e);
        return null;
    }
}
async function collectPods(k8sApiCore, namespace) {
    if (!currentConfig?.ObjectNameNeed?.includes("pods"))
        return null;
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods;
    }
    catch (e) {
        logger.debug(e);
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0dhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2t1YmVybmV0ZXNHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7RUFVRTs7Ozs7O0FBRUYsc0RBQTJCO0FBRTNCLHNGQUFzRTtBQUN0RSwrQ0FBaUY7QUFFakYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWhDLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUMvQyxJQUFJLGFBQThCLENBQUM7QUFFNUIsS0FBSyxVQUFVLFdBQVcsQ0FBQyxnQkFBbUM7SUFDakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXVCLENBQUM7SUFDakQsS0FBSSxJQUFJLE1BQU0sSUFBSSxnQkFBZ0IsSUFBRSxFQUFFLEVBQUM7UUFDbkMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSTtZQUNBLElBQUksWUFBWSxHQUFHLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pFLElBQUEsNkJBQXFCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsZUFBTyxFQUFDLFlBQVksSUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFD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