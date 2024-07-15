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
const jsonStringify_1 = require("../../helpers/jsonStringify");
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
        await conn.execute(resources_iquery_1.CRUDResourcesIQuery.Create.One, [(0, jsonStringify_1.jsonStringify)(resource), originId, providerItemsId]);
        let [rows, _] = await conn.execute(resources_iquery_1.CRUDResourcesIQuery.Read.OneByContent, [(0, jsonStringify_1.jsonStringify)(resource)]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlTUUwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zYXZpbmcvbXlTUUwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBOEY7QUFDOUYsMkRBQXVEO0FBQ3ZELHdFQUF3RTtBQUN4RSxvRUFBbUU7QUFDbkUsZ0ZBQWdGO0FBQ2hGLHdFQUF3RTtBQUV4RSxzREFBaUQ7QUFFakQsZ0VBQWdFO0FBRWhFLGdFQUFnRTtBQUNoRSwrREFBNEQ7QUFDNUQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQWEsVUFBVTtJQUluQjtRQUZRLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO0lBRVosQ0FBQztJQUVoQixRQUFRLENBQUMsSUFBWSxFQUFFLElBQVcsRUFBRSxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtRQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixNQUFNLFFBQVEsR0FBZ0I7Z0JBQzFCLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsSUFBSTthQUNQLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUEsb0JBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQW9CO1FBQzNDLElBQUcsTUFBTSxFQUFDO1lBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQW9CO1FBQzFDLElBQUksSUFBSSxHQUFHLE1BQU0sSUFB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