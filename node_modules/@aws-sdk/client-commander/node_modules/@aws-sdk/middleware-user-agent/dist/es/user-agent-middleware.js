import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SPACE, UA_ESCAPE_REGEX, USER_AGENT, X_AMZ_USER_AGENT } from "./constants";
/**
 * Build user agent header sections from:
 * 1. runtime-specific default user agent provider;
 * 2. custom user agent from `customUserAgent` client config;
 * 3. handler execution context set by internal SDK components;
 * The built user agent will be set to `x-amz-user-agent` header for ALL the
 * runtimes.
 * Please note that any override to the `user-agent` or `x-amz-user-agent` header
 * in the HTTP request is discouraged. Please use `customUserAgent` client
 * config or middleware setting the `userAgent` context to generate desired user
 * agent.
 */
export var userAgentMiddleware = function (options) { return function (next, context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var request, headers, userAgent, defaultUserAgent, customUserAgent, sdkUserAgentValue, normalUAValue;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                request = args.request;
                if (!HttpRequest.isInstance(request))
                    return [2 /*return*/, next(args)];
                headers = request.headers;
                userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
                return [4 /*yield*/, options.defaultUserAgentProvider()];
            case 1:
                defaultUserAgent = (_c.sent()).map(escapeUserAgent);
                customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
                sdkUserAgentValue = __spreadArray(__spreadArray(__spreadArray([], __read(defaultUserAgent)), __read(userAgent)), __read(customUserAgent)).join(SPACE);
                normalUAValue = __spreadArray(__spreadArray([], __read(defaultUserAgent.filter(function (section) { return section.startsWith("aws-sdk-"); }))), __read(customUserAgent)).join(SPACE);
                if (options.runtime !== "browser") {
                    if (normalUAValue) {
                        headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? headers[USER_AGENT] + " " + normalUAValue : normalUAValue;
                    }
                    headers[USER_AGENT] = sdkUserAgentValue;
                }
                else {
                    headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
                }
                return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
        }
    });
}); }; }; };
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
var escapeUserAgent = function (_a) {
    var _b = __read(_a, 2), name = _b[0], version = _b[1];
    var prefixSeparatorIndex = name.indexOf("/");
    var prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    var uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter(function (item) { return item && item.length > 0; })
        .map(function (item) { return item === null || item === void 0 ? void 0 : item.replace(UA_ESCAPE_REGEX, "_"); })
        .join("/");
};
export var getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
export var getUserAgentPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBY3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLFVBQUMsT0FBZ0MsSUFBSyxPQUFBLFVBQ3ZFLElBQTRCLEVBQzVCLE9BQWdDLElBQ0wsT0FBQSxVQUFPLElBQWdDOzs7Ozs7Z0JBQzFELE9BQU8sR0FBSyxJQUFJLFFBQVQsQ0FBVTtnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29CQUFFLHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDaEQsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFhO2dCQUN0QixTQUFTLEdBQUcsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLDBDQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLENBQUM7Z0JBQ3ZDLHFCQUFNLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxFQUFBOztnQkFBNUQsZ0JBQWdCLEdBQUcsQ0FBQyxTQUF3QyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDbEYsZUFBZSxHQUFHLENBQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsZUFBZSwwQ0FBRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxDQUFDO2dCQUd2RSxpQkFBaUIsR0FBRyxxREFBSSxnQkFBZ0IsV0FBSyxTQUFTLFdBQUssZUFBZSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEYsYUFBYSxHQUFHLHVDQUNqQixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLFdBQ3BFLGVBQWUsR0FDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVkLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQ2pDLElBQUksYUFBYSxFQUFFO3dCQUNqQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFJLGFBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO3FCQUNuSDtvQkFDRCxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7aUJBQ3pDO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO2lCQUMvQztnQkFFRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOzs7S0FDSixFQTdCNEIsQ0E2QjVCLEVBaEN3RSxDQWdDeEUsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxJQUFNLGVBQWUsR0FBRyxVQUFDLEVBQThCO1FBQTlCLEtBQUEsYUFBOEIsRUFBN0IsSUFBSSxRQUFBLEVBQUUsT0FBTyxRQUFBO0lBQ3JDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0lBQzFGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDL0I7SUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7U0FDN0IsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUF2QixDQUF1QixDQUFDO1NBQ3pDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDO1NBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLDZCQUE2QixHQUEyQztJQUNuRixJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLEtBQUs7SUFDZixJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7SUFDdEMsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxNQUErQixJQUEwQixPQUFBLENBQUM7SUFDM0YsWUFBWSxFQUFFLFVBQUMsV0FBVztRQUN4QixXQUFXLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGLENBQUMsRUFKMEYsQ0FJMUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7XG4gIEFic29sdXRlTG9jYXRpb24sXG4gIEJ1aWxkSGFuZGxlcixcbiAgQnVpbGRIYW5kbGVyQXJndW1lbnRzLFxuICBCdWlsZEhhbmRsZXJPcHRpb25zLFxuICBCdWlsZEhhbmRsZXJPdXRwdXQsXG4gIEhhbmRsZXJFeGVjdXRpb25Db250ZXh0LFxuICBNZXRhZGF0YUJlYXJlcixcbiAgUGx1Z2dhYmxlLFxuICBVc2VyQWdlbnRQYWlyLFxufSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgVXNlckFnZW50UmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuaW1wb3J0IHsgU1BBQ0UsIFVBX0VTQ0FQRV9SRUdFWCwgVVNFUl9BR0VOVCwgWF9BTVpfVVNFUl9BR0VOVCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEJ1aWxkIHVzZXIgYWdlbnQgaGVhZGVyIHNlY3Rpb25zIGZyb206XG4gKiAxLiBydW50aW1lLXNwZWNpZmljIGRlZmF1bHQgdXNlciBhZ2VudCBwcm92aWRlcjtcbiAqIDIuIGN1c3RvbSB1c2VyIGFnZW50IGZyb20gYGN1c3RvbVVzZXJBZ2VudGAgY2xpZW50IGNvbmZpZztcbiAqIDMuIGhhbmRsZXIgZXhlY3V0aW9uIGNvbnRleHQgc2V0IGJ5IGludGVybmFsIFNESyBjb21wb25lbnRzO1xuICogVGhlIGJ1aWx0IHVzZXIgYWdlbnQgd2lsbCBiZSBzZXQgdG8gYHgtYW16LXVzZXItYWdlbnRgIGhlYWRlciBmb3IgQUxMIHRoZVxuICogcnVudGltZXMuXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGFueSBvdmVycmlkZSB0byB0aGUgYHVzZXItYWdlbnRgIG9yIGB4LWFtei11c2VyLWFnZW50YCBoZWFkZXJcbiAqIGluIHRoZSBIVFRQIHJlcXVlc3QgaXMgZGlzY291cmFnZWQuIFBsZWFzZSB1c2UgYGN1c3RvbVVzZXJBZ2VudGAgY2xpZW50XG4gKiBjb25maWcgb3IgbWlkZGxld2FyZSBzZXR0aW5nIHRoZSBgdXNlckFnZW50YCBjb250ZXh0IHRvIGdlbmVyYXRlIGRlc2lyZWQgdXNlclxuICogYWdlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VyQWdlbnRNaWRkbGV3YXJlID0gKG9wdGlvbnM6IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnKSA9PiA8T3V0cHV0IGV4dGVuZHMgTWV0YWRhdGFCZWFyZXI+KFxuICBuZXh0OiBCdWlsZEhhbmRsZXI8YW55LCBhbnk+LFxuICBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dFxuKTogQnVpbGRIYW5kbGVyPGFueSwgYW55PiA9PiBhc3luYyAoYXJnczogQnVpbGRIYW5kbGVyQXJndW1lbnRzPGFueT4pOiBQcm9taXNlPEJ1aWxkSGFuZGxlck91dHB1dDxPdXRwdXQ+PiA9PiB7XG4gIGNvbnN0IHsgcmVxdWVzdCB9ID0gYXJncztcbiAgaWYgKCFIdHRwUmVxdWVzdC5pc0luc3RhbmNlKHJlcXVlc3QpKSByZXR1cm4gbmV4dChhcmdzKTtcbiAgY29uc3QgeyBoZWFkZXJzIH0gPSByZXF1ZXN0O1xuICBjb25zdCB1c2VyQWdlbnQgPSBjb250ZXh0Py51c2VyQWdlbnQ/Lm1hcChlc2NhcGVVc2VyQWdlbnQpIHx8IFtdO1xuICBjb25zdCBkZWZhdWx0VXNlckFnZW50ID0gKGF3YWl0IG9wdGlvbnMuZGVmYXVsdFVzZXJBZ2VudFByb3ZpZGVyKCkpLm1hcChlc2NhcGVVc2VyQWdlbnQpO1xuICBjb25zdCBjdXN0b21Vc2VyQWdlbnQgPSBvcHRpb25zPy5jdXN0b21Vc2VyQWdlbnQ/Lm1hcChlc2NhcGVVc2VyQWdlbnQpIHx8IFtdO1xuXG4gIC8vIFNldCB2YWx1ZSB0byBBV1Mtc3BlY2lmaWMgdXNlciBhZ2VudCBoZWFkZXJcbiAgY29uc3Qgc2RrVXNlckFnZW50VmFsdWUgPSBbLi4uZGVmYXVsdFVzZXJBZ2VudCwgLi4udXNlckFnZW50LCAuLi5jdXN0b21Vc2VyQWdlbnRdLmpvaW4oU1BBQ0UpO1xuICAvLyBHZXQgdmFsdWUgdG8gYmUgc2VudCB3aXRoIG5vbi1BV1Mtc3BlY2lmaWMgdXNlciBhZ2VudCBoZWFkZXIuXG4gIGNvbnN0IG5vcm1hbFVBVmFsdWUgPSBbXG4gICAgLi4uZGVmYXVsdFVzZXJBZ2VudC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24uc3RhcnRzV2l0aChcImF3cy1zZGstXCIpKSxcbiAgICAuLi5jdXN0b21Vc2VyQWdlbnQsXG4gIF0uam9pbihTUEFDRSk7XG5cbiAgaWYgKG9wdGlvbnMucnVudGltZSAhPT0gXCJicm93c2VyXCIpIHtcbiAgICBpZiAobm9ybWFsVUFWYWx1ZSkge1xuICAgICAgaGVhZGVyc1tYX0FNWl9VU0VSX0FHRU5UXSA9IGhlYWRlcnNbWF9BTVpfVVNFUl9BR0VOVF0gPyBgJHtoZWFkZXJzW1VTRVJfQUdFTlRdfSAke25vcm1hbFVBVmFsdWV9YCA6IG5vcm1hbFVBVmFsdWU7XG4gICAgfVxuICAgIGhlYWRlcnNbVVNFUl9BR0VOVF0gPSBzZGtVc2VyQWdlbnRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBoZWFkZXJzW1hfQU1aX1VTRVJfQUdFTlRdID0gc2RrVXNlckFnZW50VmFsdWU7XG4gIH1cblxuICByZXR1cm4gbmV4dCh7XG4gICAgLi4uYXJncyxcbiAgICByZXF1ZXN0LFxuICB9KTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBlYWNoIHBhaXIgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MjM0IGFuZCBqb2luIHRoZSBwYWlyIHdpdGggcGF0dGVybiBgbmFtZS92ZXJzaW9uYC5cbiAqIFVzZXIgYWdlbnQgbmFtZSBtYXkgaW5jbHVkZSBwcmVmaXggbGlrZSBgbWQvYCwgYGFwaS9gLCBgb3MvYCBldGMuLCB3ZSBzaG91bGQgbm90IGVzY2FwZSB0aGUgYC9gIGFmdGVyIHRoZSBwcmVmaXguXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBlc2NhcGVVc2VyQWdlbnQgPSAoW25hbWUsIHZlcnNpb25dOiBVc2VyQWdlbnRQYWlyKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcHJlZml4U2VwYXJhdG9ySW5kZXggPSBuYW1lLmluZGV4T2YoXCIvXCIpO1xuICBjb25zdCBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBwcmVmaXhTZXBhcmF0b3JJbmRleCk7IC8vIElmIG5vIHByZWZpeCwgcHJlZml4IGlzIGp1c3QgXCJcIlxuICBsZXQgdWFOYW1lID0gbmFtZS5zdWJzdHJpbmcocHJlZml4U2VwYXJhdG9ySW5kZXggKyAxKTtcbiAgaWYgKHByZWZpeCA9PT0gXCJhcGlcIikge1xuICAgIHVhTmFtZSA9IHVhTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBbcHJlZml4LCB1YU5hbWUsIHZlcnNpb25dXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLmxlbmd0aCA+IDApXG4gICAgLm1hcCgoaXRlbSkgPT4gaXRlbT8ucmVwbGFjZShVQV9FU0NBUEVfUkVHRVgsIFwiX1wiKSlcbiAgICAuam9pbihcIi9cIik7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFnZW50TWlkZGxld2FyZU9wdGlvbnM6IEJ1aWxkSGFuZGxlck9wdGlvbnMgJiBBYnNvbHV0ZUxvY2F0aW9uID0ge1xuICBuYW1lOiBcImdldFVzZXJBZ2VudE1pZGRsZXdhcmVcIixcbiAgc3RlcDogXCJidWlsZFwiLFxuICBwcmlvcml0eTogXCJsb3dcIixcbiAgdGFnczogW1wiU0VUX1VTRVJfQUdFTlRcIiwgXCJVU0VSX0FHRU5UXCJdLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQWdlbnRQbHVnaW4gPSAoY29uZmlnOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZyk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQodXNlckFnZW50TWlkZGxld2FyZShjb25maWcpLCBnZXRVc2VyQWdlbnRNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==