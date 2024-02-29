import { Paginator } from "@smithy/types";
import {
  ListCallAnalyticsCategoriesCommandInput,
  ListCallAnalyticsCategoriesCommandOutput,
} from "../commands/ListCallAnalyticsCategoriesCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListCallAnalyticsCategories: (
  config: TranscribePaginationConfiguration,
  input: ListCallAnalyticsCategoriesCommandInput,
  ...rest: any[]
) => Paginator<ListCallAnalyticsCategoriesCommandOutput>;
