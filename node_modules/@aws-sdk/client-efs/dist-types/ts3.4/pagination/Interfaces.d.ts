import { PaginationConfiguration } from "@smithy/types";
import { EFSClient } from "../EFSClient";
export interface EFSPaginationConfiguration extends PaginationConfiguration {
  client: EFSClient;
}
