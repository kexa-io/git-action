"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLClass = void 0;
const promise_1 = require("mysql2/promise");
const table_iquery_1 = require("../../query/table.iquery");
const providers_iquery_1 = require("../../query/CRUD/providers.iquery");
const origins_iquery_1 = require("../../query/CRUD/origins.iquery");
const providerItems_iquery_1 = require("../../query/CRUD/providerItems.iquery");
const resources_iquery_1 = require("../../query/CRUD/resources.iquery");
const logger_service_1 = require("../logger.service");
const rules_iquery_1 = require("../../query/CRUD/rules.iquery");
const scans_iquery_1 = require("../../query/CRUD/scans.iquery");
const logger = (0, logger_service_1.getNewLogger)("mySQLLogger");
class MySQLClass {
    constructor() {
        this.nbrConnection = 0;
    }
    initPool(host, port, user, password, database) {
        if (!this.poolConnection) {
            const dbConfig = {
                host,
                user,
                password,
                database,
                port
            };
            this.poolConnection = (0, promise_1.createPool)(dbConfig);
        }
    }
    async getConnection(config) {
        if (config) {
            this.poolConnection = (0, promise_1.createPool)(config);
        }
        this.nbrConnection++;
        return this.poolConnection.getConnection();
    }
    async createTables(config) {
        let conn = await this.getConnection(config);
        try {
            await Promise.all(Object.values(table_iquery_1.TableIQuery).map(async (query) => {
                return await conn.execute(query);
            }));
            this.closeConnection(conn);
            return true;
        }
        catch (error) {
            this.closeConnection(conn);
            return false;
        }
    }
    async disconnect(force = false) {
        logger.debug("Number of connection: " + this.nbrConnection);
        if ((this.poolConnection && this.nbrConnection === 0) || force) {
            logger.debug("Disconnecting from MySQL");
            await this.poolConnection?.end();
        }
    }
    async closeConnection(conn) {
        if (conn) {
            this.nbrConnection--;
            await conn.release();
        }
    }
    async createAndGetProviders(providers) {
        const providerDict = {};
        await Promise.all(providers.map(async (provider) => {
            let conn = await this.getConnection();
            await conn.execute(providers_iquery_1.CRUDProvidersIQuery.Create.One, [provider]);
            this.closeConnection(conn);
        }));
        let conn = await this.getConnection();
        let [rows, _] = await conn.execute(providers_iquery_1.CRUDProvidersIQuery.Read.All);
        this.closeConnection(conn);
        rows.forEach(row => {
            providerDict[row.name] = row.ID;
        });
        return providerDict;
    }
    async createAndGetProvider(provider) {
        let conn = await this.getConnection();
        await conn.execute(providers_iquery_1.CRUDProvidersIQuery.Create.One, [provider]);
        let [rows, _] = await conn.execute(providers_iquery_1.CRUDProvidersIQuery.Read.OneByName, [provider]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    async getOneProviderByName(name) {
        let conn = await this.getConnection();
        let [rows, _] = await conn.execute(providers_iquery_1.CRUDProvidersIQuery.Read.OneByName, [name]);
        this.closeConnection(conn);
        return rows[0];
    }
    async createAndGetOrigin(dataEnvConfig) {
        let conn = await this.getConnection();
        await conn.execute(origins_iquery_1.CRUDOriginIQuery.Create.One, [dataEnvConfig?.name ?? "Unknown", dataEnvConfig?.description ?? "No description"]);
        let [rows, _] = await conn.execute(origins_iquery_1.CRUDOriginIQuery.Read.OneByName, [dataEnvConfig?.name ?? "Unknown"]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    async createAndGetProviderItems(providerId, providerItems) {
        const providerItemsDict = {};
        await Promise.all(providerItems.map(async (item) => {
            let firstItem = await this.getProviderItemsByNameAndProvider(providerId, item);
            providerItemsDict[firstItem.name] = firstItem.ID;
        }));
        return providerItemsDict;
    }
    async getProviderItemsByNameAndProvider(providerId, name) {
        let conn = await this.getConnection();
        let [rows, _] = await conn.execute(providerItems_iquery_1.CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        if (rows.length === 0) {
            await conn.execute(providerItems_iquery_1.CRUDProviderItemsIQuery.Create.One, [name, providerId]);
            [rows, _] = await conn.execute(providerItems_iquery_1.CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        }
        this.closeConnection(conn);
        return rows[0];
    }
    async createAndGetResources(resources, originId, providerItemsId) {
        let [ids] = await Promise.all(resources.map(async (resource) => {
            return await this.createAndGetResource(resource, originId, providerItemsId);
        }));
        return ids;
    }
    async createAndGetResource(resource, originId, providerItemsId) {
        let conn = await this.getConnection();
        await conn.execute(resources_iquery_1.CRUDResourcesIQuery.Create.One, [JSON.stringify(resource), originId, providerItemsId]);
        let [rows, _] = await conn.execute(resources_iquery_1.CRUDResourcesIQuery.Read.OneByContent, [JSON.stringify(resource)]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    async createAndGetRule(rule, providerId, providerItemId) {
        let conn = await this.getConnection();
        await conn.execute(rules_iquery_1.CRUDRulesIQuery.Create.One, [rule.name ?? "Unknown", rule.description ?? "No description", rule?.loud ?? 0, rule.level, providerId, providerItemId]);
        let [rows, _] = await conn.execute(rules_iquery_1.CRUDRulesIQuery.Read.OneByName, [rule.name]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    async createScan(resultScan, resourceId, ruleId) {
        let conn = await this.getConnection();
        await conn.execute(scans_iquery_1.CRUDScansIQuery.Create.One, [(resultScan.error.length > 0), resourceId, ruleId]);
        this.closeConnection(conn);
    }
}
exports.MySQLClass = MySQLClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlTUUwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zYXZpbmcvbXlTUUwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBOEY7QUFDOUYsMkRBQXVEO0FBQ3ZELHdFQUF3RTtBQUN4RSxvRUFBbUU7QUFDbkUsZ0ZBQWdGO0FBQ2hGLHdFQUF3RTtBQUV4RSxzREFBaUQ7QUFFakQsZ0VBQWdFO0FBRWhFLGdFQUFnRTtBQUNoRSxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBYSxVQUFVO0lBSW5CO1FBRlEsa0JBQWEsR0FBVyxDQUFDLENBQUM7SUFFWixDQUFDO0lBRWhCLFFBQVEsQ0FBQyxJQUFZLEVBQUUsSUFBVyxFQUFFLElBQVksRUFBRSxRQUFnQixFQUFFLFFBQWdCO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLE1BQU0sUUFBUSxHQUFnQjtnQkFDMUIsSUFBSTtnQkFDSixJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixJQUFJO2FBQ1AsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBQSxvQkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBb0I7UUFDM0MsSUFBRyxNQUFNLEVBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUEsb0JBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBb0I7UUFDMUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxD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