import { __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { isThrottlingError } from "@aws-sdk/service-error-classification";
import { v4 } from "uuid";
import { DEFAULT_RETRY_DELAY_BASE, INITIAL_RETRY_TOKENS, INVOCATION_ID_HEADER, REQUEST_HEADER, THROTTLING_RETRY_DELAY_BASE, } from "./constants";
import { getDefaultRetryQuota } from "./defaultRetryQuota";
import { defaultDelayDecider } from "./delayDecider";
import { defaultRetryDecider } from "./retryDecider";
/**
 * The default value for how many HTTP requests an SDK should make for a
 * single SDK operation invocation before giving up
 */
export var DEFAULT_MAX_ATTEMPTS = 3;
/**
 * The default retry algorithm to use.
 */
export var DEFAULT_RETRY_MODE = "standard";
var StandardRetryStrategy = /** @class */ (function () {
    function StandardRetryStrategy(maxAttemptsProvider, options) {
        var _a, _b, _c;
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = DEFAULT_RETRY_MODE;
        this.retryDecider = (_a = options === null || options === void 0 ? void 0 : options.retryDecider) !== null && _a !== void 0 ? _a : defaultRetryDecider;
        this.delayDecider = (_b = options === null || options === void 0 ? void 0 : options.delayDecider) !== null && _b !== void 0 ? _b : defaultDelayDecider;
        this.retryQuota = (_c = options === null || options === void 0 ? void 0 : options.retryQuota) !== null && _c !== void 0 ? _c : getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
    }
    StandardRetryStrategy.prototype.shouldRetry = function (error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    };
    StandardRetryStrategy.prototype.getMaxAttempts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxAttempts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maxAttemptsProvider()];
                    case 1:
                        maxAttempts = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        maxAttempts = DEFAULT_MAX_ATTEMPTS;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, maxAttempts];
                }
            });
        });
    };
    StandardRetryStrategy.prototype.retry = function (next, args) {
        return __awaiter(this, void 0, void 0, function () {
            var retryTokenAmount, attempts, totalDelay, maxAttempts, request, _loop_1, this_1, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = 0;
                        totalDelay = 0;
                        return [4 /*yield*/, this.getMaxAttempts()];
                    case 1:
                        maxAttempts = _a.sent();
                        request = args.request;
                        if (HttpRequest.isInstance(request)) {
                            request.headers[INVOCATION_ID_HEADER] = v4();
                        }
                        _loop_1 = function () {
                            var _b, response, output, e_1, err, delay_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 2, , 5]);
                                        if (HttpRequest.isInstance(request)) {
                                            request.headers[REQUEST_HEADER] = "attempt=" + (attempts + 1) + "; max=" + maxAttempts;
                                        }
                                        return [4 /*yield*/, next(args)];
                                    case 1:
                                        _b = _c.sent(), response = _b.response, output = _b.output;
                                        this_1.retryQuota.releaseRetryTokens(retryTokenAmount);
                                        output.$metadata.attempts = attempts + 1;
                                        output.$metadata.totalRetryDelay = totalDelay;
                                        return [2 /*return*/, { value: { response: response, output: output } }];
                                    case 2:
                                        e_1 = _c.sent();
                                        err = asSdkError(e_1);
                                        attempts++;
                                        if (!this_1.shouldRetry(err, attempts, maxAttempts)) return [3 /*break*/, 4];
                                        retryTokenAmount = this_1.retryQuota.retrieveRetryTokens(err);
                                        delay_1 = this_1.delayDecider(isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE, attempts);
                                        totalDelay += delay_1;
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                                    case 3:
                                        _c.sent();
                                        return [2 /*return*/, "continue"];
                                    case 4:
                                        if (!err.$metadata) {
                                            err.$metadata = {};
                                        }
                                        err.$metadata.attempts = attempts;
                                        err.$metadata.totalRetryDelay = totalDelay;
                                        throw err;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 3:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StandardRetryStrategy;
}());
export { StandardRetryStrategy };
var asSdkError = function (error) {
    if (error instanceof Error)
        return error;
    if (error instanceof Object)
        return Object.assign(new Error(), error);
    if (typeof error === "string")
        return new Error(error);
    return new Error("AWS SDK error wrapper for " + error);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdFN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlZmF1bHRTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixvQkFBb0IsRUFDcEIsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCwyQkFBMkIsR0FDNUIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBRXRDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBb0Q3QztJQU1FLCtCQUE2QixtQkFBcUMsRUFBRSxPQUFzQzs7UUFBN0Usd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFrQjtRQUZsRCxTQUFJLEdBQUcsa0JBQWtCLENBQUM7UUFHeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxZQUFZLG1DQUFJLG1CQUFtQixDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsWUFBWSxtQ0FBSSxtQkFBbUIsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQUEsT0FBTyxhQUFQLE9B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OztLQW9DWjtJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQTlFRCxJQThFQzs7QUFFRCxJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQWM7SUFDaEMsSUFBSSxLQUFLLFlBQVksS0FBSztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3pDLElBQUksS0FBSyxZQUFZLE1BQU07UUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sSUFBSSxLQUFLLENBQUMsK0JBQTZCLEtBQU8sQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7IGlzVGhyb3R0bGluZ0Vycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3NlcnZpY2UtZXJyb3ItY2xhc3NpZmljYXRpb25cIjtcbmltcG9ydCB7IFNka0Vycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3NtaXRoeS1jbGllbnRcIjtcbmltcG9ydCB7IEZpbmFsaXplSGFuZGxlciwgRmluYWxpemVIYW5kbGVyQXJndW1lbnRzLCBNZXRhZGF0YUJlYXJlciwgUHJvdmlkZXIsIFJldHJ5U3RyYXRlZ3kgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcblxuaW1wb3J0IHtcbiAgREVGQVVMVF9SRVRSWV9ERUxBWV9CQVNFLFxuICBJTklUSUFMX1JFVFJZX1RPS0VOUyxcbiAgSU5WT0NBVElPTl9JRF9IRUFERVIsXG4gIFJFUVVFU1RfSEVBREVSLFxuICBUSFJPVFRMSU5HX1JFVFJZX0RFTEFZX0JBU0UsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdFJldHJ5UXVvdGEgfSBmcm9tIFwiLi9kZWZhdWx0UmV0cnlRdW90YVwiO1xuaW1wb3J0IHsgZGVmYXVsdERlbGF5RGVjaWRlciB9IGZyb20gXCIuL2RlbGF5RGVjaWRlclwiO1xuaW1wb3J0IHsgZGVmYXVsdFJldHJ5RGVjaWRlciB9IGZyb20gXCIuL3JldHJ5RGVjaWRlclwiO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIGZvciBob3cgbWFueSBIVFRQIHJlcXVlc3RzIGFuIFNESyBzaG91bGQgbWFrZSBmb3IgYVxuICogc2luZ2xlIFNESyBvcGVyYXRpb24gaW52b2NhdGlvbiBiZWZvcmUgZ2l2aW5nIHVwXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BWF9BVFRFTVBUUyA9IDM7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgcmV0cnkgYWxnb3JpdGhtIHRvIHVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVUUllfTU9ERSA9IFwic3RhbmRhcmRcIjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gZXJyb3IgaXMgcmV0cnlhYmxlIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgcmV0cmllc1xuICogYWxyZWFkeSBhdHRlbXB0ZWQsIHRoZSBIVFRQIHN0YXR1cyBjb2RlLCBhbmQgdGhlIGVycm9yIHJlY2VpdmVkIChpZiBhbnkpLlxuICpcbiAqIEBwYXJhbSBlcnJvciAgICAgICAgIFRoZSBlcnJvciBlbmNvdW50ZXJlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXRyeURlY2lkZXIge1xuICAoZXJyb3I6IFNka0Vycm9yKTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIHJldHJ5aW5nIGFuIGFjdGlvbi5cbiAqXG4gKiBAcGFyYW0gZGVsYXlCYXNlIFRoZSBiYXNlIGRlbGF5IChpbiBtaWxsaXNlY29uZHMpLlxuICogQHBhcmFtIGF0dGVtcHRzICBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoZSBhY3Rpb24gaGFzIGFscmVhZHkgYmVlbiB0cmllZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWxheURlY2lkZXIge1xuICAoZGVsYXlCYXNlOiBudW1iZXIsIGF0dGVtcHRzOiBudW1iZXIpOiBudW1iZXI7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHRoYXQgc3BlY2lmaWVzIHRoZSByZXRyeSBxdW90YSBiZWhhdmlvci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXRyeVF1b3RhIHtcbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiByZXRyeSB0b2tlbnMgYXJlIGF2YWlsYWJsZSBmcm9tIHRoZSByZXRyeSBxdW90YSBidWNrZXQuXG4gICAqL1xuICBoYXNSZXRyeVRva2VuczogKGVycm9yOiBTZGtFcnJvcikgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogcmV0dXJucyB0b2tlbiBhbW91bnQgZnJvbSB0aGUgcmV0cnkgcXVvdGEgYnVja2V0LlxuICAgKiB0aHJvd3MgZXJyb3IgaXMgcmV0cnkgdG9rZW5zIGFyZSBub3QgYXZhaWxhYmxlLlxuICAgKi9cbiAgcmV0cmlldmVSZXRyeVRva2VuczogKGVycm9yOiBTZGtFcnJvcikgPT4gbnVtYmVyO1xuXG4gIC8qKlxuICAgKiByZWxlYXNlcyB0b2tlbnMgYmFjayB0byB0aGUgcmV0cnkgcXVvdGEuXG4gICAqL1xuICByZWxlYXNlUmV0cnlUb2tlbnM6IChyZWxlYXNlQ2FwYWNpdHlBbW91bnQ/OiBudW1iZXIpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogU3RyYXRlZ3kgb3B0aW9ucyB0byBiZSBwYXNzZWQgdG8gU3RhbmRhcmRSZXRyeVN0cmF0ZWd5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhbmRhcmRSZXRyeVN0cmF0ZWd5T3B0aW9ucyB7XG4gIHJldHJ5RGVjaWRlcj86IFJldHJ5RGVjaWRlcjtcbiAgZGVsYXlEZWNpZGVyPzogRGVsYXlEZWNpZGVyO1xuICByZXRyeVF1b3RhPzogUmV0cnlRdW90YTtcbn1cblxuZXhwb3J0IGNsYXNzIFN0YW5kYXJkUmV0cnlTdHJhdGVneSBpbXBsZW1lbnRzIFJldHJ5U3RyYXRlZ3kge1xuICBwcml2YXRlIHJldHJ5RGVjaWRlcjogUmV0cnlEZWNpZGVyO1xuICBwcml2YXRlIGRlbGF5RGVjaWRlcjogRGVsYXlEZWNpZGVyO1xuICBwcml2YXRlIHJldHJ5UXVvdGE6IFJldHJ5UXVvdGE7XG4gIHB1YmxpYyByZWFkb25seSBtb2RlID0gREVGQVVMVF9SRVRSWV9NT0RFO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbWF4QXR0ZW1wdHNQcm92aWRlcjogUHJvdmlkZXI8bnVtYmVyPiwgb3B0aW9ucz86IFN0YW5kYXJkUmV0cnlTdHJhdGVneU9wdGlvbnMpIHtcbiAgICB0aGlzLnJldHJ5RGVjaWRlciA9IG9wdGlvbnM/LnJldHJ5RGVjaWRlciA/PyBkZWZhdWx0UmV0cnlEZWNpZGVyO1xuICAgIHRoaXMuZGVsYXlEZWNpZGVyID0gb3B0aW9ucz8uZGVsYXlEZWNpZGVyID8/IGRlZmF1bHREZWxheURlY2lkZXI7XG4gICAgdGhpcy5yZXRyeVF1b3RhID0gb3B0aW9ucz8ucmV0cnlRdW90YSA/PyBnZXREZWZhdWx0UmV0cnlRdW90YShJTklUSUFMX1JFVFJZX1RPS0VOUyk7XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFJldHJ5KGVycm9yOiBTZGtFcnJvciwgYXR0ZW1wdHM6IG51bWJlciwgbWF4QXR0ZW1wdHM6IG51bWJlcikge1xuICAgIHJldHVybiBhdHRlbXB0cyA8IG1heEF0dGVtcHRzICYmIHRoaXMucmV0cnlEZWNpZGVyKGVycm9yKSAmJiB0aGlzLnJldHJ5UXVvdGEuaGFzUmV0cnlUb2tlbnMoZXJyb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRNYXhBdHRlbXB0cygpIHtcbiAgICBsZXQgbWF4QXR0ZW1wdHM6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgbWF4QXR0ZW1wdHMgPSBhd2FpdCB0aGlzLm1heEF0dGVtcHRzUHJvdmlkZXIoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbWF4QXR0ZW1wdHMgPSBERUZBVUxUX01BWF9BVFRFTVBUUztcbiAgICB9XG4gICAgcmV0dXJuIG1heEF0dGVtcHRzO1xuICB9XG5cbiAgYXN5bmMgcmV0cnk8SW5wdXQgZXh0ZW5kcyBvYmplY3QsIE91cHV0IGV4dGVuZHMgTWV0YWRhdGFCZWFyZXI+KFxuICAgIG5leHQ6IEZpbmFsaXplSGFuZGxlcjxJbnB1dCwgT3VwdXQ+LFxuICAgIGFyZ3M6IEZpbmFsaXplSGFuZGxlckFyZ3VtZW50czxJbnB1dD5cbiAgKSB7XG4gICAgbGV0IHJldHJ5VG9rZW5BbW91bnQ7XG4gICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICBsZXQgdG90YWxEZWxheSA9IDA7XG5cbiAgICBjb25zdCBtYXhBdHRlbXB0cyA9IGF3YWl0IHRoaXMuZ2V0TWF4QXR0ZW1wdHMoKTtcblxuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gYXJncztcbiAgICBpZiAoSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShyZXF1ZXN0KSkge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzW0lOVk9DQVRJT05fSURfSEVBREVSXSA9IHY0KCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChIdHRwUmVxdWVzdC5pc0luc3RhbmNlKHJlcXVlc3QpKSB7XG4gICAgICAgICAgcmVxdWVzdC5oZWFkZXJzW1JFUVVFU1RfSEVBREVSXSA9IGBhdHRlbXB0PSR7YXR0ZW1wdHMgKyAxfTsgbWF4PSR7bWF4QXR0ZW1wdHN9YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHJlc3BvbnNlLCBvdXRwdXQgfSA9IGF3YWl0IG5leHQoYXJncyk7XG5cbiAgICAgICAgdGhpcy5yZXRyeVF1b3RhLnJlbGVhc2VSZXRyeVRva2VucyhyZXRyeVRva2VuQW1vdW50KTtcbiAgICAgICAgb3V0cHV0LiRtZXRhZGF0YS5hdHRlbXB0cyA9IGF0dGVtcHRzICsgMTtcbiAgICAgICAgb3V0cHV0LiRtZXRhZGF0YS50b3RhbFJldHJ5RGVsYXkgPSB0b3RhbERlbGF5O1xuXG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlLCBvdXRwdXQgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXNTZGtFcnJvcihlKTtcbiAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkUmV0cnkoZXJyIGFzIFNka0Vycm9yLCBhdHRlbXB0cywgbWF4QXR0ZW1wdHMpKSB7XG4gICAgICAgICAgcmV0cnlUb2tlbkFtb3VudCA9IHRoaXMucmV0cnlRdW90YS5yZXRyaWV2ZVJldHJ5VG9rZW5zKGVycik7XG4gICAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLmRlbGF5RGVjaWRlcihcbiAgICAgICAgICAgIGlzVGhyb3R0bGluZ0Vycm9yKGVycikgPyBUSFJPVFRMSU5HX1JFVFJZX0RFTEFZX0JBU0UgOiBERUZBVUxUX1JFVFJZX0RFTEFZX0JBU0UsXG4gICAgICAgICAgICBhdHRlbXB0c1xuICAgICAgICAgICk7XG4gICAgICAgICAgdG90YWxEZWxheSArPSBkZWxheTtcblxuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVyci4kbWV0YWRhdGEpIHtcbiAgICAgICAgICBlcnIuJG1ldGFkYXRhID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBlcnIuJG1ldGFkYXRhLmF0dGVtcHRzID0gYXR0ZW1wdHM7XG4gICAgICAgIGVyci4kbWV0YWRhdGEudG90YWxSZXRyeURlbGF5ID0gdG90YWxEZWxheTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBhc1Nka0Vycm9yID0gKGVycm9yOiB1bmtub3duKTogU2RrRXJyb3IgPT4ge1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIGVycm9yO1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBPYmplY3QpIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcigpLCBlcnJvcik7XG4gIGlmICh0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCIpIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpO1xuICByZXR1cm4gbmV3IEVycm9yKGBBV1MgU0RLIGVycm9yIHdyYXBwZXIgZm9yICR7ZXJyb3J9YCk7XG59O1xuIl19