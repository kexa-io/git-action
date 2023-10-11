"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    switch (rule?.objectName) {
        case "request":
            return `Url : ` + objectContent?.url + ` with status : ` + objectContent?.code;
        default:
            return 'HTTP Scan : Id : ' + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=httpDisplay.service.js.map