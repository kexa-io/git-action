import { Paginator } from "@smithy/types";
import {
  ListVocabularyFiltersCommandInput,
  ListVocabularyFiltersCommandOutput,
} from "../commands/ListVocabularyFiltersCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListVocabularyFilters: (
  config: TranscribePaginationConfiguration,
  input: ListVocabularyFiltersCommandInput,
  ...rest: any[]
) => Paginator<ListVocabularyFiltersCommandOutput>;
