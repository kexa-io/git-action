import { Paginator } from "@smithy/types";
import {
  ListStreamSessionsCommandInput,
  ListStreamSessionsCommandOutput,
} from "../commands/ListStreamSessionsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListStreamSessions: (
  config: IvsPaginationConfiguration,
  input: ListStreamSessionsCommandInput,
  ...rest: any[]
) => Paginator<ListStreamSessionsCommandOutput>;
