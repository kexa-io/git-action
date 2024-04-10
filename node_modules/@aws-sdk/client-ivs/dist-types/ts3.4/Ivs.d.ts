import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import {
  BatchGetChannelCommandInput,
  BatchGetChannelCommandOutput,
} from "./commands/BatchGetChannelCommand";
import {
  BatchGetStreamKeyCommandInput,
  BatchGetStreamKeyCommandOutput,
} from "./commands/BatchGetStreamKeyCommand";
import {
  BatchStartViewerSessionRevocationCommandInput,
  BatchStartViewerSessionRevocationCommandOutput,
} from "./commands/BatchStartViewerSessionRevocationCommand";
import {
  CreateChannelCommandInput,
  CreateChannelCommandOutput,
} from "./commands/CreateChannelCommand";
import {
  CreatePlaybackRestrictionPolicyCommandInput,
  CreatePlaybackRestrictionPolicyCommandOutput,
} from "./commands/CreatePlaybackRestrictionPolicyCommand";
import {
  CreateRecordingConfigurationCommandInput,
  CreateRecordingConfigurationCommandOutput,
} from "./commands/CreateRecordingConfigurationCommand";
import {
  CreateStreamKeyCommandInput,
  CreateStreamKeyCommandOutput,
} from "./commands/CreateStreamKeyCommand";
import {
  DeleteChannelCommandInput,
  DeleteChannelCommandOutput,
} from "./commands/DeleteChannelCommand";
import {
  DeletePlaybackKeyPairCommandInput,
  DeletePlaybackKeyPairCommandOutput,
} from "./commands/DeletePlaybackKeyPairCommand";
import {
  DeletePlaybackRestrictionPolicyCommandInput,
  DeletePlaybackRestrictionPolicyCommandOutput,
} from "./commands/DeletePlaybackRestrictionPolicyCommand";
import {
  DeleteRecordingConfigurationCommandInput,
  DeleteRecordingConfigurationCommandOutput,
} from "./commands/DeleteRecordingConfigurationCommand";
import {
  DeleteStreamKeyCommandInput,
  DeleteStreamKeyCommandOutput,
} from "./commands/DeleteStreamKeyCommand";
import {
  GetChannelCommandInput,
  GetChannelCommandOutput,
} from "./commands/GetChannelCommand";
import {
  GetPlaybackKeyPairCommandInput,
  GetPlaybackKeyPairCommandOutput,
} from "./commands/GetPlaybackKeyPairCommand";
import {
  GetPlaybackRestrictionPolicyCommandInput,
  GetPlaybackRestrictionPolicyCommandOutput,
} from "./commands/GetPlaybackRestrictionPolicyCommand";
import {
  GetRecordingConfigurationCommandInput,
  GetRecordingConfigurationCommandOutput,
} from "./commands/GetRecordingConfigurationCommand";
import {
  GetStreamCommandInput,
  GetStreamCommandOutput,
} from "./commands/GetStreamCommand";
import {
  GetStreamKeyCommandInput,
  GetStreamKeyCommandOutput,
} from "./commands/GetStreamKeyCommand";
import {
  GetStreamSessionCommandInput,
  GetStreamSessionCommandOutput,
} from "./commands/GetStreamSessionCommand";
import {
  ImportPlaybackKeyPairCommandInput,
  ImportPlaybackKeyPairCommandOutput,
} from "./commands/ImportPlaybackKeyPairCommand";
import {
  ListChannelsCommandInput,
  ListChannelsCommandOutput,
} from "./commands/ListChannelsCommand";
import {
  ListPlaybackKeyPairsCommandInput,
  ListPlaybackKeyPairsCommandOutput,
} from "./commands/ListPlaybackKeyPairsCommand";
import {
  ListPlaybackRestrictionPoliciesCommandInput,
  ListPlaybackRestrictionPoliciesCommandOutput,
} from "./commands/ListPlaybackRestrictionPoliciesCommand";
import {
  ListRecordingConfigurationsCommandInput,
  ListRecordingConfigurationsCommandOutput,
} from "./commands/ListRecordingConfigurationsCommand";
import {
  ListStreamKeysCommandInput,
  ListStreamKeysCommandOutput,
} from "./commands/ListStreamKeysCommand";
import {
  ListStreamsCommandInput,
  ListStreamsCommandOutput,
} from "./commands/ListStreamsCommand";
import {
  ListStreamSessionsCommandInput,
  ListStreamSessionsCommandOutput,
} from "./commands/ListStreamSessionsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  PutMetadataCommandInput,
  PutMetadataCommandOutput,
} from "./commands/PutMetadataCommand";
import {
  StartViewerSessionRevocationCommandInput,
  StartViewerSessionRevocationCommandOutput,
} from "./commands/StartViewerSessionRevocationCommand";
import {
  StopStreamCommandInput,
  StopStreamCommandOutput,
} from "./commands/StopStreamCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "./commands/TagResourceCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  UpdateChannelCommandInput,
  UpdateChannelCommandOutput,
} from "./commands/UpdateChannelCommand";
import {
  UpdatePlaybackRestrictionPolicyCommandInput,
  UpdatePlaybackRestrictionPolicyCommandOutput,
} from "./commands/UpdatePlaybackRestrictionPolicyCommand";
import { IvsClient } from "./IvsClient";
export interface Ivs {
  batchGetChannel(
    args: BatchGetChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchGetChannelCommandOutput>;
  batchGetChannel(
    args: BatchGetChannelCommandInput,
    cb: (err: any, data?: BatchGetChannelCommandOutput) => void
  ): void;
  batchGetChannel(
    args: BatchGetChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchGetChannelCommandOutput) => void
  ): void;
  batchGetStreamKey(
    args: BatchGetStreamKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchGetStreamKeyCommandOutput>;
  batchGetStreamKey(
    args: BatchGetStreamKeyCommandInput,
    cb: (err: any, data?: BatchGetStreamKeyCommandOutput) => void
  ): void;
  batchGetStreamKey(
    args: BatchGetStreamKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchGetStreamKeyCommandOutput) => void
  ): void;
  batchStartViewerSessionRevocation(
    args: BatchStartViewerSessionRevocationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchStartViewerSessionRevocationCommandOutput>;
  batchStartViewerSessionRevocation(
    args: BatchStartViewerSessionRevocationCommandInput,
    cb: (
      err: any,
      data?: BatchStartViewerSessionRevocationCommandOutput
    ) => void
  ): void;
  batchStartViewerSessionRevocation(
    args: BatchStartViewerSessionRevocationCommandInput,
    options: __HttpHandlerOptions,
    cb: (
      err: any,
      data?: BatchStartViewerSessionRevocationCommandOutput
    ) => void
  ): void;
  createChannel(): Promise<CreateChannelCommandOutput>;
  createChannel(
    args: CreateChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateChannelCommandOutput>;
  createChannel(
    args: CreateChannelCommandInput,
    cb: (err: any, data?: CreateChannelCommandOutput) => void
  ): void;
  createChannel(
    args: CreateChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateChannelCommandOutput) => void
  ): void;
  createPlaybackRestrictionPolicy(): Promise<CreatePlaybackRestrictionPolicyCommandOutput>;
  createPlaybackRestrictionPolicy(
    args: CreatePlaybackRestrictionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreatePlaybackRestrictionPolicyCommandOutput>;
  createPlaybackRestrictionPolicy(
    args: CreatePlaybackRestrictionPolicyCommandInput,
    cb: (err: any, data?: CreatePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  createPlaybackRestrictionPolicy(
    args: CreatePlaybackRestrictionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreatePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  createRecordingConfiguration(
    args: CreateRecordingConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateRecordingConfigurationCommandOutput>;
  createRecordingConfiguration(
    args: CreateRecordingConfigurationCommandInput,
    cb: (err: any, data?: CreateRecordingConfigurationCommandOutput) => void
  ): void;
  createRecordingConfiguration(
    args: CreateRecordingConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateRecordingConfigurationCommandOutput) => void
  ): void;
  createStreamKey(
    args: CreateStreamKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateStreamKeyCommandOutput>;
  createStreamKey(
    args: CreateStreamKeyCommandInput,
    cb: (err: any, data?: CreateStreamKeyCommandOutput) => void
  ): void;
  createStreamKey(
    args: CreateStreamKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateStreamKeyCommandOutput) => void
  ): void;
  deleteChannel(
    args: DeleteChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteChannelCommandOutput>;
  deleteChannel(
    args: DeleteChannelCommandInput,
    cb: (err: any, data?: DeleteChannelCommandOutput) => void
  ): void;
  deleteChannel(
    args: DeleteChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteChannelCommandOutput) => void
  ): void;
  deletePlaybackKeyPair(
    args: DeletePlaybackKeyPairCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeletePlaybackKeyPairCommandOutput>;
  deletePlaybackKeyPair(
    args: DeletePlaybackKeyPairCommandInput,
    cb: (err: any, data?: DeletePlaybackKeyPairCommandOutput) => void
  ): void;
  deletePlaybackKeyPair(
    args: DeletePlaybackKeyPairCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeletePlaybackKeyPairCommandOutput) => void
  ): void;
  deletePlaybackRestrictionPolicy(
    args: DeletePlaybackRestrictionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeletePlaybackRestrictionPolicyCommandOutput>;
  deletePlaybackRestrictionPolicy(
    args: DeletePlaybackRestrictionPolicyCommandInput,
    cb: (err: any, data?: DeletePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  deletePlaybackRestrictionPolicy(
    args: DeletePlaybackRestrictionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeletePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  deleteRecordingConfiguration(
    args: DeleteRecordingConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteRecordingConfigurationCommandOutput>;
  deleteRecordingConfiguration(
    args: DeleteRecordingConfigurationCommandInput,
    cb: (err: any, data?: DeleteRecordingConfigurationCommandOutput) => void
  ): void;
  deleteRecordingConfiguration(
    args: DeleteRecordingConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteRecordingConfigurationCommandOutput) => void
  ): void;
  deleteStreamKey(
    args: DeleteStreamKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteStreamKeyCommandOutput>;
  deleteStreamKey(
    args: DeleteStreamKeyCommandInput,
    cb: (err: any, data?: DeleteStreamKeyCommandOutput) => void
  ): void;
  deleteStreamKey(
    args: DeleteStreamKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteStreamKeyCommandOutput) => void
  ): void;
  getChannel(
    args: GetChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetChannelCommandOutput>;
  getChannel(
    args: GetChannelCommandInput,
    cb: (err: any, data?: GetChannelCommandOutput) => void
  ): void;
  getChannel(
    args: GetChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetChannelCommandOutput) => void
  ): void;
  getPlaybackKeyPair(
    args: GetPlaybackKeyPairCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetPlaybackKeyPairCommandOutput>;
  getPlaybackKeyPair(
    args: GetPlaybackKeyPairCommandInput,
    cb: (err: any, data?: GetPlaybackKeyPairCommandOutput) => void
  ): void;
  getPlaybackKeyPair(
    args: GetPlaybackKeyPairCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetPlaybackKeyPairCommandOutput) => void
  ): void;
  getPlaybackRestrictionPolicy(
    args: GetPlaybackRestrictionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetPlaybackRestrictionPolicyCommandOutput>;
  getPlaybackRestrictionPolicy(
    args: GetPlaybackRestrictionPolicyCommandInput,
    cb: (err: any, data?: GetPlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  getPlaybackRestrictionPolicy(
    args: GetPlaybackRestrictionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetPlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  getRecordingConfiguration(
    args: GetRecordingConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetRecordingConfigurationCommandOutput>;
  getRecordingConfiguration(
    args: GetRecordingConfigurationCommandInput,
    cb: (err: any, data?: GetRecordingConfigurationCommandOutput) => void
  ): void;
  getRecordingConfiguration(
    args: GetRecordingConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRecordingConfigurationCommandOutput) => void
  ): void;
  getStream(
    args: GetStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetStreamCommandOutput>;
  getStream(
    args: GetStreamCommandInput,
    cb: (err: any, data?: GetStreamCommandOutput) => void
  ): void;
  getStream(
    args: GetStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetStreamCommandOutput) => void
  ): void;
  getStreamKey(
    args: GetStreamKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetStreamKeyCommandOutput>;
  getStreamKey(
    args: GetStreamKeyCommandInput,
    cb: (err: any, data?: GetStreamKeyCommandOutput) => void
  ): void;
  getStreamKey(
    args: GetStreamKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetStreamKeyCommandOutput) => void
  ): void;
  getStreamSession(
    args: GetStreamSessionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetStreamSessionCommandOutput>;
  getStreamSession(
    args: GetStreamSessionCommandInput,
    cb: (err: any, data?: GetStreamSessionCommandOutput) => void
  ): void;
  getStreamSession(
    args: GetStreamSessionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetStreamSessionCommandOutput) => void
  ): void;
  importPlaybackKeyPair(
    args: ImportPlaybackKeyPairCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ImportPlaybackKeyPairCommandOutput>;
  importPlaybackKeyPair(
    args: ImportPlaybackKeyPairCommandInput,
    cb: (err: any, data?: ImportPlaybackKeyPairCommandOutput) => void
  ): void;
  importPlaybackKeyPair(
    args: ImportPlaybackKeyPairCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ImportPlaybackKeyPairCommandOutput) => void
  ): void;
  listChannels(): Promise<ListChannelsCommandOutput>;
  listChannels(
    args: ListChannelsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListChannelsCommandOutput>;
  listChannels(
    args: ListChannelsCommandInput,
    cb: (err: any, data?: ListChannelsCommandOutput) => void
  ): void;
  listChannels(
    args: ListChannelsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListChannelsCommandOutput) => void
  ): void;
  listPlaybackKeyPairs(): Promise<ListPlaybackKeyPairsCommandOutput>;
  listPlaybackKeyPairs(
    args: ListPlaybackKeyPairsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListPlaybackKeyPairsCommandOutput>;
  listPlaybackKeyPairs(
    args: ListPlaybackKeyPairsCommandInput,
    cb: (err: any, data?: ListPlaybackKeyPairsCommandOutput) => void
  ): void;
  listPlaybackKeyPairs(
    args: ListPlaybackKeyPairsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPlaybackKeyPairsCommandOutput) => void
  ): void;
  listPlaybackRestrictionPolicies(): Promise<ListPlaybackRestrictionPoliciesCommandOutput>;
  listPlaybackRestrictionPolicies(
    args: ListPlaybackRestrictionPoliciesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListPlaybackRestrictionPoliciesCommandOutput>;
  listPlaybackRestrictionPolicies(
    args: ListPlaybackRestrictionPoliciesCommandInput,
    cb: (err: any, data?: ListPlaybackRestrictionPoliciesCommandOutput) => void
  ): void;
  listPlaybackRestrictionPolicies(
    args: ListPlaybackRestrictionPoliciesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPlaybackRestrictionPoliciesCommandOutput) => void
  ): void;
  listRecordingConfigurations(): Promise<ListRecordingConfigurationsCommandOutput>;
  listRecordingConfigurations(
    args: ListRecordingConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListRecordingConfigurationsCommandOutput>;
  listRecordingConfigurations(
    args: ListRecordingConfigurationsCommandInput,
    cb: (err: any, data?: ListRecordingConfigurationsCommandOutput) => void
  ): void;
  listRecordingConfigurations(
    args: ListRecordingConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListRecordingConfigurationsCommandOutput) => void
  ): void;
  listStreamKeys(
    args: ListStreamKeysCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListStreamKeysCommandOutput>;
  listStreamKeys(
    args: ListStreamKeysCommandInput,
    cb: (err: any, data?: ListStreamKeysCommandOutput) => void
  ): void;
  listStreamKeys(
    args: ListStreamKeysCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListStreamKeysCommandOutput) => void
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
  listStreamSessions(
    args: ListStreamSessionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListStreamSessionsCommandOutput>;
  listStreamSessions(
    args: ListStreamSessionsCommandInput,
    cb: (err: any, data?: ListStreamSessionsCommandOutput) => void
  ): void;
  listStreamSessions(
    args: ListStreamSessionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListStreamSessionsCommandOutput) => void
  ): void;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForResourceCommandOutput>;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  putMetadata(
    args: PutMetadataCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutMetadataCommandOutput>;
  putMetadata(
    args: PutMetadataCommandInput,
    cb: (err: any, data?: PutMetadataCommandOutput) => void
  ): void;
  putMetadata(
    args: PutMetadataCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutMetadataCommandOutput) => void
  ): void;
  startViewerSessionRevocation(
    args: StartViewerSessionRevocationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartViewerSessionRevocationCommandOutput>;
  startViewerSessionRevocation(
    args: StartViewerSessionRevocationCommandInput,
    cb: (err: any, data?: StartViewerSessionRevocationCommandOutput) => void
  ): void;
  startViewerSessionRevocation(
    args: StartViewerSessionRevocationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartViewerSessionRevocationCommandOutput) => void
  ): void;
  stopStream(
    args: StopStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopStreamCommandOutput>;
  stopStream(
    args: StopStreamCommandInput,
    cb: (err: any, data?: StopStreamCommandOutput) => void
  ): void;
  stopStream(
    args: StopStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopStreamCommandOutput) => void
  ): void;
  tagResource(
    args: TagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<TagResourceCommandOutput>;
  tagResource(
    args: TagResourceCommandInput,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  tagResource(
    args: TagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  untagResource(
    args: UntagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagResourceCommandOutput>;
  untagResource(
    args: UntagResourceCommandInput,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  untagResource(
    args: UntagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  updateChannel(
    args: UpdateChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateChannelCommandOutput>;
  updateChannel(
    args: UpdateChannelCommandInput,
    cb: (err: any, data?: UpdateChannelCommandOutput) => void
  ): void;
  updateChannel(
    args: UpdateChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateChannelCommandOutput) => void
  ): void;
  updatePlaybackRestrictionPolicy(
    args: UpdatePlaybackRestrictionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdatePlaybackRestrictionPolicyCommandOutput>;
  updatePlaybackRestrictionPolicy(
    args: UpdatePlaybackRestrictionPolicyCommandInput,
    cb: (err: any, data?: UpdatePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
  updatePlaybackRestrictionPolicy(
    args: UpdatePlaybackRestrictionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdatePlaybackRestrictionPolicyCommandOutput) => void
  ): void;
}
export declare class Ivs extends IvsClient implements Ivs {}
