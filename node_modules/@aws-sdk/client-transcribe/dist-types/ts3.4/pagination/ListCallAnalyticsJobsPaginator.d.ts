import { Paginator } from "@smithy/types";
import {
  ListCallAnalyticsJobsCommandInput,
  ListCallAnalyticsJobsCommandOutput,
} from "../commands/ListCallAnalyticsJobsCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListCallAnalyticsJobs: (
  config: TranscribePaginationConfiguration,
  input: ListCallAnalyticsJobsCommandInput,
  ...rest: any[]
) => Paginator<ListCallAnalyticsJobsCommandOutput>;
