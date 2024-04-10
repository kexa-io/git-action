/// <reference types="node" />
import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  The RegionDisks API.
 * @class
 * @memberof v1
 */
export declare class RegionDisksClient {
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
    regionDisksStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of RegionDisksClient.
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
     *     const client = new RegionDisksClient({fallback: 'rest'}, gax);
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
     * Adds existing resource policies to a regional disk. You can only add one policy which will be applied to this disk for scheduling snapshot creation.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   The disk name for this request.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {google.cloud.compute.v1.RegionDisksAddResourcePoliciesRequest} request.regionDisksAddResourcePoliciesRequestResource
     *   The body resource for this request
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
     * @example <caption>include:samples/generated/v1/region_disks.add_resource_policies.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_AddResourcePolicies_async
     */
    addResourcePolicies(request?: protos.google.cloud.compute.v1.IAddResourcePoliciesRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    addResourcePolicies(request: protos.google.cloud.compute.v1.IAddResourcePoliciesRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddResourcePoliciesRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    addResourcePolicies(request: protos.google.cloud.compute.v1.IAddResourcePoliciesRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddResourcePoliciesRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Bulk create a set of disks.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.BulkInsertDiskResource} request.bulkInsertDiskResourceResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
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
     * @example <caption>include:samples/generated/v1/region_disks.bulk_insert.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_BulkInsert_async
     */
    bulkInsert(request?: protos.google.cloud.compute.v1.IBulkInsertRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    bulkInsert(request: protos.google.cloud.compute.v1.IBulkInsertRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IBulkInsertRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    bulkInsert(request: protos.google.cloud.compute.v1.IBulkInsertRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IBulkInsertRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a snapshot of a specified persistent disk. For regular snapshot creation, consider using snapshots.insert instead, as that method supports more features, such as creating snapshots in a project different from the source disk project.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   Name of the regional persistent disk to snapshot.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {google.cloud.compute.v1.Snapshot} request.snapshotResource
     *   The body resource for this request
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
     * @example <caption>include:samples/generated/v1/region_disks.create_snapshot.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_CreateSnapshot_async
     */
    createSnapshot(request?: protos.google.cloud.compute.v1.ICreateSnapshotRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    createSnapshot(request: protos.google.cloud.compute.v1.ICreateSnapshotRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ICreateSnapshotRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    createSnapshot(request: protos.google.cloud.compute.v1.ICreateSnapshotRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ICreateSnapshotRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes the specified regional persistent disk. Deleting a regional disk removes all the replicas of its data permanently and is irreversible. However, deleting a disk does not delete any snapshots previously made from the disk. You must separately delete snapshots.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   Name of the regional persistent disk to delete.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
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
     * @example <caption>include:samples/generated/v1/region_disks.delete.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_Delete_async
     */
    delete(request?: protos.google.cloud.compute.v1.IDeleteRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    delete(request: protos.google.cloud.compute.v1.IDeleteRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    delete(request: protos.google.cloud.compute.v1.IDeleteRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns a specified regional persistent disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   Name of the regional persistent disk to return.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Disk | Disk}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_disks.get.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_Get_async
     */
    get(request?: protos.google.cloud.compute.v1.IGetRegionDiskRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IDisk,
        protos.google.cloud.compute.v1.IGetRegionDiskRequest | undefined,
        {} | undefined
    ]>;
    get(request: protos.google.cloud.compute.v1.IGetRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IDisk, protos.google.cloud.compute.v1.IGetRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    get(request: protos.google.cloud.compute.v1.IGetRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IDisk, protos.google.cloud.compute.v1.IGetRegionDiskRequest | null | undefined, {} | null | undefined>): void;
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
     * @example <caption>include:samples/generated/v1/region_disks.get_iam_policy.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_GetIamPolicy_async
     */
    getIamPolicy(request?: protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest | undefined,
        {} | undefined
    ]>;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a persistent regional disk in the specified project using the data included in the request.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.Disk} request.diskResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {string} request.sourceImage
     *   Source image to restore onto a disk. This field is optional.
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
     * @example <caption>include:samples/generated/v1/region_disks.insert.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_Insert_async
     */
    insert(request?: protos.google.cloud.compute.v1.IInsertRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    insert(request: protos.google.cloud.compute.v1.IInsertRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    insert(request: protos.google.cloud.compute.v1.IInsertRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Removes resource policies from a regional disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   The disk name for this request.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {google.cloud.compute.v1.RegionDisksRemoveResourcePoliciesRequest} request.regionDisksRemoveResourcePoliciesRequestResource
     *   The body resource for this request
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
     * @example <caption>include:samples/generated/v1/region_disks.remove_resource_policies.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_RemoveResourcePolicies_async
     */
    removeResourcePolicies(request?: protos.google.cloud.compute.v1.IRemoveResourcePoliciesRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    removeResourcePolicies(request: protos.google.cloud.compute.v1.IRemoveResourcePoliciesRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveResourcePoliciesRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    removeResourcePolicies(request: protos.google.cloud.compute.v1.IRemoveResourcePoliciesRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveResourcePoliciesRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Resizes the specified regional persistent disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   Name of the regional persistent disk.
     * @param {string} request.project
     *   The project ID for this request.
     * @param {string} request.region
     *   Name of the region for this request.
     * @param {google.cloud.compute.v1.RegionDisksResizeRequest} request.regionDisksResizeRequestResource
     *   The body resource for this request
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
     * @example <caption>include:samples/generated/v1/region_disks.resize.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_Resize_async
     */
    resize(request?: protos.google.cloud.compute.v1.IResizeRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    resize(request: protos.google.cloud.compute.v1.IResizeRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IResizeRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    resize(request: protos.google.cloud.compute.v1.IResizeRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IResizeRegionDiskRequest | null | undefined, {} | null | undefined>): void;
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
     * @example <caption>include:samples/generated/v1/region_disks.set_iam_policy.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_SetIamPolicy_async
     */
    setIamPolicy(request?: protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest | undefined,
        {} | undefined
    ]>;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Sets the labels on the target regional disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The region for this request.
     * @param {google.cloud.compute.v1.RegionSetLabelsRequest} request.regionSetLabelsRequestResource
     *   The body resource for this request
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {string} request.resource
     *   Name or id of the resource for this request.
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
     * @example <caption>include:samples/generated/v1/region_disks.set_labels.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_SetLabels_async
     */
    setLabels(request?: protos.google.cloud.compute.v1.ISetLabelsRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    setLabels(request: protos.google.cloud.compute.v1.ISetLabelsRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ISetLabelsRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    setLabels(request: protos.google.cloud.compute.v1.ISetLabelsRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ISetLabelsRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Starts asynchronous replication. Must be invoked on the primary disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   The name of the persistent disk.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {google.cloud.compute.v1.RegionDisksStartAsyncReplicationRequest} request.regionDisksStartAsyncReplicationRequestResource
     *   The body resource for this request
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
     * @example <caption>include:samples/generated/v1/region_disks.start_async_replication.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_StartAsyncReplication_async
     */
    startAsyncReplication(request?: protos.google.cloud.compute.v1.IStartAsyncReplicationRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    startAsyncReplication(request: protos.google.cloud.compute.v1.IStartAsyncReplicationRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStartAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    startAsyncReplication(request: protos.google.cloud.compute.v1.IStartAsyncReplicationRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStartAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Stops asynchronous replication. Can be invoked either on the primary or on the secondary disk.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   The name of the persistent disk.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
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
     * @example <caption>include:samples/generated/v1/region_disks.stop_async_replication.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_StopAsyncReplication_async
     */
    stopAsyncReplication(request?: protos.google.cloud.compute.v1.IStopAsyncReplicationRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    stopAsyncReplication(request: protos.google.cloud.compute.v1.IStopAsyncReplicationRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStopAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    stopAsyncReplication(request: protos.google.cloud.compute.v1.IStopAsyncReplicationRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStopAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Stops asynchronous replication for a consistency group of disks. Can be invoked either in the primary or secondary scope.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.DisksStopGroupAsyncReplicationResource} request.disksStopGroupAsyncReplicationResourceResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request. This must be the region of the primary or secondary disks in the consistency group.
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
     * @example <caption>include:samples/generated/v1/region_disks.stop_group_async_replication.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_StopGroupAsyncReplication_async
     */
    stopGroupAsyncReplication(request?: protos.google.cloud.compute.v1.IStopGroupAsyncReplicationRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    stopGroupAsyncReplication(request: protos.google.cloud.compute.v1.IStopGroupAsyncReplicationRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStopGroupAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    stopGroupAsyncReplication(request: protos.google.cloud.compute.v1.IStopGroupAsyncReplicationRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IStopGroupAsyncReplicationRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns permissions that a caller has on the specified resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {string} request.resource
     *   Name or id of the resource for this request.
     * @param {google.cloud.compute.v1.TestPermissionsRequest} request.testPermissionsRequestResource
     *   The body resource for this request
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.TestPermissionsResponse | TestPermissionsResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_disks.test_iam_permissions.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_TestIamPermissions_async
     */
    testIamPermissions(request?: protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.ITestPermissionsResponse,
        (protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest | undefined),
        {} | undefined
    ]>;
    testIamPermissions(request: protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.ITestPermissionsResponse, protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    testIamPermissions(request: protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.ITestPermissionsResponse, protos.google.cloud.compute.v1.ITestIamPermissionsRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Update the specified disk with the data included in the request. Update is performed only on selected fields included as part of update-mask. Only the following fields can be modified: user_license.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.disk
     *   The disk name for this request.
     * @param {google.cloud.compute.v1.Disk} request.diskResource
     *   The body resource for this request
     * @param {string} request.paths
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.region
     *   The name of the region for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {string} request.updateMask
     *   update_mask indicates fields to be updated as part of this request.
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
     * @example <caption>include:samples/generated/v1/region_disks.update.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_Update_async
     */
    update(request?: protos.google.cloud.compute.v1.IUpdateRegionDiskRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    update(request: protos.google.cloud.compute.v1.IUpdateRegionDiskRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdateRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    update(request: protos.google.cloud.compute.v1.IUpdateRegionDiskRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IUpdateRegionDiskRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Retrieves the list of persistent disks contained within the specified region.
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
     *   Name of the region for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.cloud.compute.v1.Disk | Disk}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    list(request?: protos.google.cloud.compute.v1.IListRegionDisksRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IDisk[],
        protos.google.cloud.compute.v1.IListRegionDisksRequest | null,
        protos.google.cloud.compute.v1.IDiskList
    ]>;
    list(request: protos.google.cloud.compute.v1.IListRegionDisksRequest, options: CallOptions, callback: PaginationCallback<protos.google.cloud.compute.v1.IListRegionDisksRequest, protos.google.cloud.compute.v1.IDiskList | null | undefined, protos.google.cloud.compute.v1.IDisk>): void;
    list(request: protos.google.cloud.compute.v1.IListRegionDisksRequest, callback: PaginationCallback<protos.google.cloud.compute.v1.IListRegionDisksRequest, protos.google.cloud.compute.v1.IDiskList | null | undefined, protos.google.cloud.compute.v1.IDisk>): void;
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
     *   Name of the region for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.cloud.compute.v1.Disk | Disk} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listStream(request?: protos.google.cloud.compute.v1.IListRegionDisksRequest, options?: CallOptions): Transform;
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
     *   Name of the region for this request.
     * @param {boolean} request.returnPartialSuccess
     *   Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.cloud.compute.v1.Disk | Disk}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/region_disks.list.js</caption>
     * region_tag:compute_v1_generated_RegionDisks_List_async
     */
    listAsync(request?: protos.google.cloud.compute.v1.IListRegionDisksRequest, options?: CallOptions): AsyncIterable<protos.google.cloud.compute.v1.IDisk>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
