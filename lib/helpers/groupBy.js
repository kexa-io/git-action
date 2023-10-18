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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFJLEdBQVEsRUFBRSxFQUFvQjtJQUNyRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDMUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQVBELDBCQU9DIn0=