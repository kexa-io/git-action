import { Paginator } from "@smithy/types";
import {
  ListVocabulariesCommandInput,
  ListVocabulariesCommandOutput,
} from "../commands/ListVocabulariesCommand";
import { TranscribePaginationConfiguration } from "./Interfaces";
export declare const paginateListVocabularies: (
  config: TranscribePaginationConfiguration,
  input: ListVocabulariesCommandInput,
  ...rest: any[]
) => Paginator<ListVocabulariesCommandOutput>;
