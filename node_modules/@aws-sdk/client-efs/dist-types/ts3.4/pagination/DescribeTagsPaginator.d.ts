import { Paginator } from "@smithy/types";
import {
  DescribeTagsCommandInput,
  DescribeTagsCommandOutput,
} from "../commands/DescribeTagsCommand";
import { EFSPaginationConfiguration } from "./Interfaces";
export declare const paginateDescribeTags: (
  config: EFSPaginationConfiguration,
  input: DescribeTagsCommandInput,
  ...rest: any[]
) => Paginator<DescribeTagsCommandOutput>;
