import { createAggregatedClient } from "@smithy/smithy-client";
import { BatchGetChannelCommand, } from "./commands/BatchGetChannelCommand";
import { BatchGetStreamKeyCommand, } from "./commands/BatchGetStreamKeyCommand";
import { BatchStartViewerSessionRevocationCommand, } from "./commands/BatchStartViewerSessionRevocationCommand";
import { CreateChannelCommand, } from "./commands/CreateChannelCommand";
import { CreatePlaybackRestrictionPolicyCommand, } from "./commands/CreatePlaybackRestrictionPolicyCommand";
import { CreateRecordingConfigurationCommand, } from "./commands/CreateRecordingConfigurationCommand";
import { CreateStreamKeyCommand, } from "./commands/CreateStreamKeyCommand";
import { DeleteChannelCommand, } from "./commands/DeleteChannelCommand";
import { DeletePlaybackKeyPairCommand, } from "./commands/DeletePlaybackKeyPairCommand";
import { DeletePlaybackRestrictionPolicyCommand, } from "./commands/DeletePlaybackRestrictionPolicyCommand";
import { DeleteRecordingConfigurationCommand, } from "./commands/DeleteRecordingConfigurationCommand";
import { DeleteStreamKeyCommand, } from "./commands/DeleteStreamKeyCommand";
import { GetChannelCommand } from "./commands/GetChannelCommand";
import { GetPlaybackKeyPairCommand, } from "./commands/GetPlaybackKeyPairCommand";
import { GetPlaybackRestrictionPolicyCommand, } from "./commands/GetPlaybackRestrictionPolicyCommand";
import { GetRecordingConfigurationCommand, } from "./commands/GetRecordingConfigurationCommand";
import { GetStreamCommand } from "./commands/GetStreamCommand";
import { GetStreamKeyCommand, } from "./commands/GetStreamKeyCommand";
import { GetStreamSessionCommand, } from "./commands/GetStreamSessionCommand";
import { ImportPlaybackKeyPairCommand, } from "./commands/ImportPlaybackKeyPairCommand";
import { ListChannelsCommand, } from "./commands/ListChannelsCommand";
import { ListPlaybackKeyPairsCommand, } from "./commands/ListPlaybackKeyPairsCommand";
import { ListPlaybackRestrictionPoliciesCommand, } from "./commands/ListPlaybackRestrictionPoliciesCommand";
import { ListRecordingConfigurationsCommand, } from "./commands/ListRecordingConfigurationsCommand";
import { ListStreamKeysCommand, } from "./commands/ListStreamKeysCommand";
import { ListStreamsCommand } from "./commands/ListStreamsCommand";
import { ListStreamSessionsCommand, } from "./commands/ListStreamSessionsCommand";
import { ListTagsForResourceCommand, } from "./commands/ListTagsForResourceCommand";
import { PutMetadataCommand } from "./commands/PutMetadataCommand";
import { StartViewerSessionRevocationCommand, } from "./commands/StartViewerSessionRevocationCommand";
import { StopStreamCommand } from "./commands/StopStreamCommand";
import { TagResourceCommand } from "./commands/TagResourceCommand";
import { UntagResourceCommand, } from "./commands/UntagResourceCommand";
import { UpdateChannelCommand, } from "./commands/UpdateChannelCommand";
import { UpdatePlaybackRestrictionPolicyCommand, } from "./commands/UpdatePlaybackRestrictionPolicyCommand";
import { IvsClient } from "./IvsClient";
const commands = {
    BatchGetChannelCommand,
    BatchGetStreamKeyCommand,
    BatchStartViewerSessionRevocationCommand,
    CreateChannelCommand,
    CreatePlaybackRestrictionPolicyCommand,
    CreateRecordingConfigurationCommand,
    CreateStreamKeyCommand,
    DeleteChannelCommand,
    DeletePlaybackKeyPairCommand,
    DeletePlaybackRestrictionPolicyCommand,
    DeleteRecordingConfigurationCommand,
    DeleteStreamKeyCommand,
    GetChannelCommand,
    GetPlaybackKeyPairCommand,
    GetPlaybackRestrictionPolicyCommand,
    GetRecordingConfigurationCommand,
    GetStreamCommand,
    GetStreamKeyCommand,
    GetStreamSessionCommand,
    ImportPlaybackKeyPairCommand,
    ListChannelsCommand,
    ListPlaybackKeyPairsCommand,
    ListPlaybackRestrictionPoliciesCommand,
    ListRecordingConfigurationsCommand,
    ListStreamKeysCommand,
    ListStreamsCommand,
    ListStreamSessionsCommand,
    ListTagsForResourceCommand,
    PutMetadataCommand,
    StartViewerSessionRevocationCommand,
    StopStreamCommand,
    TagResourceCommand,
    UntagResourceCommand,
    UpdateChannelCommand,
    UpdatePlaybackRestrictionPolicyCommand,
};
export class Ivs extends IvsClient {
}
createAggregatedClient(commands, Ivs);
