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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2lzRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFDLFFBQWE7SUFDakMsSUFDSSxRQUFRLEtBQUssSUFBSTtRQUNqQixRQUFRLEtBQUssU0FBUztRQUN0QixRQUFRLEtBQUssRUFBRTtRQUNmLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxFQUNuRztRQUNFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBWEQsMEJBV0MifQ==