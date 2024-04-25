"use strict";
/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *	- ResourceManagementClient.operations
    *	- ResourceManagementClient.deployments
    *	- ResourceManagementClient.providers
    *	- ResourceManagementClient.providerResourceTypes
    *	- ResourceManagementClient.resources
    *	- ResourceManagementClient.resourceGroups
    *	- ResourceManagementClient.tagsOperations
    *	- ResourceManagementClient.deploymentOperations
    *	- SubscriptionClient.operations
    *	- SubscriptionClient.subscriptions
    *	- SubscriptionClient.tenants
    *	- SqlManagementClient.dataMaskingPolicies
    *	- SqlManagementClient.dataMaskingRules
    *	- SqlManagementClient.geoBackupPolicies
    *	- SqlManagementClient.databases
    *	- SqlManagementClient.elasticPools
    *	- SqlManagementClient.serverCommunicationLinks
    *	- SqlManagementClient.serviceObjectives
    *	- SqlManagementClient.elasticPoolActivities
    *	- SqlManagementClient.elasticPoolDatabaseActivities
    *	- SqlManagementClient.serverUsages
    *	- SqlManagementClient.databaseAdvisors
    *	- SqlManagementClient.databaseAutomaticTuningOperations
    *	- SqlManagementClient.databaseColumns
    *	- SqlManagementClient.databaseRecommendedActions
    *	- SqlManagementClient.databaseSchemas
    *	- SqlManagementClient.databaseSecurityAlertPolicies
    *	- SqlManagementClient.databaseTables
    *	- SqlManagementClient.databaseVulnerabilityAssessmentRuleBaselines
    *	- SqlManagementClient.databaseVulnerabilityAssessments
    *	- SqlManagementClient.databaseVulnerabilityAssessmentScans
    *	- SqlManagementClient.dataWarehouseUserActivitiesOperations
    *	- SqlManagementClient.deletedServers
    *	- SqlManagementClient.elasticPoolOperations
    *	- SqlManagementClient.encryptionProtectors
    *	- SqlManagementClient.failoverGroups
    *	- SqlManagementClient.firewallRules
    *	- SqlManagementClient.instancePools
    *	- SqlManagementClient.jobAgents
    *	- SqlManagementClient.jobCredentials
    *	- SqlManagementClient.jobExecutions
    *	- SqlManagementClient.jobs
    *	- SqlManagementClient.jobStepExecutions
    *	- SqlManagementClient.jobSteps
    *	- SqlManagementClient.jobTargetExecutions
    *	- SqlManagementClient.jobTargetGroups
    *	- SqlManagementClient.jobVersions
    *	- SqlManagementClient.capabilities
    *	- SqlManagementClient.longTermRetentionPolicies
    *	- SqlManagementClient.maintenanceWindowOptionsOperations
    *	- SqlManagementClient.maintenanceWindowsOperations
    *	- SqlManagementClient.managedBackupShortTermRetentionPolicies
    *	- SqlManagementClient.managedDatabaseColumns
    *	- SqlManagementClient.managedDatabaseQueries
    *	- SqlManagementClient.managedDatabaseSchemas
    *	- SqlManagementClient.managedDatabaseSecurityAlertPolicies
    *	- SqlManagementClient.managedDatabaseSecurityEvents
    *	- SqlManagementClient.managedDatabaseTables
    *	- SqlManagementClient.managedDatabaseTransparentDataEncryption
    *	- SqlManagementClient.managedDatabaseVulnerabilityAssessmentRuleBaselines
    *	- SqlManagementClient.managedDatabaseVulnerabilityAssessments
    *	- SqlManagementClient.managedDatabaseVulnerabilityAssessmentScans
    *	- SqlManagementClient.managedInstanceAdministrators
    *	- SqlManagementClient.managedInstanceAzureADOnlyAuthentications
    *	- SqlManagementClient.managedInstanceEncryptionProtectors
    *	- SqlManagementClient.managedInstanceKeys
    *	- SqlManagementClient.managedInstanceLongTermRetentionPolicies
    *	- SqlManagementClient.managedInstanceOperations
    *	- SqlManagementClient.managedInstancePrivateEndpointConnections
    *	- SqlManagementClient.managedInstancePrivateLinkResources
    *	- SqlManagementClient.managedInstanceTdeCertificates
    *	- SqlManagementClient.managedInstanceVulnerabilityAssessments
    *	- SqlManagementClient.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies
    *	- SqlManagementClient.managedServerSecurityAlertPolicies
    *	- SqlManagementClient.operations
    *	- SqlManagementClient.privateEndpointConnections
    *	- SqlManagementClient.privateLinkResources
    *	- SqlManagementClient.recoverableManagedDatabases
    *	- SqlManagementClient.restorePoints
    *	- SqlManagementClient.serverAdvisors
    *	- SqlManagementClient.serverAutomaticTuningOperations
    *	- SqlManagementClient.serverAzureADAdministrators
    *	- SqlManagementClient.serverAzureADOnlyAuthentications
    *	- SqlManagementClient.serverDevOpsAuditSettings
    *	- SqlManagementClient.serverDnsAliases
    *	- SqlManagementClient.serverKeys
    *	- SqlManagementClient.serverOperations
    *	- SqlManagementClient.serverSecurityAlertPolicies
    *	- SqlManagementClient.serverTrustGroups
    *	- SqlManagementClient.serverVulnerabilityAssessments
    *	- SqlManagementClient.sqlAgent
    *	- SqlManagementClient.subscriptionUsages
    *	- SqlManagementClient.syncAgents
    *	- SqlManagementClient.syncGroups
    *	- SqlManagementClient.syncMembers
    *	- SqlManagementClient.tdeCertificates
    *	- SqlManagementClient.timeZones
    *	- SqlManagementClient.virtualNetworkRules
    *	- SqlManagementClient.workloadClassifiers
    *	- SqlManagementClient.workloadGroups
    *	- SqlManagementClient.backupShortTermRetentionPolicies
    *	- SqlManagementClient.databaseExtensionsOperations
    *	- SqlManagementClient.databaseOperations
    *	- SqlManagementClient.databaseUsages
    *	- SqlManagementClient.ledgerDigestUploadsOperations
    *	- SqlManagementClient.outboundFirewallRules
    *	- SqlManagementClient.usages
    *	- SqlManagementClient.longTermRetentionBackups
    *	- SqlManagementClient.longTermRetentionManagedInstanceBackups
    *	- SqlManagementClient.restorableDroppedManagedDatabases
    *	- SqlManagementClient.serverConnectionPolicies
    *	- SqlManagementClient.distributedAvailabilityGroups
    *	- SqlManagementClient.serverTrustCertificates
    *	- SqlManagementClient.iPv6FirewallRules
    *	- SqlManagementClient.endpointCertificates
    *	- SqlManagementClient.managedDatabaseSensitivityLabels
    *	- SqlManagementClient.managedDatabaseRecommendedSensitivityLabels
    *	- SqlManagementClient.sensitivityLabels
    *	- SqlManagementClient.recommendedSensitivityLabels
    *	- SqlManagementClient.serverBlobAuditingPolicies
    *	- SqlManagementClient.databaseBlobAuditingPolicies
    *	- SqlManagementClient.extendedDatabaseBlobAuditingPolicies
    *	- SqlManagementClient.extendedServerBlobAuditingPolicies
    *	- SqlManagementClient.databaseAdvancedThreatProtectionSettings
    *	- SqlManagementClient.serverAdvancedThreatProtectionSettings
    *	- SqlManagementClient.managedServerDnsAliases
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentBaselines
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentExecuteScan
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentRuleBaselines
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentScanResult
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentScans
    *	- SqlManagementClient.databaseSqlVulnerabilityAssessmentsSettings
    *	- SqlManagementClient.managedDatabaseAdvancedThreatProtectionSettings
    *	- SqlManagementClient.managedInstanceAdvancedThreatProtectionSettings
    *	- SqlManagementClient.replicationLinks
    *	- SqlManagementClient.sqlVulnerabilityAssessmentBaseline
    *	- SqlManagementClient.sqlVulnerabilityAssessmentBaselines
    *	- SqlManagementClient.sqlVulnerabilityAssessmentExecuteScan
    *	- SqlManagementClient.sqlVulnerabilityAssessmentRuleBaseline
    *	- SqlManagementClient.sqlVulnerabilityAssessmentRuleBaselines
    *	- SqlManagementClient.sqlVulnerabilityAssessmentScanResult
    *	- SqlManagementClient.sqlVulnerabilityAssessmentScans
    *	- SqlManagementClient.sqlVulnerabilityAssessmentsSettings
    *	- SqlManagementClient.sqlVulnerabilityAssessments
    *	- SqlManagementClient.managedDatabaseMoveOperations
    *	- SqlManagementClient.managedInstanceDtcs
    *	- SqlManagementClient.synapseLinkWorkspaces
    *	- SqlManagementClient.virtualClusters
    *	- SqlManagementClient.instanceFailoverGroups
    *	- SqlManagementClient.managedDatabaseRestoreDetails
    *	- SqlManagementClient.managedDatabases
    *	- SqlManagementClient.databaseEncryptionProtectors
    *	- SqlManagementClient.managedInstances
    *	- SqlManagementClient.managedLedgerDigestUploadsOperations
    *	- SqlManagementClient.recoverableDatabases
    *	- SqlManagementClient.restorableDroppedDatabases
    *	- SqlManagementClient.serverConfigurationOptions
    *	- SqlManagementClient.servers
    *	- SqlManagementClient.startStopManagedInstanceSchedules
    *	- SqlManagementClient.transparentDataEncryptions
    *	- StorageManagementClient.operations
    *	- StorageManagementClient.skus
    *	- StorageManagementClient.storageAccounts
    *	- StorageManagementClient.deletedAccounts
    *	- StorageManagementClient.usages
    *	- StorageManagementClient.managementPolicies
    *	- StorageManagementClient.blobInventoryPolicies
    *	- StorageManagementClient.privateEndpointConnections
    *	- StorageManagementClient.privateLinkResources
    *	- StorageManagementClient.objectReplicationPoliciesOperations
    *	- StorageManagementClient.localUsersOperations
    *	- StorageManagementClient.encryptionScopes
    *	- StorageManagementClient.blobServices
    *	- StorageManagementClient.blobContainers
    *	- StorageManagementClient.fileServices
    *	- StorageManagementClient.fileShares
    *	- StorageManagementClient.queueServices
    *	- StorageManagementClient.queue
    *	- StorageManagementClient.tableServices
    *	- StorageManagementClient.tableOperations
    *	- WebSiteManagementClient.appServiceCertificateOrders
    *	- WebSiteManagementClient.certificateOrdersDiagnostics
    *	- WebSiteManagementClient.certificateRegistrationProvider
    *	- WebSiteManagementClient.domains
    *	- WebSiteManagementClient.topLevelDomains
    *	- WebSiteManagementClient.domainRegistrationProvider
    *	- WebSiteManagementClient.appServiceEnvironments
    *	- WebSiteManagementClient.appServicePlans
    *	- WebSiteManagementClient.certificates
    *	- WebSiteManagementClient.containerApps
    *	- WebSiteManagementClient.containerAppsRevisions
    *	- WebSiteManagementClient.deletedWebApps
    *	- WebSiteManagementClient.diagnostics
    *	- WebSiteManagementClient.global
    *	- WebSiteManagementClient.kubeEnvironments
    *	- WebSiteManagementClient.provider
    *	- WebSiteManagementClient.recommendations
    *	- WebSiteManagementClient.resourceHealthMetadataOperations
    *	- WebSiteManagementClient.getUsagesInLocation
    *	- WebSiteManagementClient.staticSites
    *	- WebSiteManagementClient.webApps
    *	- WebSiteManagementClient.workflows
    *	- WebSiteManagementClient.workflowRuns
    *	- WebSiteManagementClient.workflowRunActions
    *	- WebSiteManagementClient.workflowRunActionRepetitions
    *	- WebSiteManagementClient.workflowRunActionRepetitionsRequestHistories
    *	- WebSiteManagementClient.workflowRunActionScopeRepetitions
    *	- WebSiteManagementClient.workflowTriggers
    *	- WebSiteManagementClient.workflowTriggerHistories
    *	- WebSiteManagementClient.workflowVersions
    *	- MonitorClient.autoscaleSettings
    *	- MonitorClient.operations
    *	- MonitorClient.alertRuleIncidents
    *	- MonitorClient.alertRules
    *	- MonitorClient.logProfiles
    *	- MonitorClient.diagnosticSettings
    *	- MonitorClient.diagnosticSettingsCategory
    *	- MonitorClient.actionGroups
    *	- MonitorClient.activityLogs
    *	- MonitorClient.eventCategories
    *	- MonitorClient.tenantActivityLogs
    *	- MonitorClient.metricDefinitions
    *	- MonitorClient.metrics
    *	- MonitorClient.baselines
    *	- MonitorClient.metricAlerts
    *	- MonitorClient.metricAlertsStatus
    *	- MonitorClient.scheduledQueryRules
    *	- MonitorClient.metricNamespaces
    *	- MonitorClient.vMInsights
    *	- MonitorClient.privateLinkScopes
    *	- MonitorClient.privateLinkScopeOperationStatus
    *	- MonitorClient.privateLinkResources
    *	- MonitorClient.privateEndpointConnections
    *	- MonitorClient.privateLinkScopedResources
    *	- MonitorClient.activityLogAlerts
    *	- MonitorClient.dataCollectionEndpoints
    *	- MonitorClient.dataCollectionRuleAssociations
    *	- MonitorClient.dataCollectionRules
    *	- ServiceBusManagementClient.namespaces
    *	- ServiceBusManagementClient.privateEndpointConnections
    *	- ServiceBusManagementClient.privateLinkResources
    *	- ServiceBusManagementClient.operations
    *	- ServiceBusManagementClient.disasterRecoveryConfigs
    *	- ServiceBusManagementClient.migrationConfigs
    *	- ServiceBusManagementClient.queues
    *	- ServiceBusManagementClient.topics
    *	- ServiceBusManagementClient.rules
    *	- ServiceBusManagementClient.subscriptions
    *	- KeyVaultManagementClient.keys
    *	- KeyVaultManagementClient.managedHsmKeys
    *	- KeyVaultManagementClient.vaults
    *	- KeyVaultManagementClient.privateEndpointConnections
    *	- KeyVaultManagementClient.privateLinkResources
    *	- KeyVaultManagementClient.managedHsms
    *	- KeyVaultManagementClient.mhsmPrivateEndpointConnections
    *	- KeyVaultManagementClient.mhsmPrivateLinkResources
    *	- KeyVaultManagementClient.mhsmRegions
    *	- KeyVaultManagementClient.operations
    *	- KeyVaultManagementClient.secrets
    *	- ComputeManagementClient.operations
    *	- ComputeManagementClient.usageOperations
    *	- ComputeManagementClient.virtualMachineSizes
    *	- ComputeManagementClient.virtualMachineScaleSets
    *	- ComputeManagementClient.virtualMachineScaleSetExtensions
    *	- ComputeManagementClient.virtualMachineScaleSetRollingUpgrades
    *	- ComputeManagementClient.virtualMachineScaleSetVMExtensions
    *	- ComputeManagementClient.virtualMachineScaleSetVMs
    *	- ComputeManagementClient.virtualMachineExtensions
    *	- ComputeManagementClient.virtualMachines
    *	- ComputeManagementClient.virtualMachineImages
    *	- ComputeManagementClient.virtualMachineImagesEdgeZone
    *	- ComputeManagementClient.virtualMachineExtensionImages
    *	- ComputeManagementClient.availabilitySets
    *	- ComputeManagementClient.proximityPlacementGroups
    *	- ComputeManagementClient.dedicatedHostGroups
    *	- ComputeManagementClient.dedicatedHosts
    *	- ComputeManagementClient.sshPublicKeys
    *	- ComputeManagementClient.images
    *	- ComputeManagementClient.restorePointCollections
    *	- ComputeManagementClient.restorePoints
    *	- ComputeManagementClient.capacityReservationGroups
    *	- ComputeManagementClient.capacityReservations
    *	- ComputeManagementClient.logAnalytics
    *	- ComputeManagementClient.virtualMachineRunCommands
    *	- ComputeManagementClient.virtualMachineScaleSetVMRunCommands
    *	- ComputeManagementClient.disks
    *	- ComputeManagementClient.diskAccesses
    *	- ComputeManagementClient.diskEncryptionSets
    *	- ComputeManagementClient.diskRestorePointOperations
    *	- ComputeManagementClient.snapshots
    *	- ComputeManagementClient.resourceSkus
    *	- ComputeManagementClient.galleries
    *	- ComputeManagementClient.galleryImages
    *	- ComputeManagementClient.galleryImageVersions
    *	- ComputeManagementClient.galleryApplications
    *	- ComputeManagementClient.galleryApplicationVersions
    *	- ComputeManagementClient.gallerySharingProfile
    *	- ComputeManagementClient.sharedGalleries
    *	- ComputeManagementClient.sharedGalleryImages
    *	- ComputeManagementClient.sharedGalleryImageVersions
    *	- ComputeManagementClient.communityGalleries
    *	- ComputeManagementClient.communityGalleryImages
    *	- ComputeManagementClient.communityGalleryImageVersions
    *	- ComputeManagementClient.cloudServiceRoleInstances
    *	- ComputeManagementClient.cloudServiceRoles
    *	- ComputeManagementClient.cloudServices
    *	- ComputeManagementClient.cloudServicesUpdateDomain
    *	- ComputeManagementClient.cloudServiceOperatingSystems
    *	- EventHubManagementClient.clusters
    *	- EventHubManagementClient.configuration
    *	- EventHubManagementClient.namespaces
    *	- EventHubManagementClient.privateEndpointConnections
    *	- EventHubManagementClient.privateLinkResources
    *	- EventHubManagementClient.operations
    *	- EventHubManagementClient.eventHubs
    *	- EventHubManagementClient.disasterRecoveryConfigs
    *	- EventHubManagementClient.consumerGroups
    *	- EventHubManagementClient.schemaRegistry
    *	- RedisManagementClient.operations
    *	- RedisManagementClient.redis
    *	- RedisManagementClient.firewallRules
    *	- RedisManagementClient.patchSchedules
    *	- RedisManagementClient.linkedServer
    *	- RedisManagementClient.privateEndpointConnections
    *	- RedisManagementClient.privateLinkResources
    *	- RedisManagementClient.asyncOperationStatus
    *	- RedisManagementClient.accessPolicy
    *	- RedisManagementClient.accessPolicyAssignment
    *	- PostgreSQLManagementClient.servers
    *	- PostgreSQLManagementClient.replicas
    *	- PostgreSQLManagementClient.firewallRules
    *	- PostgreSQLManagementClient.virtualNetworkRules
    *	- PostgreSQLManagementClient.databases
    *	- PostgreSQLManagementClient.configurations
    *	- PostgreSQLManagementClient.serverParameters
    *	- PostgreSQLManagementClient.logFiles
    *	- PostgreSQLManagementClient.serverAdministrators
    *	- PostgreSQLManagementClient.recoverableServers
    *	- PostgreSQLManagementClient.serverBasedPerformanceTier
    *	- PostgreSQLManagementClient.locationBasedPerformanceTier
    *	- PostgreSQLManagementClient.checkNameAvailability
    *	- PostgreSQLManagementClient.operations
    *	- PostgreSQLManagementClient.serverSecurityAlertPolicies
    *	- PostgreSQLManagementClient.privateEndpointConnections
    *	- PostgreSQLManagementClient.privateLinkResources
    *	- PostgreSQLManagementClient.serverKeys
    *	- AzureMapsManagementClient.accounts
    *	- AzureMapsManagementClient.maps
    *	- AzureMapsManagementClient.creators
    *	- MariaDBManagementClient.servers
    *	- MariaDBManagementClient.replicas
    *	- MariaDBManagementClient.firewallRules
    *	- MariaDBManagementClient.virtualNetworkRules
    *	- MariaDBManagementClient.databases
    *	- MariaDBManagementClient.configurations
    *	- MariaDBManagementClient.serverParameters
    *	- MariaDBManagementClient.logFiles
    *	- MariaDBManagementClient.recoverableServers
    *	- MariaDBManagementClient.serverBasedPerformanceTier
    *	- MariaDBManagementClient.locationBasedPerformanceTier
    *	- MariaDBManagementClient.checkNameAvailability
    *	- MariaDBManagementClient.operations
    *	- MariaDBManagementClient.queryTexts
    *	- MariaDBManagementClient.topQueryStatistics
    *	- MariaDBManagementClient.waitStatistics
    *	- MariaDBManagementClient.advisors
    *	- MariaDBManagementClient.recommendedActions
    *	- MariaDBManagementClient.locationBasedRecommendedActionSessionsOperationStatus
    *	- MariaDBManagementClient.locationBasedRecommendedActionSessionsResult
    *	- MariaDBManagementClient.privateEndpointConnections
    *	- MariaDBManagementClient.privateLinkResources
    *	- MariaDBManagementClient.serverSecurityAlertPolicies
    *	- ContainerServiceClient.operations
    *	- ContainerServiceClient.managedClusters
    *	- ContainerServiceClient.maintenanceConfigurations
    *	- ContainerServiceClient.agentPools
    *	- ContainerServiceClient.privateEndpointConnections
    *	- ContainerServiceClient.privateLinkResources
    *	- ContainerServiceClient.resolvePrivateLinkServiceId
    *	- ContainerServiceClient.snapshots
    *	- ContainerServiceClient.trustedAccessRoleBindings
    *	- ContainerServiceClient.trustedAccessRoles
    *	- ContainerRegistryManagementClient.registries
    *	- ContainerRegistryManagementClient.operations
    *	- ContainerRegistryManagementClient.privateEndpointConnections
    *	- ContainerRegistryManagementClient.replications
    *	- ContainerRegistryManagementClient.scopeMaps
    *	- ContainerRegistryManagementClient.tokens
    *	- ContainerRegistryManagementClient.webhooks
    *	- ContainerRegistryManagementClient.agentPools
    *	- ContainerRegistryManagementClient.runs
    *	- ContainerRegistryManagementClient.taskRuns
    *	- ContainerRegistryManagementClient.tasks
    *	- CosmosDBManagementClient.databaseAccounts
    *	- CosmosDBManagementClient.operations
    *	- CosmosDBManagementClient.database
    *	- CosmosDBManagementClient.collection
    *	- CosmosDBManagementClient.collectionRegion
    *	- CosmosDBManagementClient.databaseAccountRegion
    *	- CosmosDBManagementClient.percentileSourceTarget
    *	- CosmosDBManagementClient.percentileTarget
    *	- CosmosDBManagementClient.percentile
    *	- CosmosDBManagementClient.collectionPartitionRegion
    *	- CosmosDBManagementClient.collectionPartition
    *	- CosmosDBManagementClient.partitionKeyRangeId
    *	- CosmosDBManagementClient.partitionKeyRangeIdRegion
    *	- CosmosDBManagementClient.sqlResources
    *	- CosmosDBManagementClient.mongoDBResources
    *	- CosmosDBManagementClient.tableResources
    *	- CosmosDBManagementClient.cassandraResources
    *	- CosmosDBManagementClient.gremlinResources
    *	- CosmosDBManagementClient.locations
    *	- CosmosDBManagementClient.cassandraClusters
    *	- CosmosDBManagementClient.cassandraDataCenters
    *	- CosmosDBManagementClient.notebookWorkspaces
    *	- CosmosDBManagementClient.privateEndpointConnections
    *	- CosmosDBManagementClient.privateLinkResources
    *	- CosmosDBManagementClient.restorableDatabaseAccounts
    *	- CosmosDBManagementClient.restorableSqlDatabases
    *	- CosmosDBManagementClient.restorableSqlContainers
    *	- CosmosDBManagementClient.restorableSqlResources
    *	- CosmosDBManagementClient.restorableMongodbDatabases
    *	- CosmosDBManagementClient.restorableMongodbCollections
    *	- CosmosDBManagementClient.restorableMongodbResources
    *	- CosmosDBManagementClient.restorableGremlinDatabases
    *	- CosmosDBManagementClient.restorableGremlinGraphs
    *	- CosmosDBManagementClient.restorableGremlinResources
    *	- CosmosDBManagementClient.restorableTables
    *	- CosmosDBManagementClient.restorableTableResources
    *	- CosmosDBManagementClient.service
    *	- StreamAnalyticsManagementClient.operations
    *	- StreamAnalyticsManagementClient.streamingJobs
    *	- StreamAnalyticsManagementClient.inputs
    *	- StreamAnalyticsManagementClient.outputs
    *	- StreamAnalyticsManagementClient.transformations
    *	- StreamAnalyticsManagementClient.functions
    *	- StreamAnalyticsManagementClient.subscriptions
    *	- StreamAnalyticsManagementClient.clusters
    *	- StreamAnalyticsManagementClient.privateEndpoints
    *	- ConsumptionManagementClient.usageDetails
    *	- ConsumptionManagementClient.marketplaces
    *	- ConsumptionManagementClient.budgets
    *	- ConsumptionManagementClient.tags
    *	- ConsumptionManagementClient.charges
    *	- ConsumptionManagementClient.balances
    *	- ConsumptionManagementClient.reservationsSummaries
    *	- ConsumptionManagementClient.reservationsDetails
    *	- ConsumptionManagementClient.reservationRecommendations
    *	- ConsumptionManagementClient.reservationRecommendationDetails
    *	- ConsumptionManagementClient.reservationTransactions
    *	- ConsumptionManagementClient.priceSheet
    *	- ConsumptionManagementClient.operations
    *	- ConsumptionManagementClient.aggregatedCost
    *	- ConsumptionManagementClient.eventsOperations
    *	- ConsumptionManagementClient.lotsOperations
    *	- ConsumptionManagementClient.credits
    *	- RecoveryServicesBackupClient.backupResourceStorageConfigsNonCRR
    *	- RecoveryServicesBackupClient.protectionIntentOperations
    *	- RecoveryServicesBackupClient.backupStatus
    *	- RecoveryServicesBackupClient.featureSupport
    *	- RecoveryServicesBackupClient.backupProtectionIntent
    *	- RecoveryServicesBackupClient.backupUsageSummaries
    *	- RecoveryServicesBackupClient.operations
    *	- RecoveryServicesBackupClient.backupResourceVaultConfigs
    *	- RecoveryServicesBackupClient.backupResourceEncryptionConfigs
    *	- RecoveryServicesBackupClient.privateEndpointConnectionOperations
    *	- RecoveryServicesBackupClient.privateEndpointOperations
    *	- RecoveryServicesBackupClient.bMSPrepareDataMoveOperationResult
    *	- RecoveryServicesBackupClient.protectedItems
    *	- RecoveryServicesBackupClient.protectedItemOperationResults
    *	- RecoveryServicesBackupClient.recoveryPoints
    *	- RecoveryServicesBackupClient.restores
    *	- RecoveryServicesBackupClient.backupPolicies
    *	- RecoveryServicesBackupClient.protectionPolicies
    *	- RecoveryServicesBackupClient.protectionPolicyOperationResults
    *	- RecoveryServicesBackupClient.backupJobs
    *	- RecoveryServicesBackupClient.jobDetails
    *	- RecoveryServicesBackupClient.jobCancellations
    *	- RecoveryServicesBackupClient.jobOperationResults
    *	- RecoveryServicesBackupClient.exportJobsOperationResults
    *	- RecoveryServicesBackupClient.jobs
    *	- RecoveryServicesBackupClient.backupProtectedItems
    *	- RecoveryServicesBackupClient.operation
    *	- RecoveryServicesBackupClient.validateOperation
    *	- RecoveryServicesBackupClient.validateOperationResults
    *	- RecoveryServicesBackupClient.validateOperationStatuses
    *	- RecoveryServicesBackupClient.backupEngines
    *	- RecoveryServicesBackupClient.protectionContainerRefreshOperationResults
    *	- RecoveryServicesBackupClient.protectableContainers
    *	- RecoveryServicesBackupClient.protectionContainers
    *	- RecoveryServicesBackupClient.backupWorkloadItems
    *	- RecoveryServicesBackupClient.protectionContainerOperationResults
    *	- RecoveryServicesBackupClient.backups
    *	- RecoveryServicesBackupClient.protectedItemOperationStatuses
    *	- RecoveryServicesBackupClient.itemLevelRecoveryConnections
    *	- RecoveryServicesBackupClient.backupOperationResults
    *	- RecoveryServicesBackupClient.backupOperationStatuses
    *	- RecoveryServicesBackupClient.protectionPolicyOperationStatuses
    *	- RecoveryServicesBackupClient.backupProtectableItems
    *	- RecoveryServicesBackupClient.backupProtectionContainers
    *	- RecoveryServicesBackupClient.deletedProtectionContainers
    *	- RecoveryServicesBackupClient.securityPINs
    *	- RecoveryServicesBackupClient.recoveryPointsRecommendedForMove
    *	- RecoveryServicesBackupClient.resourceGuardProxies
    *	- RecoveryServicesBackupClient.resourceGuardProxy
    *	- RecoveryServicesBackupClient.fetchTieringCost
    *	- RecoveryServicesBackupClient.getTieringCostOperationResult
    *	- RecoveryServicesBackupClient.tieringCostOperationStatus
    *	- ManagementLockClient.authorizationOperations
    *	- ManagementLockClient.managementLocks
    *	- EventGridManagementClient.channels
    *	- EventGridManagementClient.domains
    *	- EventGridManagementClient.domainTopics
    *	- EventGridManagementClient.topicEventSubscriptions
    *	- EventGridManagementClient.domainEventSubscriptions
    *	- EventGridManagementClient.eventSubscriptions
    *	- EventGridManagementClient.domainTopicEventSubscriptions
    *	- EventGridManagementClient.systemTopicEventSubscriptions
    *	- EventGridManagementClient.partnerTopicEventSubscriptions
    *	- EventGridManagementClient.operations
    *	- EventGridManagementClient.topics
    *	- EventGridManagementClient.partnerConfigurations
    *	- EventGridManagementClient.partnerNamespaces
    *	- EventGridManagementClient.partnerRegistrations
    *	- EventGridManagementClient.partnerTopics
    *	- EventGridManagementClient.privateEndpointConnections
    *	- EventGridManagementClient.privateLinkResources
    *	- EventGridManagementClient.systemTopics
    *	- EventGridManagementClient.extensionTopics
    *	- EventGridManagementClient.topicTypes
    *	- EventGridManagementClient.verifiedPartners
    *	- PolicyClient.dataPolicyManifests
    *	- PolicyClient.policyAssignments
    *	- PolicyClient.policyDefinitions
    *	- PolicyClient.policySetDefinitions
    *	- PolicyClient.policyExemptions
    *	- IotCentralClient.apps
    *	- IotCentralClient.operations
    *	- DevTestLabsClient.providerOperations
    *	- DevTestLabsClient.labs
    *	- DevTestLabsClient.operations
    *	- DevTestLabsClient.globalSchedules
    *	- DevTestLabsClient.artifactSources
    *	- DevTestLabsClient.armTemplates
    *	- DevTestLabsClient.artifacts
    *	- DevTestLabsClient.costs
    *	- DevTestLabsClient.customImages
    *	- DevTestLabsClient.formulas
    *	- DevTestLabsClient.galleryImages
    *	- DevTestLabsClient.notificationChannels
    *	- DevTestLabsClient.policySets
    *	- DevTestLabsClient.policies
    *	- DevTestLabsClient.schedules
    *	- DevTestLabsClient.serviceRunners
    *	- DevTestLabsClient.users
    *	- DevTestLabsClient.disks
    *	- DevTestLabsClient.environments
    *	- DevTestLabsClient.secrets
    *	- DevTestLabsClient.serviceFabrics
    *	- DevTestLabsClient.serviceFabricSchedules
    *	- DevTestLabsClient.virtualMachines
    *	- DevTestLabsClient.virtualMachineSchedules
    *	- DevTestLabsClient.virtualNetworks
    *	- LogicManagementClient.workflows
    *	- LogicManagementClient.workflowVersions
    *	- LogicManagementClient.workflowTriggers
    *	- LogicManagementClient.workflowVersionTriggers
    *	- LogicManagementClient.workflowTriggerHistories
    *	- LogicManagementClient.workflowRuns
    *	- LogicManagementClient.workflowRunActions
    *	- LogicManagementClient.workflowRunActionRepetitions
    *	- LogicManagementClient.workflowRunActionRepetitionsRequestHistories
    *	- LogicManagementClient.workflowRunActionRequestHistories
    *	- LogicManagementClient.workflowRunActionScopeRepetitions
    *	- LogicManagementClient.workflowRunOperations
    *	- LogicManagementClient.integrationAccounts
    *	- LogicManagementClient.integrationAccountAssemblies
    *	- LogicManagementClient.integrationAccountBatchConfigurations
    *	- LogicManagementClient.integrationAccountSchemas
    *	- LogicManagementClient.integrationAccountMaps
    *	- LogicManagementClient.integrationAccountPartners
    *	- LogicManagementClient.integrationAccountAgreements
    *	- LogicManagementClient.integrationAccountCertificates
    *	- LogicManagementClient.integrationAccountSessions
    *	- LogicManagementClient.integrationServiceEnvironments
    *	- LogicManagementClient.integrationServiceEnvironmentSkus
    *	- LogicManagementClient.integrationServiceEnvironmentNetworkHealth
    *	- LogicManagementClient.integrationServiceEnvironmentManagedApis
    *	- LogicManagementClient.integrationServiceEnvironmentManagedApiOperations
    *	- LogicManagementClient.operations
    *	- DnsManagementClient.recordSets
    *	- DnsManagementClient.zones
    *	- DnsManagementClient.dnsResourceReferenceOperations
    *	- PurviewManagementClient.accounts
    *	- PurviewManagementClient.defaultAccounts
    *	- PurviewManagementClient.operations
    *	- PurviewManagementClient.privateEndpointConnections
    *	- PurviewManagementClient.privateLinkResources
    *	- ServiceFabricManagementClient.clusters
    *	- ServiceFabricManagementClient.clusterVersions
    *	- ServiceFabricManagementClient.operations
    *	- ServiceFabricManagementClient.applicationTypes
    *	- ServiceFabricManagementClient.applicationTypeVersions
    *	- ServiceFabricManagementClient.applications
    *	- ServiceFabricManagementClient.services
    *	- ApplicationClient.applications
    *	- ApplicationClient.applicationDefinitions
    *	- ApplicationClient.jitRequests
    *	- ManagedServiceIdentityClient.systemAssignedIdentities
    *	- ManagedServiceIdentityClient.operations
    *	- ManagedServiceIdentityClient.userAssignedIdentities
    *	- ManagedServiceIdentityClient.federatedIdentityCredentials
    *	- BillingManagementClient.billingAccounts
    *	- BillingManagementClient.address
    *	- BillingManagementClient.availableBalances
    *	- BillingManagementClient.instructions
    *	- BillingManagementClient.billingProfiles
    *	- BillingManagementClient.customers
    *	- BillingManagementClient.invoiceSections
    *	- BillingManagementClient.billingPermissions
    *	- BillingManagementClient.billingSubscriptions
    *	- BillingManagementClient.products
    *	- BillingManagementClient.invoices
    *	- BillingManagementClient.transactions
    *	- BillingManagementClient.policies
    *	- BillingManagementClient.billingPropertyOperations
    *	- BillingManagementClient.operations
    *	- BillingManagementClient.billingRoleDefinitions
    *	- BillingManagementClient.billingRoleAssignments
    *	- BillingManagementClient.agreements
    *	- BillingManagementClient.reservations
    *	- BillingManagementClient.enrollmentAccounts
    *	- BillingManagementClient.billingPeriods
    *	- SearchManagementClient.operations
    *	- SearchManagementClient.adminKeys
    *	- SearchManagementClient.queryKeys
    *	- SearchManagementClient.services
    *	- SearchManagementClient.privateLinkResources
    *	- SearchManagementClient.privateEndpointConnections
    *	- SearchManagementClient.sharedPrivateLinkResources
    *	- SearchManagementClient.usages
    *	- CdnManagementClient.afdProfiles
    *	- CdnManagementClient.afdCustomDomains
    *	- CdnManagementClient.afdEndpoints
    *	- CdnManagementClient.afdOriginGroups
    *	- CdnManagementClient.afdOrigins
    *	- CdnManagementClient.routes
    *	- CdnManagementClient.ruleSets
    *	- CdnManagementClient.rules
    *	- CdnManagementClient.securityPolicies
    *	- CdnManagementClient.secrets
    *	- CdnManagementClient.logAnalytics
    *	- CdnManagementClient.profiles
    *	- CdnManagementClient.endpoints
    *	- CdnManagementClient.origins
    *	- CdnManagementClient.originGroups
    *	- CdnManagementClient.customDomains
    *	- CdnManagementClient.resourceUsageOperations
    *	- CdnManagementClient.operations
    *	- CdnManagementClient.edgeNodes
    *	- CdnManagementClient.policies
    *	- CdnManagementClient.managedRuleSets
    *	- PrivateDnsManagementClient.privateZones
    *	- PrivateDnsManagementClient.virtualNetworkLinks
    *	- PrivateDnsManagementClient.recordSets
    *	- ContainerInstanceManagementClient.containerGroups
    *	- ContainerInstanceManagementClient.operations
    *	- ContainerInstanceManagementClient.location
    *	- ContainerInstanceManagementClient.containers
    *	- ContainerInstanceManagementClient.subnetServiceAssociationLink
    *	- AuthorizationManagementClient.classicAdministrators
    *	- AuthorizationManagementClient.globalAdministrator
    *	- AuthorizationManagementClient.denyAssignments
    *	- AuthorizationManagementClient.providerOperationsMetadataOperations
    *	- AuthorizationManagementClient.roleAssignments
    *	- AuthorizationManagementClient.permissions
    *	- AuthorizationManagementClient.roleDefinitions
    *	- AuthorizationManagementClient.eligibleChildResources
    *	- AuthorizationManagementClient.roleAssignmentSchedules
    *	- AuthorizationManagementClient.roleAssignmentScheduleInstances
    *	- AuthorizationManagementClient.roleAssignmentScheduleRequests
    *	- AuthorizationManagementClient.roleEligibilitySchedules
    *	- AuthorizationManagementClient.roleEligibilityScheduleInstances
    *	- AuthorizationManagementClient.roleEligibilityScheduleRequests
    *	- AuthorizationManagementClient.roleManagementPolicies
    *	- AuthorizationManagementClient.roleManagementPolicyAssignments
    *	- KustoManagementClient.clusters
    *	- KustoManagementClient.clusterPrincipalAssignments
    *	- KustoManagementClient.skus
    *	- KustoManagementClient.databases
    *	- KustoManagementClient.attachedDatabaseConfigurations
    *	- KustoManagementClient.managedPrivateEndpoints
    *	- KustoManagementClient.databaseOperations
    *	- KustoManagementClient.databasePrincipalAssignments
    *	- KustoManagementClient.scripts
    *	- KustoManagementClient.sandboxCustomImages
    *	- KustoManagementClient.privateEndpointConnections
    *	- KustoManagementClient.privateLinkResources
    *	- KustoManagementClient.dataConnections
    *	- KustoManagementClient.operations
    *	- KustoManagementClient.operationsResults
    *	- KustoManagementClient.operationsResultsLocation
    *	- PowerBIEmbeddedManagementClient.workspaceCollections
    *	- PowerBIEmbeddedManagementClient.workspaces
    *	- HybridComputeManagementClient.machines
    *	- HybridComputeManagementClient.machineExtensions
    *	- HybridComputeManagementClient.operations
    *	- HybridComputeManagementClient.privateLinkScopes
    *	- HybridComputeManagementClient.privateLinkResources
    *	- HybridComputeManagementClient.privateEndpointConnections
    *	- SignalRManagementClient.operations
    *	- SignalRManagementClient.signalR
    *	- SignalRManagementClient.usages
    *	- SignalRManagementClient.signalRCustomCertificates
    *	- SignalRManagementClient.signalRCustomDomains
    *	- SignalRManagementClient.signalRPrivateEndpointConnections
    *	- SignalRManagementClient.signalRPrivateLinkResources
    *	- SignalRManagementClient.signalRSharedPrivateLinkResources
    *	- AzureChangeAnalysisManagementClient.operations
    *	- AzureChangeAnalysisManagementClient.resourceChanges
    *	- AzureChangeAnalysisManagementClient.changes
    *	- AttestationManagementClient.operations
    *	- AttestationManagementClient.attestationProviders
    *	- AttestationManagementClient.privateEndpointConnections
    *	- ImageBuilderClient.virtualMachineImageTemplates
    *	- ImageBuilderClient.triggers
    *	- ImageBuilderClient.operations
    *	- CommunicationServiceManagementClient.operations
    *	- CommunicationServiceManagementClient.communicationServices
    *	- CommunicationServiceManagementClient.domains
    *	- CommunicationServiceManagementClient.emailServices
    *	- CommunicationServiceManagementClient.senderUsernames
    *	- CognitiveServicesManagementClient.accounts
    *	- CognitiveServicesManagementClient.deletedAccounts
    *	- CognitiveServicesManagementClient.resourceSkus
    *	- CognitiveServicesManagementClient.usages
    *	- CognitiveServicesManagementClient.operations
    *	- CognitiveServicesManagementClient.commitmentTiers
    *	- CognitiveServicesManagementClient.models
    *	- CognitiveServicesManagementClient.privateEndpointConnections
    *	- CognitiveServicesManagementClient.privateLinkResources
    *	- CognitiveServicesManagementClient.deployments
    *	- CognitiveServicesManagementClient.commitmentPlans
    *	- PolicyInsightsClient.policyTrackedResources
    *	- PolicyInsightsClient.remediations
    *	- PolicyInsightsClient.policyEvents
    *	- PolicyInsightsClient.policyStates
    *	- PolicyInsightsClient.operations
    *	- PolicyInsightsClient.policyMetadataOperations
    *	- PolicyInsightsClient.policyRestrictions
    *	- PolicyInsightsClient.attestations
    *	- StorageCacheManagementClient.amlFilesystems
    *	- StorageCacheManagementClient.operations
    *	- StorageCacheManagementClient.skus
    *	- StorageCacheManagementClient.usageModels
    *	- StorageCacheManagementClient.ascOperations
    *	- StorageCacheManagementClient.ascUsages
    *	- StorageCacheManagementClient.caches
    *	- StorageCacheManagementClient.storageTargets
    *	- StorageCacheManagementClient.storageTargetOperations
    *	- FrontDoorManagementClient.policies
    *	- FrontDoorManagementClient.managedRuleSets
    *	- FrontDoorManagementClient.frontDoorNameAvailability
    *	- FrontDoorManagementClient.frontDoorNameAvailabilityWithSubscription
    *	- FrontDoorManagementClient.frontDoors
    *	- FrontDoorManagementClient.frontendEndpoints
    *	- FrontDoorManagementClient.endpoints
    *	- FrontDoorManagementClient.rulesEngines
    *	- FrontDoorManagementClient.networkExperimentProfiles
    *	- FrontDoorManagementClient.preconfiguredEndpoints
    *	- FrontDoorManagementClient.experiments
    *	- FrontDoorManagementClient.reports
    *	- MixedRealityClient.operations
    *	- MixedRealityClient.spatialAnchorsAccounts
    *	- MixedRealityClient.remoteRenderingAccounts
    *	- PeeringManagementClient.cdnPeeringPrefixes
    *	- PeeringManagementClient.legacyPeerings
    *	- PeeringManagementClient.lookingGlass
    *	- PeeringManagementClient.operations
    *	- PeeringManagementClient.peerAsns
    *	- PeeringManagementClient.peeringLocations
    *	- PeeringManagementClient.registeredAsns
    *	- PeeringManagementClient.registeredPrefixes
    *	- PeeringManagementClient.peerings
    *	- PeeringManagementClient.receivedRoutes
    *	- PeeringManagementClient.connectionMonitorTests
    *	- PeeringManagementClient.peeringServiceCountries
    *	- PeeringManagementClient.peeringServiceLocations
    *	- PeeringManagementClient.prefixes
    *	- PeeringManagementClient.peeringServiceProviders
    *	- PeeringManagementClient.peeringServices
    *	- FeatureClient.features
    *	- FeatureClient.subscriptionFeatureRegistrations
    *	- NetAppManagementClient.operations
    *	- NetAppManagementClient.netAppResource
    *	- NetAppManagementClient.netAppResourceQuotaLimits
    *	- NetAppManagementClient.accounts
    *	- NetAppManagementClient.pools
    *	- NetAppManagementClient.volumes
    *	- NetAppManagementClient.snapshots
    *	- NetAppManagementClient.snapshotPolicies
    *	- NetAppManagementClient.backups
    *	- NetAppManagementClient.backupPolicies
    *	- NetAppManagementClient.volumeQuotaRules
    *	- NetAppManagementClient.volumeGroups
    *	- NetAppManagementClient.subvolumes
    *	- HDInsightManagementClient.clusters
    *	- HDInsightManagementClient.applications
    *	- HDInsightManagementClient.locations
    *	- HDInsightManagementClient.configurations
    *	- HDInsightManagementClient.extensions
    *	- HDInsightManagementClient.scriptActions
    *	- HDInsightManagementClient.scriptExecutionHistory
    *	- HDInsightManagementClient.operations
    *	- HDInsightManagementClient.virtualMachines
    *	- HDInsightManagementClient.privateEndpointConnections
    *	- HDInsightManagementClient.privateLinkResources
    *	- AzureMLWebServicesManagementClient.operations
    *	- AzureMLWebServicesManagementClient.webServices
    *	- DataCatalogRestClient.aDCOperations
    *	- DataCatalogRestClient.aDCCatalogs
    *	- BatchManagementClient.batchAccountOperations
    *	- BatchManagementClient.applicationPackageOperations
    *	- BatchManagementClient.applicationOperations
    *	- BatchManagementClient.location
    *	- BatchManagementClient.operations
    *	- BatchManagementClient.certificateOperations
    *	- BatchManagementClient.privateLinkResourceOperations
    *	- BatchManagementClient.privateEndpointConnectionOperations
    *	- BatchManagementClient.poolOperations
    *	- MicrosoftSerialConsoleClient.serialPorts
    *	- RedisEnterpriseManagementClient.operations
    *	- RedisEnterpriseManagementClient.operationsStatus
    *	- RedisEnterpriseManagementClient.redisEnterprise
    *	- RedisEnterpriseManagementClient.databases
    *	- RedisEnterpriseManagementClient.privateEndpointConnections
    *	- RedisEnterpriseManagementClient.privateLinkResources
    *	- TrafficManagerManagementClient.endpoints
    *	- TrafficManagerManagementClient.profiles
    *	- TrafficManagerManagementClient.geographicHierarchies
    *	- TrafficManagerManagementClient.heatMap
    *	- TrafficManagerManagementClient.trafficManagerUserMetricsKeys
    *	- PostgreSQLManagementFlexibleServerClient.administrators
    *	- PostgreSQLManagementFlexibleServerClient.backups
    *	- PostgreSQLManagementFlexibleServerClient.locationBasedCapabilities
    *	- PostgreSQLManagementFlexibleServerClient.checkNameAvailability
    *	- PostgreSQLManagementFlexibleServerClient.checkNameAvailabilityWithLocation
    *	- PostgreSQLManagementFlexibleServerClient.configurations
    *	- PostgreSQLManagementFlexibleServerClient.databases
    *	- PostgreSQLManagementFlexibleServerClient.firewallRules
    *	- PostgreSQLManagementFlexibleServerClient.servers
    *	- PostgreSQLManagementFlexibleServerClient.operations
    *	- PostgreSQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
    *	- PostgreSQLManagementFlexibleServerClient.replicas
    *	- PostgreSQLManagementFlexibleServerClient.virtualNetworkSubnetUsage
    *	- SiteRecoveryManagementClient.operations
    *	- SiteRecoveryManagementClient.replicationAlertSettings
    *	- SiteRecoveryManagementClient.replicationAppliances
    *	- SiteRecoveryManagementClient.replicationEligibilityResultsOperations
    *	- SiteRecoveryManagementClient.replicationEvents
    *	- SiteRecoveryManagementClient.replicationFabrics
    *	- SiteRecoveryManagementClient.replicationLogicalNetworks
    *	- SiteRecoveryManagementClient.replicationNetworks
    *	- SiteRecoveryManagementClient.replicationNetworkMappings
    *	- SiteRecoveryManagementClient.replicationProtectionContainers
    *	- SiteRecoveryManagementClient.replicationMigrationItems
    *	- SiteRecoveryManagementClient.migrationRecoveryPoints
    *	- SiteRecoveryManagementClient.replicationProtectableItems
    *	- SiteRecoveryManagementClient.replicationProtectedItems
    *	- SiteRecoveryManagementClient.recoveryPoints
    *	- SiteRecoveryManagementClient.targetComputeSizes
    *	- SiteRecoveryManagementClient.replicationProtectionContainerMappings
    *	- SiteRecoveryManagementClient.replicationRecoveryServicesProviders
    *	- SiteRecoveryManagementClient.replicationStorageClassifications
    *	- SiteRecoveryManagementClient.replicationStorageClassificationMappings
    *	- SiteRecoveryManagementClient.replicationvCenters
    *	- SiteRecoveryManagementClient.replicationJobs
    *	- SiteRecoveryManagementClient.replicationPolicies
    *	- SiteRecoveryManagementClient.replicationProtectionIntents
    *	- SiteRecoveryManagementClient.replicationRecoveryPlans
    *	- SiteRecoveryManagementClient.supportedOperatingSystemsOperations
    *	- SiteRecoveryManagementClient.replicationVaultHealth
    *	- SiteRecoveryManagementClient.replicationVaultSetting
    *	- ApplicationInsightsManagementClient.acceptLanguage
    *	- ApplicationInsightsManagementClient.longRunningOperationRetryTimeout
    *	- ApplicationInsightsManagementClient.baseUri
    *	- ApplicationInsightsManagementClient.requestContentType
    *	- ApplicationInsightsManagementClient.credentials
    *	- ApplicationInsightsManagementClient.operations
    *	- ApplicationInsightsManagementClient.annotations
    *	- ApplicationInsightsManagementClient.aPIKeys
    *	- ApplicationInsightsManagementClient.exportConfigurations
    *	- ApplicationInsightsManagementClient.componentCurrentBillingFeatures
    *	- ApplicationInsightsManagementClient.componentQuotaStatus
    *	- ApplicationInsightsManagementClient.componentFeatureCapabilities
    *	- ApplicationInsightsManagementClient.componentAvailableFeatures
    *	- ApplicationInsightsManagementClient.proactiveDetectionConfigurations
    *	- ApplicationInsightsManagementClient.workItemConfigurations
    *	- ApplicationInsightsManagementClient.favorites
    *	- ApplicationInsightsManagementClient.webTestLocations
    *	- ApplicationInsightsManagementClient.webTests
    *	- ApplicationInsightsManagementClient.analyticsItems
    *	- ApplicationInsightsManagementClient.workbookTemplates
    *	- ApplicationInsightsManagementClient.myWorkbooks
    *	- ApplicationInsightsManagementClient.workbooks
    *	- ApplicationInsightsManagementClient.components
    *	- ApplicationInsightsManagementClient.componentLinkedStorageAccounts
    *	- ApplicationInsightsManagementClient.liveToken
    *	- AppPlatformManagementClient.services
    *	- AppPlatformManagementClient.configServers
    *	- AppPlatformManagementClient.configurationServices
    *	- AppPlatformManagementClient.serviceRegistries
    *	- AppPlatformManagementClient.buildServiceOperations
    *	- AppPlatformManagementClient.buildpackBinding
    *	- AppPlatformManagementClient.buildServiceBuilder
    *	- AppPlatformManagementClient.buildServiceAgentPool
    *	- AppPlatformManagementClient.monitoringSettings
    *	- AppPlatformManagementClient.apps
    *	- AppPlatformManagementClient.bindings
    *	- AppPlatformManagementClient.certificates
    *	- AppPlatformManagementClient.customDomains
    *	- AppPlatformManagementClient.deployments
    *	- AppPlatformManagementClient.operations
    *	- AppPlatformManagementClient.runtimeVersions
    *	- AppPlatformManagementClient.skus
    *	- SourceControlConfigurationClient.extensions
    *	- SourceControlConfigurationClient.operationStatus
    *	- SourceControlConfigurationClient.fluxConfigurations
    *	- SourceControlConfigurationClient.fluxConfigOperationStatus
    *	- SourceControlConfigurationClient.sourceControlConfigurations
    *	- SourceControlConfigurationClient.operations
    *	- AppConfigurationManagementClient.configurationStores
    *	- AppConfigurationManagementClient.operations
    *	- AppConfigurationManagementClient.privateEndpointConnections
    *	- AppConfigurationManagementClient.privateLinkResources
    *	- AppConfigurationManagementClient.keyValues
    *	- AppConfigurationManagementClient.replicas
    *	- LabServicesClient.images
    *	- LabServicesClient.labPlans
    *	- LabServicesClient.operations
    *	- LabServicesClient.labs
    *	- LabServicesClient.operationResults
    *	- LabServicesClient.schedules
    *	- LabServicesClient.skus
    *	- LabServicesClient.usages
    *	- LabServicesClient.users
    *	- LabServicesClient.virtualMachines
    *	- HanaManagementClient.acceptLanguage
    *	- HanaManagementClient.longRunningOperationRetryTimeout
    *	- HanaManagementClient.baseUri
    *	- HanaManagementClient.requestContentType
    *	- HanaManagementClient.credentials
    *	- HanaManagementClient.operations
    *	- HanaManagementClient.hanaInstances
    *	- HanaManagementClient.sapMonitors
    *	- AzureStackManagementClient.acceptLanguage
    *	- AzureStackManagementClient.longRunningOperationRetryTimeout
    *	- AzureStackManagementClient.baseUri
    *	- AzureStackManagementClient.requestContentType
    *	- AzureStackManagementClient.credentials
    *	- AzureStackManagementClient.operations
    *	- AzureStackManagementClient.products
    *	- AzureStackManagementClient.registrations
    *	- AzureStackManagementClient.customerSubscriptions
    *	- VisualStudioResourceProviderClient.acceptLanguage
    *	- VisualStudioResourceProviderClient.longRunningOperationRetryTimeout
    *	- VisualStudioResourceProviderClient.baseUri
    *	- VisualStudioResourceProviderClient.requestContentType
    *	- VisualStudioResourceProviderClient.credentials
    *	- VisualStudioResourceProviderClient.operations
    *	- VisualStudioResourceProviderClient.accounts
    *	- VisualStudioResourceProviderClient.extensions
    *	- VisualStudioResourceProviderClient.projects
    *	- DataBoxManagementClient.operations
    *	- DataBoxManagementClient.jobs
    *	- DataBoxManagementClient.service
    *	- MachineLearningComputeManagementClient.acceptLanguage
    *	- MachineLearningComputeManagementClient.longRunningOperationRetryTimeout
    *	- MachineLearningComputeManagementClient.baseUri
    *	- MachineLearningComputeManagementClient.requestContentType
    *	- MachineLearningComputeManagementClient.credentials
    *	- MachineLearningComputeManagementClient.operationalizationClusters
    *	- MachineLearningComputeManagementClient.machineLearningCompute
    *	- DataMigrationServiceClient.acceptLanguage
    *	- DataMigrationServiceClient.longRunningOperationRetryTimeout
    *	- DataMigrationServiceClient.baseUri
    *	- DataMigrationServiceClient.requestContentType
    *	- DataMigrationServiceClient.credentials
    *	- DataMigrationServiceClient.resourceSkus
    *	- DataMigrationServiceClient.services
    *	- DataMigrationServiceClient.tasks
    *	- DataMigrationServiceClient.serviceTasks
    *	- DataMigrationServiceClient.projects
    *	- DataMigrationServiceClient.usages
    *	- DataMigrationServiceClient.operations
    *	- DataMigrationServiceClient.files
    *	- DataLakeAnalyticsAccountManagementClient.acceptLanguage
    *	- DataLakeAnalyticsAccountManagementClient.longRunningOperationRetryTimeout
    *	- DataLakeAnalyticsAccountManagementClient.baseUri
    *	- DataLakeAnalyticsAccountManagementClient.requestContentType
    *	- DataLakeAnalyticsAccountManagementClient.credentials
    *	- DataLakeAnalyticsAccountManagementClient.accounts
    *	- DataLakeAnalyticsAccountManagementClient.dataLakeStoreAccounts
    *	- DataLakeAnalyticsAccountManagementClient.storageAccounts
    *	- DataLakeAnalyticsAccountManagementClient.computePolicies
    *	- DataLakeAnalyticsAccountManagementClient.firewallRules
    *	- DataLakeAnalyticsAccountManagementClient.operations
    *	- DataLakeAnalyticsAccountManagementClient.locations
    *	- IoTSpacesClient.ioTSpaces
    *	- IoTSpacesClient.operations
    *	- BatchAIManagementClient.acceptLanguage
    *	- BatchAIManagementClient.longRunningOperationRetryTimeout
    *	- BatchAIManagementClient.baseUri
    *	- BatchAIManagementClient.requestContentType
    *	- BatchAIManagementClient.credentials
    *	- BatchAIManagementClient.operations
    *	- BatchAIManagementClient.usages
    *	- BatchAIManagementClient.workspaces
    *	- BatchAIManagementClient.experiments
    *	- BatchAIManagementClient.jobs
    *	- BatchAIManagementClient.fileServers
    *	- BatchAIManagementClient.clusters
    *	- VideoAnalyzerManagementClient.edgeModules
    *	- VideoAnalyzerManagementClient.pipelineTopologies
    *	- VideoAnalyzerManagementClient.livePipelines
    *	- VideoAnalyzerManagementClient.pipelineJobs
    *	- VideoAnalyzerManagementClient.livePipelineOperationStatuses
    *	- VideoAnalyzerManagementClient.pipelineJobOperationStatuses
    *	- VideoAnalyzerManagementClient.operations
    *	- VideoAnalyzerManagementClient.videoAnalyzers
    *	- VideoAnalyzerManagementClient.privateLinkResources
    *	- VideoAnalyzerManagementClient.privateEndpointConnections
    *	- VideoAnalyzerManagementClient.operationStatuses
    *	- VideoAnalyzerManagementClient.operationResults
    *	- VideoAnalyzerManagementClient.videoAnalyzerOperationStatuses
    *	- VideoAnalyzerManagementClient.videoAnalyzerOperationResults
    *	- VideoAnalyzerManagementClient.locations
    *	- VideoAnalyzerManagementClient.videos
    *	- VideoAnalyzerManagementClient.accessPolicies
    *	- DesktopVirtualizationAPIClient.operations
    *	- DesktopVirtualizationAPIClient.workspaces
    *	- DesktopVirtualizationAPIClient.privateEndpointConnections
    *	- DesktopVirtualizationAPIClient.privateLinkResources
    *	- DesktopVirtualizationAPIClient.scalingPlans
    *	- DesktopVirtualizationAPIClient.scalingPlanPooledSchedules
    *	- DesktopVirtualizationAPIClient.scalingPlanPersonalSchedules
    *	- DesktopVirtualizationAPIClient.applicationGroups
    *	- DesktopVirtualizationAPIClient.startMenuItems
    *	- DesktopVirtualizationAPIClient.applications
    *	- DesktopVirtualizationAPIClient.desktops
    *	- DesktopVirtualizationAPIClient.hostPools
    *	- DesktopVirtualizationAPIClient.userSessions
    *	- DesktopVirtualizationAPIClient.sessionHosts
    *	- DesktopVirtualizationAPIClient.msixPackages
    *	- DesktopVirtualizationAPIClient.msixImages
    *	- LoadTestClient.operations
    *	- LoadTestClient.loadTests
    *	- CustomLocationsManagementClient.customLocations
    *	- CustomLocationsManagementClient.resourceSyncRules
    *	- MLTeamAccountManagementClient.acceptLanguage
    *	- MLTeamAccountManagementClient.longRunningOperationRetryTimeout
    *	- MLTeamAccountManagementClient.baseUri
    *	- MLTeamAccountManagementClient.requestContentType
    *	- MLTeamAccountManagementClient.credentials
    *	- MLTeamAccountManagementClient.operations
    *	- MLTeamAccountManagementClient.accounts
    *	- MLTeamAccountManagementClient.workspaces
    *	- MLTeamAccountManagementClient.projects
    *	- ServiceFabricMeshManagementClient.acceptLanguage
    *	- ServiceFabricMeshManagementClient.longRunningOperationRetryTimeout
    *	- ServiceFabricMeshManagementClient.baseUri
    *	- ServiceFabricMeshManagementClient.requestContentType
    *	- ServiceFabricMeshManagementClient.credentials
    *	- ServiceFabricMeshManagementClient.operations
    *	- ServiceFabricMeshManagementClient.secret
    *	- ServiceFabricMeshManagementClient.secretValue
    *	- ServiceFabricMeshManagementClient.volume
    *	- ServiceFabricMeshManagementClient.network
    *	- ServiceFabricMeshManagementClient.gateway
    *	- ServiceFabricMeshManagementClient.application
    *	- ServiceFabricMeshManagementClient.service
    *	- ServiceFabricMeshManagementClient.serviceReplica
    *	- ServiceFabricMeshManagementClient.codePackage
    *	- AzureMLCommitmentPlansManagementClient.acceptLanguage
    *	- AzureMLCommitmentPlansManagementClient.longRunningOperationRetryTimeout
    *	- AzureMLCommitmentPlansManagementClient.baseUri
    *	- AzureMLCommitmentPlansManagementClient.requestContentType
    *	- AzureMLCommitmentPlansManagementClient.credentials
    *	- AzureMLCommitmentPlansManagementClient.skus
    *	- AzureMLCommitmentPlansManagementClient.commitmentAssociations
    *	- AzureMLCommitmentPlansManagementClient.commitmentPlans
    *	- AzureMLCommitmentPlansManagementClient.usageHistory
    *	- DnsResolverManagementClient.dnsResolvers
    *	- DnsResolverManagementClient.inboundEndpoints
    *	- DnsResolverManagementClient.outboundEndpoints
    *	- DnsResolverManagementClient.dnsForwardingRulesets
    *	- DnsResolverManagementClient.forwardingRules
    *	- DnsResolverManagementClient.virtualNetworkLinks
    *	- DataBoxEdgeManagementClient.operations
    *	- DataBoxEdgeManagementClient.availableSkus
    *	- DataBoxEdgeManagementClient.devices
    *	- DataBoxEdgeManagementClient.alerts
    *	- DataBoxEdgeManagementClient.bandwidthSchedules
    *	- DataBoxEdgeManagementClient.diagnosticSettings
    *	- DataBoxEdgeManagementClient.jobs
    *	- DataBoxEdgeManagementClient.nodes
    *	- DataBoxEdgeManagementClient.operationsStatus
    *	- DataBoxEdgeManagementClient.orders
    *	- DataBoxEdgeManagementClient.roles
    *	- DataBoxEdgeManagementClient.addons
    *	- DataBoxEdgeManagementClient.monitoringConfig
    *	- DataBoxEdgeManagementClient.shares
    *	- DataBoxEdgeManagementClient.storageAccountCredentials
    *	- DataBoxEdgeManagementClient.storageAccounts
    *	- DataBoxEdgeManagementClient.containers
    *	- DataBoxEdgeManagementClient.triggers
    *	- DataBoxEdgeManagementClient.supportPackages
    *	- DataBoxEdgeManagementClient.users
    *	- MobileNetworkManagementClient.attachedDataNetworks
    *	- MobileNetworkManagementClient.dataNetworks
    *	- MobileNetworkManagementClient.diagnosticsPackages
    *	- MobileNetworkManagementClient.mobileNetworks
    *	- MobileNetworkManagementClient.operations
    *	- MobileNetworkManagementClient.packetCaptures
    *	- MobileNetworkManagementClient.packetCoreControlPlanes
    *	- MobileNetworkManagementClient.packetCoreControlPlaneVersions
    *	- MobileNetworkManagementClient.packetCoreDataPlanes
    *	- MobileNetworkManagementClient.services
    *	- MobileNetworkManagementClient.sims
    *	- MobileNetworkManagementClient.simGroups
    *	- MobileNetworkManagementClient.simPolicies
    *	- MobileNetworkManagementClient.sites
    *	- MobileNetworkManagementClient.slices
    *	- NetworkManagementClient.applicationGateways
    *	- NetworkManagementClient.applicationGatewayPrivateLinkResources
    *	- NetworkManagementClient.applicationGatewayPrivateEndpointConnections
    *	- NetworkManagementClient.applicationGatewayWafDynamicManifestsDefault
    *	- NetworkManagementClient.applicationGatewayWafDynamicManifests
    *	- NetworkManagementClient.applicationSecurityGroups
    *	- NetworkManagementClient.availableDelegations
    *	- NetworkManagementClient.availableResourceGroupDelegations
    *	- NetworkManagementClient.availableServiceAliases
    *	- NetworkManagementClient.azureFirewalls
    *	- NetworkManagementClient.azureFirewallFqdnTags
    *	- NetworkManagementClient.webCategories
    *	- NetworkManagementClient.bastionHosts
    *	- NetworkManagementClient.networkInterfaces
    *	- NetworkManagementClient.publicIPAddresses
    *	- NetworkManagementClient.vipSwap
    *	- NetworkManagementClient.customIPPrefixes
    *	- NetworkManagementClient.ddosCustomPolicies
    *	- NetworkManagementClient.ddosProtectionPlans
    *	- NetworkManagementClient.dscpConfigurationOperations
    *	- NetworkManagementClient.availableEndpointServices
    *	- NetworkManagementClient.expressRouteCircuitAuthorizations
    *	- NetworkManagementClient.expressRouteCircuitPeerings
    *	- NetworkManagementClient.expressRouteCircuitConnections
    *	- NetworkManagementClient.peerExpressRouteCircuitConnections
    *	- NetworkManagementClient.expressRouteCircuits
    *	- NetworkManagementClient.expressRouteServiceProviders
    *	- NetworkManagementClient.expressRouteCrossConnections
    *	- NetworkManagementClient.expressRouteCrossConnectionPeerings
    *	- NetworkManagementClient.expressRoutePortsLocations
    *	- NetworkManagementClient.expressRoutePorts
    *	- NetworkManagementClient.expressRouteLinks
    *	- NetworkManagementClient.expressRoutePortAuthorizations
    *	- NetworkManagementClient.expressRouteProviderPortsLocation
    *	- NetworkManagementClient.firewallPolicies
    *	- NetworkManagementClient.firewallPolicyRuleCollectionGroups
    *	- NetworkManagementClient.firewallPolicyIdpsSignatures
    *	- NetworkManagementClient.firewallPolicyIdpsSignaturesOverrides
    *	- NetworkManagementClient.firewallPolicyIdpsSignaturesFilterValues
    *	- NetworkManagementClient.ipAllocations
    *	- NetworkManagementClient.ipGroups
    *	- NetworkManagementClient.loadBalancers
    *	- NetworkManagementClient.loadBalancerBackendAddressPools
    *	- NetworkManagementClient.loadBalancerFrontendIPConfigurations
    *	- NetworkManagementClient.inboundNatRules
    *	- NetworkManagementClient.loadBalancerLoadBalancingRules
    *	- NetworkManagementClient.loadBalancerOutboundRules
    *	- NetworkManagementClient.loadBalancerNetworkInterfaces
    *	- NetworkManagementClient.loadBalancerProbes
    *	- NetworkManagementClient.natGateways
    *	- NetworkManagementClient.networkInterfaceIPConfigurations
    *	- NetworkManagementClient.networkInterfaceLoadBalancers
    *	- NetworkManagementClient.networkInterfaceTapConfigurations
    *	- NetworkManagementClient.networkManagers
    *	- NetworkManagementClient.networkManagerCommits
    *	- NetworkManagementClient.networkManagerDeploymentStatusOperations
    *	- NetworkManagementClient.subscriptionNetworkManagerConnections
    *	- NetworkManagementClient.managementGroupNetworkManagerConnections
    *	- NetworkManagementClient.connectivityConfigurations
    *	- NetworkManagementClient.networkGroups
    *	- NetworkManagementClient.staticMembers
    *	- NetworkManagementClient.scopeConnections
    *	- NetworkManagementClient.securityAdminConfigurations
    *	- NetworkManagementClient.adminRuleCollections
    *	- NetworkManagementClient.adminRules
    *	- NetworkManagementClient.networkProfiles
    *	- NetworkManagementClient.networkSecurityGroups
    *	- NetworkManagementClient.securityRules
    *	- NetworkManagementClient.defaultSecurityRules
    *	- NetworkManagementClient.networkVirtualAppliances
    *	- NetworkManagementClient.virtualApplianceSites
    *	- NetworkManagementClient.virtualApplianceSkus
    *	- NetworkManagementClient.inboundSecurityRuleOperations
    *	- NetworkManagementClient.networkWatchers
    *	- NetworkManagementClient.packetCaptures
    *	- NetworkManagementClient.connectionMonitors
    *	- NetworkManagementClient.flowLogs
    *	- NetworkManagementClient.operations
    *	- NetworkManagementClient.privateEndpoints
    *	- NetworkManagementClient.availablePrivateEndpointTypes
    *	- NetworkManagementClient.privateDnsZoneGroups
    *	- NetworkManagementClient.privateLinkServices
    *	- NetworkManagementClient.publicIPPrefixes
    *	- NetworkManagementClient.routeFilters
    *	- NetworkManagementClient.routeFilterRules
    *	- NetworkManagementClient.routeTables
    *	- NetworkManagementClient.routes
    *	- NetworkManagementClient.securityPartnerProviders
    *	- NetworkManagementClient.bgpServiceCommunities
    *	- NetworkManagementClient.serviceEndpointPolicies
    *	- NetworkManagementClient.serviceEndpointPolicyDefinitions
    *	- NetworkManagementClient.serviceTags
    *	- NetworkManagementClient.serviceTagInformationOperations
    *	- NetworkManagementClient.usages
    *	- NetworkManagementClient.virtualNetworks
    *	- NetworkManagementClient.subnets
    *	- NetworkManagementClient.resourceNavigationLinks
    *	- NetworkManagementClient.serviceAssociationLinks
    *	- NetworkManagementClient.virtualNetworkPeerings
    *	- NetworkManagementClient.virtualNetworkGateways
    *	- NetworkManagementClient.virtualNetworkGatewayConnections
    *	- NetworkManagementClient.localNetworkGateways
    *	- NetworkManagementClient.virtualNetworkGatewayNatRules
    *	- NetworkManagementClient.virtualNetworkTaps
    *	- NetworkManagementClient.virtualRouters
    *	- NetworkManagementClient.virtualRouterPeerings
    *	- NetworkManagementClient.virtualWans
    *	- NetworkManagementClient.vpnSites
    *	- NetworkManagementClient.vpnSiteLinks
    *	- NetworkManagementClient.vpnSitesConfiguration
    *	- NetworkManagementClient.vpnServerConfigurations
    *	- NetworkManagementClient.configurationPolicyGroups
    *	- NetworkManagementClient.virtualHubs
    *	- NetworkManagementClient.routeMaps
    *	- NetworkManagementClient.hubVirtualNetworkConnections
    *	- NetworkManagementClient.vpnGateways
    *	- NetworkManagementClient.vpnLinkConnections
    *	- NetworkManagementClient.vpnConnections
    *	- NetworkManagementClient.vpnSiteLinkConnections
    *	- NetworkManagementClient.natRules
    *	- NetworkManagementClient.p2SVpnGateways
    *	- NetworkManagementClient.vpnServerConfigurationsAssociatedWithVirtualWan
    *	- NetworkManagementClient.virtualHubRouteTableV2S
    *	- NetworkManagementClient.expressRouteGateways
    *	- NetworkManagementClient.expressRouteConnections
    *	- NetworkManagementClient.virtualHubBgpConnection
    *	- NetworkManagementClient.virtualHubBgpConnections
    *	- NetworkManagementClient.virtualHubIpConfiguration
    *	- NetworkManagementClient.hubRouteTables
    *	- NetworkManagementClient.routingIntentOperations
    *	- NetworkManagementClient.webApplicationFirewallPolicies
    *	- SynapseManagementClient.azureADOnlyAuthentications
    *	- SynapseManagementClient.operations
    *	- SynapseManagementClient.ipFirewallRules
    *	- SynapseManagementClient.keys
    *	- SynapseManagementClient.privateEndpointConnections
    *	- SynapseManagementClient.privateLinkResources
    *	- SynapseManagementClient.privateLinkHubPrivateLinkResources
    *	- SynapseManagementClient.privateLinkHubs
    *	- SynapseManagementClient.privateEndpointConnectionsPrivateLinkHub
    *	- SynapseManagementClient.sqlPools
    *	- SynapseManagementClient.sqlPoolMetadataSyncConfigs
    *	- SynapseManagementClient.sqlPoolOperationResults
    *	- SynapseManagementClient.sqlPoolGeoBackupPolicies
    *	- SynapseManagementClient.sqlPoolDataWarehouseUserActivities
    *	- SynapseManagementClient.sqlPoolRestorePoints
    *	- SynapseManagementClient.sqlPoolReplicationLinks
    *	- SynapseManagementClient.sqlPoolMaintenanceWindows
    *	- SynapseManagementClient.sqlPoolMaintenanceWindowOptions
    *	- SynapseManagementClient.sqlPoolTransparentDataEncryptions
    *	- SynapseManagementClient.sqlPoolBlobAuditingPolicies
    *	- SynapseManagementClient.sqlPoolOperations
    *	- SynapseManagementClient.sqlPoolUsages
    *	- SynapseManagementClient.sqlPoolSensitivityLabels
    *	- SynapseManagementClient.sqlPoolRecommendedSensitivityLabels
    *	- SynapseManagementClient.sqlPoolSchemas
    *	- SynapseManagementClient.sqlPoolTables
    *	- SynapseManagementClient.sqlPoolTableColumns
    *	- SynapseManagementClient.sqlPoolConnectionPolicies
    *	- SynapseManagementClient.sqlPoolVulnerabilityAssessments
    *	- SynapseManagementClient.sqlPoolVulnerabilityAssessmentScans
    *	- SynapseManagementClient.sqlPoolSecurityAlertPolicies
    *	- SynapseManagementClient.sqlPoolVulnerabilityAssessmentRuleBaselines
    *	- SynapseManagementClient.extendedSqlPoolBlobAuditingPolicies
    *	- SynapseManagementClient.dataMaskingPolicies
    *	- SynapseManagementClient.dataMaskingRules
    *	- SynapseManagementClient.sqlPoolColumns
    *	- SynapseManagementClient.sqlPoolWorkloadGroup
    *	- SynapseManagementClient.sqlPoolWorkloadClassifier
    *	- SynapseManagementClient.workspaceManagedSqlServerBlobAuditingPolicies
    *	- SynapseManagementClient.workspaceManagedSqlServerExtendedBlobAuditingPolicies
    *	- SynapseManagementClient.workspaceManagedSqlServerSecurityAlertPolicy
    *	- SynapseManagementClient.workspaceManagedSqlServerVulnerabilityAssessments
    *	- SynapseManagementClient.workspaceManagedSqlServerEncryptionProtector
    *	- SynapseManagementClient.workspaceManagedSqlServerUsages
    *	- SynapseManagementClient.workspaceManagedSqlServerRecoverableSqlPools
    *	- SynapseManagementClient.workspaces
    *	- SynapseManagementClient.workspaceAadAdmins
    *	- SynapseManagementClient.workspaceSqlAadAdmins
    *	- SynapseManagementClient.workspaceManagedIdentitySqlControlSettings
    *	- SynapseManagementClient.restorableDroppedSqlPools
    *	- SynapseManagementClient.bigDataPools
    *	- SynapseManagementClient.library
    *	- SynapseManagementClient.libraries
    *	- SynapseManagementClient.integrationRuntimes
    *	- SynapseManagementClient.integrationRuntimeNodeIpAddressOperations
    *	- SynapseManagementClient.integrationRuntimeObjectMetadata
    *	- SynapseManagementClient.integrationRuntimeNodes
    *	- SynapseManagementClient.integrationRuntimeCredentials
    *	- SynapseManagementClient.integrationRuntimeConnectionInfos
    *	- SynapseManagementClient.integrationRuntimeAuthKeysOperations
    *	- SynapseManagementClient.integrationRuntimeMonitoringDataOperations
    *	- SynapseManagementClient.integrationRuntimeStatusOperations
    *	- SynapseManagementClient.sparkConfiguration
    *	- SynapseManagementClient.sparkConfigurations
    *	- SynapseManagementClient.kustoOperations
    *	- SynapseManagementClient.kustoPools
    *	- SynapseManagementClient.kustoPoolChildResource
    *	- SynapseManagementClient.kustoPoolAttachedDatabaseConfigurations
    *	- SynapseManagementClient.kustoPoolDatabases
    *	- SynapseManagementClient.kustoPoolDataConnections
    *	- SynapseManagementClient.kustoPoolPrincipalAssignments
    *	- SynapseManagementClient.kustoPoolDatabasePrincipalAssignments
    *	- MySQLManagementClient.servers
    *	- MySQLManagementClient.replicas
    *	- MySQLManagementClient.firewallRules
    *	- MySQLManagementClient.virtualNetworkRules
    *	- MySQLManagementClient.databases
    *	- MySQLManagementClient.configurations
    *	- MySQLManagementClient.serverParameters
    *	- MySQLManagementClient.logFiles
    *	- MySQLManagementClient.serverAdministrators
    *	- MySQLManagementClient.recoverableServers
    *	- MySQLManagementClient.serverBasedPerformanceTier
    *	- MySQLManagementClient.locationBasedPerformanceTier
    *	- MySQLManagementClient.checkNameAvailability
    *	- MySQLManagementClient.operations
    *	- MySQLManagementClient.serverSecurityAlertPolicies
    *	- MySQLManagementClient.queryTexts
    *	- MySQLManagementClient.topQueryStatistics
    *	- MySQLManagementClient.waitStatistics
    *	- MySQLManagementClient.advisors
    *	- MySQLManagementClient.recommendedActions
    *	- MySQLManagementClient.locationBasedRecommendedActionSessionsOperationStatus
    *	- MySQLManagementClient.locationBasedRecommendedActionSessionsResult
    *	- MySQLManagementClient.privateEndpointConnections
    *	- MySQLManagementClient.privateLinkResources
    *	- MySQLManagementClient.serverKeys
    *	- TemplateSpecsClient.templateSpecs
    *	- TemplateSpecsClient.templateSpecVersions
    *	- ManagementLinkClient.operations
    *	- ManagementLinkClient.resourceLinks
    *	- MicrosoftDatadogClient.marketplaceAgreements
    *	- MicrosoftDatadogClient.creationSupported
    *	- MicrosoftDatadogClient.monitors
    *	- MicrosoftDatadogClient.operations
    *	- MicrosoftDatadogClient.tagRules
    *	- MicrosoftDatadogClient.singleSignOnConfigurations
    *	- MicrosoftDatadogClient.monitoredSubscriptions
    *	- IotHubClient.operations
    *	- IotHubClient.iotHubResource
    *	- IotHubClient.resourceProviderCommon
    *	- IotHubClient.certificates
    *	- IotHubClient.iotHub
    *	- IotHubClient.privateLinkResourcesOperations
    *	- IotHubClient.privateEndpointConnections
    *	- AzureStackHCIClient.arcSettings
    *	- AzureStackHCIClient.clusters
    *	- AzureStackHCIClient.extensions
    *	- AzureStackHCIClient.operations
    *	- MachineLearningWorkspacesManagementClient.operations
    *	- MachineLearningWorkspacesManagementClient.workspaces
    *	- OperationalInsightsManagementClient.queryPacks
    *	- OperationalInsightsManagementClient.queries
    *	- OperationalInsightsManagementClient.dataExports
    *	- OperationalInsightsManagementClient.dataSources
    *	- OperationalInsightsManagementClient.intelligencePacks
    *	- OperationalInsightsManagementClient.linkedServices
    *	- OperationalInsightsManagementClient.linkedStorageAccounts
    *	- OperationalInsightsManagementClient.managementGroups
    *	- OperationalInsightsManagementClient.operationStatuses
    *	- OperationalInsightsManagementClient.sharedKeysOperations
    *	- OperationalInsightsManagementClient.usages
    *	- OperationalInsightsManagementClient.storageInsightConfigs
    *	- OperationalInsightsManagementClient.savedSearches
    *	- OperationalInsightsManagementClient.availableServiceTiers
    *	- OperationalInsightsManagementClient.gateways
    *	- OperationalInsightsManagementClient.schemaOperations
    *	- OperationalInsightsManagementClient.workspacePurge
    *	- OperationalInsightsManagementClient.clusters
    *	- OperationalInsightsManagementClient.operations
    *	- OperationalInsightsManagementClient.workspaces
    *	- OperationalInsightsManagementClient.deletedWorkspaces
    *	- OperationalInsightsManagementClient.tables
    *	- ResourceGraphClient.acceptLanguage
    *	- ResourceGraphClient.longRunningOperationRetryTimeout
    *	- ResourceGraphClient.baseUri
    *	- ResourceGraphClient.requestContentType
    *	- ResourceGraphClient.credentials
    *	- ResourceGraphClient.operations
    *	- UsageManagementClient.acceptLanguage
    *	- UsageManagementClient.longRunningOperationRetryTimeout
    *	- UsageManagementClient.baseUri
    *	- UsageManagementClient.requestContentType
    *	- UsageManagementClient.credentials
    *	- UsageManagementClient.usageAggregates
    *	- UsageManagementClient.rateCard
    *	- ConfluentManagementClient.marketplaceAgreements
    *	- ConfluentManagementClient.organizationOperations
    *	- ConfluentManagementClient.organization
    *	- ConfluentManagementClient.validations
    *	- ConfluentManagementClient.access
    *	- ServicemapManagementClient.acceptLanguage
    *	- ServicemapManagementClient.longRunningOperationRetryTimeout
    *	- ServicemapManagementClient.baseUri
    *	- ServicemapManagementClient.requestContentType
    *	- ServicemapManagementClient.credentials
    *	- ServicemapManagementClient.machines
    *	- ServicemapManagementClient.processes
    *	- ServicemapManagementClient.ports
    *	- ServicemapManagementClient.clientGroups
    *	- ServicemapManagementClient.maps
    *	- ServicemapManagementClient.summaries
    *	- ServicemapManagementClient.machineGroups
    *	- ApiManagementClient.api
    *	- ApiManagementClient.apiRevision
    *	- ApiManagementClient.apiRelease
    *	- ApiManagementClient.apiOperation
    *	- ApiManagementClient.apiOperationPolicy
    *	- ApiManagementClient.tag
    *	- ApiManagementClient.graphQLApiResolver
    *	- ApiManagementClient.graphQLApiResolverPolicy
    *	- ApiManagementClient.apiProduct
    *	- ApiManagementClient.apiPolicy
    *	- ApiManagementClient.apiSchema
    *	- ApiManagementClient.apiDiagnostic
    *	- ApiManagementClient.apiIssue
    *	- ApiManagementClient.apiIssueComment
    *	- ApiManagementClient.apiIssueAttachment
    *	- ApiManagementClient.apiTagDescription
    *	- ApiManagementClient.operationOperations
    *	- ApiManagementClient.apiWiki
    *	- ApiManagementClient.apiWikis
    *	- ApiManagementClient.apiExport
    *	- ApiManagementClient.apiVersionSet
    *	- ApiManagementClient.authorizationServer
    *	- ApiManagementClient.authorizationProvider
    *	- ApiManagementClient.authorization
    *	- ApiManagementClient.authorizationLoginLinks
    *	- ApiManagementClient.authorizationAccessPolicy
    *	- ApiManagementClient.backend
    *	- ApiManagementClient.cache
    *	- ApiManagementClient.certificate
    *	- ApiManagementClient.contentType
    *	- ApiManagementClient.contentItem
    *	- ApiManagementClient.deletedServices
    *	- ApiManagementClient.apiManagementOperations
    *	- ApiManagementClient.apiManagementServiceSkus
    *	- ApiManagementClient.apiManagementService
    *	- ApiManagementClient.diagnostic
    *	- ApiManagementClient.emailTemplate
    *	- ApiManagementClient.gateway
    *	- ApiManagementClient.gatewayHostnameConfiguration
    *	- ApiManagementClient.gatewayApi
    *	- ApiManagementClient.gatewayCertificateAuthority
    *	- ApiManagementClient.group
    *	- ApiManagementClient.groupUser
    *	- ApiManagementClient.identityProvider
    *	- ApiManagementClient.issue
    *	- ApiManagementClient.logger
    *	- ApiManagementClient.namedValue
    *	- ApiManagementClient.networkStatus
    *	- ApiManagementClient.notification
    *	- ApiManagementClient.notificationRecipientUser
    *	- ApiManagementClient.notificationRecipientEmail
    *	- ApiManagementClient.openIdConnectProvider
    *	- ApiManagementClient.outboundNetworkDependenciesEndpoints
    *	- ApiManagementClient.policy
    *	- ApiManagementClient.policyDescription
    *	- ApiManagementClient.policyFragment
    *	- ApiManagementClient.portalConfig
    *	- ApiManagementClient.portalRevision
    *	- ApiManagementClient.portalSettings
    *	- ApiManagementClient.signInSettings
    *	- ApiManagementClient.signUpSettings
    *	- ApiManagementClient.delegationSettings
    *	- ApiManagementClient.privateEndpointConnectionOperations
    *	- ApiManagementClient.product
    *	- ApiManagementClient.productApi
    *	- ApiManagementClient.productGroup
    *	- ApiManagementClient.productSubscriptions
    *	- ApiManagementClient.productPolicy
    *	- ApiManagementClient.productWiki
    *	- ApiManagementClient.productWikis
    *	- ApiManagementClient.quotaByCounterKeys
    *	- ApiManagementClient.quotaByPeriodKeys
    *	- ApiManagementClient.region
    *	- ApiManagementClient.reports
    *	- ApiManagementClient.globalSchema
    *	- ApiManagementClient.tenantSettings
    *	- ApiManagementClient.apiManagementSkus
    *	- ApiManagementClient.subscription
    *	- ApiManagementClient.tagResource
    *	- ApiManagementClient.tenantAccess
    *	- ApiManagementClient.tenantAccessGit
    *	- ApiManagementClient.tenantConfiguration
    *	- ApiManagementClient.user
    *	- ApiManagementClient.userGroup
    *	- ApiManagementClient.userSubscription
    *	- ApiManagementClient.userIdentities
    *	- ApiManagementClient.userConfirmationPassword
    *	- ApiManagementClient.documentation
    *	- SqlVirtualMachineManagementClient.acceptLanguage
    *	- SqlVirtualMachineManagementClient.longRunningOperationRetryTimeout
    *	- SqlVirtualMachineManagementClient.baseUri
    *	- SqlVirtualMachineManagementClient.requestContentType
    *	- SqlVirtualMachineManagementClient.credentials
    *	- SqlVirtualMachineManagementClient.availabilityGroupListeners
    *	- SqlVirtualMachineManagementClient.operations
    *	- SqlVirtualMachineManagementClient.sqlVirtualMachineGroups
    *	- SqlVirtualMachineManagementClient.sqlVirtualMachines
    *	- RecoveryServicesClient.vaultCertificates
    *	- RecoveryServicesClient.registeredIdentities
    *	- RecoveryServicesClient.replicationUsages
    *	- RecoveryServicesClient.privateLinkResourcesOperations
    *	- RecoveryServicesClient.recoveryServices
    *	- RecoveryServicesClient.vaults
    *	- RecoveryServicesClient.operations
    *	- RecoveryServicesClient.vaultExtendedInfo
    *	- RecoveryServicesClient.usages
    *	- AzureDatabricksManagementClient.workspaces
    *	- AzureDatabricksManagementClient.operations
    *	- AzureDatabricksManagementClient.privateLinkResources
    *	- AzureDatabricksManagementClient.privateEndpointConnections
    *	- AzureDatabricksManagementClient.outboundNetworkDependenciesEndpoints
    *	- AzureDatabricksManagementClient.vNetPeering
    *	- AzureDatabricksManagementClient.accessConnectors
    *	- DataFactoryManagementClient.operations
    *	- DataFactoryManagementClient.factories
    *	- DataFactoryManagementClient.exposureControl
    *	- DataFactoryManagementClient.integrationRuntimes
    *	- DataFactoryManagementClient.integrationRuntimeObjectMetadata
    *	- DataFactoryManagementClient.integrationRuntimeNodes
    *	- DataFactoryManagementClient.linkedServices
    *	- DataFactoryManagementClient.datasets
    *	- DataFactoryManagementClient.pipelines
    *	- DataFactoryManagementClient.pipelineRuns
    *	- DataFactoryManagementClient.activityRuns
    *	- DataFactoryManagementClient.triggers
    *	- DataFactoryManagementClient.triggerRuns
    *	- DataFactoryManagementClient.dataFlows
    *	- DataFactoryManagementClient.dataFlowDebugSession
    *	- DataFactoryManagementClient.managedVirtualNetworks
    *	- DataFactoryManagementClient.managedPrivateEndpoints
    *	- DataFactoryManagementClient.credentialOperations
    *	- DataFactoryManagementClient.privateEndPointConnections
    *	- DataFactoryManagementClient.privateEndpointConnection
    *	- DataFactoryManagementClient.privateLinkResources
    *	- DataFactoryManagementClient.globalParameters
    *	- DataFactoryManagementClient.changeDataCapture
    *	- TimeSeriesInsightsClient.operations
    *	- TimeSeriesInsightsClient.environments
    *	- TimeSeriesInsightsClient.eventSources
    *	- TimeSeriesInsightsClient.referenceDataSets
    *	- TimeSeriesInsightsClient.accessPolicies
    *	- AzureDigitalTwinsManagementClient.digitalTwins
    *	- AzureDigitalTwinsManagementClient.digitalTwinsEndpoint
    *	- AzureDigitalTwinsManagementClient.operations
    *	- AzureDigitalTwinsManagementClient.privateLinkResources
    *	- AzureDigitalTwinsManagementClient.privateEndpointConnections
    *	- AzureDigitalTwinsManagementClient.timeSeriesDatabaseConnections
    *	- WebPubSubManagementClient.operations
    *	- WebPubSubManagementClient.webPubSub
    *	- WebPubSubManagementClient.usages
    *	- WebPubSubManagementClient.webPubSubCustomCertificates
    *	- WebPubSubManagementClient.webPubSubCustomDomains
    *	- WebPubSubManagementClient.webPubSubHubs
    *	- WebPubSubManagementClient.webPubSubPrivateEndpointConnections
    *	- WebPubSubManagementClient.webPubSubPrivateLinkResources
    *	- WebPubSubManagementClient.webPubSubSharedPrivateLinkResources
    *	- NotificationHubsManagementClient.operations
    *	- NotificationHubsManagementClient.namespaces
    *	- NotificationHubsManagementClient.notificationHubs
    *	- ConnectedKubernetesClient.connectedClusterOperations
    *	- ConnectedKubernetesClient.operations
    *	- AdvisorManagementClient.recommendationMetadata
    *	- AdvisorManagementClient.configurations
    *	- AdvisorManagementClient.recommendations
    *	- AdvisorManagementClient.operations
    *	- AdvisorManagementClient.suppressions
    *	- HealthbotClient.bots
    *	- HealthbotClient.operations
    *	- HealthcareApisManagementClient.services
    *	- HealthcareApisManagementClient.privateEndpointConnections
    *	- HealthcareApisManagementClient.privateLinkResources
    *	- HealthcareApisManagementClient.workspaces
    *	- HealthcareApisManagementClient.dicomServices
    *	- HealthcareApisManagementClient.iotConnectors
    *	- HealthcareApisManagementClient.fhirDestinations
    *	- HealthcareApisManagementClient.iotConnectorFhirDestination
    *	- HealthcareApisManagementClient.fhirServices
    *	- HealthcareApisManagementClient.workspacePrivateEndpointConnections
    *	- HealthcareApisManagementClient.workspacePrivateLinkResources
    *	- HealthcareApisManagementClient.operations
    *	- HealthcareApisManagementClient.operationResults
    *	- CustomerInsightsManagementClient.operations
    *	- CustomerInsightsManagementClient.hubs
    *	- CustomerInsightsManagementClient.profiles
    *	- CustomerInsightsManagementClient.interactions
    *	- CustomerInsightsManagementClient.relationships
    *	- CustomerInsightsManagementClient.relationshipLinks
    *	- CustomerInsightsManagementClient.authorizationPolicies
    *	- CustomerInsightsManagementClient.connectors
    *	- CustomerInsightsManagementClient.connectorMappings
    *	- CustomerInsightsManagementClient.kpi
    *	- CustomerInsightsManagementClient.widgetTypes
    *	- CustomerInsightsManagementClient.views
    *	- CustomerInsightsManagementClient.links
    *	- CustomerInsightsManagementClient.roles
    *	- CustomerInsightsManagementClient.roleAssignments
    *	- CustomerInsightsManagementClient.images
    *	- CustomerInsightsManagementClient.predictions
    *	- IotDpsClient.operations
    *	- IotDpsClient.dpsCertificate
    *	- IotDpsClient.iotDpsResource
    *	- DevSpacesManagementClient.containerHostMappings
    *	- DevSpacesManagementClient.operations
    *	- DevSpacesManagementClient.controllers
    *	- MySQLManagementFlexibleServerClient.servers
    *	- MySQLManagementFlexibleServerClient.replicas
    *	- MySQLManagementFlexibleServerClient.backups
    *	- MySQLManagementFlexibleServerClient.firewallRules
    *	- MySQLManagementFlexibleServerClient.databases
    *	- MySQLManagementFlexibleServerClient.configurations
    *	- MySQLManagementFlexibleServerClient.locationBasedCapabilities
    *	- MySQLManagementFlexibleServerClient.checkVirtualNetworkSubnetUsage
    *	- MySQLManagementFlexibleServerClient.checkNameAvailability
    *	- MySQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
    *	- MySQLManagementFlexibleServerClient.operations
    *	- ContainerAppsAPIClient.containerAppsAuthConfigs
    *	- ContainerAppsAPIClient.availableWorkloadProfiles
    *	- ContainerAppsAPIClient.billingMeters
    *	- ContainerAppsAPIClient.connectedEnvironments
    *	- ContainerAppsAPIClient.connectedEnvironmentsCertificates
    *	- ContainerAppsAPIClient.connectedEnvironmentsDaprComponents
    *	- ContainerAppsAPIClient.connectedEnvironmentsStorages
    *	- ContainerAppsAPIClient.containerApps
    *	- ContainerAppsAPIClient.containerAppsRevisions
    *	- ContainerAppsAPIClient.containerAppsRevisionReplicas
    *	- ContainerAppsAPIClient.containerAppsDiagnostics
    *	- ContainerAppsAPIClient.managedEnvironmentDiagnostics
    *	- ContainerAppsAPIClient.managedEnvironmentsDiagnostics
    *	- ContainerAppsAPIClient.operations
    *	- ContainerAppsAPIClient.jobs
    *	- ContainerAppsAPIClient.jobsExecutions
    *	- ContainerAppsAPIClient.managedEnvironments
    *	- ContainerAppsAPIClient.certificates
    *	- ContainerAppsAPIClient.managedCertificates
    *	- ContainerAppsAPIClient.namespaces
    *	- ContainerAppsAPIClient.daprComponents
    *	- ContainerAppsAPIClient.managedEnvironmentsStorages
    *	- ContainerAppsAPIClient.containerAppsSourceControls
    *	- ChangesClient.changes
    *	- ServiceLinkerManagementClient.linker
    *	- ServiceLinkerManagementClient.operations
    *	- ConfidentialLedgerClient.operations
    *	- ConfidentialLedgerClient.ledger
    *	- EducationManagementClient.operations
    *	- EducationManagementClient.grants
    *	- EducationManagementClient.labs
    *	- EducationManagementClient.joinRequests
    *	- EducationManagementClient.students
    *	- EducationManagementClient.studentLabs
    *	- ExternalIdentitiesConfigurationClient.b2CTenants
    *	- ExternalIdentitiesConfigurationClient.operations
    *	- ExternalIdentitiesConfigurationClient.guestUsages
    *	- DashboardManagementClient.operations
    *	- DashboardManagementClient.grafana
    *	- DashboardManagementClient.privateEndpointConnections
    *	- DashboardManagementClient.privateLinkResources
    *	- DashboardManagementClient.managedPrivateEndpoints
    *	- KexaAzure.vm
    *	- KexaAzure.mlWorkspaces
    *	- KexaAzure.mlJobs
    *	- KexaAzure.mlComputes
    *	- KexaAzure.mlSchedules
    *	- KexaAzure.storage
    *	- KexaAzure.blob
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.virtualMachinesListing = exports.collectData = void 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// RETRIEVING ALL IMPORTS & CLIENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////
const arm_compute_1 = require("@azure/arm-compute");
const AzureImports = __importStar(require("./imports/azurePackage.import"));
let allClients = {};
for (const key of Object.keys(AzureImports)) {
    const currentItem = AzureImports[key];
    const clientsFromModule = extractClients(currentItem);
    allClients = { ...allClients, ...clientsFromModule };
}
function extractClients(module) {
    const clients = {};
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
        }
    });
    return clients;
}
const arm_resources_1 = require("@azure/arm-resources");
const arm_monitor_1 = require("@azure/arm-monitor");
const storage_blob_1 = require("@azure/storage-blob");
const clientConstructors = {
    ResourceManagementClient: arm_resources_1.ResourceManagementClient,
};
Object.assign(clientConstructors, allClients);
const identity_1 = require("@azure/identity");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const axios_1 = __importDefault(require("axios"));
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("AzureLogger");
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectData(azureConfig) {
    let resources = new Array();
    for (let config of azureConfig ?? []) {
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix ?? (azureConfig.indexOf(config).toString());
        try {
            logger.debug("prefix: " + prefix);
            let subscriptionId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTID", prefix);
            if (azureClientId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_ID", azureClientId);
            else
                logger.warning(prefix + "AZURECLIENTID not found");
            let azureClientSecret = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURECLIENTSECRET", prefix);
            if (azureClientSecret)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_SECRET", azureClientSecret);
            else
                logger.warning(prefix + "AZURECLIENTSECRET not found");
            let azureTenantId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AZURETENANTID", prefix);
            if (azureTenantId)
                (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_TENANT_ID", azureTenantId);
            else
                logger.warning(prefix + "AZURETENANTID not found");
            let UAI = {};
            let useAzureIdentity = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "USERAZUREIDENTITYID", prefix);
            if (useAzureIdentity)
                UAI = { managedIdentityClientId: useAzureIdentity };
            const credential = new identity_1.DefaultAzureCredential(UAI);
            if (!subscriptionId) {
                throw new Error("- Please pass " + prefix + "SUBSCRIPTIONID in your config file");
            }
            else {
                logger.info("- loading client microsoft azure done-");
                const [autoFlatResources, dataComplementaryFlat] = await Promise.all([
                    collectAuto(credential, subscriptionId, config),
                    collectKexaRestructuredData(credential, subscriptionId, config)
                ]);
                let finalResources = { ...autoFlatResources, ...dataComplementaryFlat };
                resources.push(finalResources);
            }
        }
        catch (e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", prefix)) ?? null);
            logger.error(e);
        }
    }
    return resources ?? null;
}
exports.collectData = collectData;
async function collectAuto(credential, subscriptionId, config) {
    const azureRet = {};
    for (const clientService in allClients) {
        const constructor = clientConstructors[clientService];
        const clientName = constructor.name;
        let requireClient = false;
        if (Array.isArray(config.ObjectNameNeed)) {
            requireClient = config.ObjectNameNeed.some((item) => item.startsWith(constructor.name));
        }
        else {
            requireClient = false;
        }
        if (requireClient) {
            try {
                azureRet[clientName] = await callGenericClient(createGenericClient(constructor, credential, subscriptionId), config);
            }
            catch (e) {
                logger.debug("Error constructing client", e);
            }
        }
    }
    const autoFlatResources = {};
    Object.keys(azureRet).forEach(parentKey => {
        azureRet[parentKey].forEach((childObj) => {
            Object.keys(childObj).forEach(childKey => {
                const newKey = parentKey + '.' + childKey;
                autoFlatResources[newKey] = childObj[childKey];
            });
        });
    });
    return autoFlatResources;
}
/* *************************************** */
/* 		AUTOMATED RESOURCES GATHERING      */
/* *************************************** */
function createGenericClient(Client, credential, subscriptionId) {
    return new Client(credential, subscriptionId);
}
async function callGenericClient(client, config) {
    let results = [];
    logger.debug("starting " + client.constructor.name + " Listing");
    results.push(await listAllResources(client, config));
    return results;
}
async function listAllResources(client, currentConfig) {
    logger.debug("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);
    const resultList = {};
    const promises = properties.map(async (element) => {
        const toCheck = client.constructor.name + '.' + element;
        let key = element;
        if (element.startsWith("_"))
            return Promise.resolve();
        if (client[key]) {
            const methods = ["listAll", "list"];
            await Promise.all(methods.map(async (method) => {
                const resource = client[key];
                if (typeof resource === 'object' && typeof resource[method] === 'function') {
                    const gotMethod = resource[method];
                    const numberOfArgs = gotMethod.length;
                    if (numberOfArgs > 2) {
                        logger.debug(`Function ${key}.${method} requires ${numberOfArgs} arguments.`);
                        return Promise.resolve();
                    }
                    const keyStr = key;
                    const toExec = "resourcesClient." + key + "." + method + "()";
                    logger.debug("To exec: " + toExec);
                    let resultObject = [];
                    try {
                        const resourceMethodResult = await resource[method]();
                        for await (let item of resourceMethodResult) {
                            item = addingResourceGroups(item);
                            resultObject.push(item);
                        }
                        if (!resultList[keyStr]) {
                            resultList[keyStr] = resultObject;
                        }
                        else {
                            resultList[keyStr].push(...resultObject);
                        }
                        logger.debug(resultList);
                    }
                    catch (e) {
                        logger.debug("Error on function :", e);
                    }
                }
                else {
                    logger.debug(`Invalid property ${key} or function call ${method}.`);
                }
                return Promise.resolve();
            }));
        }
        return Promise.resolve();
    });
    await Promise.all(promises);
    return resultList;
}
function addingResourceGroups(item) {
    if (item.id) {
        let rg = item.id?.split("/")[4] ?? "";
        item.resourceGroupName = rg;
    }
    return item;
}
/* ************************************ */
/*  	CUSTOM GATHER RESOURCES         */
/* ************************************ */
const resource_models_1 = require("../../models/azure/resource.models");
const customGatherFunctions = {
    'KexaAzure.vm': async (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        try {
            const computeClient = new arm_compute_1.ComputeManagementClient(credential, subscriptionId);
            const monitorClient = new arm_monitor_1.MonitorClient(credential, subscriptionId);
            return await virtualMachinesListing(computeClient, monitorClient);
        }
        catch (e) {
            logger.debug("Error creating Azure client: ", e);
            return [];
        }
    },
    'KexaAzure.mlWorkspaces': async (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        try {
            const mlClient = new arm_machinelearning_1.AzureMachineLearningWorkspaces(credential, subscriptionId);
            return await workspacesListing(mlClient);
        }
        catch (e) {
            logger.debug("Error creating Azure client: " + name, e);
            return [];
        }
    },
    'KexaAzure.mlJobs': async (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        try {
            const mlClient = new arm_machinelearning_1.AzureMachineLearningWorkspaces(credential, subscriptionId);
            let workspaces = await workspacesListing(mlClient);
            return await jobsListing(mlClient, workspaces);
        }
        catch (e) {
            logger.debug("Error creating Azure client: " + name, e);
            return [];
        }
    },
    'KexaAzure.mlComputes': async (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        try {
            const mlClient = new arm_machinelearning_1.AzureMachineLearningWorkspaces(credential, subscriptionId);
            let workspaces = await workspacesListing(mlClient);
            return await computeOperationsListing(mlClient, workspaces);
        }
        catch (e) {
            logger.debug("Error creating Azure client: " + name, e);
            return [];
        }
    },
    'KexaAzure.mlSchedules': async (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        try {
            const mlClient = new arm_machinelearning_1.AzureMachineLearningWorkspaces(credential, subscriptionId);
            let workspaces = await workspacesListing(mlClient);
            return await schedulesListing(mlClient, workspaces);
        }
        catch (e) {
            logger.debug("Error creating Azure client: " + name, e);
            return [];
        }
    },
    'KexaAzure.storage': (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        return [];
    },
    'KexaAzure.blob': (name, credential, subscriptionId) => {
        logger.debug("Starting " + name + " listing...");
        //listAllBlob();
        return [];
    },
};
async function collectKexaRestructuredData(credential, subscriptionId, currentConfig) {
    let result = await Promise.all(resource_models_1.stringKeys.map(async (element) => {
        return { [element]: await customGatherFunctions[element](element, credential, subscriptionId) };
    }));
    return result.reduce((final, objet) => {
        return { ...final, ...objet };
    }, {});
}
async function virtualMachinesListing(client, monitor) {
    try {
        const resultList = new Array;
        for await (let item of client.virtualMachines.listAll()) {
            let vm = item;
            let rg = item.id?.split("/")[4] ?? "";
            vm.resourceGroupName = rg;
            const promises = [
                getMetrics(monitor, item.id ?? ""),
                getVMDetails(item.hardwareProfile?.vmSize ?? ""),
            ];
            const [metrics, vmDetails] = await Promise.all(promises);
            vm.instanceView = metrics;
            vm.details = vmDetails;
            vm.instanceView.availableMemoryBytes = (0, statsNumbers_1.convertMinMaxMeanMedianToPercentage)(vm.instanceView.availableMemoryBytes, convertGbToBytes(vm.details?.MemoryGb ?? 0));
            resultList.push(vm);
        }
        return resultList ?? [];
    }
    catch (err) {
        logger.debug("error in virtualMachinesListing:" + err);
        return [];
    }
}
exports.virtualMachinesListing = virtualMachinesListing;
function convertGbToBytes(gb) {
    return gb * 1024 * 1024 * 1024;
}
const VMSizeMemory = {};
async function getVMDetails(VMSize) {
    if (VMSizeMemory[VMSize])
        return VMSizeMemory[VMSize];
    try {
        let capabilities = (await axios_1.default.post("https://api.thecloudprices.com/api/props/sku", { "name": VMSize })).data.message.CommonCapabilities;
        capabilities.MemoryGb = parseFloat(capabilities.MemoryGb.$numberDecimal);
        return capabilities;
    }
    catch (err) {
        logger.debug("error in getVMDetails:" + err);
        return null;
    }
}
async function getMetrics(client, vmId) {
    try {
        const vmMetrics = await client.metrics.list(vmId, {
            //get all list of metrics available : az vm monitor metrics list-definitions --name MyVmName --resource-group MyRg --query "@[*].name.value" (select max 20)
            metricnames: "Percentage CPU,Network In,Network Out,Disk Read Operations/Sec,Disk Write Operations/Sec,OS Disk IOPS Consumed Percentage,Data Disk Latency,Available Memory Bytes",
            aggregation: "Average",
            timespan: "P14D",
        });
        let dataMetricsReformat = {};
        for (const metric of vmMetrics.value ?? []) {
            let data = metric.timeseries?.[0].data;
            if (data?.length) {
                let name = (metric.name?.value ?? metric.name?.localizedValue) ?? "";
                if (name == "")
                    continue;
                dataMetricsReformat[name.charAt(0).toLowerCase() + name.slice(1).replace(/ /g, "")] = getMinMaxMeanMedian(data.map((item) => item.average).filter((item) => item != null));
            }
        }
        return dataMetricsReformat;
    }
    catch (err) {
        logger.debug("error in getCPUAndRAMUsage:" + err);
        return null;
    }
}
function getMinMaxMeanMedian(array) {
    let min = array[0];
    let max = array[0];
    let sum = 0;
    for (const num of array) {
        if (num < min)
            min = num;
        if (num > max)
            max = num;
        sum += num;
    }
    return {
        "min": min,
        "max": max,
        "mean": sum / array.length,
        "median": array[Math.floor(array.length / 2)],
    };
}
// verify
async function listAllBlob(client, credentials) {
    logger.info("starting listAllBlob");
    try {
        const resultList = new Array;
        console.log("storage :", test);
        for await (let item of client.storageAccounts.list()) {
            resultList.push(item);
            const blobServiceClient = new storage_blob_1.BlobServiceClient(`https://${item.name}.blob.core.windows.net`, credentials);
            for await (const container of blobServiceClient.listContainers()) {
                console.log(`Container: ${container.name}`);
                for await (const blob of blobServiceClient.getContainerClient(container.name).listBlobsFlat()) {
                    console.log(` - Blob: ${blob.name}`);
                    // Process each blob as needed
                }
            }
        }
        return resultList ?? [];
    }
    catch (err) {
        logger.debug("error in resourceGroupListing:" + err);
        return [];
    }
}
const arm_machinelearning_1 = require("@azure/arm-machinelearning");
const statsNumbers_1 = require("../../helpers/statsNumbers");
async function workspacesListing(mlClient) {
    let workspacesResult = [];
    for await (let item of mlClient.workspaces.listBySubscription()) {
        workspacesResult = [...workspacesResult ?? [], item];
    }
    return workspacesResult ?? [];
}
async function jobsListing(client, workspaces) {
    for (let i = 0; i < workspaces?.length; i++) {
        try {
            let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
            let workspaceName = workspaces[i]?.name ?? "";
            const resArray = new Array();
            for await (let item of client.jobs.list(resourceGroupName, workspaceName)) {
                let result = item;
                result.workspace = workspaceName;
                result.resourceGroupName = resourceGroupName;
                resArray.push(result);
            }
            return resArray ?? [];
        }
        catch (e) {
            logger.debug("error in jobsListing:" + e);
            return [];
        }
    }
}
async function computeOperationsListing(client, workspaces) {
    for (let i = 0; i < workspaces?.length; i++) {
        try {
            let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
            let workspaceName = workspaces[i]?.name ?? "";
            const resArray = new Array();
            for await (let item of client.computeOperations.list(resourceGroupName, workspaceName)) {
                let result = item;
                result.workspace = workspaceName;
                result.resourceGroupName = resourceGroupName;
                resArray.push(item);
            }
            return resArray ?? [];
        }
        catch (e) {
            logger.debug("error in computeOperationsListing:" + e);
            return [];
        }
    }
}
async function schedulesListing(client, workspaces) {
    for (let i = 0; i < workspaces?.length; i++) {
        try {
            let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
            let workspaceName = workspaces[i]?.name ?? "";
            const resArray = new Array();
            for await (let item of client.schedules.list(resourceGroupName, workspaceName)) {
                let result = item;
                result.workspace = workspaceName;
                result.resourceGroupName = resourceGroupName;
                resArray.push(item);
            }
            return resArray ?? [];
        }
        catch (e) {
            logger.debug("error in schedulesListing:" + e);
            return [];
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hZGRPbi9henVyZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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