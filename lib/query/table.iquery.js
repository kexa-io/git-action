"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableIQuery = void 0;
exports.TableIQuery = {
    Tags: `
        CREATE TABLE IF NOT EXISTS Tags (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            value TEXT
        )
    `,
    Providers: `
        CREATE TABLE IF NOT EXISTS Providers (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        )
    `,
    ProviderItems: `
        CREATE TABLE IF NOT EXISTS ProviderItems (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            providerId INT,
            FOREIGN KEY (providerId) REFERENCES Providers(ID)
        )
    `,
    Origins: `
        CREATE TABLE IF NOT EXISTS Origins (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT
        )
    `,
    Resources: `
        CREATE TABLE IF NOT EXISTS Resources (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            originId INT,
            providerItemId INT,
            FOREIGN KEY (originId) REFERENCES Origins(ID),
            FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
        );
    `,
    Rules: `
        CREATE TABLE IF NOT EXISTS Rules (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT,
            loud BOOLEAN,
            level INT,
            providerId INT,
            providerItemId INT,
            FOREIGN KEY (providerId) REFERENCES Providers(ID),
            FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
        )
    `,
    Scans: `
        CREATE TABLE IF NOT EXISTS Scans (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            error boolean,
            resourceId INT,
            ruleId INT,
            FOREIGN KEY (resourceId) REFERENCES Resources(ID),
            FOREIGN KEY (ruleId) REFERENCES Rules(ID)
        )
    `,
    TagsInScans: `
        CREATE TABLE IF NOT EXISTS TagsInScans (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            tagId INT,
            scanId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (scanId) REFERENCES Scans(ID)
        )
    `,
    TagsInResources: `
        CREATE TABLE IF NOT EXISTS TagsInResources (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            tagId INT,
            resourceId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (resourceId) REFERENCES Resources(ID)
        )
    `,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuaXF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3F1ZXJ5L3RhYmxlLmlxdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFdBQVcsR0FBRztJQUN2QixJQUFJLEVBQUU7Ozs7OztLQU1MO0lBQ0QsU0FBUyxFQUFFOzs7OztLQUtWO0lBQ0QsYUFBYSxFQUFFOzs7Ozs7O0tBT2Q7SUFDRCxPQUFPLEVBQUU7Ozs7OztLQU1SO0lBQ0QsU0FBUyxFQUFFOzs7Ozs7Ozs7O0tBVVY7SUFDRCxLQUFLLEVBQUU7Ozs7Ozs7Ozs7OztLQVlOO0lBQ0QsS0FBSyxFQUFFOzs7Ozs7Ozs7O0tBVU47SUFDRCxXQUFXLEVBQUU7Ozs7Ozs7O0tBUVo7SUFDRCxlQUFlLEVBQUU7Ozs7Ozs7O0tBUWhCO0NBQ0osQ0FBQSJ9