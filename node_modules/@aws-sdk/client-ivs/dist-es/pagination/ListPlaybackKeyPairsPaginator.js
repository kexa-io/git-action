import { createPaginator } from "@smithy/core";
import { ListPlaybackKeyPairsCommand, } from "../commands/ListPlaybackKeyPairsCommand";
import { IvsClient } from "../IvsClient";
export const paginateListPlaybackKeyPairs = createPaginator(IvsClient, ListPlaybackKeyPairsCommand, "nextToken", "nextToken", "maxResults");
