import { Paginator } from "@smithy/types";
import {
  ListMedicalScribeJobsCommandInput,
  ListMedicalScribeJobsCommandOutput,
} from "../commands/ListMedicalScribeJobsCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListMedicalScribeJobs: (
  config: TranscribePaginationConfiguration,
  input: ListMedicalScribeJobsCommandInput,
  ...rest: any[]
) => Paginator<ListMedicalScribeJobsCommandOutput>;
