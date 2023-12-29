import { Containers } from "../operationsInterfaces";
import { ContainerInstanceManagementClient } from "../containerInstanceManagementClient";
import { ContainersListLogsOptionalParams, ContainersListLogsResponse, ContainerExecRequest, ContainersExecuteCommandOptionalParams, ContainersExecuteCommandResponse, ContainersAttachOptionalParams, ContainersAttachResponse } from "../models";
/** Class containing Containers operations. */
export declare class ContainersImpl implements Containers {
    private readonly client;
    /**
     * Initialize a new instance of the class Containers class.
     * @param client Reference to the service client
     */
    constructor(client: ContainerInstanceManagementClient);
    /**
     * Get the logs for a specified container instance in a specified resource group and container group.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param containerName The name of the container instance.
     * @param options The options parameters.
     */
    listLogs(resourceGroupName: string, containerGroupName: string, containerName: string, options?: ContainersListLogsOptionalParams): Promise<ContainersListLogsResponse>;
    /**
     * Executes a command for a specific container instance in a specified resource group and container
     * group.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param containerName The name of the container instance.
     * @param containerExecRequest The request for the exec command.
     * @param options The options parameters.
     */
    executeCommand(resourceGroupName: string, containerGroupName: string, containerName: string, containerExecRequest: ContainerExecRequest, options?: ContainersExecuteCommandOptionalParams): Promise<ContainersExecuteCommandResponse>;
    /**
     * Attach to the output stream of a specific container instance in a specified resource group and
     * container group.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param containerName The name of the container instance.
     * @param options The options parameters.
     */
    attach(resourceGroupName: string, containerGroupName: string, containerName: string, options?: ContainersAttachOptionalParams): Promise<ContainersAttachResponse>;
}
//# sourceMappingURL=containers.d.ts.map