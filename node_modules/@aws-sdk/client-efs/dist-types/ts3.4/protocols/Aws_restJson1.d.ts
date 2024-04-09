import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import {
  CreateAccessPointCommandInput,
  CreateAccessPointCommandOutput,
} from "../commands/CreateAccessPointCommand";
import {
  CreateFileSystemCommandInput,
  CreateFileSystemCommandOutput,
} from "../commands/CreateFileSystemCommand";
import {
  CreateMountTargetCommandInput,
  CreateMountTargetCommandOutput,
} from "../commands/CreateMountTargetCommand";
import {
  CreateReplicationConfigurationCommandInput,
  CreateReplicationConfigurationCommandOutput,
} from "../commands/CreateReplicationConfigurationCommand";
import {
  CreateTagsCommandInput,
  CreateTagsCommandOutput,
} from "../commands/CreateTagsCommand";
import {
  DeleteAccessPointCommandInput,
  DeleteAccessPointCommandOutput,
} from "../commands/DeleteAccessPointCommand";
import {
  DeleteFileSystemCommandInput,
  DeleteFileSystemCommandOutput,
} from "../commands/DeleteFileSystemCommand";
import {
  DeleteFileSystemPolicyCommandInput,
  DeleteFileSystemPolicyCommandOutput,
} from "../commands/DeleteFileSystemPolicyCommand";
import {
  DeleteMountTargetCommandInput,
  DeleteMountTargetCommandOutput,
} from "../commands/DeleteMountTargetCommand";
import {
  DeleteReplicationConfigurationCommandInput,
  DeleteReplicationConfigurationCommandOutput,
} from "../commands/DeleteReplicationConfigurationCommand";
import {
  DeleteTagsCommandInput,
  DeleteTagsCommandOutput,
} from "../commands/DeleteTagsCommand";
import {
  DescribeAccessPointsCommandInput,
  DescribeAccessPointsCommandOutput,
} from "../commands/DescribeAccessPointsCommand";
import {
  DescribeAccountPreferencesCommandInput,
  DescribeAccountPreferencesCommandOutput,
} from "../commands/DescribeAccountPreferencesCommand";
import {
  DescribeBackupPolicyCommandInput,
  DescribeBackupPolicyCommandOutput,
} from "../commands/DescribeBackupPolicyCommand";
import {
  DescribeFileSystemPolicyCommandInput,
  DescribeFileSystemPolicyCommandOutput,
} from "../commands/DescribeFileSystemPolicyCommand";
import {
  DescribeFileSystemsCommandInput,
  DescribeFileSystemsCommandOutput,
} from "../commands/DescribeFileSystemsCommand";
import {
  DescribeLifecycleConfigurationCommandInput,
  DescribeLifecycleConfigurationCommandOutput,
} from "../commands/DescribeLifecycleConfigurationCommand";
import {
  DescribeMountTargetsCommandInput,
  DescribeMountTargetsCommandOutput,
} from "../commands/DescribeMountTargetsCommand";
import {
  DescribeMountTargetSecurityGroupsCommandInput,
  DescribeMountTargetSecurityGroupsCommandOutput,
} from "../commands/DescribeMountTargetSecurityGroupsCommand";
import {
  DescribeReplicationConfigurationsCommandInput,
  DescribeReplicationConfigurationsCommandOutput,
} from "../commands/DescribeReplicationConfigurationsCommand";
import {
  DescribeTagsCommandInput,
  DescribeTagsCommandOutput,
} from "../commands/DescribeTagsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "../commands/ListTagsForResourceCommand";
import {
  ModifyMountTargetSecurityGroupsCommandInput,
  ModifyMountTargetSecurityGroupsCommandOutput,
} from "../commands/ModifyMountTargetSecurityGroupsCommand";
import {
  PutAccountPreferencesCommandInput,
  PutAccountPreferencesCommandOutput,
} from "../commands/PutAccountPreferencesCommand";
import {
  PutBackupPolicyCommandInput,
  PutBackupPolicyCommandOutput,
} from "../commands/PutBackupPolicyCommand";
import {
  PutFileSystemPolicyCommandInput,
  PutFileSystemPolicyCommandOutput,
} from "../commands/PutFileSystemPolicyCommand";
import {
  PutLifecycleConfigurationCommandInput,
  PutLifecycleConfigurationCommandOutput,
} from "../commands/PutLifecycleConfigurationCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "../commands/TagResourceCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "../commands/UntagResourceCommand";
import {
  UpdateFileSystemCommandInput,
  UpdateFileSystemCommandOutput,
} from "../commands/UpdateFileSystemCommand";
import {
  UpdateFileSystemProtectionCommandInput,
  UpdateFileSystemProtectionCommandOutput,
} from "../commands/UpdateFileSystemProtectionCommand";
export declare const se_CreateAccessPointCommand: (
  input: CreateAccessPointCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateFileSystemCommand: (
  input: CreateFileSystemCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateMountTargetCommand: (
  input: CreateMountTargetCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateReplicationConfigurationCommand: (
  input: CreateReplicationConfigurationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateTagsCommand: (
  input: CreateTagsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteAccessPointCommand: (
  input: DeleteAccessPointCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteFileSystemCommand: (
  input: DeleteFileSystemCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteFileSystemPolicyCommand: (
  input: DeleteFileSystemPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteMountTargetCommand: (
  input: DeleteMountTargetCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteReplicationConfigurationCommand: (
  input: DeleteReplicationConfigurationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteTagsCommand: (
  input: DeleteTagsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeAccessPointsCommand: (
  input: DescribeAccessPointsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeAccountPreferencesCommand: (
  input: DescribeAccountPreferencesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeBackupPolicyCommand: (
  input: DescribeBackupPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeFileSystemPolicyCommand: (
  input: DescribeFileSystemPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeFileSystemsCommand: (
  input: DescribeFileSystemsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeLifecycleConfigurationCommand: (
  input: DescribeLifecycleConfigurationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeMountTargetsCommand: (
  input: DescribeMountTargetsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeMountTargetSecurityGroupsCommand: (
  input: DescribeMountTargetSecurityGroupsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeReplicationConfigurationsCommand: (
  input: DescribeReplicationConfigurationsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeTagsCommand: (
  input: DescribeTagsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListTagsForResourceCommand: (
  input: ListTagsForResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ModifyMountTargetSecurityGroupsCommand: (
  input: ModifyMountTargetSecurityGroupsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutAccountPreferencesCommand: (
  input: PutAccountPreferencesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutBackupPolicyCommand: (
  input: PutBackupPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutFileSystemPolicyCommand: (
  input: PutFileSystemPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutLifecycleConfigurationCommand: (
  input: PutLifecycleConfigurationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TagResourceCommand: (
  input: TagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UntagResourceCommand: (
  input: UntagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateFileSystemCommand: (
  input: UpdateFileSystemCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateFileSystemProtectionCommand: (
  input: UpdateFileSystemProtectionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const de_CreateAccessPointCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateAccessPointCommandOutput>;
export declare const de_CreateFileSystemCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateFileSystemCommandOutput>;
export declare const de_CreateMountTargetCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateMountTargetCommandOutput>;
export declare const de_CreateReplicationConfigurationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateReplicationConfigurationCommandOutput>;
export declare const de_CreateTagsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateTagsCommandOutput>;
export declare const de_DeleteAccessPointCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteAccessPointCommandOutput>;
export declare const de_DeleteFileSystemCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteFileSystemCommandOutput>;
export declare const de_DeleteFileSystemPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteFileSystemPolicyCommandOutput>;
export declare const de_DeleteMountTargetCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteMountTargetCommandOutput>;
export declare const de_DeleteReplicationConfigurationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteReplicationConfigurationCommandOutput>;
export declare const de_DeleteTagsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteTagsCommandOutput>;
export declare const de_DescribeAccessPointsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeAccessPointsCommandOutput>;
export declare const de_DescribeAccountPreferencesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeAccountPreferencesCommandOutput>;
export declare const de_DescribeBackupPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeBackupPolicyCommandOutput>;
export declare const de_DescribeFileSystemPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeFileSystemPolicyCommandOutput>;
export declare const de_DescribeFileSystemsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeFileSystemsCommandOutput>;
export declare const de_DescribeLifecycleConfigurationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeLifecycleConfigurationCommandOutput>;
export declare const de_DescribeMountTargetsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeMountTargetsCommandOutput>;
export declare const de_DescribeMountTargetSecurityGroupsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeMountTargetSecurityGroupsCommandOutput>;
export declare const de_DescribeReplicationConfigurationsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeReplicationConfigurationsCommandOutput>;
export declare const de_DescribeTagsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeTagsCommandOutput>;
export declare const de_ListTagsForResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListTagsForResourceCommandOutput>;
export declare const de_ModifyMountTargetSecurityGroupsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ModifyMountTargetSecurityGroupsCommandOutput>;
export declare const de_PutAccountPreferencesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutAccountPreferencesCommandOutput>;
export declare const de_PutBackupPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutBackupPolicyCommandOutput>;
export declare const de_PutFileSystemPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutFileSystemPolicyCommandOutput>;
export declare const de_PutLifecycleConfigurationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutLifecycleConfigurationCommandOutput>;
export declare const de_TagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TagResourceCommandOutput>;
export declare const de_UntagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UntagResourceCommandOutput>;
export declare const de_UpdateFileSystemCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateFileSystemCommandOutput>;
export declare const de_UpdateFileSystemProtectionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateFileSystemProtectionCommandOutput>;
