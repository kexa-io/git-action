import { __assign, __awaiter, __generator } from "tslib";
import { GetReplicationSetCommand } from "../commands/GetReplicationSetCommand";
import { WaiterState, checkExceptions, createWaiter } from "@aws-sdk/util-waiter";
var checkState = function (client, input) { return __awaiter(void 0, void 0, void 0, function () {
    var reason, result_1, returnComparator, returnComparator, exception_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.send(new GetReplicationSetCommand(input))];
            case 1:
                result_1 = _a.sent();
                reason = result_1;
                try {
                    returnComparator = function () {
                        return result_1.replicationSet.status;
                    };
                    if (returnComparator() === "DELETING") {
                        return [2 /*return*/, { state: WaiterState.RETRY, reason: reason }];
                    }
                }
                catch (e) { }
                try {
                    returnComparator = function () {
                        return result_1.replicationSet.status;
                    };
                    if (returnComparator() === "FAILED") {
                        return [2 /*return*/, { state: WaiterState.FAILURE, reason: reason }];
                    }
                }
                catch (e) { }
                return [3 /*break*/, 3];
            case 2:
                exception_1 = _a.sent();
                reason = exception_1;
                if (exception_1.name && exception_1.name == "ResourceNotFoundException") {
                    return [2 /*return*/, { state: WaiterState.SUCCESS, reason: reason }];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, { state: WaiterState.RETRY, reason: reason }];
        }
    });
}); };
/**
 * Wait for a replication set to be deleted
 *  @deprecated Use waitUntilWaitForReplicationSetDeleted instead. waitForWaitForReplicationSetDeleted does not throw error in non-success cases.
 */
export var waitForWaitForReplicationSetDeleted = function (params, input) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceDefaults;
    return __generator(this, function (_a) {
        serviceDefaults = { minDelay: 30, maxDelay: 30 };
        return [2 /*return*/, createWaiter(__assign(__assign({}, serviceDefaults), params), input, checkState)];
    });
}); };
/**
 * Wait for a replication set to be deleted
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetReplicationSetCommand for polling.
 */
export var waitUntilWaitForReplicationSetDeleted = function (params, input) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceDefaults, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                serviceDefaults = { minDelay: 30, maxDelay: 30 };
                return [4 /*yield*/, createWaiter(__assign(__assign({}, serviceDefaults), params), input, checkState)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, checkExceptions(result)];
        }
    });
}); };
//# sourceMappingURL=waitForWaitForReplicationSetDeleted.js.map