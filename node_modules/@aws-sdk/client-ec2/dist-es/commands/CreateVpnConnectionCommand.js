import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { SMITHY_CONTEXT_KEY, } from "@smithy/types";
import { CreateVpnConnectionRequestFilterSensitiveLog, CreateVpnConnectionResultFilterSensitiveLog, } from "../models/models_2";
import { de_CreateVpnConnectionCommand, se_CreateVpnConnectionCommand } from "../protocols/Aws_ec2";
export { $Command };
export class CreateVpnConnectionCommand extends $Command {
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
        this.middlewareStack.use(getEndpointPlugin(configuration, CreateVpnConnectionCommand.getEndpointParameterInstructions()));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "EC2Client";
        const commandName = "CreateVpnConnectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: CreateVpnConnectionRequestFilterSensitiveLog,
            outputFilterSensitiveLog: CreateVpnConnectionResultFilterSensitiveLog,
            [SMITHY_CONTEXT_KEY]: {
                service: "AmazonEC2",
                operation: "CreateVpnConnection",
            },
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return se_CreateVpnConnectionCommand(input, context);
    }
    deserialize(output, context) {
        return de_CreateVpnConnectionCommand(output, context);
    }
}
