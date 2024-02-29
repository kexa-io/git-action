"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilWaitForReplicationSetDeleted = exports.waitForWaitForReplicationSetDeleted = void 0;
const GetReplicationSetCommand_1 = require("../commands/GetReplicationSetCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new GetReplicationSetCommand_1.GetReplicationSetCommand(input));
        reason = result;
        try {
            let returnComparator = () => {
                return result.replicationSet.status;
            };
            if (returnComparator() === "DELETING") {
                return { state: util_waiter_1.WaiterState.RETRY, reason };
            }
        }
        catch (e) { }
        try {
            let returnComparator = () => {
                return result.replicationSet.status;
            };
            if (returnComparator() === "FAILED") {
                return { state: util_waiter_1.WaiterState.FAILURE, reason };
            }
        }
        catch (e) { }
    }
    catch (exception) {
        reason = exception;
        if (exception.name && exception.name == "ResourceNotFoundException") {
            return { state: util_waiter_1.WaiterState.SUCCESS, reason };
        }
    }
    return { state: util_waiter_1.WaiterState.RETRY, reason };
};
/**
 * Wait for a replication set to be deleted
 *  @deprecated Use waitUntilWaitForReplicationSetDeleted instead. waitForWaitForReplicationSetDeleted does not throw error in non-success cases.
 */
const waitForWaitForReplicationSetDeleted = async (params, input) => {
    const serviceDefaults = { minDelay: 30, maxDelay: 30 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForWaitForReplicationSetDeleted = waitForWaitForReplicationSetDeleted;
/**
 * Wait for a replication set to be deleted
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetReplicationSetCommand for polling.
 */
const waitUntilWaitForReplicationSetDeleted = async (params, input) => {
    const serviceDefaults = { minDelay: 30, maxDelay: 30 };
    const result = await util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return util_waiter_1.checkExceptions(result);
};
exports.waitUntilWaitForReplicationSetDeleted = waitUntilWaitForReplicationSetDeleted;
//# sourceMappingURL=waitForWaitForReplicationSetDeleted.js.map