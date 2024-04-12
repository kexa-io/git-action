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
        case "KexaAwsCustoms.tagsValueListing":
            return 'AWS Scan : Tag name : ' + objectContent.Value + ' in Region : ' + objectContent.Region;
        case "ec2SG":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#SecurityGroup:groupId=` + objectContent?.GroupId + (isSms ? ' ' : '">') + objectContent?.GroupId + (isSms ? `.` : `</a>`);
        case "resourceGroups":
            return 'GroupArn :' + objectContent?.GroupArn;
        default:
            return 'AWS Scan : Object Id(s) : ' + awsFindIdToDisplay(objectContent);
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
function awsFindIdToDisplay(object) {
    const result = [];
    for (const key in object) {
        if (object.hasOwnProperty(key) && typeof object[key] !== 'function' && key.endsWith('Id')) {
            result.push(key + "=" + object[key]);
        }
    }
    return result ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzRGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2Rpc3BsYXkvYXdzRGlzcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLGNBQWMsQ0FBQyxJQUFXLEVBQUUsYUFBa0IsRUFBRSxRQUFlLEtBQUs7SUFDaEYsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFHLGFBQWEsRUFBRSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7SUFDM0UsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7SUFDL0IsSUFBSSxRQUFRLENBQUM7SUFDYixJQUFJLEtBQUs7UUFDTCxRQUFRLEdBQUcsSUFBSSxDQUFDOztRQUVoQixRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMvQyxRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDdEIsS0FBSyxpQ0FBaUM7WUFDbEMsT0FBUSx3QkFBd0IsR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BHLEtBQUssT0FBTztZQUNSLE9BQU8sUUFBUSxHQUFHLGtCQUFrQixHQUFHLGFBQWEsRUFBRSxNQUFNLEdBQUcseUJBQXlCLEdBQUUsYUFBYSxFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdMLEtBQUssZ0JBQWdCO1lBQ2pCLE9BQU8sWUFBWSxHQUFHLGFBQWEsRUFBRSxRQUFRLENBQUM7UUFDbEQ7WUFDSSxPQUFPLDRCQUE0QixHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQy9FO0FBQ0wsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCxTQUFTLDBCQUEwQixDQUFDLFdBQW1CO0lBQ25ELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFXO0lBQ25DLE1BQU0sTUFBTSxHQUFVLEVBQUUsQ0FBQztJQUN6QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7SUFDRCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUM7QUFDMUIsQ0FBQyJ9