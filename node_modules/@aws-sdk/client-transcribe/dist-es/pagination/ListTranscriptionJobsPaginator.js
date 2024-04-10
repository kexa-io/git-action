import { createPaginator } from "@smithy/core";
import { ListTranscriptionJobsCommand, } from "../commands/ListTranscriptionJobsCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListTranscriptionJobs = createPaginator(TranscribeClient, ListTranscriptionJobsCommand, "NextToken", "NextToken", "MaxResults");
