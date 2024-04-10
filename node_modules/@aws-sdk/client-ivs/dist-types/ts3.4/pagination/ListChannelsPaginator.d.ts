import { Paginator } from "@smithy/types";
import {
  ListChannelsCommandInput,
  ListChannelsCommandOutput,
} from "../commands/ListChannelsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListChannels: (
  config: IvsPaginationConfiguration,
  input: ListChannelsCommandInput,
  ...rest: any[]
) => Paginator<ListChannelsCommandOutput>;
