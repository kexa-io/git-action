import { __assign, __awaiter, __generator, __read } from "tslib";
import { memoize } from "@aws-sdk/property-provider";
import { SignatureV4 } from "@aws-sdk/signature-v4";
// 5 minutes buffer time the refresh the credential before it really expires
var CREDENTIAL_EXPIRE_WINDOW = 300000;
export var resolveAwsAuthConfig = function (input) {
    var normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(input);
    var _a = input.signingEscapePath, signingEscapePath = _a === void 0 ? true : _a, _b = input.systemClockOffset, systemClockOffset = _b === void 0 ? input.systemClockOffset || 0 : _b, sha256 = input.sha256;
    var signer;
    if (input.signer) {
        //if signer is supplied by user, normalize it to a function returning a promise for signer.
        signer = normalizeProvider(input.signer);
    }
    else {
        //construct a provider inferring signing from region.
        signer = function () {
            return normalizeProvider(input.region)()
                .then(function (region) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, input.regionInfoProvider(region)];
                    case 1: return [2 /*return*/, [(_a.sent()) || {}, region]];
                }
            }); }); })
                .then(function (_a) {
                var _b = __read(_a, 2), regionInfo = _b[0], region = _b[1];
                var signingRegion = regionInfo.signingRegion, signingService = regionInfo.signingService;
                //update client's singing region and signing service config if they are resolved.
                //signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
                input.signingRegion = input.signingRegion || signingRegion || region;
                //signing name resolving order:
                //user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
                input.signingName = input.signingName || signingService || input.serviceId;
                return new SignatureV4({
                    credentials: normalizedCreds,
                    region: input.signingRegion,
                    service: input.signingName,
                    sha256: sha256,
                    uriEscapePath: signingEscapePath,
                });
            });
        };
    }
    return __assign(__assign({}, input), { systemClockOffset: systemClockOffset,
        signingEscapePath: signingEscapePath, credentials: normalizedCreds, signer: signer });
};
var normalizeProvider = function (input) {
    if (typeof input === "object") {
        var promisified_1 = Promise.resolve(input);
        return function () { return promisified_1; };
    }
    return input;
};
var normalizeCredentialProvider = function (credentials) {
    if (typeof credentials === "function") {
        return memoize(credentials, function (credentials) {
            return credentials.expiration !== undefined &&
                credentials.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW;
        }, function (credentials) { return credentials.expiration !== undefined; });
    }
    return normalizeProvider(credentials);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHcEQsNEVBQTRFO0FBQzVFLElBQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDO0FBd0R4QyxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUNsQyxLQUFrRDtJQUVsRCxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsV0FBVztRQUN2QyxDQUFDLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNoRCxDQUFDLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLEtBQVksQ0FBQyxDQUFDO0lBQzFDLElBQUEsS0FBdUYsS0FBSyxrQkFBcEUsRUFBeEIsaUJBQWlCLG1CQUFHLElBQUksS0FBQSxFQUFFLEtBQTZELEtBQUssa0JBQWxCLEVBQWhELGlCQUFpQixtQkFBRyxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxLQUFBLEVBQUUsTUFBTSxHQUFLLEtBQUssT0FBVixDQUFXO0lBQ3JHLElBQUksTUFBK0IsQ0FBQztJQUNwQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDaEIsMkZBQTJGO1FBQzNGLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNMLHFEQUFxRDtRQUNyRCxNQUFNLEdBQUc7WUFDUCxPQUFBLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtpQkFDOUIsSUFBSSxDQUFDLFVBQU8sTUFBTTs7NEJBQU8scUJBQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFBOzRCQUF4QyxzQkFBQSxDQUFDLENBQUMsU0FBc0MsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQXlCLEVBQUE7O3FCQUFBLENBQUM7aUJBQ3hHLElBQUksQ0FBQyxVQUFDLEVBQW9CO29CQUFwQixLQUFBLGFBQW9CLEVBQW5CLFVBQVUsUUFBQSxFQUFFLE1BQU0sUUFBQTtnQkFDaEIsSUFBQSxhQUFhLEdBQXFCLFVBQVUsY0FBL0IsRUFBRSxjQUFjLEdBQUssVUFBVSxlQUFmLENBQWdCO2dCQUNyRCxpRkFBaUY7Z0JBQ2pGLGdIQUFnSDtnQkFDaEgsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLGFBQWEsSUFBSSxNQUFNLENBQUM7Z0JBQ3JFLCtCQUErQjtnQkFDL0IsbUhBQW1IO2dCQUNuSCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksY0FBYyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBRTNFLE9BQU8sSUFBSSxXQUFXLENBQUM7b0JBQ3JCLFdBQVcsRUFBRSxlQUFlO29CQUM1QixNQUFNLEVBQUUsS0FBSyxDQUFDLGFBQWE7b0JBQzNCLE9BQU8sRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDMUIsTUFBTSxRQUFBO29CQUNOLGFBQWEsRUFBRSxpQkFBaUI7aUJBQ2pDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztRQWxCSixDQWtCSSxDQUFDO0tBQ1I7SUFFRCw2QkFDSyxLQUFLLEtBQ1IsaUJBQWlCLG1CQUFBO1FBQ2pCLGlCQUFpQixtQkFBQSxFQUNqQixXQUFXLEVBQUUsZUFBZSxFQUM1QixNQUFNLFFBQUEsSUFDTjtBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0saUJBQWlCLEdBQUcsVUFBSSxLQUFzQjtJQUNsRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7SUFDRCxPQUFPLEtBQW9CLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsSUFBTSwyQkFBMkIsR0FBRyxVQUFDLFdBQWdEO0lBQ25GLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1FBQ3JDLE9BQU8sT0FBTyxDQUNaLFdBQVcsRUFDWCxVQUFDLFdBQVc7WUFDVixPQUFBLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDcEMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsd0JBQXdCO1FBRHhFLENBQ3dFLEVBQzFFLFVBQUMsV0FBVyxJQUFLLE9BQUEsV0FBVyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQXBDLENBQW9DLENBQ3RELENBQUM7S0FDSDtJQUNELE9BQU8saUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVtb2l6ZSB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgU2lnbmF0dXJlVjQgfSBmcm9tIFwiQGF3cy1zZGsvc2lnbmF0dXJlLXY0XCI7XG5pbXBvcnQgeyBDcmVkZW50aWFscywgSGFzaENvbnN0cnVjdG9yLCBQcm92aWRlciwgUmVnaW9uSW5mbywgUmVnaW9uSW5mb1Byb3ZpZGVyLCBSZXF1ZXN0U2lnbmVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbi8vIDUgbWludXRlcyBidWZmZXIgdGltZSB0aGUgcmVmcmVzaCB0aGUgY3JlZGVudGlhbCBiZWZvcmUgaXQgcmVhbGx5IGV4cGlyZXNcbmNvbnN0IENSRURFTlRJQUxfRVhQSVJFX1dJTkRPVyA9IDMwMDAwMDtcblxuZXhwb3J0IGludGVyZmFjZSBBd3NBdXRoSW5wdXRDb25maWcge1xuICAvKipcbiAgICogVGhlIGNyZWRlbnRpYWxzIHVzZWQgdG8gc2lnbiByZXF1ZXN0cy5cbiAgICovXG4gIGNyZWRlbnRpYWxzPzogQ3JlZGVudGlhbHMgfCBQcm92aWRlcjxDcmVkZW50aWFscz47XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduZXIgdG8gdXNlIHdoZW4gc2lnbmluZyByZXF1ZXN0cy5cbiAgICovXG4gIHNpZ25lcj86IFJlcXVlc3RTaWduZXIgfCBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBlc2NhcGUgcmVxdWVzdCBwYXRoIHdoZW4gc2lnbmluZyB0aGUgcmVxdWVzdC5cbiAgICovXG4gIHNpZ25pbmdFc2NhcGVQYXRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gb2Zmc2V0IHZhbHVlIGluIG1pbGxpc2Vjb25kcyB0byBhcHBseSB0byBhbGwgc2lnbmluZyB0aW1lcy5cbiAgICovXG4gIHN5c3RlbUNsb2NrT2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVnaW9uIHdoZXJlIHlvdSB3YW50IHRvIHNpZ24geW91ciByZXF1ZXN0IGFnYWluc3QuIFRoaXNcbiAgICogY2FuIGJlIGRpZmZlcmVudCB0byB0aGUgcmVnaW9uIGluIHRoZSBlbmRwb2ludC5cbiAgICovXG4gIHNpZ25pbmdSZWdpb24/OiBzdHJpbmc7XG59XG5pbnRlcmZhY2UgUHJldmlvdXNseVJlc29sdmVkIHtcbiAgY3JlZGVudGlhbERlZmF1bHRQcm92aWRlcjogKGlucHV0OiBhbnkpID0+IFByb3ZpZGVyPENyZWRlbnRpYWxzPjtcbiAgcmVnaW9uOiBzdHJpbmcgfCBQcm92aWRlcjxzdHJpbmc+O1xuICByZWdpb25JbmZvUHJvdmlkZXI6IFJlZ2lvbkluZm9Qcm92aWRlcjtcbiAgc2lnbmluZ05hbWU/OiBzdHJpbmc7XG4gIHNlcnZpY2VJZDogc3RyaW5nO1xuICBzaGEyNTY6IEhhc2hDb25zdHJ1Y3Rvcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQXdzQXV0aFJlc29sdmVkQ29uZmlnIHtcbiAgLyoqXG4gICAqIFJlc29sdmVkIHZhbHVlIGZvciBpbnB1dCBjb25maWcge0BsaW5rIEF3c0F1dGhJbnB1dENvbmZpZy5jcmVkZW50aWFsc31cbiAgICovXG4gIGNyZWRlbnRpYWxzOiBQcm92aWRlcjxDcmVkZW50aWFscz47XG4gIC8qKlxuICAgKiBSZXNvbHZlZCB2YWx1ZSBmb3IgaW5wdXQgY29uZmlnIHtAbGluayBBd3NBdXRoSW5wdXRDb25maWcuc2lnbmVyfVxuICAgKi9cbiAgc2lnbmVyOiBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcbiAgLyoqXG4gICAqIFJlc29sdmVkIHZhbHVlIGZvciBpbnB1dCBjb25maWcge0BsaW5rIEF3c0F1dGhJbnB1dENvbmZpZy5zaWduaW5nRXNjYXBlUGF0aH1cbiAgICovXG4gIHNpZ25pbmdFc2NhcGVQYXRoOiBib29sZWFuO1xuICAvKipcbiAgICogUmVzb2x2ZWQgdmFsdWUgZm9yIGlucHV0IGNvbmZpZyB7QGxpbmsgQXdzQXV0aElucHV0Q29uZmlnLnN5c3RlbUNsb2NrT2Zmc2V0fVxuICAgKi9cbiAgc3lzdGVtQ2xvY2tPZmZzZXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVBd3NBdXRoQ29uZmlnID0gPFQ+KFxuICBpbnB1dDogVCAmIEF3c0F1dGhJbnB1dENvbmZpZyAmIFByZXZpb3VzbHlSZXNvbHZlZFxuKTogVCAmIEF3c0F1dGhSZXNvbHZlZENvbmZpZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDcmVkcyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgPyBub3JtYWxpemVDcmVkZW50aWFsUHJvdmlkZXIoaW5wdXQuY3JlZGVudGlhbHMpXG4gICAgOiBpbnB1dC5jcmVkZW50aWFsRGVmYXVsdFByb3ZpZGVyKGlucHV0IGFzIGFueSk7XG4gIGNvbnN0IHsgc2lnbmluZ0VzY2FwZVBhdGggPSB0cnVlLCBzeXN0ZW1DbG9ja09mZnNldCA9IGlucHV0LnN5c3RlbUNsb2NrT2Zmc2V0IHx8IDAsIHNoYTI1NiB9ID0gaW5wdXQ7XG4gIGxldCBzaWduZXI6IFByb3ZpZGVyPFJlcXVlc3RTaWduZXI+O1xuICBpZiAoaW5wdXQuc2lnbmVyKSB7XG4gICAgLy9pZiBzaWduZXIgaXMgc3VwcGxpZWQgYnkgdXNlciwgbm9ybWFsaXplIGl0IHRvIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBmb3Igc2lnbmVyLlxuICAgIHNpZ25lciA9IG5vcm1hbGl6ZVByb3ZpZGVyKGlucHV0LnNpZ25lcik7XG4gIH0gZWxzZSB7XG4gICAgLy9jb25zdHJ1Y3QgYSBwcm92aWRlciBpbmZlcnJpbmcgc2lnbmluZyBmcm9tIHJlZ2lvbi5cbiAgICBzaWduZXIgPSAoKSA9PlxuICAgICAgbm9ybWFsaXplUHJvdmlkZXIoaW5wdXQucmVnaW9uKSgpXG4gICAgICAgIC50aGVuKGFzeW5jIChyZWdpb24pID0+IFsoYXdhaXQgaW5wdXQucmVnaW9uSW5mb1Byb3ZpZGVyKHJlZ2lvbikpIHx8IHt9LCByZWdpb25dIGFzIFtSZWdpb25JbmZvLCBzdHJpbmddKVxuICAgICAgICAudGhlbigoW3JlZ2lvbkluZm8sIHJlZ2lvbl0pID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNpZ25pbmdSZWdpb24sIHNpZ25pbmdTZXJ2aWNlIH0gPSByZWdpb25JbmZvO1xuICAgICAgICAgIC8vdXBkYXRlIGNsaWVudCdzIHNpbmdpbmcgcmVnaW9uIGFuZCBzaWduaW5nIHNlcnZpY2UgY29uZmlnIGlmIHRoZXkgYXJlIHJlc29sdmVkLlxuICAgICAgICAgIC8vc2lnbmluZyByZWdpb24gcmVzb2x2aW5nIG9yZGVyOiB1c2VyIHN1cHBsaWVkIHNpZ25pbmdSZWdpb24gLT4gZW5kcG9pbnRzLmpzb24gaW5mZXJyZWQgcmVnaW9uIC0+IGNsaWVudCByZWdpb25cbiAgICAgICAgICBpbnB1dC5zaWduaW5nUmVnaW9uID0gaW5wdXQuc2lnbmluZ1JlZ2lvbiB8fCBzaWduaW5nUmVnaW9uIHx8IHJlZ2lvbjtcbiAgICAgICAgICAvL3NpZ25pbmcgbmFtZSByZXNvbHZpbmcgb3JkZXI6XG4gICAgICAgICAgLy91c2VyIHN1cHBsaWVkIHNpZ25pbmdOYW1lIC0+IGVuZHBvaW50cy5qc29uIGluZmVycmVkIChjcmVkZW50aWFsIHNjb3BlIC0+IG1vZGVsIGFybk5hbWVzcGFjZSkgLT4gbW9kZWwgc2VydmljZSBpZFxuICAgICAgICAgIGlucHV0LnNpZ25pbmdOYW1lID0gaW5wdXQuc2lnbmluZ05hbWUgfHwgc2lnbmluZ1NlcnZpY2UgfHwgaW5wdXQuc2VydmljZUlkO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBTaWduYXR1cmVWNCh7XG4gICAgICAgICAgICBjcmVkZW50aWFsczogbm9ybWFsaXplZENyZWRzLFxuICAgICAgICAgICAgcmVnaW9uOiBpbnB1dC5zaWduaW5nUmVnaW9uLFxuICAgICAgICAgICAgc2VydmljZTogaW5wdXQuc2lnbmluZ05hbWUsXG4gICAgICAgICAgICBzaGEyNTYsXG4gICAgICAgICAgICB1cmlFc2NhcGVQYXRoOiBzaWduaW5nRXNjYXBlUGF0aCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmlucHV0LFxuICAgIHN5c3RlbUNsb2NrT2Zmc2V0LFxuICAgIHNpZ25pbmdFc2NhcGVQYXRoLFxuICAgIGNyZWRlbnRpYWxzOiBub3JtYWxpemVkQ3JlZHMsXG4gICAgc2lnbmVyLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplUHJvdmlkZXIgPSA8VD4oaW5wdXQ6IFQgfCBQcm92aWRlcjxUPik6IFByb3ZpZGVyPFQ+ID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IHByb21pc2lmaWVkID0gUHJvbWlzZS5yZXNvbHZlKGlucHV0KTtcbiAgICByZXR1cm4gKCkgPT4gcHJvbWlzaWZpZWQ7XG4gIH1cbiAgcmV0dXJuIGlucHV0IGFzIFByb3ZpZGVyPFQ+O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3JlZGVudGlhbFByb3ZpZGVyID0gKGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyB8IFByb3ZpZGVyPENyZWRlbnRpYWxzPik6IFByb3ZpZGVyPENyZWRlbnRpYWxzPiA9PiB7XG4gIGlmICh0eXBlb2YgY3JlZGVudGlhbHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBtZW1vaXplKFxuICAgICAgY3JlZGVudGlhbHMsXG4gICAgICAoY3JlZGVudGlhbHMpID0+XG4gICAgICAgIGNyZWRlbnRpYWxzLmV4cGlyYXRpb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBjcmVkZW50aWFscy5leHBpcmF0aW9uLmdldFRpbWUoKSAtIERhdGUubm93KCkgPCBDUkVERU5USUFMX0VYUElSRV9XSU5ET1csXG4gICAgICAoY3JlZGVudGlhbHMpID0+IGNyZWRlbnRpYWxzLmV4cGlyYXRpb24gIT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZVByb3ZpZGVyKGNyZWRlbnRpYWxzKTtcbn07XG4iXX0=