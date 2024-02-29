import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import { DescribeStreamCommandInput, DescribeStreamCommandOutput } from "../commands/DescribeStreamCommand";
import { GetRecordsCommandInput, GetRecordsCommandOutput } from "../commands/GetRecordsCommand";
import { GetShardIteratorCommandInput, GetShardIteratorCommandOutput } from "../commands/GetShardIteratorCommand";
import { ListStreamsCommandInput, ListStreamsCommandOutput } from "../commands/ListStreamsCommand";
/**
 * serializeAws_json1_0DescribeStreamCommand
 */
export declare const se_DescribeStreamCommand: (input: DescribeStreamCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0GetRecordsCommand
 */
export declare const se_GetRecordsCommand: (input: GetRecordsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0GetShardIteratorCommand
 */
export declare const se_GetShardIteratorCommand: (input: GetShardIteratorCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ListStreamsCommand
 */
export declare const se_ListStreamsCommand: (input: ListStreamsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * deserializeAws_json1_0DescribeStreamCommand
 */
export declare const de_DescribeStreamCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DescribeStreamCommandOutput>;
/**
 * deserializeAws_json1_0GetRecordsCommand
 */
export declare const de_GetRecordsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetRecordsCommandOutput>;
/**
 * deserializeAws_json1_0GetShardIteratorCommand
 */
export declare const de_GetShardIteratorCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetShardIteratorCommandOutput>;
/**
 * deserializeAws_json1_0ListStreamsCommand
 */
export declare const de_ListStreamsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListStreamsCommandOutput>;
