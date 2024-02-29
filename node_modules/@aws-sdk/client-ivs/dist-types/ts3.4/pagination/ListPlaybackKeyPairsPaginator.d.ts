import { Paginator } from "@smithy/types";
import {
  ListPlaybackKeyPairsCommandInput,
  ListPlaybackKeyPairsCommandOutput,
} from "../commands/ListPlaybackKeyPairsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListPlaybackKeyPairs: (
  config: IvsPaginationConfiguration,
  input: ListPlaybackKeyPairsCommandInput,
  ...rest: any[]
) => Paginator<ListPlaybackKeyPairsCommandOutput>;
