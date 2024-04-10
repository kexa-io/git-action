import { createPaginator } from "@smithy/core";
import { ListStreamSessionsCommand, } from "../commands/ListStreamSessionsCommand";
import { IvsClient } from "../IvsClient";
export const paginateListStreamSessions = createPaginator(IvsClient, ListStreamSessionsCommand, "nextToken", "nextToken", "maxResults");
