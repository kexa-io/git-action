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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cERpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9kaXNwbGF5L2h0dHBEaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsY0FBYyxDQUFDLElBQVcsRUFBRSxhQUFrQixFQUFFLFFBQWUsS0FBSztJQUNoRixRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDdEIsS0FBSyxTQUFTO1lBQ1YsT0FBTyxRQUFRLEdBQUcsYUFBYSxFQUFFLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxhQUFhLEVBQUUsSUFBSSxDQUFBO1FBQ2xGO1lBQ0ksT0FBTyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO0tBQ3JEO0FBQ0wsQ0FBQztBQVBELHdDQU9DIn0=