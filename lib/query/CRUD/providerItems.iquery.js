"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDProviderItemsIQuery = void 0;
exports.CRUDProviderItemsIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO ProviderItems (name, providerId) VALUES (?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM ProviderItems WHERE ID = ?
        `,
        ByName: `
            SELECT * FROM ProviderItems WHERE name = ?
        `,
        OneByNameAndProvider: `
            SELECT * FROM ProviderItems WHERE name = ? AND providerId = ?
        `,
        ByProvider: `
            SELECT * FROM ProviderItems WHERE providerId = ?
        `,
        All: `
            SELECT * FROM ProviderItems
        `
    },
    Delete: {
        One: `
            DELETE FROM ProviderItems WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM ProviderItems WHERE name = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJJdGVtcy5pcXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcXVlcnkvQ1JVRC9wcm92aWRlckl0ZW1zLmlxdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLHVCQUF1QixHQUFHO0lBQ25DLE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7U0FFSjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFOztTQUVKO1FBQ0QsTUFBTSxFQUFFOztTQUVQO1FBQ0Qsb0JBQW9CLEVBQUU7O1NBRXJCO1FBQ0QsVUFBVSxFQUFFOztTQUVYO1FBQ0QsR0FBRyxFQUFFOztTQUVKO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixHQUFHLEVBQUU7O1NBRUo7UUFDRCxTQUFTLEVBQUU7O1NBRVY7S0FDSjtDQUNKLENBQUEifQ==