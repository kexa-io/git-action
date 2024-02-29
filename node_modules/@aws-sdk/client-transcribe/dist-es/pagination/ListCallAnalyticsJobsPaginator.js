import { createPaginator } from "@smithy/core";
import { ListCallAnalyticsJobsCommand, } from "../commands/ListCallAnalyticsJobsCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListCallAnalyticsJobs = createPaginator(TranscribeClient, ListCallAnalyticsJobsCommand, "NextToken", "NextToken", "MaxResults");
