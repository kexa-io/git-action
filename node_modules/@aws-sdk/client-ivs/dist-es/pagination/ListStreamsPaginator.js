import { createPaginator } from "@smithy/core";
import { ListStreamsCommand } from "../commands/ListStreamsCommand";
import { IvsClient } from "../IvsClient";
export const paginateListStreams = createPaginator(IvsClient, ListStreamsCommand, "nextToken", "nextToken", "maxResults");
