import { createPaginator } from "@smithy/core";
import { ListMedicalVocabulariesCommand, } from "../commands/ListMedicalVocabulariesCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListMedicalVocabularies = createPaginator(TranscribeClient, ListMedicalVocabulariesCommand, "NextToken", "NextToken", "MaxResults");
