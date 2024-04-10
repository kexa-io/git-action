import * as coreAuth from '@azure/core-auth';
import * as coreClient from '@azure/core-client';
import { OperationState } from '@azure/core-lro';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { SimplePollerLike } from '@azure/core-lro';

/** The properties of the Azure File volume. Azure File shares are mounted as volumes. */
export declare interface AzureFileVolume {
    /** The name of the Azure File share to be mounted as a volume. */
    shareName: string;
    /** The flag indicating whether the Azure File shared mounted as a volume is read-only. */
    readOnly?: boolean;
    /** The name of the storage account that contains the Azure File share. */
    storageAccountName: string;
    /** The storage account access key used to access the Azure File share. */
    storageAccountKey?: string;
}

/** The cached image and OS type. */
export declare interface CachedImages {
    /** The OS type of the cached image. */
    osType: string;
    /** The cached image name. */
    image: string;
}

/** The response containing cached images. */
export declare interface CachedImagesListResult {
    /** The list of cached images. */
    value?: CachedImages[];
    /** The URI to fetch the next page of cached images. */
    nextLink?: string;
}

/** The regional capabilities. */
export declare interface Capabilities {
    /**
     * The resource type that this capability describes.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly resourceType?: string;
    /**
     * The OS type that this capability describes.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly osType?: string;
    /**
     * The resource location.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly location?: string;
    /**
     * The ip address type that this capability describes.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly ipAddressType?: string;
    /**
     * The GPU sku that this capability describes.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly gpu?: string;
    /**
     * The supported capabilities.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly capabilities?: CapabilitiesCapabilities;
}

/** The supported capabilities. */
export declare interface CapabilitiesCapabilities {
    /**
     * The maximum allowed memory request in GB.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly maxMemoryInGB?: number;
    /**
     * The maximum allowed CPU request in cores.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly maxCpu?: number;
    /**
     * The maximum allowed GPU count.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly maxGpuCount?: number;
}

/** The response containing list of capabilities. */
export declare interface CapabilitiesListResult {
    /** The list of capabilities. */
    value?: Capabilities[];
    /** The URI to fetch the next page of capabilities. */
    nextLink?: string;
}

/** An error response from the Container Instance service. */
export declare interface CloudError {
    /** An error response from the Container Instance service. */
    error?: CloudErrorBody;
}

/** An error response from the Container Instance service. */
export declare interface CloudErrorBody {
    /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
    code?: string;
    /** A message describing the error, intended to be suitable for display in a user interface. */
    message?: string;
    /** The target of the particular error. For example, the name of the property in error. */
    target?: string;
    /** A list of additional details about the error. */
    details?: CloudErrorBody[];
}

/** The properties for confidential container group */
export declare interface ConfidentialComputeProperties {
    /** The base64 encoded confidential compute enforcement policy */
    ccePolicy?: string;
}

/** A container instance. */
export declare interface Container {
    /** The user-provided name of the container instance. */
    name: string;
    /** The name of the image used to create the container instance. */
    image: string;
    /** The commands to execute within the container instance in exec form. */
    command?: string[];
    /** The exposed ports on the container instance. */
    ports?: ContainerPort[];
    /** The environment variables to set in the container instance. */
    environmentVariables?: EnvironmentVariable[];
    /**
     * The instance view of the container instance. Only valid in response.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly instanceView?: ContainerPropertiesInstanceView;
    /** The resource requirements of the container instance. */
    resources: ResourceRequirements;
    /** The volume mounts available to the container instance. */
    volumeMounts?: VolumeMount[];
    /** The liveness probe. */
    livenessProbe?: ContainerProbe;
    /** The readiness probe. */
    readinessProbe?: ContainerProbe;
    /** The container security properties. */
    securityContext?: SecurityContextDefinition;
}

/** The information for the output stream from container attach. */
export declare interface ContainerAttachResponse {
    /** The uri for the output stream from the attach. */
    webSocketUri?: string;
    /** The password to the output stream from the attach. Send as an Authorization header value when connecting to the websocketUri. */
    password?: string;
}

/** The container execution command, for liveness or readiness probe */
export declare interface ContainerExec {
    /** The commands to execute within the container. */
    command?: string[];
}

/** The container exec request. */
export declare interface ContainerExecRequest {
    /** The command to be executed. */
    command?: string;
    /** The size of the terminal. */
    terminalSize?: ContainerExecRequestTerminalSize;
}

/** The size of the terminal. */
export declare interface ContainerExecRequestTerminalSize {
    /** The row size of the terminal */
    rows?: number;
    /** The column size of the terminal */
    cols?: number;
}

/** The information for the container exec command. */
export declare interface ContainerExecResponse {
    /** The uri for the exec websocket. */
    webSocketUri?: string;
    /** The password to start the exec command. */
    password?: string;
}

/** A container group. */
export declare interface ContainerGroup extends Resource, ContainerGroupProperties {
}

/** Container group diagnostic information. */
export declare interface ContainerGroupDiagnostics {
    /** Container group log analytics information. */
    logAnalytics?: LogAnalytics;
}

/** Identity for the container group. */
export declare interface ContainerGroupIdentity {
    /**
     * The principal id of the container group identity. This property will only be provided for a system assigned identity.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly principalId?: string;
    /**
     * The tenant id associated with the container group. This property will only be provided for a system assigned identity.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly tenantId?: string;
    /** The type of identity used for the container group. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the container group. */
    type?: ResourceIdentityType;
    /** The list of user identities associated with the container group. */
    userAssignedIdentities?: {
        [propertyName: string]: UserAssignedIdentities;
    };
}

/**
 * Defines values for ContainerGroupIpAddressType. \
 * {@link KnownContainerGroupIpAddressType} can be used interchangeably with ContainerGroupIpAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public** \
 * **Private**
 */
export declare type ContainerGroupIpAddressType = string;

/** The container group list response that contains the container group properties. */
export declare interface ContainerGroupListResult {
    /** The list of container groups. */
    value?: ContainerGroup[];
    /** The URI to fetch the next page of container groups. */
    nextLink?: string;
}

/**
 * Defines values for ContainerGroupNetworkProtocol. \
 * {@link KnownContainerGroupNetworkProtocol} can be used interchangeably with ContainerGroupNetworkProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP** \
 * **UDP**
 */
export declare type ContainerGroupNetworkProtocol = string;

/**
 * Defines values for ContainerGroupPriority. \
 * {@link KnownContainerGroupPriority} can be used interchangeably with ContainerGroupPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular** \
 * **Spot**
 */
export declare type ContainerGroupPriority = string;

/** The container group properties */
export declare interface ContainerGroupProperties {
    /** The identity of the container group, if configured. */
    identity?: ContainerGroupIdentity;
    /**
     * The provisioning state of the container group. This only appears in the response.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly provisioningState?: string;
    /** The containers within the container group. */
    containers: Container[];
    /** The image registry credentials by which the container group is created from. */
    imageRegistryCredentials?: ImageRegistryCredential[];
    /**
     * Restart policy for all containers within the container group.
     * - `Always` Always restart
     * - `OnFailure` Restart on failure
     * - `Never` Never restart
     *
     */
    restartPolicy?: ContainerGroupRestartPolicy;
    /** The IP address type of the container group. */
    ipAddress?: IpAddress;
    /** The operating system type required by the containers in the container group. */
    osType: OperatingSystemTypes;
    /** The list of volumes that can be mounted by containers in this container group. */
    volumes?: Volume[];
    /**
     * The instance view of the container group. Only valid in response.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly instanceView?: ContainerGroupPropertiesInstanceView;
    /** The diagnostic information for a container group. */
    diagnostics?: ContainerGroupDiagnostics;
    /** The subnet resource IDs for a container group. */
    subnetIds?: ContainerGroupSubnetId[];
    /** The DNS config information for a container group. */
    dnsConfig?: DnsConfiguration;
    /** The SKU for a container group. */
    sku?: ContainerGroupSku;
    /** The encryption properties for a container group. */
    encryptionProperties?: EncryptionProperties;
    /** The init containers for a container group. */
    initContainers?: InitContainerDefinition[];
    /** extensions used by virtual kubelet */
    extensions?: DeploymentExtensionSpec[];
    /** The properties for confidential container group */
    confidentialComputeProperties?: ConfidentialComputeProperties;
    /** The priority of the container group. */
    priority?: ContainerGroupPriority;
}

/** The instance view of the container group. Only valid in response. */
export declare interface ContainerGroupPropertiesInstanceView {
    /**
     * The events of this container group.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly events?: Event_2[];
    /**
     * The state of the container group. Only valid in response.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly state?: string;
}

/**
 * Defines values for ContainerGroupRestartPolicy. \
 * {@link KnownContainerGroupRestartPolicy} can be used interchangeably with ContainerGroupRestartPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Always** \
 * **OnFailure** \
 * **Never**
 */
export declare type ContainerGroupRestartPolicy = string;

/** Interface representing a ContainerGroups. */
export declare interface ContainerGroups {
    /**
     * Get a list of container groups in the specified subscription. This operation returns properties of
     * each container group including containers, image registry credentials, restart policy, IP address
     * type, OS type, state, and volumes.
     * @param options The options parameters.
     */
    list(options?: ContainerGroupsListOptionalParams): PagedAsyncIterableIterator<ContainerGroup>;
    /**
     * Get a list of container groups in a specified subscription and resource group. This operation
     * returns properties of each container group including containers, image registry credentials, restart
     * policy, IP address type, OS type, state, and volumes.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: ContainerGroupsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<ContainerGroup>;
    /**
     * Gets the properties of the specified container group in the specified subscription and resource
     * group. The operation returns the properties of each container group including containers, image
     * registry credentials, restart policy, IP address type, OS type, state, and volumes.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsGetOptionalParams): Promise<ContainerGroupsGetResponse>;
    /**
     * Create or update container groups with specified configurations.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param containerGroup The properties of the container group to be created or updated.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, containerGroupName: string, containerGroup: ContainerGroup, options?: ContainerGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ContainerGroupsCreateOrUpdateResponse>, ContainerGroupsCreateOrUpdateResponse>>;
    /**
     * Create or update container groups with specified configurations.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param containerGroup The properties of the container group to be created or updated.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, containerGroupName: string, containerGroup: ContainerGroup, options?: ContainerGroupsCreateOrUpdateOptionalParams): Promise<ContainerGroupsCreateOrUpdateResponse>;
    /**
     * Updates container group tags with specified values.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param resource The container group resource with just the tags to be updated.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, containerGroupName: string, resource: Resource, options?: ContainerGroupsUpdateOptionalParams): Promise<ContainerGroupsUpdateResponse>;
    /**
     * Delete the specified container group in the specified subscription and resource group. The operation
     * does not delete other resources provided by the user, such as volumes.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<ContainerGroupsDeleteResponse>, ContainerGroupsDeleteResponse>>;
    /**
     * Delete the specified container group in the specified subscription and resource group. The operation
     * does not delete other resources provided by the user, such as volumes.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsDeleteOptionalParams): Promise<ContainerGroupsDeleteResponse>;
    /**
     * Restarts all containers in a container group in place. If container image has updates, new image
     * will be downloaded.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginRestart(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsRestartOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Restarts all containers in a container group in place. If container image has updates, new image
     * will be downloaded.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginRestartAndWait(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsRestartOptionalParams): Promise<void>;
    /**
     * Stops all containers in a container group. Compute resources will be deallocated and billing will
     * stop.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    stop(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsStopOptionalParams): Promise<void>;
    /**
     * Starts all containers in a container group. Compute resources will be allocated and billing will
     * start.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginStart(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsStartOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Starts all containers in a container group. Compute resources will be allocated and billing will
     * start.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    beginStartAndWait(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsStartOptionalParams): Promise<void>;
    /**
     * Gets all the network dependencies for this container group to allow complete control of network
     * setting and configuration. For container groups, this will always be an empty list.
     * @param resourceGroupName The name of the resource group.
     * @param containerGroupName The name of the container group.
     * @param options The options parameters.
     */
    getOutboundNetworkDependenciesEndpoints(resourceGroupName: string, containerGroupName: string, options?: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams): Promise<ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse>;
}

/** Optional parameters. */
export declare interface ContainerGroupsCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
    resumeFrom?: string;
}

/** Contains response data for the createOrUpdate operation. */
export declare type ContainerGroupsCreateOrUpdateResponse = ContainerGroup;

/** Optional parameters. */
export declare interface ContainerGroupsDeleteOptionalParams extends coreClient.OperationOptions {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
    resumeFrom?: string;
}

/** Contains response data for the delete operation. */
export declare type ContainerGroupsDeleteResponse = ContainerGroup;

/** Optional parameters. */
export declare interface ContainerGroupsGetOptionalParams extends coreClient.OperationOptions {
}

/** Optional parameters. */
export declare interface ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the getOutboundNetworkDependenciesEndpoints operation. */
export declare type ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse = {
    /** The parsed response body. */
    body: string[];
};

/** Contains response data for the get operation. */
export declare type ContainerGroupsGetResponse = ContainerGroup;

/**
 * Defines values for ContainerGroupSku. \
 * {@link KnownContainerGroupSku} can be used interchangeably with ContainerGroupSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Dedicated** \
 * **Confidential**
 */
export declare type ContainerGroupSku = string;

/** Optional parameters. */
export declare interface ContainerGroupsListByResourceGroupNextOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listByResourceGroupNext operation. */
export declare type ContainerGroupsListByResourceGroupNextResponse = ContainerGroupListResult;

/** Optional parameters. */
export declare interface ContainerGroupsListByResourceGroupOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listByResourceGroup operation. */
export declare type ContainerGroupsListByResourceGroupResponse = ContainerGroupListResult;

/** Optional parameters. */
export declare interface ContainerGroupsListNextOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listNext operation. */
export declare type ContainerGroupsListNextResponse = ContainerGroupListResult;

/** Optional parameters. */
export declare interface ContainerGroupsListOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the list operation. */
export declare type ContainerGroupsListResponse = ContainerGroupListResult;

/** Optional parameters. */
export declare interface ContainerGroupsRestartOptionalParams extends coreClient.OperationOptions {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
    resumeFrom?: string;
}

/** Optional parameters. */
export declare interface ContainerGroupsStartOptionalParams extends coreClient.OperationOptions {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
    resumeFrom?: string;
}

/** Optional parameters. */
export declare interface ContainerGroupsStopOptionalParams extends coreClient.OperationOptions {
}

/** Container group subnet information. */
export declare interface ContainerGroupSubnetId {
    /** Resource ID of virtual network and subnet. */
    id: string;
    /** Friendly name for the subnet. */
    name?: string;
}

/** Optional parameters. */
export declare interface ContainerGroupsUpdateOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the update operation. */
export declare type ContainerGroupsUpdateResponse = ContainerGroup;

/** The container Http Get settings, for liveness or readiness probe */
export declare interface ContainerHttpGet {
    /** The path to probe. */
    path?: string;
    /** The port number to probe. */
    port: number;
    /** The scheme. */
    scheme?: Scheme;
    /** The HTTP headers. */
    httpHeaders?: HttpHeader[];
}

export declare class ContainerInstanceManagementClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the ContainerInstanceManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure subscription.
     *                       The subscription ID forms part of the URI for every service call.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: ContainerInstanceManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    containerGroups: ContainerGroups;
    operations: Operations;
    location: Location_2;
    containers: Containers;
    subnetServiceAssociationLink: SubnetServiceAssociationLink;
}

/** Optional parameters. */
export declare interface ContainerInstanceManagementClientOptionalParams extends coreClient.ServiceClientOptions {
    /** server parameter */
    $host?: string;
    /** Api Version */
    apiVersion?: string;
    /** Overrides client endpoint. */
    endpoint?: string;
}

/**
 * Defines values for ContainerInstanceOperationsOrigin. \
 * {@link KnownContainerInstanceOperationsOrigin} can be used interchangeably with ContainerInstanceOperationsOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **System**
 */
export declare type ContainerInstanceOperationsOrigin = string;

/**
 * Defines values for ContainerNetworkProtocol. \
 * {@link KnownContainerNetworkProtocol} can be used interchangeably with ContainerNetworkProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP** \
 * **UDP**
 */
export declare type ContainerNetworkProtocol = string;

/** The port exposed on the container instance. */
export declare interface ContainerPort {
    /** The protocol associated with the port. */
    protocol?: ContainerNetworkProtocol;
    /** The port number exposed within the container group. */
    port: number;
}

/** The container probe, for liveness or readiness */
export declare interface ContainerProbe {
    /** The execution command to probe */
    exec?: ContainerExec;
    /** The Http Get settings to probe */
    httpGet?: ContainerHttpGet;
    /** The initial delay seconds. */
    initialDelaySeconds?: number;
    /** The period seconds. */
    periodSeconds?: number;
    /** The failure threshold. */
    failureThreshold?: number;
    /** The success threshold. */
    successThreshold?: number;
    /** The timeout seconds. */
    timeoutSeconds?: number;
}

/** The instance view of the container instance. Only valid in response. */
export declare interface ContainerPropertiesInstanceView {
    /**
     * The number of times that the container instance has been restarted.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly restartCount?: number;
    /**
     * Current container instance state.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly currentState?: ContainerState;
    /**
     * Previous container instance state.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly previousState?: ContainerState;
    /**
     * The events of the container instance.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly events?: Event_2[];
}

/** Interface representing a Containers. */
export declare interface Containers {
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

/** Optional parameters. */
export declare interface ContainersAttachOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the attach operation. */
export declare type ContainersAttachResponse = ContainerAttachResponse;

/** Optional parameters. */
export declare interface ContainersExecuteCommandOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the executeCommand operation. */
export declare type ContainersExecuteCommandResponse = ContainerExecResponse;

/** Optional parameters. */
export declare interface ContainersListLogsOptionalParams extends coreClient.OperationOptions {
    /** The number of lines to show from the tail of the container instance log. If not provided, all available logs are shown up to 4mb. */
    tail?: number;
    /** If true, adds a timestamp at the beginning of every line of log output. If not provided, defaults to false. */
    timestamps?: boolean;
}

/** Contains response data for the listLogs operation. */
export declare type ContainersListLogsResponse = Logs;

/** The container instance state. */
export declare interface ContainerState {
    /**
     * The state of the container instance.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly state?: string;
    /**
     * The date-time when the container instance state started.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly startTime?: Date;
    /**
     * The container instance exit codes correspond to those from the `docker run` command.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly exitCode?: number;
    /**
     * The date-time when the container instance state finished.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly finishTime?: Date;
    /**
     * The human-readable status of the container instance state.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly detailStatus?: string;
}

/** Extension sidecars to be added to the deployment. */
export declare interface DeploymentExtensionSpec {
    /** Name of the extension. */
    name: string;
    /** Type of extension to be added. */
    extensionType?: string;
    /** Version of the extension being used. */
    version?: string;
    /** Settings for the extension. */
    settings?: Record<string, unknown>;
    /** Protected settings for the extension. */
    protectedSettings?: Record<string, unknown>;
}

/** DNS configuration for the container group. */
export declare interface DnsConfiguration {
    /** The DNS servers for the container group. */
    nameServers: string[];
    /** The DNS search domains for hostname lookup in the container group. */
    searchDomains?: string;
    /** The DNS options for the container group. */
    options?: string;
}

/**
 * Defines values for DnsNameLabelReusePolicy. \
 * {@link KnownDnsNameLabelReusePolicy} can be used interchangeably with DnsNameLabelReusePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unsecure** \
 * **TenantReuse** \
 * **SubscriptionReuse** \
 * **ResourceGroupReuse** \
 * **Noreuse**
 */
export declare type DnsNameLabelReusePolicy = string;

/** The container group encryption properties. */
export declare interface EncryptionProperties {
    /** The keyvault base url. */
    vaultBaseUrl: string;
    /** The encryption key name. */
    keyName: string;
    /** The encryption key version. */
    keyVersion: string;
    /** The keyvault managed identity. */
    identity?: string;
}

/** The environment variable to set within the container instance. */
export declare interface EnvironmentVariable {
    /** The name of the environment variable. */
    name: string;
    /** The value of the environment variable. */
    value?: string;
    /** The value of the secure environment variable. */
    secureValue?: string;
}

/** A container group or container instance event. */
declare interface Event_2 {
    /**
     * The count of the event.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly count?: number;
    /**
     * The date-time of the earliest logged event.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly firstTimestamp?: Date;
    /**
     * The date-time of the latest logged event.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly lastTimestamp?: Date;
    /**
     * The event name.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly name?: string;
    /**
     * The event message.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly message?: string;
    /**
     * The event type.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly type?: string;
}
export { Event_2 as Event }

/**
 * Given the last `.value` produced by the `byPage` iterator,
 * returns a continuation token that can be used to begin paging from
 * that point later.
 * @param page An object from accessing `value` on the IteratorResult from a `byPage` iterator.
 * @returns The continuation token that can be passed into byPage() during future calls.
 */
export declare function getContinuationToken(page: unknown): string | undefined;

/** Represents a volume that is populated with the contents of a git repository */
export declare interface GitRepoVolume {
    /** Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name. */
    directory?: string;
    /** Repository URL */
    repository: string;
    /** Commit hash for the specified revision. */
    revision?: string;
}

/** The GPU resource. */
export declare interface GpuResource {
    /** The count of the GPU resource. */
    count: number;
    /** The SKU of the GPU resource. */
    sku: GpuSku;
}

/**
 * Defines values for GpuSku. \
 * {@link KnownGpuSku} can be used interchangeably with GpuSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **K80** \
 * **P100** \
 * **V100**
 */
export declare type GpuSku = string;

/** The HTTP header. */
export declare interface HttpHeader {
    /** The header name. */
    name?: string;
    /** The header value. */
    value?: string;
}

/** Image registry credential. */
export declare interface ImageRegistryCredential {
    /** The Docker image registry server without a protocol such as "http" and "https". */
    server: string;
    /** The username for the private registry. */
    username?: string;
    /** The password for the private registry. */
    password?: string;
    /** The identity for the private registry. */
    identity?: string;
    /** The identity URL for the private registry. */
    identityUrl?: string;
}

/** The init container definition. */
export declare interface InitContainerDefinition {
    /** The name for the init container. */
    name: string;
    /** The image of the init container. */
    image?: string;
    /** The command to execute within the init container in exec form. */
    command?: string[];
    /** The environment variables to set in the init container. */
    environmentVariables?: EnvironmentVariable[];
    /**
     * The instance view of the init container. Only valid in response.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly instanceView?: InitContainerPropertiesDefinitionInstanceView;
    /** The volume mounts available to the init container. */
    volumeMounts?: VolumeMount[];
    /** The container security properties. */
    securityContext?: SecurityContextDefinition;
}

/** The instance view of the init container. Only valid in response. */
export declare interface InitContainerPropertiesDefinitionInstanceView {
    /**
     * The number of times that the init container has been restarted.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly restartCount?: number;
    /**
     * The current state of the init container.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly currentState?: ContainerState;
    /**
     * The previous state of the init container.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly previousState?: ContainerState;
    /**
     * The events of the init container.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly events?: Event_2[];
}

/** IP address for the container group. */
export declare interface IpAddress {
    /** The list of ports exposed on the container group. */
    ports: Port[];
    /** Specifies if the IP is exposed to the public internet or private VNET. */
    type: ContainerGroupIpAddressType;
    /** The IP exposed to the public internet. */
    ip?: string;
    /** The Dns name label for the IP. */
    dnsNameLabel?: string;
    /** The value representing the security enum. The 'Unsecure' value is the default value if not selected and means the object's domain name label is not secured against subdomain takeover. The 'TenantReuse' value is the default value if selected and means the object's domain name label can be reused within the same tenant. The 'SubscriptionReuse' value means the object's domain name label can be reused within the same subscription. The 'ResourceGroupReuse' value means the object's domain name label can be reused within the same resource group. The 'NoReuse' value means the object's domain name label cannot be reused within the same resource group, subscription, or tenant. */
    autoGeneratedDomainNameLabelScope?: DnsNameLabelReusePolicy;
    /**
     * The FQDN for the IP.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly fqdn?: string;
}

/** Known values of {@link ContainerGroupIpAddressType} that the service accepts. */
export declare enum KnownContainerGroupIpAddressType {
    /** Public */
    Public = "Public",
    /** Private */
    Private = "Private"
}

/** Known values of {@link ContainerGroupNetworkProtocol} that the service accepts. */
export declare enum KnownContainerGroupNetworkProtocol {
    /** TCP */
    TCP = "TCP",
    /** UDP */
    UDP = "UDP"
}

/** Known values of {@link ContainerGroupPriority} that the service accepts. */
export declare enum KnownContainerGroupPriority {
    /** Regular */
    Regular = "Regular",
    /** Spot */
    Spot = "Spot"
}

/** Known values of {@link ContainerGroupRestartPolicy} that the service accepts. */
export declare enum KnownContainerGroupRestartPolicy {
    /** Always */
    Always = "Always",
    /** OnFailure */
    OnFailure = "OnFailure",
    /** Never */
    Never = "Never"
}

/** Known values of {@link ContainerGroupSku} that the service accepts. */
export declare enum KnownContainerGroupSku {
    /** Standard */
    Standard = "Standard",
    /** Dedicated */
    Dedicated = "Dedicated",
    /** Confidential */
    Confidential = "Confidential"
}

/** Known values of {@link ContainerInstanceOperationsOrigin} that the service accepts. */
export declare enum KnownContainerInstanceOperationsOrigin {
    /** User */
    User = "User",
    /** System */
    System = "System"
}

/** Known values of {@link ContainerNetworkProtocol} that the service accepts. */
export declare enum KnownContainerNetworkProtocol {
    /** TCP */
    TCP = "TCP",
    /** UDP */
    UDP = "UDP"
}

/** Known values of {@link DnsNameLabelReusePolicy} that the service accepts. */
export declare enum KnownDnsNameLabelReusePolicy {
    /** Unsecure */
    Unsecure = "Unsecure",
    /** TenantReuse */
    TenantReuse = "TenantReuse",
    /** SubscriptionReuse */
    SubscriptionReuse = "SubscriptionReuse",
    /** ResourceGroupReuse */
    ResourceGroupReuse = "ResourceGroupReuse",
    /** Noreuse */
    Noreuse = "Noreuse"
}

/** Known values of {@link GpuSku} that the service accepts. */
export declare enum KnownGpuSku {
    /** K80 */
    K80 = "K80",
    /** P100 */
    P100 = "P100",
    /** V100 */
    V100 = "V100"
}

/** Known values of {@link LogAnalyticsLogType} that the service accepts. */
export declare enum KnownLogAnalyticsLogType {
    /** ContainerInsights */
    ContainerInsights = "ContainerInsights",
    /** ContainerInstanceLogs */
    ContainerInstanceLogs = "ContainerInstanceLogs"
}

/** Known values of {@link OperatingSystemTypes} that the service accepts. */
export declare enum KnownOperatingSystemTypes {
    /** Windows */
    Windows = "Windows",
    /** Linux */
    Linux = "Linux"
}

/** Known values of {@link Scheme} that the service accepts. */
export declare enum KnownScheme {
    /** Http */
    Http = "http",
    /** Https */
    Https = "https"
}

/** Interface representing a Location. */
declare interface Location_2 {
    /**
     * Get the usage for a subscription
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listUsage(location: string, options?: LocationListUsageOptionalParams): PagedAsyncIterableIterator<Usage>;
    /**
     * Get the list of cached images on specific OS type for a subscription in a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCachedImages(location: string, options?: LocationListCachedImagesOptionalParams): PagedAsyncIterableIterator<CachedImages>;
    /**
     * Get the list of CPU/memory/GPU capabilities of a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCapabilities(location: string, options?: LocationListCapabilitiesOptionalParams): PagedAsyncIterableIterator<Capabilities>;
}
export { Location_2 as Location }

/** Optional parameters. */
export declare interface LocationListCachedImagesNextOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listCachedImagesNext operation. */
export declare type LocationListCachedImagesNextResponse = CachedImagesListResult;

/** Optional parameters. */
export declare interface LocationListCachedImagesOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listCachedImages operation. */
export declare type LocationListCachedImagesResponse = CachedImagesListResult;

/** Optional parameters. */
export declare interface LocationListCapabilitiesNextOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listCapabilitiesNext operation. */
export declare type LocationListCapabilitiesNextResponse = CapabilitiesListResult;

/** Optional parameters. */
export declare interface LocationListCapabilitiesOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listCapabilities operation. */
export declare type LocationListCapabilitiesResponse = CapabilitiesListResult;

/** Optional parameters. */
export declare interface LocationListUsageOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listUsage operation. */
export declare type LocationListUsageResponse = UsageListResult;

/** Container group log analytics information. */
export declare interface LogAnalytics {
    /** The workspace id for log analytics */
    workspaceId: string;
    /** The workspace key for log analytics */
    workspaceKey: string;
    /** The log type to be used. */
    logType?: LogAnalyticsLogType;
    /** Metadata for log analytics. */
    metadata?: {
        [propertyName: string]: string;
    };
    /** The workspace resource id for log analytics */
    workspaceResourceId?: string;
}

/**
 * Defines values for LogAnalyticsLogType. \
 * {@link KnownLogAnalyticsLogType} can be used interchangeably with LogAnalyticsLogType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ContainerInsights** \
 * **ContainerInstanceLogs**
 */
export declare type LogAnalyticsLogType = string;

/** The logs. */
export declare interface Logs {
    /** The content of the log. */
    content?: string;
}

/**
 * Defines values for OperatingSystemTypes. \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows** \
 * **Linux**
 */
export declare type OperatingSystemTypes = string;

/** An operation for Azure Container Instance service. */
export declare interface Operation {
    /** The name of the operation. */
    name: string;
    /** The display information of the operation. */
    display: OperationDisplay;
    /** The additional properties. */
    properties?: Record<string, unknown>;
    /** The intended executor of the operation. */
    origin?: ContainerInstanceOperationsOrigin;
}

/** The display information of the operation. */
export declare interface OperationDisplay {
    /** The name of the provider of the operation. */
    provider?: string;
    /** The name of the resource type of the operation. */
    resource?: string;
    /** The friendly name of the operation. */
    operation?: string;
    /** The description of the operation. */
    description?: string;
}

/** The operation list response that contains all operations for Azure Container Instance service. */
export declare interface OperationListResult {
    /** The list of operations. */
    value?: Operation[];
    /** The URI to fetch the next page of operations. */
    nextLink?: string;
}

/** Interface representing a Operations. */
export declare interface Operations {
    /**
     * List the operations for Azure Container Instance service.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}

/** Optional parameters. */
export declare interface OperationsListNextOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the listNext operation. */
export declare type OperationsListNextResponse = OperationListResult;

/** Optional parameters. */
export declare interface OperationsListOptionalParams extends coreClient.OperationOptions {
}

/** Contains response data for the list operation. */
export declare type OperationsListResponse = OperationListResult;

/** The port exposed on the container group. */
export declare interface Port {
    /** The protocol associated with the port. */
    protocol?: ContainerGroupNetworkProtocol;
    /** The port number. */
    port: number;
}

/** The Resource model definition. */
export declare interface Resource {
    /**
     * The resource id.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly id?: string;
    /**
     * The resource name.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly name?: string;
    /**
     * The resource type.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly type?: string;
    /** The resource location. */
    location?: string;
    /** The resource tags. */
    tags?: {
        [propertyName: string]: string;
    };
    /** The zones for the container group. */
    zones?: string[];
}

/** Defines values for ResourceIdentityType. */
export declare type ResourceIdentityType = "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

/** The resource limits. */
export declare interface ResourceLimits {
    /** The memory limit in GB of this container instance. */
    memoryInGB?: number;
    /** The CPU limit of this container instance. */
    cpu?: number;
    /** The GPU limit of this container instance. */
    gpu?: GpuResource;
}

/** The resource requests. */
export declare interface ResourceRequests {
    /** The memory request in GB of this container instance. */
    memoryInGB: number;
    /** The CPU request of this container instance. */
    cpu: number;
    /** The GPU request of this container instance. */
    gpu?: GpuResource;
}

/** The resource requirements. */
export declare interface ResourceRequirements {
    /** The resource requests of this container instance. */
    requests: ResourceRequests;
    /** The resource limits of this container instance. */
    limits?: ResourceLimits;
}

/**
 * Defines values for Scheme. \
 * {@link KnownScheme} can be used interchangeably with Scheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http** \
 * **https**
 */
export declare type Scheme = string;

/** The capabilities to add or drop from a container. */
export declare interface SecurityContextCapabilitiesDefinition {
    /** The capabilities to add to the container. */
    add?: string[];
    /** The capabilities to drop from the container. */
    drop?: string[];
}

/** The security context for the container. */
export declare interface SecurityContextDefinition {
    /** The flag to determine if the container permissions is elevated to Privileged. */
    privileged?: boolean;
    /** A boolean value indicating whether the init process can elevate its privileges */
    allowPrivilegeEscalation?: boolean;
    /** The capabilities to add or drop from a container. */
    capabilities?: SecurityContextCapabilitiesDefinition;
    /** Sets the User GID for the container. */
    runAsGroup?: number;
    /** Sets the User UID for the container. */
    runAsUser?: number;
    /** a base64 encoded string containing the contents of the JSON in the seccomp profile */
    seccompProfile?: string;
}

/** Interface representing a SubnetServiceAssociationLink. */
export declare interface SubnetServiceAssociationLink {
    /**
     * Delete container group virtual network association links. The operation does not delete other
     * resources provided by the user.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: SubnetServiceAssociationLinkDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete container group virtual network association links. The operation does not delete other
     * resources provided by the user.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: SubnetServiceAssociationLinkDeleteOptionalParams): Promise<void>;
}

/** Optional parameters. */
export declare interface SubnetServiceAssociationLinkDeleteOptionalParams extends coreClient.OperationOptions {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
    resumeFrom?: string;
}

/** A single usage result */
export declare interface Usage {
    /**
     * Id of the usage result
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly id?: string;
    /**
     * Unit of the usage result
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly unit?: string;
    /**
     * The current usage of the resource
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly currentValue?: number;
    /**
     * The maximum permitted usage of the resource.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly limit?: number;
    /**
     * The name object of the resource
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly name?: UsageName;
}

/** The response containing the usage data */
export declare interface UsageListResult {
    /**
     * The usage data.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly value?: Usage[];
}

/** The name object of the resource */
export declare interface UsageName {
    /**
     * The name of the resource
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly value?: string;
    /**
     * The localized name of the resource
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly localizedValue?: string;
}

/** The list of user identities associated with the container group. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
export declare interface UserAssignedIdentities {
    /**
     * The principal id of user assigned identity.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly principalId?: string;
    /**
     * The client id of user assigned identity.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly clientId?: string;
}

/** The properties of the volume. */
export declare interface Volume {
    /** The name of the volume. */
    name: string;
    /** The Azure File volume. */
    azureFile?: AzureFileVolume;
    /** The empty directory volume. */
    emptyDir?: Record<string, unknown>;
    /** The secret volume. */
    secret?: {
        [propertyName: string]: string;
    };
    /** The git repo volume. */
    gitRepo?: GitRepoVolume;
}

/** The properties of the volume mount. */
export declare interface VolumeMount {
    /** The name of the volume mount. */
    name: string;
    /** The path within the container where the volume should be mounted. Must not contain colon (:). */
    mountPath: string;
    /** The flag indicating whether the volume mount is read-only. */
    readOnly?: boolean;
}

export { }
