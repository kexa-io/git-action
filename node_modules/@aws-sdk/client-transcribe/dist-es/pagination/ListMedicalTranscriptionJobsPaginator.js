import { createPaginator } from "@smithy/core";
import { ListMedicalTranscriptionJobsCommand, } from "../commands/ListMedicalTranscriptionJobsCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListMedicalTranscriptionJobs = createPaginator(TranscribeClient, ListMedicalTranscriptionJobsCommand, "NextToken", "NextToken", "MaxResults");
