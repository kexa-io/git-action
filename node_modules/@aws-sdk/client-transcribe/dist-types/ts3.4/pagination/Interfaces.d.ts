import { PaginationConfiguration } from "@smithy/types";
import { TranscribeClient } from "../TranscribeClient";
export interface TranscribePaginationConfiguration
  extends PaginationConfiguration {
  client: TranscribeClient;
}
