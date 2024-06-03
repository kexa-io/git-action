"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKubernetesResourcesDefault = void 0;
function createKubernetesResourcesDefault() {
    return {
        namespaces: [],
        pods: [],
        services: [],
        helm: [],
        configmap: [],
        deployment: [],
        replicaset: [],
        statefulset: [],
        daemonset: [],
        job: [],
        cronjob: [],
        ingress: [],
        persistentvolume: [],
        persistentvolumeclaim: [],
        secret: [],
        serviceaccount: [],
        role: [],
        rolebinding: [],
        clusterrole: [],
        clusterrolebinding: [],
        storageclass: [],
        networkpolicy: [],
        podsecuritypolicy: [],
        limitrange: [],
        resourcequota: [],
        horizontalpodautoscaler: [],
        verticalpodautoscaler: [],
        priorityclass: [],
        customresourcedefinition: [],
        poddisruptionbudget: [],
        event: [],
        endpoint: [],
        node: [],
        podtemplate: [],
        mutatingwebhookconfiguration: [],
        validatingwebhookconfiguration: [],
        apiservice: [],
        controllerrevision: [],
        lease: [],
        certificate: [],
        certificateSigningRequest: [],
        componentstatus: [],
        hpa: [],
        podLogs: [],
        podsConsumption: []
    };
}
exports.createKubernetesResourcesDefault = createKubernetesResourcesDefault;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlcy5tb2RlbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2t1YmVybmV0ZXMva3ViZXJuZXRlcy5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0RBLFNBQWdCLGdDQUFnQztJQUM1QyxPQUFPO1FBQ0gsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsRUFBRTtRQUNiLFVBQVUsRUFBRSxFQUFFO1FBQ2QsVUFBVSxFQUFFLEVBQUU7UUFDZCxXQUFXLEVBQUUsRUFBRTtRQUNmLFNBQVMsRUFBRSxFQUFFO1FBQ2IsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixxQkFBcUIsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsY0FBYyxFQUFFLEVBQUU7UUFDbEIsSUFBSSxFQUFFLEVBQUU7UUFDUixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxFQUFFO1FBQ2Ysa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixZQUFZLEVBQUUsRUFBRTtRQUNoQixhQUFhLEVBQUUsRUFBRTtRQUNqQixpQkFBaUIsRUFBRSxFQUFFO1FBQ3JCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsYUFBYSxFQUFFLEVBQUU7UUFDakIsdUJBQXVCLEVBQUUsRUFBRTtRQUMzQixxQkFBcUIsRUFBRSxFQUFFO1FBQ3pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLHdCQUF3QixFQUFFLEVBQUU7UUFDNUIsbUJBQW1CLEVBQUUsRUFBRTtRQUN2QixLQUFLLEVBQUUsRUFBRTtRQUNULFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixXQUFXLEVBQUUsRUFBRTtRQUNmLDRCQUE0QixFQUFFLEVBQUU7UUFDaEMsOEJBQThCLEVBQUUsRUFBRTtRQUNsQyxVQUFVLEVBQUUsRUFBRTtRQUNkLGtCQUFrQixFQUFFLEVBQUU7UUFDdEIsS0FBSyxFQUFFLEVBQUU7UUFDVCxXQUFXLEVBQUUsRUFBRTtRQUNmLHlCQUF5QixFQUFFLEVBQUU7UUFDN0IsZUFBZSxFQUFFLEVBQUU7UUFDbkIsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsRUFBRTtRQUNYLGVBQWUsRUFBRSxFQUFFO0tBQ3RCLENBQUM7QUFDTixDQUFDO0FBaERELDRFQWdEQyJ9