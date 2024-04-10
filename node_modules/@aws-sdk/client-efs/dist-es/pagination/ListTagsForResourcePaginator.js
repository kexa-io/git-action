import { createPaginator } from "@smithy/core";
import { ListTagsForResourceCommand, } from "../commands/ListTagsForResourceCommand";
import { EFSClient } from "../EFSClient";
export const paginateListTagsForResource = createPaginator(EFSClient, ListTagsForResourceCommand, "NextToken", "NextToken", "MaxResults");
