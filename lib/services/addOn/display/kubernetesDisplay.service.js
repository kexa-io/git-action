"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    switch (rule?.objectName) {
        case "namespaces":
            return `Namespace name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid;
        case "pods":
            if (isSms)
                return `Name : ` + objectContent.metadata.generateName + ` and NameSpace : ` + objectContent.metadata.namespace;
            else
                return `Name : ` + objectContent.metadata.generateName + `</br>NameSpace : ` + objectContent.metadata.namespace;
        case "helm":
            return `Helm name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid;
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ViZXJuZXRlc0Rpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9kaXNwbGF5L2t1YmVybmV0ZXNEaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsY0FBYyxDQUFDLElBQVcsRUFBRSxhQUFrQixFQUFFLFFBQWUsS0FBSztJQUNoRixRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDdEIsS0FBSyxZQUFZO1lBQ2IsT0FBTyxtQkFBbUIsR0FBRyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksR0FBRyxjQUFjLEdBQUcsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUE7UUFDOUcsS0FBSyxNQUFNO1lBQ1AsSUFBSSxLQUFLO2dCQUNMLE9BQU8sU0FBUyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFBOztnQkFFL0csT0FBTyxTQUFTLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUE7UUFDdkgsS0FBSyxNQUFNO1lBQ1AsT0FBTyxjQUFjLEdBQUcsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUcsY0FBYyxHQUFHLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFBO1FBQ3pHO1lBQ0ksT0FBTyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO0tBQ3BEO0FBQ0wsQ0FBQztBQWRELHdDQWNDIn0=