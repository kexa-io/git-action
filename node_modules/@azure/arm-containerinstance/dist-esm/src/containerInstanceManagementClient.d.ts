import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { ContainerGroups, Operations, Location, Containers, SubnetServiceAssociationLink } from "./operationsInterfaces";
import { ContainerInstanceManagementClientOptionalParams } from "./models";
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
    location: Location;
    containers: Containers;
    subnetServiceAssociationLink: SubnetServiceAssociationLink;
}
//# sourceMappingURL=containerInstanceManagementClient.d.ts.map