"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function getGCPRegionFromUrl(url) {
    const segments = url.split('/');
    if (segments.length > 0)
        return segments[segments.length - 1];
    return null;
}
function getGCPProjectFromUrl(url) {
    const match = url.match(/\/projects\/([^\/]+)/);
    if (match && match[1])
        return match[1];
    return null;
}
function propertyToSend(rule, objectContent, isSms = false) {
    const zone = getGCPRegionFromUrl(objectContent?.zone);
    const project = getGCPProjectFromUrl(objectContent?.zone);
    let toRet;
    let link;
    if (isSms)
        link = `Resource : ` + objectContent?.name + ` : https://console.cloud.google.com/`;
    else
        link = `Resource : ` + objectContent?.name + ` : <a href="https://console.cloud.google.com/`;
    switch (rule?.objectName) {
        case "bucket":
            toRet = link + `storage/browser/` + objectContent?.id + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`);
            break;
        case "compute":
            toRet = link + `compute/instancesDetail/zones/` + zone + `/instances/` + objectContent?.name + `?authuser=1&project=` + project + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`);
            break;
        case "tasks_queue":
            toRet = link + `"> Id : ` + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        default:
            toRet = link + `"> Id : ` + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
    }
    return toRet;
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwRGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2Rpc3BsYXkvZ2NwRGlzcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQVMsbUJBQW1CLENBQUMsR0FBVztJQUNwQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ25CLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsR0FBVztJQUNyQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFaEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLElBQVcsRUFBRSxhQUFrQixFQUFFLFFBQWUsS0FBSztJQUNoRixNQUFNLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELElBQUksS0FBYyxDQUFDO0lBQ25CLElBQUksSUFBYSxDQUFDO0lBQ2xCLElBQUksS0FBSztRQUNMLElBQUksR0FBRyxhQUFhLEdBQUcsYUFBYSxFQUFFLElBQUksR0FBSSxzQ0FBc0MsQ0FBQzs7UUFFckYsSUFBSSxHQUFHLGFBQWEsR0FBRyxhQUFhLEVBQUUsSUFBSSxHQUFHLCtDQUErQyxDQUFDO0lBQ2pHLFFBQVEsSUFBSSxFQUFFLFVBQVUsRUFBRTtRQUN0QixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsSUFBSSxHQUFHLGtCQUFrQixHQUFHLGFBQWEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDakksTUFBTTtRQUNWLEtBQUssU0FBUztZQUNWLEtBQUssR0FBRyxJQUFJLEdBQUcsZ0NBQWdDLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxhQUFhLEVBQUUsSUFBSSxHQUFHLHNCQUFzQixHQUFHLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMzTSxNQUFNO1FBQ1YsS0FBSyxhQUFhO1lBQ2QsS0FBSyxHQUFHLElBQUksR0FBRyxVQUFVLEdBQUksYUFBYSxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2RSxNQUFNO1FBQ1Y7WUFDSSxLQUFLLEdBQUcsSUFBSSxHQUFHLFVBQVUsR0FBSSxhQUFhLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZFLE1BQU07S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUF4QkQsd0NBd0JDIn0=