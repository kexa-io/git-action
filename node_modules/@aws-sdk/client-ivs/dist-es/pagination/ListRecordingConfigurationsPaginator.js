import { createPaginator } from "@smithy/core";
import { ListRecordingConfigurationsCommand, } from "../commands/ListRecordingConfigurationsCommand";
import { IvsClient } from "../IvsClient";
export const paginateListRecordingConfigurations = createPaginator(IvsClient, ListRecordingConfigurationsCommand, "nextToken", "nextToken", "maxResults");
