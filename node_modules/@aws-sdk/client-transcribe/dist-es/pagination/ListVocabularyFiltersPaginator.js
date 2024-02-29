import { createPaginator } from "@smithy/core";
import { ListVocabularyFiltersCommand, } from "../commands/ListVocabularyFiltersCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListVocabularyFilters = createPaginator(TranscribeClient, ListVocabularyFiltersCommand, "NextToken", "NextToken", "MaxResults");
