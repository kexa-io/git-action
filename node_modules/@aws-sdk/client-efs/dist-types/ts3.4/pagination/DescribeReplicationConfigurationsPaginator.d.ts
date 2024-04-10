import { Paginator } from "@smithy/types";
import {
  DescribeReplicationConfigurationsCommandInput,
  DescribeReplicationConfigurationsCommandOutput,
} from "../commands/DescribeReplicationConfigurationsCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
export declare const paginateDescribeReplicationConfigurations: (
  config: EFSPaginationConfiguration,
  input: DescribeReplicationConfigurationsCommandInput,
  ...rest: any[]
) => Paginator<DescribeReplicationConfigurationsCommandOutput>;
