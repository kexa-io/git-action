/// <reference types="node" />
import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  The Networks API.
 * @class
 * @memberof v1
 */
export declare class NetworksClient {
    private _terminated;
    private _opts;
    private _providedCustomServicePath;
    private _gaxModule;
    private _gaxGrpc;
    private _protos;
    private _defaults;
    auth: gax.GoogleAuth;
    descriptors: Descriptors;
    warn: (code: string, message: string, warnType?: string) => void;
    innerApiCalls: {
        [name: string]: Function;
    };
    networksStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of NetworksClient.
     *
     * @param {object} [options] - The configuration object.
     * The options accepted by the constructor are described in detail
     * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
     * The common options are:
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
     *     Follows the structure of {@link gapicConfig}.
     * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
     *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
     *     For more information, please check the
     *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
     * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
     *     need to avoid loading the default gRPC version and want to use the fallback
     *     HTTP implementation. Load only fallback version and pass it to the constructor:
     *     ```
     *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
     *     const client = new NetworksClient({fallback: 'rest'}, gax);
     *     ```
     */
    constructor(opts?: ClientOptions, gaxInstance?: typeof gax | typeof gax.fallback);
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize(): Promise<{
        [name: string]: Function;
    }>;
    /**
     * The DNS address for this API service.
     * @returns {string} The DNS address for this service.
     */
    static get servicePath(): string;
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     * @returns {string} The DNS address for this service.
     */
    static get apiEndpoint(): string;
    /**
     * The port for this API service.
     * @returns {number} The default port for this service.
     */
    static get port(): number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     * @returns {string[]} List of default scopes.
     */
    static get scopes(): string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    /**
     * Adds a peering to the specified network.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network resource to add peering to.
     * @param {google.cloud.compute.v1.NetworksAddPeeringRequest} request.networksAddPeeringRequestResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.add_peering.js</caption>
     * region_tag:compute_v1_generated_Networks_AddPeering_async
     */
    addPeering(request?: protos.google.cloud.compute.v1.IAddPeeringNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    addPeering(request: protos.google.cloud.compute.v1.IAddPeeringNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddPeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    addPeering(request: protos.google.cloud.compute.v1.IAddPeeringNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddPeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes the specified network.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network to delete.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.delete.js</caption>
     * region_tag:compute_v1_generated_Networks_Delete_async
     */
    delete(request?: protos.google.cloud.compute.v1.IDeleteNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    delete(request: protos.google.cloud.compute.v1.IDeleteNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteNetworkRequest | null | undefined, {} | null | undefined>): void;
    delete(request: protos.google.cloud.compute.v1.IDeleteNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns the specified network.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network to return.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Network | Network}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/networks.get.js</caption>
     * region_tag:compute_v1_generated_Networks_Get_async
     */
    get(request?: protos.google.cloud.compute.v1.IGetNetworkRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.INetwork,
        protos.google.cloud.compute.v1.IGetNetworkRequest | undefined,
        {} | undefined
    ]>;
    get(request: protos.google.cloud.compute.v1.IGetNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.INetwork, protos.google.cloud.compute.v1.IGetNetworkRequest | null | undefined, {} | null | undefined>): void;
    get(request: protos.google.cloud.compute.v1.IGetNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.INetwork, protos.google.cloud.compute.v1.IGetNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns the effective firewalls on a given network.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network for this request.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.NetworksGetEffectiveFirewallsResponse | NetworksGetEffectiveFirewallsResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/networks.get_effective_firewalls.js</caption>
     * region_tag:compute_v1_generated_Networks_GetEffectiveFirewalls_async
     */
    getEffectiveFirewalls(request?: protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.INetworksGetEffectiveFirewallsResponse,
        (protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest | undefined),
        {} | undefined
    ]>;
    getEffectiveFirewalls(request: protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.INetworksGetEffectiveFirewallsResponse, protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest | null | undefined, {} | null | undefined>): void;
    getEffectiveFirewalls(request: protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.INetworksGetEffectiveFirewallsResponse, protos.google.cloud.compute.v1.IGetEffectiveFirewallsNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a network in the specified project using the data included in the request.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.Network} request.networkResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.insert.js</caption>
     * region_tag:compute_v1_generated_Networks_Insert_async
     */
    insert(request?: protos.google.cloud.compute.v1.IInsertNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    insert(request: protos.google.cloud.compute.v1.IInsertNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertNetworkRequest | null | undefined, {} | null | undefined>): void;
    insert(request: protos.google.cloud.compute.v1.IInsertNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Patches the specified network with the data included in the request. Only the following fields can be modified: routingConfig.routingMode.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network to update.
     * @param {google.cloud.compute.v1.Network} request.networkResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.patch.js</caption>
     * region_tag:compute_v1_generated_Networks_Patch_async
     */
    patch(request?: protos.google.cloud.compute.v1.IPatchNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    patch(request: protos.google.cloud.compute.v1.IPatchNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchNetworkRequest | null | undefined, {} | null | undefined>): void;
    patch(request: protos.google.cloud.compute.v1.IPatchNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Removes a peering from the specified network.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network resource to remove peering from.
     * @param {google.cloud.compute.v1.NetworksRemovePeeringRequest} request.networksRemovePeeringRequestResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.remove_peering.js</caption>
     * region_tag:compute_v1_generated_Networks_RemovePeering_async
     */
    removePeering(request?: protos.google.cloud.compute.v1.IRemovePeeringNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    removePeering(request: protos.google.cloud.compute.v1.IRemovePeeringNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemovePeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    removePeering(request: protos.google.cloud.compute.v1.IRemovePeeringNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemovePeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Switches the network mode from auto subnet mode to custom subnet mode.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network to be updated.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.switch_to_custom_mode.js</caption>
     * region_tag:compute_v1_generated_Networks_SwitchToCustomMode_async
     */
    switchToCustomMode(request?: protos.google.cloud.compute.v1.ISwitchToCustomModeNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    switchToCustomMode(request: protos.google.cloud.compute.v1.ISwitchToCustomModeNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ISwitchToCustomModeNetworkRequest | null | undefined, {} | null | undefined>): void;
    switchToCustomMode(request: protos.google.cloud.compute.v1.ISwitchToCustomModeNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ISwitchToCustomModeNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Updates the specified network peering with the data included in the request. You can only modify the NetworkPeering.export_custom_routes field and the NetworkPeering.import_custom_routes field.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.network
     *   Name of the network resource which the updated peering is belonging to.
     * @param {google.cloud.compute.v1.NetworksUpdatePeeringRequest} request.networksUpdatePeeringRequestResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     *   This method is considered to be in beta. This means while
     *   stable it is still a work-in-progress and under active development,
     *   and might get backwards-incompatible changes at any time.
     *   `.promise()` is not supported yet.
     * @example <caption>include:samples/generated/v1/networks.update_peering.js</caption>
     * region_tag:compute_v1_generated_Networks_UpdatePeering_async
     */
    updatePeering(request?: protos.google.cloud.compute.v1.IUpdatePeeringNetworkRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    updatePeering(request: protos.google.cloud.compute.v1.IUpdatePeeringNetworkRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdatePeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    updatePeering(request: protos.google.cloud.compute.v1.IUpdatePeeringNetworkRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdatePeeringNetworkRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Retrieves the list of networks available to the specified project.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.cloud.compute.v1.Network | Network}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    list(request?: protos.google.cloud.compute.v1.IListNetworksRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.INetwork[],
        protos.google.cloud.compute.v1.IListNetworksRequest | null,
        protos.google.cloud.compute.v1.INetworkList
    ]>;
    list(request: protos.google.cloud.compute.v1.IListNetworksRequest, options: CallOptions, callback: PaginationCallback<protos.google.cloud.compute.v1.IListNetworksRequest, protos.google.cloud.compute.v1.INetworkList | null | undefined, protos.google.cloud.compute.v1.INetwork>): void;
    list(request: protos.google.cloud.compute.v1.IListNetworksRequest, callback: PaginationCallback<protos.google.cloud.compute.v1.IListNetworksRequest, protos.google.cloud.compute.v1.INetworkList | null | undefined, protos.google.cloud.compute.v1.INetwork>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.cloud.compute.v1.Network | Network} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listStream(request?: protos.google.cloud.compute.v1.IListNetworksRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `list`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.cloud.compute.v1.Network | Network}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/networks.list.js</caption>
     * region_tag:compute_v1_generated_Networks_List_async
     */
    listAsync(request?: protos.google.cloud.compute.v1.IListNetworksRequest, options?: CallOptions): AsyncIterable<protos.google.cloud.compute.v1.INetwork>;
    /**
     * Lists the peering routes exchanged over peering connection.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.direction
     *   The direction of the exchanged routes.
     *   Check the Direction enum for the list of possible values.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.network
     *   Name of the network for this request.
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.peeringName
     *   The response will show routes exchanged over the given peering connection.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The region of the request. The response will include all subnet routes, static routes and dynamic routes in the region.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.cloud.compute.v1.ExchangedPeeringRoute | ExchangedPeeringRoute}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listPeeringRoutesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listPeeringRoutes(request?: protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IExchangedPeeringRoute[],
        protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest | null,
        protos.google.cloud.compute.v1.IExchangedPeeringRoutesList
    ]>;
    listPeeringRoutes(request: protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, options: CallOptions, callback: PaginationCallback<protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, protos.google.cloud.compute.v1.IExchangedPeeringRoutesList | null | undefined, protos.google.cloud.compute.v1.IExchangedPeeringRoute>): void;
    listPeeringRoutes(request: protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, callback: PaginationCallback<protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, protos.google.cloud.compute.v1.IExchangedPeeringRoutesList | null | undefined, protos.google.cloud.compute.v1.IExchangedPeeringRoute>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.direction
     *   The direction of the exchanged routes.
     *   Check the Direction enum for the list of possible values.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.network
     *   Name of the network for this request.
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.peeringName
     *   The response will show routes exchanged over the given peering connection.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The region of the request. The response will include all subnet routes, static routes and dynamic routes in the region.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.cloud.compute.v1.ExchangedPeeringRoute | ExchangedPeeringRoute} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listPeeringRoutesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listPeeringRoutesStream(request?: protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listPeeringRoutes`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.direction
     *   The direction of the exchanged routes.
     *   Check the Direction enum for the list of possible values.
     * @param {string} request.filter
     *   A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:` operator can be used with string fields to match substrings. For non-string fields it is equivalent to the `=` operator. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.
     * @param {number} request.maxResults
     *   The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
     * @param {string} request.network
     *   Name of the network for this request.
     * @param {string} request.orderBy
     *   Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported.
     * @param {string} request.pageToken
     *   Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
     * @param {string} request.peeringName
     *   The response will show routes exchanged over the given peering connection.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The region of the request. The response will include all subnet routes, static routes and dynamic routes in the region.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.cloud.compute.v1.ExchangedPeeringRoute | ExchangedPeeringRoute}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/networks.list_peering_routes.js</caption>
     * region_tag:compute_v1_generated_Networks_ListPeeringRoutes_async
     */
    listPeeringRoutesAsync(request?: protos.google.cloud.compute.v1.IListPeeringRoutesNetworksRequest, options?: CallOptions): AsyncIterable<protos.google.cloud.compute.v1.IExchangedPeeringRoute>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
