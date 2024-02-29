import { Paginator } from "@smithy/types";
import {
  ListStreamKeysCommandInput,
  ListStreamKeysCommandOutput,
} from "../commands/ListStreamKeysCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListStreamKeys: (
  config: IvsPaginationConfiguration,
  input: ListStreamKeysCommandInput,
  ...rest: any[]
) => Paginator<ListStreamKeysCommandOutput>;
