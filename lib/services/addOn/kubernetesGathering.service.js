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
async function collectData(kubernetesConfig) {
    logger.info("starting collectKubernetes");
    let resources = new Array();
    for (let config of kubernetesConfig ?? []) {
        let prefix = config.prefix ?? (kubernetesConfig.indexOf(config) + "-");
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
        let helmData = await helm_ts_1.default.list({ namespace: item.metadata.name });
        helmData.forEach((helmItem) => {
            kubResources["helm"].push(helmItem);
        });
        const pods = await k8sApiCore.listNamespacedPod(item.metadata.name);
        pods.body.items.forEach((pod) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}
exports.kubernetesListing = kubernetesListing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0dhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2t1YmVybmV0ZXNHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7RUFVRTs7Ozs7O0FBRUYsc0RBQTJCO0FBRTNCLHNGQUFpRjtBQUNqRiwrQ0FBaUY7QUFFakYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWhDLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUV4QyxLQUFLLFVBQVUsV0FBVyxDQUFDLGdCQUFtQztJQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXVCLENBQUM7SUFDakQsS0FBSSxJQUFJLE1BQU0sSUFBSSxnQkFBZ0IsSUFBRSxFQUFFLEVBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJO1lBQ0EsSUFBSSxZQUFZLEdBQUcsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekUsSUFBQSw2QkFBcUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxlQUFPLEVBQUMsWUFBWSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLDBCQUEwQixDQUFDLENBQUM7WUFDakgsTUFB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