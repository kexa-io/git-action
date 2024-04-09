/// <reference types="node" />
import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  The RegionBackendServices API.
 * @class
 * @memberof v1
 */
export declare class RegionBackendServicesClient {
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
    regionBackendServicesStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of RegionBackendServicesClient.
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
     *     const client = new RegionBackendServicesClient({fallback: 'rest'}, gax);
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
     * Deletes the specified regional BackendService resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.backendService
     *   Name of the BackendService resource to delete.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region scoping this request.
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
     * @example <caption>include:samples/generated/v1/region_backend_services.delete.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_Delete_async
     */
    delete(request?: protos.google.cloud.compute.v1.IDeleteRegionBackendServiceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    delete(request: protos.google.cloud.compute.v1.IDeleteRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    delete(request: protos.google.cloud.compute.v1.IDeleteRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns the specified regional BackendService resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.backendService
     *   Name of the BackendService resource to return.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region scoping this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.BackendService | BackendService}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_backend_services.get.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_Get_async
     */
    get(request?: protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IBackendService,
        (protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest | undefined),
        {} | undefined
    ]>;
    get(request: protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IBackendService, protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    get(request: protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IBackendService, protos.google.cloud.compute.v1.IGetRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets the most recent health check results for this regional BackendService.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.backendService
     *   Name of the BackendService resource for which to get health.
     * @param {string} request.project
     * @param {string} request.region
     *   Name of the region scoping this request.
     * @param {google.cloud.compute.v1.ResourceGroupReference} request.resourceGroupReferenceResource
     *   The body resource for this request
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.BackendServiceGroupHealth | BackendServiceGroupHealth}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_backend_services.get_health.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_GetHealth_async
     */
    getHealth(request?: protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IBackendServiceGroupHealth,
        (protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest | undefined),
        {} | undefined
    ]>;
    getHealth(request: protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IBackendServiceGroupHealth, protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    getHealth(request: protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IBackendServiceGroupHealth, protos.google.cloud.compute.v1.IGetHealthRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets the access control policy for a resource. May be empty if no such policy or resource exists.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {number} request.optionsRequestedPolicyVersion
     *   Requested IAM Policy version.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {string} request.resource
     *   Name or id of the resource for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Policy | Policy}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_backend_services.get_iam_policy.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_GetIamPolicy_async
     */
    getIamPolicy(request?: protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        (protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest | undefined),
        {} | undefined
    ]>;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a regional BackendService resource in the specified project using the data included in the request. For more information, see Backend services overview.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.BackendService} request.backendServiceResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region scoping this request.
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
     * @example <caption>include:samples/generated/v1/region_backend_services.insert.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_Insert_async
     */
    insert(request?: protos.google.cloud.compute.v1.IInsertRegionBackendServiceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    insert(request: protos.google.cloud.compute.v1.IInsertRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    insert(request: protos.google.cloud.compute.v1.IInsertRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Updates the specified regional BackendService resource with the data included in the request. For more information, see Understanding backend services This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.backendService
     *   Name of the BackendService resource to patch.
     * @param {google.cloud.compute.v1.BackendService} request.backendServiceResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region scoping this request.
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
     * @example <caption>include:samples/generated/v1/region_backend_services.patch.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_Patch_async
     */
    patch(request?: protos.google.cloud.compute.v1.IPatchRegionBackendServiceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    patch(request: protos.google.cloud.compute.v1.IPatchRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    patch(request: protos.google.cloud.compute.v1.IPatchRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Sets the access control policy on the specified resource. Replaces any existing policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {google.cloud.compute.v1.RegionSetPolicyRequest} request.regionSetPolicyRequestResource
     *   The body resource for this request
     * @param {string} request.resource
     *   Name or id of the resource for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Policy | Policy}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_backend_services.set_iam_policy.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_SetIamPolicy_async
     */
    setIamPolicy(request?: protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        (protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest | undefined),
        {} | undefined
    ]>;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Updates the specified regional BackendService resource with the data included in the request. For more information, see Backend services overview .
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.backendService
     *   Name of the BackendService resource to update.
     * @param {google.cloud.compute.v1.BackendService} request.backendServiceResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region scoping this request.
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
     * @example <caption>include:samples/generated/v1/region_backend_services.update.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_Update_async
     */
    update(request?: protos.google.cloud.compute.v1.IUpdateRegionBackendServiceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    update(request: protos.google.cloud.compute.v1.IUpdateRegionBackendServiceRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdateRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    update(request: protos.google.cloud.compute.v1.IUpdateRegionBackendServiceRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdateRegionBackendServiceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Retrieves the list of regional BackendService resources available to the specified project in the given region.
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
     * @param {string} request.region
     *   Name of the region scoping this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.cloud.compute.v1.BackendService | BackendService}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    list(request?: protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IBackendService[],
        protos.google.cloud.compute.v1.IListRegionBackendServicesRequest | null,
        protos.google.cloud.compute.v1.IBackendServiceList
    ]>;
    list(request: protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, options: CallOptions, callback: PaginationCallback<protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, protos.google.cloud.compute.v1.IBackendServiceList | null | undefined, protos.google.cloud.compute.v1.IBackendService>): void;
    list(request: protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, callback: PaginationCallback<protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, protos.google.cloud.compute.v1.IBackendServiceList | null | undefined, protos.google.cloud.compute.v1.IBackendService>): void;
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
     * @param {string} request.region
     *   Name of the region scoping this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.cloud.compute.v1.BackendService | BackendService} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listStream(request?: protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, options?: CallOptions): Transform;
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
     * @param {string} request.region
     *   Name of the region scoping this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.cloud.compute.v1.BackendService | BackendService}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_backend_services.list.js</caption>
     * region_tag:compute_v1_generated_RegionBackendServices_List_async
     */
    listAsync(request?: protos.google.cloud.compute.v1.IListRegionBackendServicesRequest, options?: CallOptions): AsyncIterable<protos.google.cloud.compute.v1.IBackendService>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
