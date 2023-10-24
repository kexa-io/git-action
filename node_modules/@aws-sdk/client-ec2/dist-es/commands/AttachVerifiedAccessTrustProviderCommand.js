import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { SMITHY_CONTEXT_KEY, } from "@smithy/types";
import { AttachVerifiedAccessTrustProviderResultFilterSensitiveLog, } from "../models/models_0";
import { de_AttachVerifiedAccessTrustProviderCommand, se_AttachVerifiedAccessTrustProviderCommand, } from "../protocols/Aws_ec2";
export { $Command };
export class AttachVerifiedAccessTrustProviderCommand extends $Command {
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
        this.middlewareStack.use(getEndpointPlugin(configuration, AttachVerifiedAccessTrustProviderCommand.getEndpointParameterInstructions()));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "EC2Client";
        const commandName = "AttachVerifiedAccessTrustProviderCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: (_) => _,
            outputFilterSensitiveLog: AttachVerifiedAccessTrustProviderResultFilterSensitiveLog,
            [SMITHY_CONTEXT_KEY]: {
                service: "AmazonEC2",
                operation: "AttachVerifiedAccessTrustProvider",
            },
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return se_AttachVerifiedAccessTrustProviderCommand(input, context);
    }
    deserialize(output, context) {
        return de_AttachVerifiedAccessTrustProviderCommand(output, context);
    }
}
