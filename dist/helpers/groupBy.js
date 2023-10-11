"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
function groupBy(arr, fn) {
    return arr.reduce((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {});
}
exports.groupBy = groupBy;
//# sourceMappingURL=groupBy.js.map