import { createPaginator } from "@smithy/core";
import { ListChannelsCommand, } from "../commands/ListChannelsCommand";
import { IvsClient } from "../IvsClient";
export const paginateListChannels = createPaginator(IvsClient, ListChannelsCommand, "nextToken", "nextToken", "maxResults");
