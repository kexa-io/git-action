"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateDescribeInstanceTypeOfferings = void 0;
const DescribeInstanceTypeOfferingsCommand_1 = require("../commands/DescribeInstanceTypeOfferingsCommand");
const EC2Client_1 = require("../EC2Client");
const makePagedClientRequest = async (client, input, ...args) => {
    return await client.send(new DescribeInstanceTypeOfferingsCommand_1.DescribeInstanceTypeOfferingsCommand(input), ...args);
};
async function* paginateDescribeInstanceTypeOfferings(config, input, ...additionalArguments) {
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof EC2Client_1.EC2Client) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected EC2 | EC2Client");
        }
        yield page;
        const prevToken = token;
        token = page.NextToken;
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return undefined;
}
exports.paginateDescribeInstanceTypeOfferings = paginateDescribeInstanceTypeOfferings;
