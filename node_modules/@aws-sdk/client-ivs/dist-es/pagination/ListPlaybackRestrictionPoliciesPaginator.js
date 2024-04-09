import { createPaginator } from "@smithy/core";
import { ListPlaybackRestrictionPoliciesCommand, } from "../commands/ListPlaybackRestrictionPoliciesCommand";
import { IvsClient } from "../IvsClient";
export const paginateListPlaybackRestrictionPolicies = createPaginator(IvsClient, ListPlaybackRestrictionPoliciesCommand, "nextToken", "nextToken", "maxResults");
