import { Paginator } from "@smithy/types";
import {
  ListLanguageModelsCommandInput,
  ListLanguageModelsCommandOutput,
} from "../commands/ListLanguageModelsCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListLanguageModels: (
  config: TranscribePaginationConfiguration,
  input: ListLanguageModelsCommandInput,
  ...rest: any[]
) => Paginator<ListLanguageModelsCommandOutput>;
