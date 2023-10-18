"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    let link = "https://" + objectContent?.Region + ".console.aws.amazon.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "ec2Volume":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#VolumeDetails:volumeId=` + objectContent?.VolumeId + (isSms ? ' ' : '">') + objectContent?.VolumeId + (isSms ? `.` : `</a>`);
        case "ec2SG":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#SecurityGroup:groupId=` + objectContent?.GroupId + (isSms ? ' ' : '">') + objectContent?.GroupId + (isSms ? `.` : `</a>`);
        case "ec2Instance":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#InstanceDetails:instanceId=` + objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`);
        case "rds":
            return fullLink + `rds/home?region=` + objectContent?.Region + `#InstanceDetails:instanceId=` + objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`);
        case "tagsValue":
            return fullLink + `resource-groups/tag-editor/find-resources?region=` + objectContent?.Region + (isSms ? ' ' : '">') + objectContent?.name + (isSms ? `.` : `</a>`);
        case "ecrRepository":
            return fullLink + objectContent?.repositoryUri + (isSms ? ' ' : '">') + objectContent?.repositoryName + (isSms ? `.` : `</a>`);
        case "ecsCluster":
            return 'ClusterArn :' + objectContent?.clusterArn;
        case "resourceGroups":
            return 'GroupArn :' + objectContent?.GroupArn;
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
function cutAWSAvailabilityToRegion(inputString) {
    const regionNumber = inputString.search(/\d+(?![\d])/);
    if (regionNumber !== -1) {
        console.log("Region AWS : " + inputString.substring(0, regionNumber + 1));
        return inputString.substring(0, regionNumber + 1);
    }
    return inputString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzRGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2Rpc3BsYXkvYXdzRGlzcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLGNBQWMsQ0FBQyxJQUFXLEVBQUUsYUFBa0IsRUFBRSxRQUFlLEtBQUs7SUFDaEYsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFHLGFBQWEsRUFBRSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7SUFDM0UsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7SUFDL0IsSUFBSSxRQUFRLENBQUM7SUFDYixJQUFJLEtBQUs7UUFDTCxRQUFRLEdBQUcsSUFBSSxDQUFDOztRQUVoQixRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMvQyxRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDdEIsS0FBSyxXQUFXO1lBQ1osT0FBTyxRQUFRLEdBQUcsa0JBQWtCLEdBQUcsYUFBYSxFQUFFLE1BQU0sR0FBRywwQkFBMEIsR0FBRSxhQUFhLEVBQUUsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDaE0sS0FBSyxPQUFPO1lBQ1IsT0FBTyxRQUFRLEdBQUcsa0JBQWtCLEdBQUcsYUFBYSxFQUFFLE1BQU0sR0FBRyx5QkFBeUIsR0FBRSxhQUFhLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENB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