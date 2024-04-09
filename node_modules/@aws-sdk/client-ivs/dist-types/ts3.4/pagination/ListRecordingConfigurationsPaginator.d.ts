import { Paginator } from "@smithy/types";
import {
  ListRecordingConfigurationsCommandInput,
  ListRecordingConfigurationsCommandOutput,
} from "../commands/ListRecordingConfigurationsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListRecordingConfigurations: (
  config: IvsPaginationConfiguration,
  input: ListRecordingConfigurationsCommandInput,
  ...rest: any[]
) => Paginator<ListRecordingConfigurationsCommandOutput>;
