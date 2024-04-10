import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions } from 'google-gax';
import * as protos from '../../protos/protos';
/**
 *  The RegionOperations API.
 * @class
 * @memberof v1small
 */
export declare class RegionOperationsClient {
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
    regionOperationsStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of RegionOperationsClient.
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
     *     const client = new RegionOperationsClient({fallback: 'rest'}, gax);
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
     * Retrieves the specified region-specific Operations resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.operation
     *   Name of the Operations resource to return.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1small.Operation | Operation}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1small/region_operations.get.js</caption>
     * region_tag:compute_v1small_generated_RegionOperations_Get_async
     */
    get(request?: protos.google.cloud.compute.v1small.IGetRegionOperationRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1small.IOperation,
        (protos.google.cloud.compute.v1small.IGetRegionOperationRequest | undefined),
        {} | undefined
    ]>;
    get(request: protos.google.cloud.compute.v1small.IGetRegionOperationRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1small.IOperation, protos.google.cloud.compute.v1small.IGetRegionOperationRequest | null | undefined, {} | null | undefined>): void;
    get(request: protos.google.cloud.compute.v1small.IGetRegionOperationRequest, callback: Callback<protos.google.cloud.compute.v1small.IOperation, protos.google.cloud.compute.v1small.IGetRegionOperationRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress.
     *
     * This method is called on a best-effort basis. Specifically:
     * - In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds.
     * - If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.operation
     *   Name of the Operations resource to return.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1small.Operation | Operation}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1small/region_operations.wait.js</caption>
     * region_tag:compute_v1small_generated_RegionOperations_Wait_async
     */
    wait(request?: protos.google.cloud.compute.v1small.IWaitRegionOperationRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1small.IOperation,
        (protos.google.cloud.compute.v1small.IWaitRegionOperationRequest | undefined),
        {} | undefined
    ]>;
    wait(request: protos.google.cloud.compute.v1small.IWaitRegionOperationRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1small.IOperation, protos.google.cloud.compute.v1small.IWaitRegionOperationRequest | null | undefined, {} | null | undefined>): void;
    wait(request: protos.google.cloud.compute.v1small.IWaitRegionOperationRequest, callback: Callback<protos.google.cloud.compute.v1small.IOperation, protos.google.cloud.compute.v1small.IWaitRegionOperationRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
