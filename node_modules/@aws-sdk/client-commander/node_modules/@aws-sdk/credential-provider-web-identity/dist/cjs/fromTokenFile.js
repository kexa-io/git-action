"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTokenFile = void 0;
const property_provider_1 = require("@aws-sdk/property-provider");
const fs_1 = require("fs");
const fromWebToken_1 = require("./fromWebToken");
const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
/**
 * Represents OIDC credentials from a file on disk.
 */
const fromTokenFile = (init = {}) => async () => {
    return resolveTokenFile(init);
};
exports.fromTokenFile = fromTokenFile;
const resolveTokenFile = (init) => {
    var _a, _b, _c;
    const webIdentityTokenFile = (_a = init === null || init === void 0 ? void 0 : init.webIdentityTokenFile) !== null && _a !== void 0 ? _a : process.env[ENV_TOKEN_FILE];
    const roleArn = (_b = init === null || init === void 0 ? void 0 : init.roleArn) !== null && _b !== void 0 ? _b : process.env[ENV_ROLE_ARN];
    const roleSessionName = (_c = init === null || init === void 0 ? void 0 : init.roleSessionName) !== null && _c !== void 0 ? _c : process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new property_provider_1.ProviderError("Web identity configuration not specified");
    }
    return fromWebToken_1.fromWebToken({
        ...init,
        webIdentityToken: fs_1.readFileSync(webIdentityTokenFile, { encoding: "ascii" }),
        roleArn,
        roleSessionName
    })();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRva2VuRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcm9tVG9rZW5GaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUEyRDtBQUUzRCwyQkFBa0M7QUFFbEMsaURBQWdFO0FBRWhFLE1BQU0sY0FBYyxHQUFHLDZCQUE2QixDQUFDO0FBQ3JELE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUNwQyxNQUFNLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDO0FBU3REOztHQUVHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUEwQixFQUFFLEVBQXNCLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUM1RixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUZXLFFBQUEsYUFBYSxpQkFFeEI7QUFFRixNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBd0IsRUFBd0IsRUFBRTs7SUFDMUUsTUFBTSxvQkFBb0IsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsbUNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RixNQUFNLE9BQU8sR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0QsTUFBTSxlQUFlLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSxtQ0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFcEYsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxpQ0FBYSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7S0FDckU7SUFFRCxPQUFPLDJCQUFZLENBQUM7UUFDbEIsR0FBRyxJQUFJO1FBQ1AsZ0JBQWdCLEVBQUUsaUJBQVksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMzRSxPQUFPO1FBQ1AsZUFBZTtLQUNoQixDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7IENyZWRlbnRpYWxQcm92aWRlciwgQ3JlZGVudGlhbHMgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBmcm9tV2ViVG9rZW4sIEZyb21XZWJUb2tlbkluaXQgfSBmcm9tIFwiLi9mcm9tV2ViVG9rZW5cIjtcblxuY29uc3QgRU5WX1RPS0VOX0ZJTEUgPSBcIkFXU19XRUJfSURFTlRJVFlfVE9LRU5fRklMRVwiO1xuY29uc3QgRU5WX1JPTEVfQVJOID0gXCJBV1NfUk9MRV9BUk5cIjtcbmNvbnN0IEVOVl9ST0xFX1NFU1NJT05fTkFNRSA9IFwiQVdTX1JPTEVfU0VTU0lPTl9OQU1FXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbVRva2VuRmlsZUluaXQgZXh0ZW5kcyBQYXJ0aWFsPE9taXQ8RnJvbVdlYlRva2VuSW5pdCwgXCJ3ZWJJZGVudGl0eVRva2VuXCI+PiB7XG4gIC8qKlxuICAgKiBGaWxlIGxvY2F0aW9uIG9mIHdoZXJlIHRoZSBgT0lEQ2AgdG9rZW4gaXMgc3RvcmVkLlxuICAgKi9cbiAgd2ViSWRlbnRpdHlUb2tlbkZpbGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBPSURDIGNyZWRlbnRpYWxzIGZyb20gYSBmaWxlIG9uIGRpc2suXG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tVG9rZW5GaWxlID0gKGluaXQ6IEZyb21Ub2tlbkZpbGVJbml0ID0ge30pOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4gYXN5bmMgKCkgPT4ge1xuICByZXR1cm4gcmVzb2x2ZVRva2VuRmlsZShpbml0KTtcbn07XG5cbmNvbnN0IHJlc29sdmVUb2tlbkZpbGUgPSAoaW5pdD86IEZyb21Ub2tlbkZpbGVJbml0KTogUHJvbWlzZTxDcmVkZW50aWFscz4gPT4ge1xuICBjb25zdCB3ZWJJZGVudGl0eVRva2VuRmlsZSA9IGluaXQ/LndlYklkZW50aXR5VG9rZW5GaWxlID8/IHByb2Nlc3MuZW52W0VOVl9UT0tFTl9GSUxFXTtcbiAgY29uc3Qgcm9sZUFybiA9IGluaXQ/LnJvbGVBcm4gPz8gcHJvY2Vzcy5lbnZbRU5WX1JPTEVfQVJOXTtcbiAgY29uc3Qgcm9sZVNlc3Npb25OYW1lID0gaW5pdD8ucm9sZVNlc3Npb25OYW1lID8/IHByb2Nlc3MuZW52W0VOVl9ST0xFX1NFU1NJT05fTkFNRV07XG5cbiAgaWYgKCF3ZWJJZGVudGl0eVRva2VuRmlsZSB8fCAhcm9sZUFybikge1xuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFwiV2ViIGlkZW50aXR5IGNvbmZpZ3VyYXRpb24gbm90IHNwZWNpZmllZFwiKTtcbiAgfVxuXG4gIHJldHVybiBmcm9tV2ViVG9rZW4oe1xuICAgIC4uLmluaXQsXG4gICAgd2ViSWRlbnRpdHlUb2tlbjogcmVhZEZpbGVTeW5jKHdlYklkZW50aXR5VG9rZW5GaWxlLCB7IGVuY29kaW5nOiBcImFzY2lpXCIgfSksXG4gICAgcm9sZUFybixcbiAgICByb2xlU2Vzc2lvbk5hbWVcbiAgfSkoKTtcbn07XG4iXX0=