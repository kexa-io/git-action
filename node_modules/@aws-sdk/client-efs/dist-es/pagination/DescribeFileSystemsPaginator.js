import { createPaginator } from "@smithy/core";
import { DescribeFileSystemsCommand, } from "../commands/DescribeFileSystemsCommand";
import { EFSClient } from "../EFSClient";
export const paginateDescribeFileSystems = createPaginator(EFSClient, DescribeFileSystemsCommand, "Marker", "NextMarker", "MaxItems");
