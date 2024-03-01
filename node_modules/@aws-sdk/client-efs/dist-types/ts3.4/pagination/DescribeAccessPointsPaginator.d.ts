import { Paginator } from "@smithy/types";
import {
  DescribeAccessPointsCommandInput,
  DescribeAccessPointsCommandOutput,
} from "../commands/DescribeAccessPointsCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
export declare const paginateDescribeAccessPoints: (
  config: EFSPaginationConfiguration,
  input: DescribeAccessPointsCommandInput,
  ...rest: any[]
) => Paginator<DescribeAccessPointsCommandOutput>;
