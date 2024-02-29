import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { IAMServiceException as __BaseException } from "./IAMServiceException";
export class KeyPairMismatchException extends __BaseException {
    constructor(opts) {
        super({
            name: "KeyPairMismatchException",
            $fault: "client",
            ...opts,
        });
        this.name = "KeyPairMismatchException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KeyPairMismatchException.prototype);
    }
}
export class MalformedCertificateException extends __BaseException {
    constructor(opts) {
        super({
            name: "MalformedCertificateException",
            $fault: "client",
            ...opts,
        });
        this.name = "MalformedCertificateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, MalformedCertificateException.prototype);
    }
}
export class DuplicateCertificateException extends __BaseException {
    constructor(opts) {
        super({
            name: "DuplicateCertificateException",
            $fault: "client",
            ...opts,
        });
        this.name = "DuplicateCertificateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, DuplicateCertificateException.prototype);
    }
}
export class InvalidCertificateException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidCertificateException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidCertificateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidCertificateException.prototype);
    }
}
export class DuplicateSSHPublicKeyException extends __BaseException {
    constructor(opts) {
        super({
            name: "DuplicateSSHPublicKeyException",
            $fault: "client",
            ...opts,
        });
        this.name = "DuplicateSSHPublicKeyException";
        this.$fault = "client";
        Object.setPrototypeOf(this, DuplicateSSHPublicKeyException.prototype);
    }
}
export class InvalidPublicKeyException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidPublicKeyException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidPublicKeyException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidPublicKeyException.prototype);
    }
}
export const UpdateLoginProfileRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Password && { Password: SENSITIVE_STRING }),
});
export const UploadServerCertificateRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PrivateKey && { PrivateKey: SENSITIVE_STRING }),
});
