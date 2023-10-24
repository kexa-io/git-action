"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EC2ServiceException = exports.__ServiceException = void 0;
const smithy_client_1 = require("@smithy/smithy-client");
Object.defineProperty(exports, "__ServiceException", { enumerable: true, get: function () { return smithy_client_1.ServiceException; } });
class EC2ServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, EC2ServiceException.prototype);
    }
}
exports.EC2ServiceException = EC2ServiceException;
