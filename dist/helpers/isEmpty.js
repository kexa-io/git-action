"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
function isEmpty(variable) {
    if (variable === null ||
        variable === undefined ||
        variable === '' ||
        (Array.isArray(variable) && variable.length === 0) ||
        (typeof variable === 'object' && Object.keys(variable).every(key => variable[key] === undefined))) {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map