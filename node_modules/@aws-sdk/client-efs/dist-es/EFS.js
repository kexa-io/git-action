import { createAggregatedClient } from "@smithy/smithy-client";
import { CreateAccessPointCommand, } from "./commands/CreateAccessPointCommand";
import { CreateFileSystemCommand, } from "./commands/CreateFileSystemCommand";
import { CreateMountTargetCommand, } from "./commands/CreateMountTargetCommand";
import { CreateReplicationConfigurationCommand, } from "./commands/CreateReplicationConfigurationCommand";
import { CreateTagsCommand } from "./commands/CreateTagsCommand";
import { DeleteAccessPointCommand, } from "./commands/DeleteAccessPointCommand";
import { DeleteFileSystemCommand, } from "./commands/DeleteFileSystemCommand";
import { DeleteFileSystemPolicyCommand, } from "./commands/DeleteFileSystemPolicyCommand";
import { DeleteMountTargetCommand, } from "./commands/DeleteMountTargetCommand";
import { DeleteReplicationConfigurationCommand, } from "./commands/DeleteReplicationConfigurationCommand";
import { DeleteTagsCommand } from "./commands/DeleteTagsCommand";
import { DescribeAccessPointsCommand, } from "./commands/DescribeAccessPointsCommand";
import { DescribeAccountPreferencesCommand, } from "./commands/DescribeAccountPreferencesCommand";
import { DescribeBackupPolicyCommand, } from "./commands/DescribeBackupPolicyCommand";
import { DescribeFileSystemPolicyCommand, } from "./commands/DescribeFileSystemPolicyCommand";
import { DescribeFileSystemsCommand, } from "./commands/DescribeFileSystemsCommand";
import { DescribeLifecycleConfigurationCommand, } from "./commands/DescribeLifecycleConfigurationCommand";
import { DescribeMountTargetsCommand, } from "./commands/DescribeMountTargetsCommand";
import { DescribeMountTargetSecurityGroupsCommand, } from "./commands/DescribeMountTargetSecurityGroupsCommand";
import { DescribeReplicationConfigurationsCommand, } from "./commands/DescribeReplicationConfigurationsCommand";
import { DescribeTagsCommand, } from "./commands/DescribeTagsCommand";
import { ListTagsForResourceCommand, } from "./commands/ListTagsForResourceCommand";
import { ModifyMountTargetSecurityGroupsCommand, } from "./commands/ModifyMountTargetSecurityGroupsCommand";
import { PutAccountPreferencesCommand, } from "./commands/PutAccountPreferencesCommand";
import { PutBackupPolicyCommand, } from "./commands/PutBackupPolicyCommand";
import { PutFileSystemPolicyCommand, } from "./commands/PutFileSystemPolicyCommand";
import { PutLifecycleConfigurationCommand, } from "./commands/PutLifecycleConfigurationCommand";
import { TagResourceCommand } from "./commands/TagResourceCommand";
import { UntagResourceCommand, } from "./commands/UntagResourceCommand";
import { UpdateFileSystemCommand, } from "./commands/UpdateFileSystemCommand";
import { UpdateFileSystemProtectionCommand, } from "./commands/UpdateFileSystemProtectionCommand";
import { EFSClient } from "./EFSClient";
const commands = {
    CreateAccessPointCommand,
    CreateFileSystemCommand,
    CreateMountTargetCommand,
    CreateReplicationConfigurationCommand,
    CreateTagsCommand,
    DeleteAccessPointCommand,
    DeleteFileSystemCommand,
    DeleteFileSystemPolicyCommand,
    DeleteMountTargetCommand,
    DeleteReplicationConfigurationCommand,
    DeleteTagsCommand,
    DescribeAccessPointsCommand,
    DescribeAccountPreferencesCommand,
    DescribeBackupPolicyCommand,
    DescribeFileSystemPolicyCommand,
    DescribeFileSystemsCommand,
    DescribeLifecycleConfigurationCommand,
    DescribeMountTargetsCommand,
    DescribeMountTargetSecurityGroupsCommand,
    DescribeReplicationConfigurationsCommand,
    DescribeTagsCommand,
    ListTagsForResourceCommand,
    ModifyMountTargetSecurityGroupsCommand,
    PutAccountPreferencesCommand,
    PutBackupPolicyCommand,
    PutFileSystemPolicyCommand,
    PutLifecycleConfigurationCommand,
    TagResourceCommand,
    UntagResourceCommand,
    UpdateFileSystemCommand,
    UpdateFileSystemProtectionCommand,
};
export class EFS extends EFSClient {
}
createAggregatedClient(commands, EFS);
