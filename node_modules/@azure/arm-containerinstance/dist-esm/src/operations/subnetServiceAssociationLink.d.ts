import { SubnetServiceAssociationLink } from "../operationsInterfaces";
import { ContainerInstanceManagementClient } from "../containerInstanceManagementClient";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SubnetServiceAssociationLinkDeleteOptionalParams } from "../models";
/** Class containing SubnetServiceAssociationLink operations. */
export declare class SubnetServiceAssociationLinkImpl implements SubnetServiceAssociationLink {
    private readonly client;
    /**
     * Initialize a new instance of the class SubnetServiceAssociationLink class.
     * @param client Reference to the service client
     */
    constructor(client: ContainerInstanceManagementClient);
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
//# sourceMappingURL=subnetServiceAssociationLink.d.ts.map