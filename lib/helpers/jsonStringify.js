"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringify = void 0;
function jsonStringify(data, space) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, space);
}
exports.jsonStringify = jsonStringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblN0cmluZ2lmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2pzb25TdHJpbmdpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsYUFBYSxDQUFDLElBQVMsRUFBRSxLQUFjO0lBQ25ELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFGRCxzQ0FFQyJ9