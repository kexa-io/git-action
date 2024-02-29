import { createPaginator } from "@smithy/core";
import { ListMedicalScribeJobsCommand, } from "../commands/ListMedicalScribeJobsCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListMedicalScribeJobs = createPaginator(TranscribeClient, ListMedicalScribeJobsCommand, "NextToken", "NextToken", "MaxResults");
