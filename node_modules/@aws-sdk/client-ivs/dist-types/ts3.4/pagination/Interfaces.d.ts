import { PaginationConfiguration } from "@smithy/types";
import { IvsClient } from "../IvsClient";
export interface IvsPaginationConfiguration extends PaginationConfiguration {
  client: IvsClient;
}
