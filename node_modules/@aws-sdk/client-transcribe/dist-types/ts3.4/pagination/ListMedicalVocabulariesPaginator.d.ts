import { Paginator } from "@smithy/types";
import {
  ListMedicalVocabulariesCommandInput,
  ListMedicalVocabulariesCommandOutput,
} from "../commands/ListMedicalVocabulariesCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListMedicalVocabularies: (
  config: TranscribePaginationConfiguration,
  input: ListMedicalVocabulariesCommandInput,
  ...rest: any[]
) => Paginator<ListMedicalVocabulariesCommandOutput>;
