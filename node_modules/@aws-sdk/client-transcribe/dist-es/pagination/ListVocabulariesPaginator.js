import { createPaginator } from "@smithy/core";
import { ListVocabulariesCommand, } from "../commands/ListVocabulariesCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListVocabularies = createPaginator(TranscribeClient, ListVocabulariesCommand, "NextToken", "NextToken", "MaxResults");
