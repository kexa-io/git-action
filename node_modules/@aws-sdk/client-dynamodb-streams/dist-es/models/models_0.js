import { DynamoDBStreamsServiceException as __BaseException } from "./DynamoDBStreamsServiceException";
export const KeyType = {
    HASH: "HASH",
    RANGE: "RANGE",
};
export const StreamStatus = {
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
};
export const StreamViewType = {
    KEYS_ONLY: "KEYS_ONLY",
    NEW_AND_OLD_IMAGES: "NEW_AND_OLD_IMAGES",
    NEW_IMAGE: "NEW_IMAGE",
    OLD_IMAGE: "OLD_IMAGE",
};
export class InternalServerError extends __BaseException {
    constructor(opts) {
        super({
            name: "InternalServerError",
            $fault: "server",
            ...opts,
        });
        this.name = "InternalServerError";
        this.$fault = "server";
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
export class ResourceNotFoundException extends __BaseException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
export class ExpiredIteratorException extends __BaseException {
    constructor(opts) {
        super({
            name: "ExpiredIteratorException",
            $fault: "client",
            ...opts,
        });
        this.name = "ExpiredIteratorException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ExpiredIteratorException.prototype);
    }
}
export const OperationType = {
    INSERT: "INSERT",
    MODIFY: "MODIFY",
    REMOVE: "REMOVE",
};
export class LimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "LimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "LimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, LimitExceededException.prototype);
    }
}
export class TrimmedDataAccessException extends __BaseException {
    constructor(opts) {
        super({
            name: "TrimmedDataAccessException",
            $fault: "client",
            ...opts,
        });
        this.name = "TrimmedDataAccessException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TrimmedDataAccessException.prototype);
    }
}
export const ShardIteratorType = {
    AFTER_SEQUENCE_NUMBER: "AFTER_SEQUENCE_NUMBER",
    AT_SEQUENCE_NUMBER: "AT_SEQUENCE_NUMBER",
    LATEST: "LATEST",
    TRIM_HORIZON: "TRIM_HORIZON",
};
export var AttributeValue;
(function (AttributeValue) {
    AttributeValue.visit = (value, visitor) => {
        if (value.S !== undefined)
            return visitor.S(value.S);
        if (value.N !== undefined)
            return visitor.N(value.N);
        if (value.B !== undefined)
            return visitor.B(value.B);
        if (value.SS !== undefined)
            return visitor.SS(value.SS);
        if (value.NS !== undefined)
            return visitor.NS(value.NS);
        if (value.BS !== undefined)
            return visitor.BS(value.BS);
        if (value.M !== undefined)
            return visitor.M(value.M);
        if (value.L !== undefined)
            return visitor.L(value.L);
        if (value.NULL !== undefined)
            return visitor.NULL(value.NULL);
        if (value.BOOL !== undefined)
            return visitor.BOOL(value.BOOL);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(AttributeValue || (AttributeValue = {}));
