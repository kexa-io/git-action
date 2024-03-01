import { createPaginator } from "@smithy/core";
import { DescribeAccessPointsCommand, } from "../commands/DescribeAccessPointsCommand";
import { EFSClient } from "../EFSClient";
export const paginateDescribeAccessPoints = createPaginator(EFSClient, DescribeAccessPointsCommand, "NextToken", "NextToken", "MaxResults");
