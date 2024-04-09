import { Paginator } from "@smithy/types";
import {
  ListTranscriptionJobsCommandInput,
  ListTranscriptionJobsCommandOutput,
} from "../commands/ListTranscriptionJobsCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListTranscriptionJobs: (
  config: TranscribePaginationConfiguration,
  input: ListTranscriptionJobsCommandInput,
  ...rest: any[]
) => Paginator<ListTranscriptionJobsCommandOutput>;
