import { createPaginator } from "@smithy/core";
import { ListLanguageModelsCommand, } from "../commands/ListLanguageModelsCommand";
import { TranscribeClient } from "../TranscribeClient";
export const paginateListLanguageModels = createPaginator(TranscribeClient, ListLanguageModelsCommand, "NextToken", "NextToken", "MaxResults");
