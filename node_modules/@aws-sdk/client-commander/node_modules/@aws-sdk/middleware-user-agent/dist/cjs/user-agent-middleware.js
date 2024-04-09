"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgentPlugin = exports.getUserAgentMiddlewareOptions = exports.userAgentMiddleware = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const constants_1 = require("./constants");
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
const userAgentMiddleware = (options) => (next, context) => async (args) => {
    var _a, _b;
    const { request } = args;
    if (!protocol_http_1.HttpRequest.isInstance(request))
        return next(args);
    const { headers } = request;
    const userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
    // Set value to AWS-specific user agent header
    const sdkUserAgentValue = [...defaultUserAgent, ...userAgent, ...customUserAgent].join(constants_1.SPACE);
    // Get value to be sent with non-AWS-specific user agent header.
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(constants_1.SPACE);
    if (options.runtime !== "browser") {
        if (normalUAValue) {
            headers[constants_1.X_AMZ_USER_AGENT] = headers[constants_1.X_AMZ_USER_AGENT] ? `${headers[constants_1.USER_AGENT]} ${normalUAValue}` : normalUAValue;
        }
        headers[constants_1.USER_AGENT] = sdkUserAgentValue;
    }
    else {
        headers[constants_1.X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
        ...args,
        request,
    });
};
exports.userAgentMiddleware = userAgentMiddleware;
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
const escapeUserAgent = ([name, version]) => {
    const prefixSeparatorIndex = name.indexOf("/");
    const prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .map((item) => item === null || item === void 0 ? void 0 : item.replace(constants_1.UA_ESCAPE_REGEX, "_"))
        .join("/");
};
exports.getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(exports.userAgentMiddleware(config), exports.getUserAgentMiddlewareOptions);
    },
});
exports.getUserAgentPlugin = getUserAgentPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBcUQ7QUFjckQsMkNBQW1GO0FBRW5GOzs7Ozs7Ozs7OztHQVdHO0FBQ0ksTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQWdDLEVBQUUsRUFBRSxDQUFDLENBQ3ZFLElBQTRCLEVBQzVCLE9BQWdDLEVBQ1IsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFnQyxFQUF1QyxFQUFFOztJQUMzRyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksQ0FBQywyQkFBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQzVCLE1BQU0sU0FBUyxHQUFHLENBQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUywwQ0FBRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxDQUFDO0lBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sZUFBZSxHQUFHLENBQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsZUFBZSwwQ0FBRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxDQUFDO0lBRTdFLDhDQUE4QztJQUM5QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLFNBQVMsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBSyxDQUFDLENBQUM7SUFDOUYsZ0VBQWdFO0lBQ2hFLE1BQU0sYUFBYSxHQUFHO1FBQ3BCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsZUFBZTtLQUNuQixDQUFDLElBQUksQ0FBQyxpQkFBSyxDQUFDLENBQUM7SUFFZCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ2pDLElBQUksYUFBYSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxzQkFBVSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztTQUNuSDtRQUNELE9BQU8sQ0FBQyxzQkFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7S0FDekM7U0FBTTtRQUNMLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO0tBQy9DO0lBRUQsT0FBTyxJQUFJLENBQUM7UUFDVixHQUFHLElBQUk7UUFDUCxPQUFPO0tBQ1IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBaENXLFFBQUEsbUJBQW1CLHVCQWdDOUI7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQWdCLEVBQVUsRUFBRTtJQUNqRSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztJQUMxRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RELElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtRQUNwQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1NBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQywyQkFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVXLFFBQUEsNkJBQTZCLEdBQTJDO0lBQ25GLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsS0FBSztJQUNmLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQztJQUN0QyxRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFSyxNQUFNLGtCQUFrQixHQUFHLENBQUMsTUFBK0IsRUFBdUIsRUFBRSxDQUFDLENBQUM7SUFDM0YsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsV0FBVyxDQUFDLEdBQUcsQ0FBQywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxxQ0FBNkIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRixDQUFDLENBQUM7QUFKVSxRQUFBLGtCQUFrQixzQkFJNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQge1xuICBBYnNvbHV0ZUxvY2F0aW9uLFxuICBCdWlsZEhhbmRsZXIsXG4gIEJ1aWxkSGFuZGxlckFyZ3VtZW50cyxcbiAgQnVpbGRIYW5kbGVyT3B0aW9ucyxcbiAgQnVpbGRIYW5kbGVyT3V0cHV0LFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbiAgVXNlckFnZW50UGFpcixcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcbmltcG9ydCB7IFNQQUNFLCBVQV9FU0NBUEVfUkVHRVgsIFVTRVJfQUdFTlQsIFhfQU1aX1VTRVJfQUdFTlQgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBCdWlsZCB1c2VyIGFnZW50IGhlYWRlciBzZWN0aW9ucyBmcm9tOlxuICogMS4gcnVudGltZS1zcGVjaWZpYyBkZWZhdWx0IHVzZXIgYWdlbnQgcHJvdmlkZXI7XG4gKiAyLiBjdXN0b20gdXNlciBhZ2VudCBmcm9tIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudCBjb25maWc7XG4gKiAzLiBoYW5kbGVyIGV4ZWN1dGlvbiBjb250ZXh0IHNldCBieSBpbnRlcm5hbCBTREsgY29tcG9uZW50cztcbiAqIFRoZSBidWlsdCB1c2VyIGFnZW50IHdpbGwgYmUgc2V0IHRvIGB4LWFtei11c2VyLWFnZW50YCBoZWFkZXIgZm9yIEFMTCB0aGVcbiAqIHJ1bnRpbWVzLlxuICogUGxlYXNlIG5vdGUgdGhhdCBhbnkgb3ZlcnJpZGUgdG8gdGhlIGB1c2VyLWFnZW50YCBvciBgeC1hbXotdXNlci1hZ2VudGAgaGVhZGVyXG4gKiBpbiB0aGUgSFRUUCByZXF1ZXN0IGlzIGRpc2NvdXJhZ2VkLiBQbGVhc2UgdXNlIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudFxuICogY29uZmlnIG9yIG1pZGRsZXdhcmUgc2V0dGluZyB0aGUgYHVzZXJBZ2VudGAgY29udGV4dCB0byBnZW5lcmF0ZSBkZXNpcmVkIHVzZXJcbiAqIGFnZW50LlxuICovXG5leHBvcnQgY29uc3QgdXNlckFnZW50TWlkZGxld2FyZSA9IChvcHRpb25zOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZykgPT4gPE91dHB1dCBleHRlbmRzIE1ldGFkYXRhQmVhcmVyPihcbiAgbmV4dDogQnVpbGRIYW5kbGVyPGFueSwgYW55PixcbiAgY29udGV4dDogSGFuZGxlckV4ZWN1dGlvbkNvbnRleHRcbik6IEJ1aWxkSGFuZGxlcjxhbnksIGFueT4gPT4gYXN5bmMgKGFyZ3M6IEJ1aWxkSGFuZGxlckFyZ3VtZW50czxhbnk+KTogUHJvbWlzZTxCdWlsZEhhbmRsZXJPdXRwdXQ8T3V0cHV0Pj4gPT4ge1xuICBjb25zdCB7IHJlcXVlc3QgfSA9IGFyZ3M7XG4gIGlmICghSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShyZXF1ZXN0KSkgcmV0dXJuIG5leHQoYXJncyk7XG4gIGNvbnN0IHsgaGVhZGVycyB9ID0gcmVxdWVzdDtcbiAgY29uc3QgdXNlckFnZW50ID0gY29udGV4dD8udXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcbiAgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9IChhd2FpdCBvcHRpb25zLmRlZmF1bHRVc2VyQWdlbnRQcm92aWRlcigpKS5tYXAoZXNjYXBlVXNlckFnZW50KTtcbiAgY29uc3QgY3VzdG9tVXNlckFnZW50ID0gb3B0aW9ucz8uY3VzdG9tVXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcblxuICAvLyBTZXQgdmFsdWUgdG8gQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyXG4gIGNvbnN0IHNka1VzZXJBZ2VudFZhbHVlID0gWy4uLmRlZmF1bHRVc2VyQWdlbnQsIC4uLnVzZXJBZ2VudCwgLi4uY3VzdG9tVXNlckFnZW50XS5qb2luKFNQQUNFKTtcbiAgLy8gR2V0IHZhbHVlIHRvIGJlIHNlbnQgd2l0aCBub24tQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyLlxuICBjb25zdCBub3JtYWxVQVZhbHVlID0gW1xuICAgIC4uLmRlZmF1bHRVc2VyQWdlbnQuZmlsdGVyKChzZWN0aW9uKSA9PiBzZWN0aW9uLnN0YXJ0c1dpdGgoXCJhd3Mtc2RrLVwiKSksXG4gICAgLi4uY3VzdG9tVXNlckFnZW50LFxuICBdLmpvaW4oU1BBQ0UpO1xuXG4gIGlmIChvcHRpb25zLnJ1bnRpbWUgIT09IFwiYnJvd3NlclwiKSB7XG4gICAgaWYgKG5vcm1hbFVBVmFsdWUpIHtcbiAgICAgIGhlYWRlcnNbWF9BTVpfVVNFUl9BR0VOVF0gPSBoZWFkZXJzW1hfQU1aX1VTRVJfQUdFTlRdID8gYCR7aGVhZGVyc1tVU0VSX0FHRU5UXX0gJHtub3JtYWxVQVZhbHVlfWAgOiBub3JtYWxVQVZhbHVlO1xuICAgIH1cbiAgICBoZWFkZXJzW1VTRVJfQUdFTlRdID0gc2RrVXNlckFnZW50VmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaGVhZGVyc1tYX0FNWl9VU0VSX0FHRU5UXSA9IHNka1VzZXJBZ2VudFZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG5leHQoe1xuICAgIC4uLmFyZ3MsXG4gICAgcmVxdWVzdCxcbiAgfSk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZWFjaCBwYWlyIGFjY29yZGluZyB0byBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTIzNCBhbmQgam9pbiB0aGUgcGFpciB3aXRoIHBhdHRlcm4gYG5hbWUvdmVyc2lvbmAuXG4gKiBVc2VyIGFnZW50IG5hbWUgbWF5IGluY2x1ZGUgcHJlZml4IGxpa2UgYG1kL2AsIGBhcGkvYCwgYG9zL2AgZXRjLiwgd2Ugc2hvdWxkIG5vdCBlc2NhcGUgdGhlIGAvYCBhZnRlciB0aGUgcHJlZml4LlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZXNjYXBlVXNlckFnZW50ID0gKFtuYW1lLCB2ZXJzaW9uXTogVXNlckFnZW50UGFpcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHByZWZpeFNlcGFyYXRvckluZGV4ID0gbmFtZS5pbmRleE9mKFwiL1wiKTtcbiAgY29uc3QgcHJlZml4ID0gbmFtZS5zdWJzdHJpbmcoMCwgcHJlZml4U2VwYXJhdG9ySW5kZXgpOyAvLyBJZiBubyBwcmVmaXgsIHByZWZpeCBpcyBqdXN0IFwiXCJcbiAgbGV0IHVhTmFtZSA9IG5hbWUuc3Vic3RyaW5nKHByZWZpeFNlcGFyYXRvckluZGV4ICsgMSk7XG4gIGlmIChwcmVmaXggPT09IFwiYXBpXCIpIHtcbiAgICB1YU5hbWUgPSB1YU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuICByZXR1cm4gW3ByZWZpeCwgdWFOYW1lLCB2ZXJzaW9uXVxuICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS5sZW5ndGggPiAwKVxuICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0/LnJlcGxhY2UoVUFfRVNDQVBFX1JFR0VYLCBcIl9cIikpXG4gICAgLmpvaW4oXCIvXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJBZ2VudE1pZGRsZXdhcmVPcHRpb25zOiBCdWlsZEhhbmRsZXJPcHRpb25zICYgQWJzb2x1dGVMb2NhdGlvbiA9IHtcbiAgbmFtZTogXCJnZXRVc2VyQWdlbnRNaWRkbGV3YXJlXCIsXG4gIHN0ZXA6IFwiYnVpbGRcIixcbiAgcHJpb3JpdHk6IFwibG93XCIsXG4gIHRhZ3M6IFtcIlNFVF9VU0VSX0FHRU5UXCIsIFwiVVNFUl9BR0VOVFwiXSxcbiAgb3ZlcnJpZGU6IHRydWUsXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFnZW50UGx1Z2luID0gKGNvbmZpZzogVXNlckFnZW50UmVzb2x2ZWRDb25maWcpOiBQbHVnZ2FibGU8YW55LCBhbnk+ID0+ICh7XG4gIGFwcGx5VG9TdGFjazogKGNsaWVudFN0YWNrKSA9PiB7XG4gICAgY2xpZW50U3RhY2suYWRkKHVzZXJBZ2VudE1pZGRsZXdhcmUoY29uZmlnKSwgZ2V0VXNlckFnZW50TWlkZGxld2FyZU9wdGlvbnMpO1xuICB9LFxufSk7XG4iXX0=