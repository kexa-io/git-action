import { createPaginator } from "@smithy/core";
import { DescribeReplicationConfigurationsCommand, } from "../commands/DescribeReplicationConfigurationsCommand";
import { EFSClient } from "../EFSClient";
export const paginateDescribeReplicationConfigurations = createPaginator(EFSClient, DescribeReplicationConfigurationsCommand, "NextToken", "NextToken", "MaxResults");
