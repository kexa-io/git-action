import { createPaginator } from "@smithy/core";
import { ListCallAnalyticsCategoriesCommand, } from "../commands/ListCallAnalyticsCategoriesCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListCallAnalyticsCategories = createPaginator(TranscribeClient, ListCallAnalyticsCategoriesCommand, "NextToken", "NextToken", "MaxResults");
