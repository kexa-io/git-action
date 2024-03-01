import { Paginator } from "@smithy/types";
import { DescribeMountTargetsCommandInput, DescribeMountTargetsCommandOutput } from "../commands/DescribeMountTargetsCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateDescribeMountTargets: (config: EFSPaginationConfiguration, input: DescribeMountTargetsCommandInput, ...rest: any[]) => Paginator<DescribeMountTargetsCommandOutput>;
