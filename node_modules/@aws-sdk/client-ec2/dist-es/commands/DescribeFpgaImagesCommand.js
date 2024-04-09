import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { SMITHY_CONTEXT_KEY, } from "@smithy/types";
import { de_DescribeFpgaImagesCommand, se_DescribeFpgaImagesCommand } from "../protocols/Aws_ec2";
export { $Command };
export class DescribeFpgaImagesCommand extends $Command {
    static getEndpointParameterInstructions() {
        return {
            UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
            Endpoint: { type: "builtInParams", name: "endpoint" },
            Region: { type: "builtInParams", name: "region" },
            UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
        };
    }
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getEndpointPlugin(configuration, DescribeFpgaImagesCommand.getEndpointParameterInstructions()));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "EC2Client";
        const commandName = "DescribeFpgaImagesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: (_) => _,
            outputFilterSensitiveLog: (_) => _,
            [SMITHY_CONTEXT_KEY]: {
                service: "AmazonEC2",
                operation: "DescribeFpgaImages",
            },
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return se_DescribeFpgaImagesCommand(input, context);
    }
    deserialize(output, context) {
        return de_DescribeFpgaImagesCommand(output, context);
    }
}
