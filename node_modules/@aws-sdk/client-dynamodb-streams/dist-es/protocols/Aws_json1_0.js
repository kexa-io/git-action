import { awsExpectUnion as __expectUnion, loadRestJsonErrorCode, parseJsonBody as parseBody, parseJsonErrorBody as parseErrorBody, } from "@aws-sdk/core";
import { HttpRequest as __HttpRequest } from "@smithy/protocol-http";
import { _json, collectBody, decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectLong as __expectLong, expectNonNull as __expectNonNull, expectNumber as __expectNumber, expectString as __expectString, parseEpochTimestamp as __parseEpochTimestamp, take, withBaseException, } from "@smithy/smithy-client";
import { DynamoDBStreamsServiceException as __BaseException } from "../models/DynamoDBStreamsServiceException";
import { ExpiredIteratorException, InternalServerError, LimitExceededException, ResourceNotFoundException, TrimmedDataAccessException, } from "../models/models_0";
export const se_DescribeStreamCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeStream");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetRecordsCommand = async (input, context) => {
    const headers = sharedHeaders("GetRecords");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetShardIteratorCommand = async (input, context) => {
    const headers = sharedHeaders("GetShardIterator");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListStreamsCommand = async (input, context) => {
    const headers = sharedHeaders("ListStreams");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const de_DescribeStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_DescribeStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetRecordsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetRecordsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetShardIteratorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListStreamsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerError":
        case "com.amazonaws.dynamodbstreams#InternalServerError":
            throw await de_InternalServerErrorRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.dynamodbstreams#ResourceNotFoundException":
            throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "ExpiredIteratorException":
        case "com.amazonaws.dynamodbstreams#ExpiredIteratorException":
            throw await de_ExpiredIteratorExceptionRes(parsedOutput, context);
        case "LimitExceededException":
        case "com.amazonaws.dynamodbstreams#LimitExceededException":
            throw await de_LimitExceededExceptionRes(parsedOutput, context);
        case "TrimmedDataAccessException":
        case "com.amazonaws.dynamodbstreams#TrimmedDataAccessException":
            throw await de_TrimmedDataAccessExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode,
            });
    }
};
const de_ExpiredIteratorExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new ExpiredIteratorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InternalServerErrorRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new InternalServerError({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_LimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new LimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TrimmedDataAccessExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new TrimmedDataAccessException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_AttributeMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(__expectUnion(value), context);
        return acc;
    }, {});
};
const de_AttributeValue = (output, context) => {
    if (output.B != null) {
        return {
            B: context.base64Decoder(output.B),
        };
    }
    if (__expectBoolean(output.BOOL) !== undefined) {
        return { BOOL: __expectBoolean(output.BOOL) };
    }
    if (output.BS != null) {
        return {
            BS: de_BinarySetAttributeValue(output.BS, context),
        };
    }
    if (output.L != null) {
        return {
            L: de_ListAttributeValue(output.L, context),
        };
    }
    if (output.M != null) {
        return {
            M: de_MapAttributeValue(output.M, context),
        };
    }
    if (__expectString(output.N) !== undefined) {
        return { N: __expectString(output.N) };
    }
    if (output.NS != null) {
        return {
            NS: _json(output.NS),
        };
    }
    if (__expectBoolean(output.NULL) !== undefined) {
        return { NULL: __expectBoolean(output.NULL) };
    }
    if (__expectString(output.S) !== undefined) {
        return { S: __expectString(output.S) };
    }
    if (output.SS != null) {
        return {
            SS: _json(output.SS),
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
const de_BinarySetAttributeValue = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return context.base64Decoder(entry);
    });
    return retVal;
};
const de_DescribeStreamOutput = (output, context) => {
    return take(output, {
        StreamDescription: (_) => de_StreamDescription(_, context),
    });
};
const de_GetRecordsOutput = (output, context) => {
    return take(output, {
        NextShardIterator: __expectString,
        Records: (_) => de_RecordList(_, context),
    });
};
const de_ListAttributeValue = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_AttributeValue(__expectUnion(entry), context);
    });
    return retVal;
};
const de_MapAttributeValue = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(__expectUnion(value), context);
        return acc;
    }, {});
};
const de__Record = (output, context) => {
    return take(output, {
        awsRegion: __expectString,
        dynamodb: (_) => de_StreamRecord(_, context),
        eventID: __expectString,
        eventName: __expectString,
        eventSource: __expectString,
        eventVersion: __expectString,
        userIdentity: _json,
    });
};
const de_RecordList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de__Record(entry, context);
    });
    return retVal;
};
const de_StreamDescription = (output, context) => {
    return take(output, {
        CreationRequestDateTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        KeySchema: _json,
        LastEvaluatedShardId: __expectString,
        Shards: _json,
        StreamArn: __expectString,
        StreamLabel: __expectString,
        StreamStatus: __expectString,
        StreamViewType: __expectString,
        TableName: __expectString,
    });
};
const de_StreamRecord = (output, context) => {
    return take(output, {
        ApproximateCreationDateTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Keys: (_) => de_AttributeMap(_, context),
        NewImage: (_) => de_AttributeMap(_, context),
        OldImage: (_) => de_AttributeMap(_, context),
        SequenceNumber: __expectString,
        SizeBytes: __expectLong,
        StreamViewType: __expectString,
    });
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const throwDefaultError = withBaseException(__BaseException);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new __HttpRequest(contents);
};
function sharedHeaders(operation) {
    return {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": `DynamoDBStreams_20120810.${operation}`,
    };
}
