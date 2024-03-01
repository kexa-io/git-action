import { __assign, __awaiter, __generator } from "tslib";
import { ProviderError } from "@aws-sdk/property-provider";
import { readFileSync } from "fs";
import { fromWebToken } from "./fromWebToken";
var ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
var ENV_ROLE_ARN = "AWS_ROLE_ARN";
var ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
/**
 * Represents OIDC credentials from a file on disk.
 */
export var fromTokenFile = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, resolveTokenFile(init)];
        });
    }); };
};
var resolveTokenFile = function (init) {
    var _a, _b, _c;
    var webIdentityTokenFile = (_a = init === null || init === void 0 ? void 0 : init.webIdentityTokenFile) !== null && _a !== void 0 ? _a : process.env[ENV_TOKEN_FILE];
    var roleArn = (_b = init === null || init === void 0 ? void 0 : init.roleArn) !== null && _b !== void 0 ? _b : process.env[ENV_ROLE_ARN];
    var roleSessionName = (_c = init === null || init === void 0 ? void 0 : init.roleSessionName) !== null && _c !== void 0 ? _c : process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new ProviderError("Web identity configuration not specified");
    }
    return fromWebToken(__assign(__assign({}, init), { webIdentityToken: readFileSync(webIdentityTokenFile, { encoding: "ascii" }), roleArn: roleArn,
        roleSessionName: roleSessionName }))();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRva2VuRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcm9tVG9rZW5GaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUVsQyxPQUFPLEVBQUUsWUFBWSxFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBRWhFLElBQU0sY0FBYyxHQUFHLDZCQUE2QixDQUFDO0FBQ3JELElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUNwQyxJQUFNLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDO0FBU3REOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBNEI7SUFBNUIscUJBQUEsRUFBQSxTQUE0QjtJQUF5QixPQUFBOztZQUNqRixzQkFBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBQzs7U0FDL0I7QUFGa0YsQ0FFbEYsQ0FBQztBQUVGLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUF3Qjs7SUFDaEQsSUFBTSxvQkFBb0IsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsbUNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RixJQUFNLE9BQU8sR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0QsSUFBTSxlQUFlLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSxtQ0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFcEYsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxhQUFhLENBQUMsMENBQTBDLENBQUMsQ0FBQztLQUNyRTtJQUVELE9BQU8sWUFBWSx1QkFDZCxJQUFJLEtBQ1AsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQzNFLE9BQU8sU0FBQTtRQUNQLGVBQWUsaUJBQUEsSUFDZixFQUFFLENBQUM7QUFDUCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBDcmVkZW50aWFsUHJvdmlkZXIsIENyZWRlbnRpYWxzIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuaW1wb3J0IHsgZnJvbVdlYlRva2VuLCBGcm9tV2ViVG9rZW5Jbml0IH0gZnJvbSBcIi4vZnJvbVdlYlRva2VuXCI7XG5cbmNvbnN0IEVOVl9UT0tFTl9GSUxFID0gXCJBV1NfV0VCX0lERU5USVRZX1RPS0VOX0ZJTEVcIjtcbmNvbnN0IEVOVl9ST0xFX0FSTiA9IFwiQVdTX1JPTEVfQVJOXCI7XG5jb25zdCBFTlZfUk9MRV9TRVNTSU9OX05BTUUgPSBcIkFXU19ST0xFX1NFU1NJT05fTkFNRVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21Ub2tlbkZpbGVJbml0IGV4dGVuZHMgUGFydGlhbDxPbWl0PEZyb21XZWJUb2tlbkluaXQsIFwid2ViSWRlbnRpdHlUb2tlblwiPj4ge1xuICAvKipcbiAgICogRmlsZSBsb2NhdGlvbiBvZiB3aGVyZSB0aGUgYE9JRENgIHRva2VuIGlzIHN0b3JlZC5cbiAgICovXG4gIHdlYklkZW50aXR5VG9rZW5GaWxlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgT0lEQyBjcmVkZW50aWFscyBmcm9tIGEgZmlsZSBvbiBkaXNrLlxuICovXG5leHBvcnQgY29uc3QgZnJvbVRva2VuRmlsZSA9IChpbml0OiBGcm9tVG9rZW5GaWxlSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIHJlc29sdmVUb2tlbkZpbGUoaW5pdCk7XG59O1xuXG5jb25zdCByZXNvbHZlVG9rZW5GaWxlID0gKGluaXQ/OiBGcm9tVG9rZW5GaWxlSW5pdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+ID0+IHtcbiAgY29uc3Qgd2ViSWRlbnRpdHlUb2tlbkZpbGUgPSBpbml0Py53ZWJJZGVudGl0eVRva2VuRmlsZSA/PyBwcm9jZXNzLmVudltFTlZfVE9LRU5fRklMRV07XG4gIGNvbnN0IHJvbGVBcm4gPSBpbml0Py5yb2xlQXJuID8/IHByb2Nlc3MuZW52W0VOVl9ST0xFX0FSTl07XG4gIGNvbnN0IHJvbGVTZXNzaW9uTmFtZSA9IGluaXQ/LnJvbGVTZXNzaW9uTmFtZSA/PyBwcm9jZXNzLmVudltFTlZfUk9MRV9TRVNTSU9OX05BTUVdO1xuXG4gIGlmICghd2ViSWRlbnRpdHlUb2tlbkZpbGUgfHwgIXJvbGVBcm4pIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcIldlYiBpZGVudGl0eSBjb25maWd1cmF0aW9uIG5vdCBzcGVjaWZpZWRcIik7XG4gIH1cblxuICByZXR1cm4gZnJvbVdlYlRva2VuKHtcbiAgICAuLi5pbml0LFxuICAgIHdlYklkZW50aXR5VG9rZW46IHJlYWRGaWxlU3luYyh3ZWJJZGVudGl0eVRva2VuRmlsZSwgeyBlbmNvZGluZzogXCJhc2NpaVwiIH0pLFxuICAgIHJvbGVBcm4sXG4gICAgcm9sZVNlc3Npb25OYW1lXG4gIH0pKCk7XG59O1xuIl19