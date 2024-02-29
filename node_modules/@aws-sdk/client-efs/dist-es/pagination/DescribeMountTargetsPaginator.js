import { createPaginator } from "@smithy/core";
import { DescribeMountTargetsCommand, } from "../commands/DescribeMountTargetsCommand";
import { EFSClient } from "../EFSClient";
export const paginateDescribeMountTargets = createPaginator(EFSClient, DescribeMountTargetsCommand, "Marker", "NextMarker", "MaxItems");
