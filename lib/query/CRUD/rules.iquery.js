"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDRulesIQuery = void 0;
exports.CRUDRulesIQuery = {
    Create: {
        One: `
            INSERT INTO Rules (name, description, loud, level, providerId, providerItemId)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                description = VALUES(description),
                loud = VALUES(loud),
                level = VALUES(level),
                providerId = VALUES(providerId),
                providerItemId = VALUES(providerItemId)
        `,
        Many: `
            INSERT INTO Rules (name, description, applied, loud, level, providerId, providerItemId)
            VALUES ?
        `
    },
    Read: {
        One: `
            SELECT * FROM Rules
            WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Rules
            WHERE name = ?
        `,
        All: `
            SELECT * FROM Rules
        `
    },
    Update: {
        One: `
            UPDATE Rules
            SET name = ?, description = ?, applied = ?, loud = ?, level = ?, providerId = ?, providerItemId = ?
            WHERE ID = ?
        `
    },
    Delete: {
        One: `
            DELETE FROM Rules
            WHERE ID = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuaXF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3F1ZXJ5L0NSVUQvcnVsZXMuaXF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsZUFBZSxHQUFHO0lBQzNCLE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7Ozs7Ozs7O1NBU0o7UUFDRCxJQUFJLEVBQUU7OztTQUdMO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixHQUFHLEVBQUU7OztTQUdKO1FBQ0QsU0FBUyxFQUFFOzs7U0FHVjtRQUNELEdBQUcsRUFBRTs7U0FFSjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osR0FBRyxFQUFFOzs7O1NBSUo7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7O1NBR0o7S0FDSjtDQUNKLENBQUMifQ==