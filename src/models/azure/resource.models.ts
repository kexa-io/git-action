import { Disk, VirtualMachine } from "@azure/arm-compute";
import { NetworkSecurityGroup, VirtualNetwork } from "@azure/arm-network";
import { ResourceGroup } from "@azure/arm-resources";

export interface AzureResources {
    'KexaAzure.vm': Array<NetworkSecurityGroup>|null;
    'KexaAzure.mlWorkspaces': Array<any>|null;
    'KexaAzure.mlJobs': Array<any>|null;
    'KexaAzure.mlComputes': Array<any>|null;
    'KexaAzure.mlSchedules': Array<any>|null;
    'KexaAzure.storage': Array<any>|null;
    'KexaAzure.blob': Array<any>|null;
}

export const stringKeys: Array<String> = [
    'KexaAzure.vm',
    'KexaAzure.mlWorkspaces',
    'KexaAzure.mlJobs',
    'KexaAzure.mlComputes',
    'KexaAzure.mlSchedules',
    'KexaAzure.storage',
    'KexaAzure.blob',
];