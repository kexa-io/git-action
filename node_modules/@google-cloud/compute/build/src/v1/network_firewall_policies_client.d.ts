/// <reference types="node" />
import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  The NetworkFirewallPolicies API.
 * @class
 * @memberof v1
 */
export declare class NetworkFirewallPoliciesClient {
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
    networkFirewallPoliciesStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of NetworkFirewallPoliciesClient.
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
     *     const client = new NetworkFirewallPoliciesClient({fallback: 'rest'}, gax);
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
     * Inserts an association for the specified firewall policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {google.cloud.compute.v1.FirewallPolicyAssociation} request.firewallPolicyAssociationResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {boolean} request.replaceExistingAssociation
     *   Indicates whether or not to replace it if an association of the attachment already exists. This is false by default, in which case an error will be returned if an association already exists.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.add_association.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_AddAssociation_async
     */
    addAssociation(request?: protos.google.cloud.compute.v1.IAddAssociationNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    addAssociation(request: protos.google.cloud.compute.v1.IAddAssociationNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    addAssociation(request: protos.google.cloud.compute.v1.IAddAssociationNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Inserts a rule into a firewall policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {google.cloud.compute.v1.FirewallPolicyRule} request.firewallPolicyRuleResource
     *   The body resource for this request
     * @param {number} request.maxPriority
     *   When rule.priority is not specified, auto choose a unused priority between minPriority and maxPriority>. This field is exclusive with rule.priority.
     * @param {number} request.minPriority
     *   When rule.priority is not specified, auto choose a unused priority between minPriority and maxPriority>. This field is exclusive with rule.priority.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.add_rule.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_AddRule_async
     */
    addRule(request?: protos.google.cloud.compute.v1.IAddRuleNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    addRule(request: protos.google.cloud.compute.v1.IAddRuleNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    addRule(request: protos.google.cloud.compute.v1.IAddRuleNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IAddRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Copies rules to the specified firewall policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.requestId
     *   An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
     * @param {string} request.sourceFirewallPolicy
     *   The firewall policy from which to copy rules.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.clone_rules.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_CloneRules_async
     */
    cloneRules(request?: protos.google.cloud.compute.v1.ICloneRulesNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    cloneRules(request: protos.google.cloud.compute.v1.ICloneRulesNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ICloneRulesNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    cloneRules(request: protos.google.cloud.compute.v1.ICloneRulesNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.ICloneRulesNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes the specified policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to delete.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.delete.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_Delete_async
     */
    delete(request?: protos.google.cloud.compute.v1.IDeleteNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    delete(request: protos.google.cloud.compute.v1.IDeleteNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    delete(request: protos.google.cloud.compute.v1.IDeleteNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IDeleteNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns the specified network firewall policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to get.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.FirewallPolicy | FirewallPolicy}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.get.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_Get_async
     */
    get(request?: protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IFirewallPolicy,
        (protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    get(request: protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicy, protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    get(request: protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicy, protos.google.cloud.compute.v1.IGetNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets an association with the specified name.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to which the queried association belongs.
     * @param {string} request.name
     *   The name of the association to get from the firewall policy.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.FirewallPolicyAssociation | FirewallPolicyAssociation}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.get_association.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_GetAssociation_async
     */
    getAssociation(request?: protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IFirewallPolicyAssociation,
        (protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    getAssociation(request: protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicyAssociation, protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    getAssociation(request: protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicyAssociation, protos.google.cloud.compute.v1.IGetAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets the access control policy for a resource. May be empty if no such policy or resource exists.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {number} request.optionsRequestedPolicyVersion
     *   Requested IAM Policy version.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.resource
     *   Name or id of the resource for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Policy | Policy}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.get_iam_policy.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_GetIamPolicy_async
     */
    getIamPolicy(request?: protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        (protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    getIamPolicy(request: protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.IGetIamPolicyNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets a rule of the specified priority.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to which the queried rule belongs.
     * @param {number} request.priority
     *   The priority of the rule to get from the firewall policy.
     * @param {string} request.project
     *   Project ID for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.FirewallPolicyRule | FirewallPolicyRule}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.get_rule.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_GetRule_async
     */
    getRule(request?: protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IFirewallPolicyRule,
        (protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    getRule(request: protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicyRule, protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    getRule(request: protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IFirewallPolicyRule, protos.google.cloud.compute.v1.IGetRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a new policy in the specified project using the data included in the request.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.FirewallPolicy} request.firewallPolicyResource
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.insert.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_Insert_async
     */
    insert(request?: protos.google.cloud.compute.v1.IInsertNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    insert(request: protos.google.cloud.compute.v1.IInsertNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    insert(request: protos.google.cloud.compute.v1.IInsertNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IInsertNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Patches the specified policy with the data included in the request.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {google.cloud.compute.v1.FirewallPolicy} request.firewallPolicyResource
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.patch.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_Patch_async
     */
    patch(request?: protos.google.cloud.compute.v1.IPatchNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    patch(request: protos.google.cloud.compute.v1.IPatchNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    patch(request: protos.google.cloud.compute.v1.IPatchNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Patches a rule of the specified priority.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {google.cloud.compute.v1.FirewallPolicyRule} request.firewallPolicyRuleResource
     *   The body resource for this request
     * @param {number} request.priority
     *   The priority of the rule to patch.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.patch_rule.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_PatchRule_async
     */
    patchRule(request?: protos.google.cloud.compute.v1.IPatchRuleNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    patchRule(request: protos.google.cloud.compute.v1.IPatchRuleNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    patchRule(request: protos.google.cloud.compute.v1.IPatchRuleNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IPatchRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Removes an association for the specified firewall policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {string} request.name
     *   Name for the attachment that will be removed.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.remove_association.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_RemoveAssociation_async
     */
    removeAssociation(request?: protos.google.cloud.compute.v1.IRemoveAssociationNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    removeAssociation(request: protos.google.cloud.compute.v1.IRemoveAssociationNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    removeAssociation(request: protos.google.cloud.compute.v1.IRemoveAssociationNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveAssociationNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes a rule of the specified priority.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.firewallPolicy
     *   Name of the firewall policy to update.
     * @param {number} request.priority
     *   The priority of the rule to remove from the firewall policy.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.remove_rule.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_RemoveRule_async
     */
    removeRule(request?: protos.google.cloud.compute.v1.IRemoveRuleNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.cloud.compute.v1.IOperation, null>,
        protos.google.cloud.compute.v1.IOperation | undefined,
        {} | undefined
    ]>;
    removeRule(request: protos.google.cloud.compute.v1.IRemoveRuleNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    removeRule(request: protos.google.cloud.compute.v1.IRemoveRuleNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IOperation, protos.google.cloud.compute.v1.IRemoveRuleNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Sets the access control policy on the specified resource. Replaces any existing policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.cloud.compute.v1.GlobalSetPolicyRequest} request.globalSetPolicyRequestResource
     *   The body resource for this request
     * @param {string} request.project
     *   Project ID for this request.
     * @param {string} request.resource
     *   Name or id of the resource for this request.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.compute.v1.Policy | Policy}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.set_iam_policy.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_SetIamPolicy_async
     */
    setIamPolicy(request?: protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IPolicy,
        (protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    setIamPolicy(request: protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.IPolicy, protos.google.cloud.compute.v1.ISetIamPolicyNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns permissions that a caller has on the specified resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.project
     *   Project ID for this request.
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
     * @example <caption>include:samples/generated/v1/network_firewall_policies.test_iam_permissions.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_TestIamPermissions_async
     */
    testIamPermissions(request?: protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.ITestPermissionsResponse,
        (protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest | undefined),
        {} | undefined
    ]>;
    testIamPermissions(request: protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest, options: CallOptions, callback: Callback<protos.google.cloud.compute.v1.ITestPermissionsResponse, protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    testIamPermissions(request: protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest, callback: Callback<protos.google.cloud.compute.v1.ITestPermissionsResponse, protos.google.cloud.compute.v1.ITestIamPermissionsNetworkFirewallPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Lists all the policies that have been configured for the specified project.
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
     *   The first element of the array is Array of {@link google.cloud.compute.v1.FirewallPolicy | FirewallPolicy}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    list(request?: protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, options?: CallOptions): Promise<[
        protos.google.cloud.compute.v1.IFirewallPolicy[],
        protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest | null,
        protos.google.cloud.compute.v1.IFirewallPolicyList
    ]>;
    list(request: protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, options: CallOptions, callback: PaginationCallback<protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, protos.google.cloud.compute.v1.IFirewallPolicyList | null | undefined, protos.google.cloud.compute.v1.IFirewallPolicy>): void;
    list(request: protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, callback: PaginationCallback<protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, protos.google.cloud.compute.v1.IFirewallPolicyList | null | undefined, protos.google.cloud.compute.v1.IFirewallPolicy>): void;
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
     *   An object stream which emits an object representing {@link google.cloud.compute.v1.FirewallPolicy | FirewallPolicy} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listStream(request?: protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, options?: CallOptions): Transform;
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
     *   {@link google.cloud.compute.v1.FirewallPolicy | FirewallPolicy}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/network_firewall_policies.list.js</caption>
     * region_tag:compute_v1_generated_NetworkFirewallPolicies_List_async
     */
    listAsync(request?: protos.google.cloud.compute.v1.IListNetworkFirewallPoliciesRequest, options?: CallOptions): AsyncIterable<protos.google.cloud.compute.v1.IFirewallPolicy>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
