import { createPaginator } from "@smithy/core";
import { DescribeTagsCommand, } from "../commands/DescribeTagsCommand";
import { EFSClient } from "../EFSClient";
export const paginateDescribeTags = createPaginator(EFSClient, DescribeTagsCommand, "Marker", "NextMarker", "MaxItems");
