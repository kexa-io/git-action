"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    if (isSms)
        return `Id : ` + objectContent?.id + `https://portal.azure.com/#@/resource/` + objectContent?.id;
    else
        return `Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a>`;
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=azureDisplay.service.js.map