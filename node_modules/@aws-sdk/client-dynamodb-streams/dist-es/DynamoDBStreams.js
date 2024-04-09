import { createAggregatedClient } from "@smithy/smithy-client";
import { DescribeStreamCommand, } from "./commands/DescribeStreamCommand";
import { GetRecordsCommand } from "./commands/GetRecordsCommand";
import { GetShardIteratorCommand, } from "./commands/GetShardIteratorCommand";
import { ListStreamsCommand } from "./commands/ListStreamsCommand";
import { DynamoDBStreamsClient } from "./DynamoDBStreamsClient";
const commands = {
    DescribeStreamCommand,
    GetRecordsCommand,
    GetShardIteratorCommand,
    ListStreamsCommand,
};
export class DynamoDBStreams extends DynamoDBStreamsClient {
}
createAggregatedClient(commands, DynamoDBStreams);
