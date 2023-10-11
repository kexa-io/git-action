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
//# sourceMappingURL=o365Display.service.js.map