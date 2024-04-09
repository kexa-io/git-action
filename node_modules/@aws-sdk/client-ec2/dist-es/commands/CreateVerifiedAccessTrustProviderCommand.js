import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { SMITHY_CONTEXT_KEY, } from "@smithy/types";
import { CreateVerifiedAccessTrustProviderRequestFilterSensitiveLog, CreateVerifiedAccessTrustProviderResultFilterSensitiveLog, } from "../models/models_2";
import { de_CreateVerifiedAccessTrustProviderCommand, se_CreateVerifiedAccessTrustProviderCommand, } from "../protocols/Aws_ec2";
export { $Command };
export class CreateVerifiedAccessTrustProviderCommand extends $Command {
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
        this.middlewareStack.use(getEndpointPlugin(configuration, CreateVerifiedAccessTrustProviderCommand.getEndpointParameterInstructions()));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "EC2Client";
        const commandName = "CreateVerifiedAccessTrustProviderCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: CreateVerifiedAccessTrustProviderRequestFilterSensitiveLog,
            outputFilterSensitiveLog: CreateVerifiedAccessTrustProviderResultFilterSensitiveLog,
            [SMITHY_CONTEXT_KEY]: {
                service: "AmazonEC2",
                operation: "CreateVerifiedAccessTrustProvider",
            },
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return se_CreateVerifiedAccessTrustProviderCommand(input, context);
    }
    deserialize(output, context) {
        return de_CreateVerifiedAccessTrustProviderCommand(output, context);
    }
}
