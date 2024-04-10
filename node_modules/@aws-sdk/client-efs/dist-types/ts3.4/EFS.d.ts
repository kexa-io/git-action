import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import {
  CreateAccessPointCommandInput,
  CreateAccessPointCommandOutput,
} from "./commands/CreateAccessPointCommand";
import {
  CreateFileSystemCommandInput,
  CreateFileSystemCommandOutput,
} from "./commands/CreateFileSystemCommand";
import {
  CreateMountTargetCommandInput,
  CreateMountTargetCommandOutput,
} from "./commands/CreateMountTargetCommand";
import {
  CreateReplicationConfigurationCommandInput,
  CreateReplicationConfigurationCommandOutput,
} from "./commands/CreateReplicationConfigurationCommand";
import {
  CreateTagsCommandInput,
  CreateTagsCommandOutput,
} from "./commands/CreateTagsCommand";
import {
  DeleteAccessPointCommandInput,
  DeleteAccessPointCommandOutput,
} from "./commands/DeleteAccessPointCommand";
import {
  DeleteFileSystemCommandInput,
  DeleteFileSystemCommandOutput,
} from "./commands/DeleteFileSystemCommand";
import {
  DeleteFileSystemPolicyCommandInput,
  DeleteFileSystemPolicyCommandOutput,
} from "./commands/DeleteFileSystemPolicyCommand";
import {
  DeleteMountTargetCommandInput,
  DeleteMountTargetCommandOutput,
} from "./commands/DeleteMountTargetCommand";
import {
  DeleteReplicationConfigurationCommandInput,
  DeleteReplicationConfigurationCommandOutput,
} from "./commands/DeleteReplicationConfigurationCommand";
import {
  DeleteTagsCommandInput,
  DeleteTagsCommandOutput,
} from "./commands/DeleteTagsCommand";
import {
  DescribeAccessPointsCommandInput,
  DescribeAccessPointsCommandOutput,
} from "./commands/DescribeAccessPointsCommand";
import {
  DescribeAccountPreferencesCommandInput,
  DescribeAccountPreferencesCommandOutput,
} from "./commands/DescribeAccountPreferencesCommand";
import {
  DescribeBackupPolicyCommandInput,
  DescribeBackupPolicyCommandOutput,
} from "./commands/DescribeBackupPolicyCommand";
import {
  DescribeFileSystemPolicyCommandInput,
  DescribeFileSystemPolicyCommandOutput,
} from "./commands/DescribeFileSystemPolicyCommand";
import {
  DescribeFileSystemsCommandInput,
  DescribeFileSystemsCommandOutput,
} from "./commands/DescribeFileSystemsCommand";
import {
  DescribeLifecycleConfigurationCommandInput,
  DescribeLifecycleConfigurationCommandOutput,
} from "./commands/DescribeLifecycleConfigurationCommand";
import {
  DescribeMountTargetsCommandInput,
  DescribeMountTargetsCommandOutput,
} from "./commands/DescribeMountTargetsCommand";
import {
  DescribeMountTargetSecurityGroupsCommandInput,
  DescribeMountTargetSecurityGroupsCommandOutput,
} from "./commands/DescribeMountTargetSecurityGroupsCommand";
import {
  DescribeReplicationConfigurationsCommandInput,
  DescribeReplicationConfigurationsCommandOutput,
} from "./commands/DescribeReplicationConfigurationsCommand";
import {
  DescribeTagsCommandInput,
  DescribeTagsCommandOutput,
} from "./commands/DescribeTagsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  ModifyMountTargetSecurityGroupsCommandInput,
  ModifyMountTargetSecurityGroupsCommandOutput,
} from "./commands/ModifyMountTargetSecurityGroupsCommand";
import {
  PutAccountPreferencesCommandInput,
  PutAccountPreferencesCommandOutput,
} from "./commands/PutAccountPreferencesCommand";
import {
  PutBackupPolicyCommandInput,
  PutBackupPolicyCommandOutput,
} from "./commands/PutBackupPolicyCommand";
import {
  PutFileSystemPolicyCommandInput,
  PutFileSystemPolicyCommandOutput,
} from "./commands/PutFileSystemPolicyCommand";
import {
  PutLifecycleConfigurationCommandInput,
  PutLifecycleConfigurationCommandOutput,
} from "./commands/PutLifecycleConfigurationCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "./commands/TagResourceCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  UpdateFileSystemCommandInput,
  UpdateFileSystemCommandOutput,
} from "./commands/UpdateFileSystemCommand";
import {
  UpdateFileSystemProtectionCommandInput,
  UpdateFileSystemProtectionCommandOutput,
} from "./commands/UpdateFileSystemProtectionCommand";
import { EFSClient } from "./EFSClient";
export interface EFS {
  createAccessPoint(
    args: CreateAccessPointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateAccessPointCommandOutput>;
  createAccessPoint(
    args: CreateAccessPointCommandInput,
    cb: (err: any, data?: CreateAccessPointCommandOutput) => void
  ): void;
  createAccessPoint(
    args: CreateAccessPointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateAccessPointCommandOutput) => void
  ): void;
  createFileSystem(
    args: CreateFileSystemCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateFileSystemCommandOutput>;
  createFileSystem(
    args: CreateFileSystemCommandInput,
    cb: (err: any, data?: CreateFileSystemCommandOutput) => void
  ): void;
  createFileSystem(
    args: CreateFileSystemCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateFileSystemCommandOutput) => void
  ): void;
  createMountTarget(
    args: CreateMountTargetCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateMountTargetCommandOutput>;
  createMountTarget(
    args: CreateMountTargetCommandInput,
    cb: (err: any, data?: CreateMountTargetCommandOutput) => void
  ): void;
  createMountTarget(
    args: CreateMountTargetCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateMountTargetCommandOutput) => void
  ): void;
  createReplicationConfiguration(
    args: CreateReplicationConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateReplicationConfigurationCommandOutput>;
  createReplicationConfiguration(
    args: CreateReplicationConfigurationCommandInput,
    cb: (err: any, data?: CreateReplicationConfigurationCommandOutput) => void
  ): void;
  createReplicationConfiguration(
    args: CreateReplicationConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateReplicationConfigurationCommandOutput) => void
  ): void;
  createTags(
    args: CreateTagsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateTagsCommandOutput>;
  createTags(
    args: CreateTagsCommandInput,
    cb: (err: any, data?: CreateTagsCommandOutput) => void
  ): void;
  createTags(
    args: CreateTagsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateTagsCommandOutput) => void
  ): void;
  deleteAccessPoint(
    args: DeleteAccessPointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteAccessPointCommandOutput>;
  deleteAccessPoint(
    args: DeleteAccessPointCommandInput,
    cb: (err: any, data?: DeleteAccessPointCommandOutput) => void
  ): void;
  deleteAccessPoint(
    args: DeleteAccessPointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteAccessPointCommandOutput) => void
  ): void;
  deleteFileSystem(
    args: DeleteFileSystemCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteFileSystemCommandOutput>;
  deleteFileSystem(
    args: DeleteFileSystemCommandInput,
    cb: (err: any, data?: DeleteFileSystemCommandOutput) => void
  ): void;
  deleteFileSystem(
    args: DeleteFileSystemCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteFileSystemCommandOutput) => void
  ): void;
  deleteFileSystemPolicy(
    args: DeleteFileSystemPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteFileSystemPolicyCommandOutput>;
  deleteFileSystemPolicy(
    args: DeleteFileSystemPolicyCommandInput,
    cb: (err: any, data?: DeleteFileSystemPolicyCommandOutput) => void
  ): void;
  deleteFileSystemPolicy(
    args: DeleteFileSystemPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteFileSystemPolicyCommandOutput) => void
  ): void;
  deleteMountTarget(
    args: DeleteMountTargetCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteMountTargetCommandOutput>;
  deleteMountTarget(
    args: DeleteMountTargetCommandInput,
    cb: (err: any, data?: DeleteMountTargetCommandOutput) => void
  ): void;
  deleteMountTarget(
    args: DeleteMountTargetCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteMountTargetCommandOutput) => void
  ): void;
  deleteReplicationConfiguration(
    args: DeleteReplicationConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteReplicationConfigurationCommandOutput>;
  deleteReplicationConfiguration(
    args: DeleteReplicationConfigurationCommandInput,
    cb: (err: any, data?: DeleteReplicationConfigurationCommandOutput) => void
  ): void;
  deleteReplicationConfiguration(
    args: DeleteReplicationConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteReplicationConfigurationCommandOutput) => void
  ): void;
  deleteTags(
    args: DeleteTagsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteTagsCommandOutput>;
  deleteTags(
    args: DeleteTagsCommandInput,
    cb: (err: any, data?: DeleteTagsCommandOutput) => void
  ): void;
  deleteTags(
    args: DeleteTagsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteTagsCommandOutput) => void
  ): void;
  describeAccessPoints(): Promise<DescribeAccessPointsCommandOutput>;
  describeAccessPoints(
    args: DescribeAccessPointsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeAccessPointsCommandOutput>;
  describeAccessPoints(
    args: DescribeAccessPointsCommandInput,
    cb: (err: any, data?: DescribeAccessPointsCommandOutput) => void
  ): void;
  describeAccessPoints(
    args: DescribeAccessPointsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeAccessPointsCommandOutput) => void
  ): void;
  describeAccountPreferences(): Promise<DescribeAccountPreferencesCommandOutput>;
  describeAccountPreferences(
    args: DescribeAccountPreferencesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeAccountPreferencesCommandOutput>;
  describeAccountPreferences(
    args: DescribeAccountPreferencesCommandInput,
    cb: (err: any, data?: DescribeAccountPreferencesCommandOutput) => void
  ): void;
  describeAccountPreferences(
    args: DescribeAccountPreferencesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeAccountPreferencesCommandOutput) => void
  ): void;
  describeBackupPolicy(
    args: DescribeBackupPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeBackupPolicyCommandOutput>;
  describeBackupPolicy(
    args: DescribeBackupPolicyCommandInput,
    cb: (err: any, data?: DescribeBackupPolicyCommandOutput) => void
  ): void;
  describeBackupPolicy(
    args: DescribeBackupPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeBackupPolicyCommandOutput) => void
  ): void;
  describeFileSystemPolicy(
    args: DescribeFileSystemPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeFileSystemPolicyCommandOutput>;
  describeFileSystemPolicy(
    args: DescribeFileSystemPolicyCommandInput,
    cb: (err: any, data?: DescribeFileSystemPolicyCommandOutput) => void
  ): void;
  describeFileSystemPolicy(
    args: DescribeFileSystemPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeFileSystemPolicyCommandOutput) => void
  ): void;
  describeFileSystems(): Promise<DescribeFileSystemsCommandOutput>;
  describeFileSystems(
    args: DescribeFileSystemsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeFileSystemsCommandOutput>;
  describeFileSystems(
    args: DescribeFileSystemsCommandInput,
    cb: (err: any, data?: DescribeFileSystemsCommandOutput) => void
  ): void;
  describeFileSystems(
    args: DescribeFileSystemsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeFileSystemsCommandOutput) => void
  ): void;
  describeLifecycleConfiguration(
    args: DescribeLifecycleConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeLifecycleConfigurationCommandOutput>;
  describeLifecycleConfiguration(
    args: DescribeLifecycleConfigurationCommandInput,
    cb: (err: any, data?: DescribeLifecycleConfigurationCommandOutput) => void
  ): void;
  describeLifecycleConfiguration(
    args: DescribeLifecycleConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeLifecycleConfigurationCommandOutput) => void
  ): void;
  describeMountTargets(): Promise<DescribeMountTargetsCommandOutput>;
  describeMountTargets(
    args: DescribeMountTargetsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeMountTargetsCommandOutput>;
  describeMountTargets(
    args: DescribeMountTargetsCommandInput,
    cb: (err: any, data?: DescribeMountTargetsCommandOutput) => void
  ): void;
  describeMountTargets(
    args: DescribeMountTargetsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeMountTargetsCommandOutput) => void
  ): void;
  describeMountTargetSecurityGroups(
    args: DescribeMountTargetSecurityGroupsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeMountTargetSecurityGroupsCommandOutput>;
  describeMountTargetSecurityGroups(
    args: DescribeMountTargetSecurityGroupsCommandInput,
    cb: (
      err: any,
      data?: DescribeMountTargetSecurityGroupsCommandOutput
    ) => void
  ): void;
  describeMountTargetSecurityGroups(
    args: DescribeMountTargetSecurityGroupsCommandInput,
    options: __HttpHandlerOptions,
    cb: (
      err: any,
      data?: DescribeMountTargetSecurityGroupsCommandOutput
    ) => void
  ): void;
  describeReplicationConfigurations(): Promise<DescribeReplicationConfigurationsCommandOutput>;
  describeReplicationConfigurations(
    args: DescribeReplicationConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeReplicationConfigurationsCommandOutput>;
  describeReplicationConfigurations(
    args: DescribeReplicationConfigurationsCommandInput,
    cb: (
      err: any,
      data?: DescribeReplicationConfigurationsCommandOutput
    ) => void
  ): void;
  describeReplicationConfigurations(
    args: DescribeReplicationConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (
      err: any,
      data?: DescribeReplicationConfigurationsCommandOutput
    ) => void
  ): void;
  describeTags(
    args: DescribeTagsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeTagsCommandOutput>;
  describeTags(
    args: DescribeTagsCommandInput,
    cb: (err: any, data?: DescribeTagsCommandOutput) => void
  ): void;
  describeTags(
    args: DescribeTagsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeTagsCommandOutput) => void
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
  modifyMountTargetSecurityGroups(
    args: ModifyMountTargetSecurityGroupsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ModifyMountTargetSecurityGroupsCommandOutput>;
  modifyMountTargetSecurityGroups(
    args: ModifyMountTargetSecurityGroupsCommandInput,
    cb: (err: any, data?: ModifyMountTargetSecurityGroupsCommandOutput) => void
  ): void;
  modifyMountTargetSecurityGroups(
    args: ModifyMountTargetSecurityGroupsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ModifyMountTargetSecurityGroupsCommandOutput) => void
  ): void;
  putAccountPreferences(
    args: PutAccountPreferencesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutAccountPreferencesCommandOutput>;
  putAccountPreferences(
    args: PutAccountPreferencesCommandInput,
    cb: (err: any, data?: PutAccountPreferencesCommandOutput) => void
  ): void;
  putAccountPreferences(
    args: PutAccountPreferencesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutAccountPreferencesCommandOutput) => void
  ): void;
  putBackupPolicy(
    args: PutBackupPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBackupPolicyCommandOutput>;
  putBackupPolicy(
    args: PutBackupPolicyCommandInput,
    cb: (err: any, data?: PutBackupPolicyCommandOutput) => void
  ): void;
  putBackupPolicy(
    args: PutBackupPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBackupPolicyCommandOutput) => void
  ): void;
  putFileSystemPolicy(
    args: PutFileSystemPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutFileSystemPolicyCommandOutput>;
  putFileSystemPolicy(
    args: PutFileSystemPolicyCommandInput,
    cb: (err: any, data?: PutFileSystemPolicyCommandOutput) => void
  ): void;
  putFileSystemPolicy(
    args: PutFileSystemPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutFileSystemPolicyCommandOutput) => void
  ): void;
  putLifecycleConfiguration(
    args: PutLifecycleConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutLifecycleConfigurationCommandOutput>;
  putLifecycleConfiguration(
    args: PutLifecycleConfigurationCommandInput,
    cb: (err: any, data?: PutLifecycleConfigurationCommandOutput) => void
  ): void;
  putLifecycleConfiguration(
    args: PutLifecycleConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutLifecycleConfigurationCommandOutput) => void
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
  updateFileSystem(
    args: UpdateFileSystemCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateFileSystemCommandOutput>;
  updateFileSystem(
    args: UpdateFileSystemCommandInput,
    cb: (err: any, data?: UpdateFileSystemCommandOutput) => void
  ): void;
  updateFileSystem(
    args: UpdateFileSystemCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateFileSystemCommandOutput) => void
  ): void;
  updateFileSystemProtection(
    args: UpdateFileSystemProtectionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateFileSystemProtectionCommandOutput>;
  updateFileSystemProtection(
    args: UpdateFileSystemProtectionCommandInput,
    cb: (err: any, data?: UpdateFileSystemProtectionCommandOutput) => void
  ): void;
  updateFileSystemProtection(
    args: UpdateFileSystemProtectionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateFileSystemProtectionCommandOutput) => void
  ): void;
}
export declare class EFS extends EFSClient implements EFS {}
