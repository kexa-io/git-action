"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitProperty = void 0;
const splitProperty = (prop, delimiter, ignore = "/") => {
    const result = [];
    let current = "";
    let escape = false;
    for (const char of prop) {
        if (char === delimiter && !escape) {
            result.push(current);
            current = "";
        }
        else if (char === ignore && !escape) {
            escape = true;
        }
        else {
            if (escape && char !== delimiter)
                current += ignore;
            current += char;
            escape = false;
        }
    }
    result.push(current);
    return result;
};
exports.splitProperty = splitProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3NwbGl0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBZ0IsRUFBRSxTQUFjLEdBQUcsRUFBVyxFQUFFO0lBQ3hGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ3JCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDaEI7YUFBTSxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjthQUFNO1lBQ0gsSUFBRyxNQUFNLElBQUksSUFBSSxLQUFLLFNBQVM7Z0JBQUUsT0FBTyxJQUFJLE1BQU0sQ0FBQztZQUNuRCxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDbEI7S0FDSjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsYUFBYSxpQkFvQnpCIn0=