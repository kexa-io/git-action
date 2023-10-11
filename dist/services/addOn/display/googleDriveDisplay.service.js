"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    let beginLink = "https://docs.google.com/document/d/";
    let endLink = "/edit?usp=drivesdk";
    let beginLinkHTML = `<a href="`;
    let endLinkHTML = `">`;
    let fullLink;
    fullLink = (isSms ? ' ' : beginLinkHTML) + beginLink + objectContent?.id + endLink + (isSms ? ' ' : endLinkHTML);
    switch (rule?.objectName) {
        case "files":
            return "Title : " + objectContent.name + (isSms ? "\n" : "</br>") + "Link : " + fullLink + (isSms ? "\n" : "</br>");
        default:
            return 'Drive Scan : Id : ' + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=googleDriveDisplay.service.js.map