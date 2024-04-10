import { createPaginator } from "@smithy/core";
import { ListStreamKeysCommand, } from "../commands/ListStreamKeysCommand";
import { IvsClient } from "../IvsClient";
export const paginateListStreamKeys = createPaginator(IvsClient, ListStreamKeysCommand, "nextToken", "nextToken", "maxResults");
