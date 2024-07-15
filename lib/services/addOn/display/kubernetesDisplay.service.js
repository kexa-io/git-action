"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    switch (rule?.objectName) {
        case "namespaces":
            return `Namespace name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid;
        case "pods":
            if (isSms)
                return `Name : ` + objectContent.metadata.name + ` and NameSpace : ` + objectContent.metadata.namespace;
            else
                return `Name : ` + objectContent.metadata.name + `</br>NameSpace : ` + objectContent.metadata.namespace;
        case "podLogs":
            if (isSms)
                return `Name : ` + objectContent.metadata.name + ` and NameSpace : ` + objectContent.metadata.namespace + ` Scanned since ` + objectContent.interval;
            else
                return `Name : ` + objectContent.metadata.name + `</br>NameSpace : ` + objectContent.metadata.namespace + `</br>Scanned since ` + objectContent.interval;
        case "helm":
            return `Helm name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid;
        case "podsConsumption":
            return 'pod : ' + objectContent?.data?.pod + ' in NameSpace : ' + objectContent?.metadata?.namespace;
        default:
            return 'resource : Id : ' + objectContent?.metadata?.name + ' in NameSpace : ' + objectContent?.metadata?.namespace;
    }
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0Rpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9kaXNwbGF5L2t1YmVybmV0ZXNEaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsY0FBYyxDQUFDLElBQVcsRUFBRSxhQUFrQixFQUFFLFFBQWUsS0FBSztJQUNoRixRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDdEIsS0FBSyxZQUFZO1lBQ2IsT0FBTyxtQkFBbUIsR0FBRyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksR0FBRyxjQUFjLEdBQUcsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUE7UUFDOUcsS0FBSyxNQUFNO1lBQ1AsSUFBSSxLQUFLO2dCQUNMLE9BQU8sU0FBUyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFBOztnQkFFdkcsT0FBTyxTQUFTLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUE7UUFDL0csS0FBSyxTQUFTO1lBQ1YsSUFBSSxLQUFLO2dCQUNMLE9BQU8sU0FBUyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUE7O2dCQUVwSixPQUFPLFNBQVMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFBO1FBQ2hLLEtBQUssTUFBTTtZQUNQLE9BQU8sY0FBYyxHQUFHLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxHQUFHLGNBQWMsR0FBRyxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQTtRQUN6RyxLQUFLLGlCQUFpQjtZQUNsQixPQUFPLFFBQVEsR0FBRyxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUN6RztZQUNJLE9BQU8sa0JBQWtCLEdBQUcsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsYUFBYSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7S0FDM0g7QUFDTCxDQUFDO0FBckJELHdDQXFCQyJ9