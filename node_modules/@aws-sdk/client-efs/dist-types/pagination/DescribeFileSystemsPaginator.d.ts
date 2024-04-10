import { Paginator } from "@smithy/types";
import { DescribeFileSystemsCommandInput, DescribeFileSystemsCommandOutput } from "../commands/DescribeFileSystemsCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateDescribeFileSystems: (config: EFSPaginationConfiguration, input: DescribeFileSystemsCommandInput, ...rest: any[]) => Paginator<DescribeFileSystemsCommandOutput>;
