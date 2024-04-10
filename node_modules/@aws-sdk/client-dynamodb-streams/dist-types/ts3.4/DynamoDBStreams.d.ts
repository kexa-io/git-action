import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import {
  DescribeStreamCommandInput,
  DescribeStreamCommandOutput,
} from "./commands/DescribeStreamCommand";
import {
  GetRecordsCommandInput,
  GetRecordsCommandOutput,
} from "./commands/GetRecordsCommand";
import {
  GetShardIteratorCommandInput,
  GetShardIteratorCommandOutput,
} from "./commands/GetShardIteratorCommand";
import {
  ListStreamsCommandInput,
  ListStreamsCommandOutput,
} from "./commands/ListStreamsCommand";
import { DynamoDBStreamsClient } from "./DynamoDBStreamsClient";
export interface DynamoDBStreams {
  describeStream(
    args: DescribeStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeStreamCommandOutput>;
  describeStream(
    args: DescribeStreamCommandInput,
    cb: (err: any, data?: DescribeStreamCommandOutput) => void
  ): void;
  describeStream(
    args: DescribeStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeStreamCommandOutput) => void
  ): void;
  getRecords(
    args: GetRecordsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetRecordsCommandOutput>;
  getRecords(
    args: GetRecordsCommandInput,
    cb: (err: any, data?: GetRecordsCommandOutput) => void
  ): void;
  getRecords(
    args: GetRecordsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRecordsCommandOutput) => void
  ): void;
  getShardIterator(
    args: GetShardIteratorCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetShardIteratorCommandOutput>;
  getShardIterator(
    args: GetShardIteratorCommandInput,
    cb: (err: any, data?: GetShardIteratorCommandOutput) => void
  ): void;
  getShardIterator(
    args: GetShardIteratorCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetShardIteratorCommandOutput) => void
  ): void;
  listStreams(): Promise<ListStreamsCommandOutput>;
  listStreams(
    args: ListStreamsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListStreamsCommandOutput>;
  listStreams(
    args: ListStreamsCommandInput,
    cb: (err: any, data?: ListStreamsCommandOutput) => void
  ): void;
  listStreams(
    args: ListStreamsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListStreamsCommandOutput) => void
  ): void;
}
export declare class DynamoDBStreams
  extends DynamoDBStreamsClient
  implements DynamoDBStreams {}
