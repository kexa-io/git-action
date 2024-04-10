"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDScansIQuery = void 0;
exports.CRUDScansIQuery = {
    Create: {
        One: `
            INSERT INTO Scans (error, resourceId, ruleId)
            VALUES (?, ?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Scans
            WHERE ID = ?
        `,
        All: `
            SELECT * FROM Scans
        `
    },
    Delete: {
        One: `
            DELETE FROM Scans
            WHERE ID = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbnMuaXF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3F1ZXJ5L0NSVUQvc2NhbnMuaXF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsZUFBZSxHQUFHO0lBQzNCLE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7O1NBR0o7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRTs7O1NBR0o7UUFDRCxHQUFHLEVBQUU7O1NBRUo7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7O1NBR0o7S0FDSjtDQUNKLENBQUMifQ==