import { Paginator } from "@smithy/types";
import {
  ListMedicalTranscriptionJobsCommandInput,
  ListMedicalTranscriptionJobsCommandOutput,
} from "../commands/ListMedicalTranscriptionJobsCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListMedicalTranscriptionJobs: (
  config: TranscribePaginationConfiguration,
  input: ListMedicalTranscriptionJobsCommandInput,
  ...rest: any[]
) => Paginator<ListMedicalTranscriptionJobsCommandOutput>;
