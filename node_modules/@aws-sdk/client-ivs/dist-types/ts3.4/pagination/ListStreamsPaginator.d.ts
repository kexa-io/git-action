import { Paginator } from "@smithy/types";
import {
  ListStreamsCommandInput,
  ListStreamsCommandOutput,
} from "../commands/ListStreamsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListStreams: (
  config: IvsPaginationConfiguration,
  input: ListStreamsCommandInput,
  ...rest: any[]
) => Paginator<ListStreamsCommandOutput>;
