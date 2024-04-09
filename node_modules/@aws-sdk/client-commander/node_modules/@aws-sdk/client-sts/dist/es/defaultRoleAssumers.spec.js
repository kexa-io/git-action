import { __awaiter, __generator } from "tslib";
// Please do not touch this file. It's generated from template in:
// https://github.com/aws/aws-sdk-js-v3/blob/main/codegen/smithy-aws-typescript-codegen/src/main/resources/software/amazon/smithy/aws/typescript/codegen/sts-client-defaultRoleAssumers.spec.ts
import { HttpResponse } from "@aws-sdk/protocol-http";
import { Readable } from "stream";
var assumeRoleResponse = "<AssumeRoleResponse xmlns=\"https://sts.amazonaws.com/doc/2011-06-15/\">\n<AssumeRoleResult>\n  <AssumedRoleUser>\n    <AssumedRoleId>AROAZOX2IL27GNRBJHWC2:session</AssumedRoleId>\n    <Arn>arn:aws:sts::123:assumed-role/assume-role-test/session</Arn>\n  </AssumedRoleUser>\n  <Credentials>\n    <AccessKeyId>key</AccessKeyId>\n    <SecretAccessKey>secrete</SecretAccessKey>\n    <SessionToken>session-token</SessionToken>\n    <Expiration>2021-05-05T23:22:08Z</Expiration>\n  </Credentials>\n</AssumeRoleResult>\n<ResponseMetadata>\n  <RequestId>12345678id</RequestId>\n</ResponseMetadata>\n</AssumeRoleResponse>";
var mockHandle = jest.fn().mockResolvedValue({
    response: new HttpResponse({
        statusCode: 200,
        body: Readable.from([""]),
    }),
});
jest.mock("@aws-sdk/node-http-handler", function () { return ({
    NodeHttpHandler: jest.fn().mockImplementation(function () { return ({
        destroy: function () { },
        handle: mockHandle,
    }); }),
    streamCollector: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, Buffer.from(assumeRoleResponse)];
    }); }); },
}); });
import { getDefaultRoleAssumer } from "./defaultRoleAssumers";
describe("getDefaultRoleAssumer", function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it("should use supplied source credentials", function () { return __awaiter(void 0, void 0, void 0, function () {
        var roleAssumer, params, sourceCred1, sourceCred2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    roleAssumer = getDefaultRoleAssumer();
                    params = {
                        RoleArn: "arn:aws:foo",
                        RoleSessionName: "session",
                    };
                    sourceCred1 = { accessKeyId: "key1", secretAccessKey: "secrete1" };
                    return [4 /*yield*/, roleAssumer(sourceCred1, params)];
                case 1:
                    _c.sent();
                    expect(mockHandle).toBeCalledTimes(1);
                    // Validate request is signed by sourceCred1
                    expect((_a = mockHandle.mock.calls[0][0].headers) === null || _a === void 0 ? void 0 : _a.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key1/"));
                    sourceCred2 = { accessKeyId: "key2", secretAccessKey: "secrete1" };
                    return [4 /*yield*/, roleAssumer(sourceCred2, params)];
                case 2:
                    _c.sent();
                    // Validate request is signed by sourceCred2
                    expect(mockHandle).toBeCalledTimes(2);
                    expect((_b = mockHandle.mock.calls[1][0].headers) === null || _b === void 0 ? void 0 : _b.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key2/"));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=defaultRoleAssumers.spec.js.map