"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDProvidersIQuery = void 0;
exports.CRUDProvidersIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Providers (name) VALUES (?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Providers WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Providers WHERE name = ?
        `,
        All: `
            SELECT * FROM Providers
        `
    },
    Delete: {
        One: `
            DELETE FROM Providers WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM Providers WHERE name = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmlxdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9xdWVyeS9DUlVEL3Byb3ZpZGVycy5pcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQkFBbUIsR0FBRztJQUMvQixNQUFNLEVBQUU7UUFDSixHQUFHLEVBQUU7O1NBRUo7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRTs7U0FFSjtRQUNELFNBQVMsRUFBRTs7U0FFVjtRQUNELEdBQUcsRUFBRTs7U0FFSjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osR0FBRyxFQUFFOztTQUVKO1FBQ0QsU0FBUyxFQUFFOztTQUVWO0tBQ0o7Q0FDSixDQUFBIn0=