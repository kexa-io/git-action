"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    let toRet;
    let link;
    if (isSms)
        link = `Resource : ` + rule?.objectName + ` : `;
    else
        link = `Resource : ` + rule?.objectName + ` : <a href="`;
    switch (rule?.objectName) {
        case "user":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' User : ' + objectContent?.mail + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        case "sku":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Account : ' + objectContent?.accountName + ' Sku Id : ' + objectContent?.skuId + ' SkuPartNb : ' + objectContent?.skuPartNumber + (isSms ? `.` : `</a>`);
            break;
        case "domain":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' DomainId : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        case "secure_score":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Id : ' + objectContent?.id + ' TenantId : ' + objectContent?.azureTenantId + (isSms ? `.` : `</a>`);
            break;
        case "auth_methods":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' User : ' + objectContent?.userName + ' Id : ' + objectContent?.userId + (isSms ? `.` : `</a>`);
            break;
        case "directory_role":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + objectContent?.displayName + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        case "sp":
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + objectContent?.displayName + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        default:
            toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + objectContent?.displayName + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
    }
    return toRet;
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibzM2NURpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9kaXNwbGF5L28zNjVEaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsY0FBYyxDQUFDLElBQVcsRUFBRSxhQUFrQixFQUFFLFFBQWUsS0FBSztJQUM1RSxJQUFJLEtBQWMsQ0FBQztJQUNuQixJQUFJLElBQWEsQ0FBQztJQUNsQixJQUFJLEtBQUs7UUFDRCxJQUFJLEdBQUcsYUFBYSxHQUFHLElBQUksRUFBRSxVQUFVLEdBQUksS0FBSyxDQUFDOztRQUVqRCxJQUFJLEdBQUcsYUFBYSxHQUFHLElBQUksRUFBRSxVQUFVLEdBQUcsY0FBYyxDQUFDO0lBQ2pFLFFBQVEsSUFBSSxFQUFFLFVBQVUsRUFBRTtRQUNsQixLQUFLLE1BQU07WUFDSCxLQUFLLEdBQUcsSUFBSSxHQUFHLDBCQUEwQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxhQUFhLEVBQUUsSUFBSSxHQUFHLFFBQVEsR0FBRyxhQUFhLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzNKLE1BQU07UUFDZCxLQUFLLEtBQUs7WUFDRixLQUFLLEdBQUcsSUFBSSxHQUFHLDBCQUEwQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsR0FBRyxhQUFhLEVBQUUsV0FBVyxHQUFHLFlBQVksR0FBRyxhQUFhLEVBQUUsS0FBSyxHQUFHLGVBQWUsR0FBRyxhQUFhLEVBQUUsYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FB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