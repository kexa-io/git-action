"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDResourcesIQuery = void 0;
exports.CRUDResourcesIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Resources (content, originId, providerItemId) VALUES (?, ?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Resources WHERE ID = ?
        `,
        OneByContent: `
            SELECT * FROM Resources WHERE content = ?
        `,
        ByOrigin: `
            SELECT * FROM Resources WHERE originId = ?
        `,
        All: `
            SELECT * FROM Resources
        `
    },
    Delete: {
        One: `
            DELETE FROM Resources WHERE ID = ?
        `,
        OneByContent: `
            DELETE FROM Resources WHERE content = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLmlxdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9xdWVyeS9DUlVEL3Jlc291cmNlcy5pcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQkFBbUIsR0FBRztJQUMvQixNQUFNLEVBQUU7UUFDSixHQUFHLEVBQUU7O1NBRUo7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRTs7U0FFSjtRQUNELFlBQVksRUFBRTs7U0FFYjtRQUNELFFBQVEsRUFBRTs7U0FFVDtRQUNELEdBQUcsRUFBRTs7U0FFSjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osR0FBRyxFQUFFOztTQUVKO1FBQ0QsWUFBWSxFQUFFOztTQUViO0tBQ0o7Q0FDSixDQUFDIn0=