import { Paginator } from "@smithy/types";
import { ListTagsForResourceCommandInput, ListTagsForResourceCommandOutput } from "../commands/ListTagsForResourceCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListTagsForResource: (config: EFSPaginationConfiguration, input: ListTagsForResourceCommandInput, ...rest: any[]) => Paginator<ListTagsForResourceCommandOutput>;
