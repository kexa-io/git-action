import { Paginator } from "@smithy/types";
import {
  ListPlaybackRestrictionPoliciesCommandInput,
  ListPlaybackRestrictionPoliciesCommandOutput,
} from "../commands/ListPlaybackRestrictionPoliciesCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
export declare const paginateListPlaybackRestrictionPolicies: (
  config: IvsPaginationConfiguration,
  input: ListPlaybackRestrictionPoliciesCommandInput,
  ...rest: any[]
) => Paginator<ListPlaybackRestrictionPoliciesCommandOutput>;
