"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDOriginIQuery = void 0;
exports.CRUDOriginIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Origins (name, description) VALUES (?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Origins WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Origins WHERE name = ?
        `,
        OneByNameAndDescription: `
            SELECT * FROM Origins WHERE name = ? AND description = ?
        `,
        All: `
            SELECT * FROM Origins
        `
    },
    Delete: {
        One: `
            DELETE FROM Origins WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM Origins WHERE name = ?
        `
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZ2lucy5pcXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcXVlcnkvQ1JVRC9vcmlnaW5zLmlxdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGdCQUFnQixHQUFHO0lBQzVCLE1BQU0sRUFBRTtRQUNKLEdBQUcsRUFBRTs7U0FFSjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFOztTQUVKO1FBQ0QsU0FBUyxFQUFFOztTQUVWO1FBQ0QsdUJBQXVCLEVBQUU7O1NBRXhCO1FBQ0QsR0FBRyxFQUFFOztTQUVKO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixHQUFHLEVBQUU7O1NBRUo7UUFDRCxTQUFTLEVBQUU7O1NBRVY7S0FDSjtDQUNKLENBQUEifQ==