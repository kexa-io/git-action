import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { DocumentType as __DocumentType } from "@smithy/types";
import { KendraServiceException as __BaseException } from "./KendraServiceException";
export interface AccessControlConfigurationSummary {
  Id: string | undefined;
}
export interface AccessControlListConfiguration {
  KeyPath?: string;
}
export declare class AccessDeniedException extends __BaseException {
  readonly name: "AccessDeniedException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<AccessDeniedException, __BaseException>
  );
}
export interface AclConfiguration {
  AllowedGroupsColumnName: string | undefined;
}
export declare const HighlightType: {
  readonly STANDARD: "STANDARD";
  readonly THESAURUS_SYNONYM: "THESAURUS_SYNONYM";
};
export type HighlightType = (typeof HighlightType)[keyof typeof HighlightType];
export interface Highlight {
  BeginOffset: number | undefined;
  EndOffset: number | undefined;
  TopAnswer?: boolean;
  Type?: HighlightType;
}
export interface TextWithHighlights {
  Text?: string;
  Highlights?: Highlight[];
}
export interface AdditionalResultAttributeValue {
  TextWithHighlightsValue?: TextWithHighlights;
}
export declare const AdditionalResultAttributeValueType: {
  readonly TEXT_WITH_HIGHLIGHTS_VALUE: "TEXT_WITH_HIGHLIGHTS_VALUE";
};
export type AdditionalResultAttributeValueType =
  (typeof AdditionalResultAttributeValueType)[keyof typeof AdditionalResultAttributeValueType];
export interface AdditionalResultAttribute {
  Key: string | undefined;
  ValueType: AdditionalResultAttributeValueType | undefined;
  Value: AdditionalResultAttributeValue | undefined;
}
export interface DataSourceToIndexFieldMapping {
  DataSourceFieldName: string | undefined;
  DateFieldFormat?: string;
  IndexFieldName: string | undefined;
}
export declare const AlfrescoEntity: {
  readonly blog: "blog";
  readonly documentLibrary: "documentLibrary";
  readonly wiki: "wiki";
};
export type AlfrescoEntity =
  (typeof AlfrescoEntity)[keyof typeof AlfrescoEntity];
export interface S3Path {
  Bucket: string | undefined;
  Key: string | undefined;
}
export interface DataSourceVpcConfiguration {
  SubnetIds: string[] | undefined;
  SecurityGroupIds: string[] | undefined;
}
export interface AlfrescoConfiguration {
  SiteUrl: string | undefined;
  SiteId: string | undefined;
  SecretArn: string | undefined;
  SslCertificateS3Path: S3Path | undefined;
  CrawlSystemFolders?: boolean;
  CrawlComments?: boolean;
  EntityFilter?: AlfrescoEntity[];
  DocumentLibraryFieldMappings?: DataSourceToIndexFieldMapping[];
  BlogFieldMappings?: DataSourceToIndexFieldMapping[];
  WikiFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export declare const EntityType: {
  readonly GROUP: "GROUP";
  readonly USER: "USER";
};
export type EntityType = (typeof EntityType)[keyof typeof EntityType];
export interface EntityConfiguration {
  EntityId: string | undefined;
  EntityType: EntityType | undefined;
}
export interface AssociateEntitiesToExperienceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  EntityList: EntityConfiguration[] | undefined;
}
export interface FailedEntity {
  EntityId?: string;
  ErrorMessage?: string;
}
export interface AssociateEntitiesToExperienceResponse {
  FailedEntityList?: FailedEntity[];
}
export declare class InternalServerException extends __BaseException {
  readonly name: "InternalServerException";
  readonly $fault: "server";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<InternalServerException, __BaseException>
  );
}
export declare class ResourceAlreadyExistException extends __BaseException {
  readonly name: "ResourceAlreadyExistException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ResourceAlreadyExistException, __BaseException>
  );
}
export declare class ResourceNotFoundException extends __BaseException {
  readonly name: "ResourceNotFoundException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ResourceNotFoundException, __BaseException>
  );
}
export declare class ThrottlingException extends __BaseException {
  readonly name: "ThrottlingException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ThrottlingException, __BaseException>
  );
}
export declare class ValidationException extends __BaseException {
  readonly name: "ValidationException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ValidationException, __BaseException>
  );
}
export declare const Persona: {
  readonly OWNER: "OWNER";
  readonly VIEWER: "VIEWER";
};
export type Persona = (typeof Persona)[keyof typeof Persona];
export interface EntityPersonaConfiguration {
  EntityId: string | undefined;
  Persona: Persona | undefined;
}
export interface AssociatePersonasToEntitiesRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  Personas: EntityPersonaConfiguration[] | undefined;
}
export interface AssociatePersonasToEntitiesResponse {
  FailedEntityList?: FailedEntity[];
}
export interface DocumentAttributeValue {
  StringValue?: string;
  StringListValue?: string[];
  LongValue?: number;
  DateValue?: Date;
}
export interface DocumentAttribute {
  Key: string | undefined;
  Value: DocumentAttributeValue | undefined;
}
export declare const AttributeSuggestionsMode: {
  readonly ACTIVE: "ACTIVE";
  readonly INACTIVE: "INACTIVE";
};
export type AttributeSuggestionsMode =
  (typeof AttributeSuggestionsMode)[keyof typeof AttributeSuggestionsMode];
export interface SuggestableConfig {
  AttributeName?: string;
  Suggestable?: boolean;
}
export interface AttributeSuggestionsDescribeConfig {
  SuggestableConfigList?: SuggestableConfig[];
  AttributeSuggestionsMode?: AttributeSuggestionsMode;
}
export interface DataSourceGroup {
  GroupId: string | undefined;
  DataSourceId: string | undefined;
}
export interface UserContext {
  Token?: string;
  UserId?: string;
  Groups?: string[];
  DataSourceGroups?: DataSourceGroup[];
}
export interface AttributeSuggestionsUpdateConfig {
  SuggestableConfigList?: SuggestableConfig[];
  AttributeSuggestionsMode?: AttributeSuggestionsMode;
}
export interface BasicAuthenticationConfiguration {
  Host: string | undefined;
  Port: number | undefined;
  Credentials: string | undefined;
}
export interface AuthenticationConfiguration {
  BasicAuthentication?: BasicAuthenticationConfiguration[];
}
export interface DataSourceSyncJobMetricTarget {
  DataSourceId: string | undefined;
  DataSourceSyncJobId?: string;
}
export interface BatchDeleteDocumentRequest {
  IndexId: string | undefined;
  DocumentIdList: string[] | undefined;
  DataSourceSyncJobMetricTarget?: DataSourceSyncJobMetricTarget;
}
export declare const ErrorCode: {
  readonly INTERNAL_ERROR: "InternalError";
  readonly INVALID_REQUEST: "InvalidRequest";
};
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
export interface BatchDeleteDocumentResponseFailedDocument {
  Id?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export interface BatchDeleteDocumentResponse {
  FailedDocuments?: BatchDeleteDocumentResponseFailedDocument[];
}
export declare class ConflictException extends __BaseException {
  readonly name: "ConflictException";
  readonly $fault: "client";
  Message?: string;
  constructor(opts: __ExceptionOptionType<ConflictException, __BaseException>);
}
export interface BatchDeleteFeaturedResultsSetRequest {
  IndexId: string | undefined;
  FeaturedResultsSetIds: string[] | undefined;
}
export interface BatchDeleteFeaturedResultsSetError {
  Id: string | undefined;
  ErrorCode: ErrorCode | undefined;
  ErrorMessage: string | undefined;
}
export interface BatchDeleteFeaturedResultsSetResponse {
  Errors: BatchDeleteFeaturedResultsSetError[] | undefined;
}
export interface DocumentInfo {
  DocumentId: string | undefined;
  Attributes?: DocumentAttribute[];
}
export interface BatchGetDocumentStatusRequest {
  IndexId: string | undefined;
  DocumentInfoList: DocumentInfo[] | undefined;
}
export declare const DocumentStatus: {
  readonly FAILED: "FAILED";
  readonly INDEXED: "INDEXED";
  readonly NOT_FOUND: "NOT_FOUND";
  readonly PROCESSING: "PROCESSING";
  readonly UPDATED: "UPDATED";
  readonly UPDATE_FAILED: "UPDATE_FAILED";
};
export type DocumentStatus =
  (typeof DocumentStatus)[keyof typeof DocumentStatus];
export interface Status {
  DocumentId?: string;
  DocumentStatus?: DocumentStatus;
  FailureCode?: string;
  FailureReason?: string;
}
export interface BatchGetDocumentStatusResponseError {
  DocumentId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export interface BatchGetDocumentStatusResponse {
  Errors?: BatchGetDocumentStatusResponseError[];
  DocumentStatusList?: Status[];
}
export declare const ConditionOperator: {
  readonly BeginsWith: "BeginsWith";
  readonly Contains: "Contains";
  readonly Equals: "Equals";
  readonly Exists: "Exists";
  readonly GreaterThan: "GreaterThan";
  readonly GreaterThanOrEquals: "GreaterThanOrEquals";
  readonly LessThan: "LessThan";
  readonly LessThanOrEquals: "LessThanOrEquals";
  readonly NotContains: "NotContains";
  readonly NotEquals: "NotEquals";
  readonly NotExists: "NotExists";
};
export type ConditionOperator =
  (typeof ConditionOperator)[keyof typeof ConditionOperator];
export interface DocumentAttributeCondition {
  ConditionDocumentAttributeKey: string | undefined;
  Operator: ConditionOperator | undefined;
  ConditionOnValue?: DocumentAttributeValue;
}
export interface DocumentAttributeTarget {
  TargetDocumentAttributeKey?: string;
  TargetDocumentAttributeValueDeletion?: boolean;
  TargetDocumentAttributeValue?: DocumentAttributeValue;
}
export interface InlineCustomDocumentEnrichmentConfiguration {
  Condition?: DocumentAttributeCondition;
  Target?: DocumentAttributeTarget;
  DocumentContentDeletion?: boolean;
}
export interface HookConfiguration {
  InvocationCondition?: DocumentAttributeCondition;
  LambdaArn: string | undefined;
  S3Bucket: string | undefined;
}
export interface CustomDocumentEnrichmentConfiguration {
  InlineConfigurations?: InlineCustomDocumentEnrichmentConfiguration[];
  PreExtractionHookConfiguration?: HookConfiguration;
  PostExtractionHookConfiguration?: HookConfiguration;
  RoleArn?: string;
}
export declare const ReadAccessType: {
  readonly ALLOW: "ALLOW";
  readonly DENY: "DENY";
};
export type ReadAccessType =
  (typeof ReadAccessType)[keyof typeof ReadAccessType];
export declare const PrincipalType: {
  readonly GROUP: "GROUP";
  readonly USER: "USER";
};
export type PrincipalType = (typeof PrincipalType)[keyof typeof PrincipalType];
export interface Principal {
  Name: string | undefined;
  Type: PrincipalType | undefined;
  Access: ReadAccessType | undefined;
  DataSourceId?: string;
}
export declare const ContentType: {
  readonly CSV: "CSV";
  readonly HTML: "HTML";
  readonly JSON: "JSON";
  readonly MD: "MD";
  readonly MS_EXCEL: "MS_EXCEL";
  readonly MS_WORD: "MS_WORD";
  readonly PDF: "PDF";
  readonly PLAIN_TEXT: "PLAIN_TEXT";
  readonly PPT: "PPT";
  readonly RTF: "RTF";
  readonly XML: "XML";
  readonly XSLT: "XSLT";
};
export type ContentType = (typeof ContentType)[keyof typeof ContentType];
export interface HierarchicalPrincipal {
  PrincipalList: Principal[] | undefined;
}
export interface Document {
  Id: string | undefined;
  Title?: string;
  Blob?: Uint8Array;
  S3Path?: S3Path;
  Attributes?: DocumentAttribute[];
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
  ContentType?: ContentType;
  AccessControlConfigurationId?: string;
}
export interface BatchPutDocumentRequest {
  IndexId: string | undefined;
  RoleArn?: string;
  Documents: Document[] | undefined;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface BatchPutDocumentResponseFailedDocument {
  Id?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export interface BatchPutDocumentResponse {
  FailedDocuments?: BatchPutDocumentResponseFailedDocument[];
}
export declare class ServiceQuotaExceededException extends __BaseException {
  readonly name: "ServiceQuotaExceededException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ServiceQuotaExceededException, __BaseException>
  );
}
export interface ClearQuerySuggestionsRequest {
  IndexId: string | undefined;
}
export interface CreateAccessControlConfigurationRequest {
  IndexId: string | undefined;
  Name: string | undefined;
  Description?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
  ClientToken?: string;
}
export interface CreateAccessControlConfigurationResponse {
  Id: string | undefined;
}
export interface BoxConfiguration {
  EnterpriseId: string | undefined;
  SecretArn: string | undefined;
  UseChangeLog?: boolean;
  CrawlComments?: boolean;
  CrawlTasks?: boolean;
  CrawlWebLinks?: boolean;
  FileFieldMappings?: DataSourceToIndexFieldMapping[];
  TaskFieldMappings?: DataSourceToIndexFieldMapping[];
  CommentFieldMappings?: DataSourceToIndexFieldMapping[];
  WebLinkFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export declare const ConfluenceAttachmentFieldName: {
  readonly AUTHOR: "AUTHOR";
  readonly CONTENT_TYPE: "CONTENT_TYPE";
  readonly CREATED_DATE: "CREATED_DATE";
  readonly DISPLAY_URL: "DISPLAY_URL";
  readonly FILE_SIZE: "FILE_SIZE";
  readonly ITEM_TYPE: "ITEM_TYPE";
  readonly PARENT_ID: "PARENT_ID";
  readonly SPACE_KEY: "SPACE_KEY";
  readonly SPACE_NAME: "SPACE_NAME";
  readonly URL: "URL";
  readonly VERSION: "VERSION";
};
export type ConfluenceAttachmentFieldName =
  (typeof ConfluenceAttachmentFieldName)[keyof typeof ConfluenceAttachmentFieldName];
export interface ConfluenceAttachmentToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceAttachmentFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export interface ConfluenceAttachmentConfiguration {
  CrawlAttachments?: boolean;
  AttachmentFieldMappings?: ConfluenceAttachmentToIndexFieldMapping[];
}
export declare const ConfluenceAuthenticationType: {
  readonly HTTP_BASIC: "HTTP_BASIC";
  readonly PAT: "PAT";
};
export type ConfluenceAuthenticationType =
  (typeof ConfluenceAuthenticationType)[keyof typeof ConfluenceAuthenticationType];
export declare const ConfluenceBlogFieldName: {
  readonly AUTHOR: "AUTHOR";
  readonly DISPLAY_URL: "DISPLAY_URL";
  readonly ITEM_TYPE: "ITEM_TYPE";
  readonly LABELS: "LABELS";
  readonly PUBLISH_DATE: "PUBLISH_DATE";
  readonly SPACE_KEY: "SPACE_KEY";
  readonly SPACE_NAME: "SPACE_NAME";
  readonly URL: "URL";
  readonly VERSION: "VERSION";
};
export type ConfluenceBlogFieldName =
  (typeof ConfluenceBlogFieldName)[keyof typeof ConfluenceBlogFieldName];
export interface ConfluenceBlogToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceBlogFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export interface ConfluenceBlogConfiguration {
  BlogFieldMappings?: ConfluenceBlogToIndexFieldMapping[];
}
export declare const ConfluencePageFieldName: {
  readonly AUTHOR: "AUTHOR";
  readonly CONTENT_STATUS: "CONTENT_STATUS";
  readonly CREATED_DATE: "CREATED_DATE";
  readonly DISPLAY_URL: "DISPLAY_URL";
  readonly ITEM_TYPE: "ITEM_TYPE";
  readonly LABELS: "LABELS";
  readonly MODIFIED_DATE: "MODIFIED_DATE";
  readonly PARENT_ID: "PARENT_ID";
  readonly SPACE_KEY: "SPACE_KEY";
  readonly SPACE_NAME: "SPACE_NAME";
  readonly URL: "URL";
  readonly VERSION: "VERSION";
};
export type ConfluencePageFieldName =
  (typeof ConfluencePageFieldName)[keyof typeof ConfluencePageFieldName];
export interface ConfluencePageToIndexFieldMapping {
  DataSourceFieldName?: ConfluencePageFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export interface ConfluencePageConfiguration {
  PageFieldMappings?: ConfluencePageToIndexFieldMapping[];
}
export interface ProxyConfiguration {
  Host: string | undefined;
  Port: number | undefined;
  Credentials?: string;
}
export declare const ConfluenceSpaceFieldName: {
  readonly DISPLAY_URL: "DISPLAY_URL";
  readonly ITEM_TYPE: "ITEM_TYPE";
  readonly SPACE_KEY: "SPACE_KEY";
  readonly URL: "URL";
};
export type ConfluenceSpaceFieldName =
  (typeof ConfluenceSpaceFieldName)[keyof typeof ConfluenceSpaceFieldName];
export interface ConfluenceSpaceToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceSpaceFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export interface ConfluenceSpaceConfiguration {
  CrawlPersonalSpaces?: boolean;
  CrawlArchivedSpaces?: boolean;
  IncludeSpaces?: string[];
  ExcludeSpaces?: string[];
  SpaceFieldMappings?: ConfluenceSpaceToIndexFieldMapping[];
}
export declare const ConfluenceVersion: {
  readonly CLOUD: "CLOUD";
  readonly SERVER: "SERVER";
};
export type ConfluenceVersion =
  (typeof ConfluenceVersion)[keyof typeof ConfluenceVersion];
export interface ConfluenceConfiguration {
  ServerUrl: string | undefined;
  SecretArn: string | undefined;
  Version: ConfluenceVersion | undefined;
  SpaceConfiguration?: ConfluenceSpaceConfiguration;
  PageConfiguration?: ConfluencePageConfiguration;
  BlogConfiguration?: ConfluenceBlogConfiguration;
  AttachmentConfiguration?: ConfluenceAttachmentConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  ProxyConfiguration?: ProxyConfiguration;
  AuthenticationType?: ConfluenceAuthenticationType;
}
export interface ColumnConfiguration {
  DocumentIdColumnName: string | undefined;
  DocumentDataColumnName: string | undefined;
  DocumentTitleColumnName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  ChangeDetectingColumns: string[] | undefined;
}
export interface ConnectionConfiguration {
  DatabaseHost: string | undefined;
  DatabasePort: number | undefined;
  DatabaseName: string | undefined;
  TableName: string | undefined;
  SecretArn: string | undefined;
}
export declare const DatabaseEngineType: {
  readonly RDS_AURORA_MYSQL: "RDS_AURORA_MYSQL";
  readonly RDS_AURORA_POSTGRESQL: "RDS_AURORA_POSTGRESQL";
  readonly RDS_MYSQL: "RDS_MYSQL";
  readonly RDS_POSTGRESQL: "RDS_POSTGRESQL";
};
export type DatabaseEngineType =
  (typeof DatabaseEngineType)[keyof typeof DatabaseEngineType];
export declare const QueryIdentifiersEnclosingOption: {
  readonly DOUBLE_QUOTES: "DOUBLE_QUOTES";
  readonly NONE: "NONE";
};
export type QueryIdentifiersEnclosingOption =
  (typeof QueryIdentifiersEnclosingOption)[keyof typeof QueryIdentifiersEnclosingOption];
export interface SqlConfiguration {
  QueryIdentifiersEnclosingOption?: QueryIdentifiersEnclosingOption;
}
export interface DatabaseConfiguration {
  DatabaseEngineType: DatabaseEngineType | undefined;
  ConnectionConfiguration: ConnectionConfiguration | undefined;
  VpcConfiguration?: DataSourceVpcConfiguration;
  ColumnConfiguration: ColumnConfiguration | undefined;
  AclConfiguration?: AclConfiguration;
  SqlConfiguration?: SqlConfiguration;
}
export declare const FsxFileSystemType: {
  readonly WINDOWS: "WINDOWS";
};
export type FsxFileSystemType =
  (typeof FsxFileSystemType)[keyof typeof FsxFileSystemType];
export interface FsxConfiguration {
  FileSystemId: string | undefined;
  FileSystemType: FsxFileSystemType | undefined;
  VpcConfiguration: DataSourceVpcConfiguration | undefined;
  SecretArn?: string;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface GitHubDocumentCrawlProperties {
  CrawlRepositoryDocuments?: boolean;
  CrawlIssue?: boolean;
  CrawlIssueComment?: boolean;
  CrawlIssueCommentAttachment?: boolean;
  CrawlPullRequest?: boolean;
  CrawlPullRequestComment?: boolean;
  CrawlPullRequestCommentAttachment?: boolean;
}
export interface OnPremiseConfiguration {
  HostUrl: string | undefined;
  OrganizationName: string | undefined;
  SslCertificateS3Path: S3Path | undefined;
}
export interface SaaSConfiguration {
  OrganizationName: string | undefined;
  HostUrl: string | undefined;
}
export declare const Type: {
  readonly ON_PREMISE: "ON_PREMISE";
  readonly SAAS: "SAAS";
};
export type Type = (typeof Type)[keyof typeof Type];
export interface GitHubConfiguration {
  SaaSConfiguration?: SaaSConfiguration;
  OnPremiseConfiguration?: OnPremiseConfiguration;
  Type?: Type;
  SecretArn: string | undefined;
  UseChangeLog?: boolean;
  GitHubDocumentCrawlProperties?: GitHubDocumentCrawlProperties;
  RepositoryFilter?: string[];
  InclusionFolderNamePatterns?: string[];
  InclusionFileTypePatterns?: string[];
  InclusionFileNamePatterns?: string[];
  ExclusionFolderNamePatterns?: string[];
  ExclusionFileTypePatterns?: string[];
  ExclusionFileNamePatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
  GitHubRepositoryConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubCommitConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueDocumentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueCommentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueAttachmentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestCommentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestDocumentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestDocumentAttachmentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface GoogleDriveConfiguration {
  SecretArn: string | undefined;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
  ExcludeMimeTypes?: string[];
  ExcludeUserAccounts?: string[];
  ExcludeSharedDrives?: string[];
}
export declare const IssueSubEntity: {
  readonly ATTACHMENTS: "ATTACHMENTS";
  readonly COMMENTS: "COMMENTS";
  readonly WORKLOGS: "WORKLOGS";
};
export type IssueSubEntity =
  (typeof IssueSubEntity)[keyof typeof IssueSubEntity];
export interface JiraConfiguration {
  JiraAccountUrl: string | undefined;
  SecretArn: string | undefined;
  UseChangeLog?: boolean;
  Project?: string[];
  IssueType?: string[];
  Status?: string[];
  IssueSubEntityFilter?: IssueSubEntity[];
  AttachmentFieldMappings?: DataSourceToIndexFieldMapping[];
  CommentFieldMappings?: DataSourceToIndexFieldMapping[];
  IssueFieldMappings?: DataSourceToIndexFieldMapping[];
  ProjectFieldMappings?: DataSourceToIndexFieldMapping[];
  WorkLogFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export interface OneDriveUsers {
  OneDriveUserList?: string[];
  OneDriveUserS3Path?: S3Path;
}
export interface OneDriveConfiguration {
  TenantDomain: string | undefined;
  SecretArn: string | undefined;
  OneDriveUsers: OneDriveUsers | undefined;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
  DisableLocalGroups?: boolean;
}
export interface QuipConfiguration {
  Domain: string | undefined;
  SecretArn: string | undefined;
  CrawlFileComments?: boolean;
  CrawlChatRooms?: boolean;
  CrawlAttachments?: boolean;
  FolderIds?: string[];
  ThreadFieldMappings?: DataSourceToIndexFieldMapping[];
  MessageFieldMappings?: DataSourceToIndexFieldMapping[];
  AttachmentFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export interface DocumentsMetadataConfiguration {
  S3Prefix?: string;
}
export interface S3DataSourceConfiguration {
  BucketName: string | undefined;
  InclusionPrefixes?: string[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  DocumentsMetadataConfiguration?: DocumentsMetadataConfiguration;
  AccessControlListConfiguration?: AccessControlListConfiguration;
}
export declare const SalesforceChatterFeedIncludeFilterType: {
  readonly ACTIVE_USER: "ACTIVE_USER";
  readonly STANDARD_USER: "STANDARD_USER";
};
export type SalesforceChatterFeedIncludeFilterType =
  (typeof SalesforceChatterFeedIncludeFilterType)[keyof typeof SalesforceChatterFeedIncludeFilterType];
export interface SalesforceChatterFeedConfiguration {
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  IncludeFilterTypes?: SalesforceChatterFeedIncludeFilterType[];
}
export interface SalesforceCustomKnowledgeArticleTypeConfiguration {
  Name: string | undefined;
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export declare const SalesforceKnowledgeArticleState: {
  readonly ARCHIVED: "ARCHIVED";
  readonly DRAFT: "DRAFT";
  readonly PUBLISHED: "PUBLISHED";
};
export type SalesforceKnowledgeArticleState =
  (typeof SalesforceKnowledgeArticleState)[keyof typeof SalesforceKnowledgeArticleState];
export interface SalesforceStandardKnowledgeArticleTypeConfiguration {
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface SalesforceKnowledgeArticleConfiguration {
  IncludedStates: SalesforceKnowledgeArticleState[] | undefined;
  StandardKnowledgeArticleTypeConfiguration?: SalesforceStandardKnowledgeArticleTypeConfiguration;
  CustomKnowledgeArticleTypeConfigurations?: SalesforceCustomKnowledgeArticleTypeConfiguration[];
}
export interface SalesforceStandardObjectAttachmentConfiguration {
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export declare const SalesforceStandardObjectName: {
  readonly ACCOUNT: "ACCOUNT";
  readonly CAMPAIGN: "CAMPAIGN";
  readonly CASE: "CASE";
  readonly CONTACT: "CONTACT";
  readonly CONTRACT: "CONTRACT";
  readonly DOCUMENT: "DOCUMENT";
  readonly GROUP: "GROUP";
  readonly IDEA: "IDEA";
  readonly LEAD: "LEAD";
  readonly OPPORTUNITY: "OPPORTUNITY";
  readonly PARTNER: "PARTNER";
  readonly PRICEBOOK: "PRICEBOOK";
  readonly PRODUCT: "PRODUCT";
  readonly PROFILE: "PROFILE";
  readonly SOLUTION: "SOLUTION";
  readonly TASK: "TASK";
  readonly USER: "USER";
};
export type SalesforceStandardObjectName =
  (typeof SalesforceStandardObjectName)[keyof typeof SalesforceStandardObjectName];
export interface SalesforceStandardObjectConfiguration {
  Name: SalesforceStandardObjectName | undefined;
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface SalesforceConfiguration {
  ServerUrl: string | undefined;
  SecretArn: string | undefined;
  StandardObjectConfigurations?: SalesforceStandardObjectConfiguration[];
  KnowledgeArticleConfiguration?: SalesforceKnowledgeArticleConfiguration;
  ChatterFeedConfiguration?: SalesforceChatterFeedConfiguration;
  CrawlAttachments?: boolean;
  StandardObjectAttachmentConfiguration?: SalesforceStandardObjectAttachmentConfiguration;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
}
export declare const ServiceNowAuthenticationType: {
  readonly HTTP_BASIC: "HTTP_BASIC";
  readonly OAUTH2: "OAUTH2";
};
export type ServiceNowAuthenticationType =
  (typeof ServiceNowAuthenticationType)[keyof typeof ServiceNowAuthenticationType];
export interface ServiceNowKnowledgeArticleConfiguration {
  CrawlAttachments?: boolean;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  FilterQuery?: string;
}
export interface ServiceNowServiceCatalogConfiguration {
  CrawlAttachments?: boolean;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
  DocumentDataFieldName: string | undefined;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export declare const ServiceNowBuildVersionType: {
  readonly LONDON: "LONDON";
  readonly OTHERS: "OTHERS";
};
export type ServiceNowBuildVersionType =
  (typeof ServiceNowBuildVersionType)[keyof typeof ServiceNowBuildVersionType];
export interface ServiceNowConfiguration {
  HostUrl: string | undefined;
  SecretArn: string | undefined;
  ServiceNowBuildVersion: ServiceNowBuildVersionType | undefined;
  KnowledgeArticleConfiguration?: ServiceNowKnowledgeArticleConfiguration;
  ServiceCatalogConfiguration?: ServiceNowServiceCatalogConfiguration;
  AuthenticationType?: ServiceNowAuthenticationType;
}
export declare const SharePointOnlineAuthenticationType: {
  readonly HTTP_BASIC: "HTTP_BASIC";
  readonly OAUTH2: "OAUTH2";
};
export type SharePointOnlineAuthenticationType =
  (typeof SharePointOnlineAuthenticationType)[keyof typeof SharePointOnlineAuthenticationType];
export declare const SharePointVersion: {
  readonly SHAREPOINT_2013: "SHAREPOINT_2013";
  readonly SHAREPOINT_2016: "SHAREPOINT_2016";
  readonly SHAREPOINT_2019: "SHAREPOINT_2019";
  readonly SHAREPOINT_ONLINE: "SHAREPOINT_ONLINE";
};
export type SharePointVersion =
  (typeof SharePointVersion)[keyof typeof SharePointVersion];
export interface SharePointConfiguration {
  SharePointVersion: SharePointVersion | undefined;
  Urls: string[] | undefined;
  SecretArn: string | undefined;
  CrawlAttachments?: boolean;
  UseChangeLog?: boolean;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  DocumentTitleFieldName?: string;
  DisableLocalGroups?: boolean;
  SslCertificateS3Path?: S3Path;
  AuthenticationType?: SharePointOnlineAuthenticationType;
  ProxyConfiguration?: ProxyConfiguration;
}
export declare const SlackEntity: {
  readonly DIRECT_MESSAGE: "DIRECT_MESSAGE";
  readonly GROUP_MESSAGE: "GROUP_MESSAGE";
  readonly PRIVATE_CHANNEL: "PRIVATE_CHANNEL";
  readonly PUBLIC_CHANNEL: "PUBLIC_CHANNEL";
};
export type SlackEntity = (typeof SlackEntity)[keyof typeof SlackEntity];
export interface SlackConfiguration {
  TeamId: string | undefined;
  SecretArn: string | undefined;
  VpcConfiguration?: DataSourceVpcConfiguration;
  SlackEntityList: SlackEntity[] | undefined;
  UseChangeLog?: boolean;
  CrawlBotMessage?: boolean;
  ExcludeArchived?: boolean;
  SinceCrawlDate: string | undefined;
  LookBackPeriod?: number;
  PrivateChannelFilter?: string[];
  PublicChannelFilter?: string[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface TemplateConfiguration {
  Template?: __DocumentType;
}
export declare const WebCrawlerMode: {
  readonly EVERYTHING: "EVERYTHING";
  readonly HOST_ONLY: "HOST_ONLY";
  readonly SUBDOMAINS: "SUBDOMAINS";
};
export type WebCrawlerMode =
  (typeof WebCrawlerMode)[keyof typeof WebCrawlerMode];
export interface SeedUrlConfiguration {
  SeedUrls: string[] | undefined;
  WebCrawlerMode?: WebCrawlerMode;
}
export interface SiteMapsConfiguration {
  SiteMaps: string[] | undefined;
}
export interface Urls {
  SeedUrlConfiguration?: SeedUrlConfiguration;
  SiteMapsConfiguration?: SiteMapsConfiguration;
}
export interface WebCrawlerConfiguration {
  Urls: Urls | undefined;
  CrawlDepth?: number;
  MaxLinksPerPage?: number;
  MaxContentSizePerPageInMegaBytes?: number;
  MaxUrlsPerMinuteCrawlRate?: number;
  UrlInclusionPatterns?: string[];
  UrlExclusionPatterns?: string[];
  ProxyConfiguration?: ProxyConfiguration;
  AuthenticationConfiguration?: AuthenticationConfiguration;
}
export interface WorkDocsConfiguration {
  OrganizationId: string | undefined;
  CrawlComments?: boolean;
  UseChangeLog?: boolean;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface DataSourceConfiguration {
  S3Configuration?: S3DataSourceConfiguration;
  SharePointConfiguration?: SharePointConfiguration;
  DatabaseConfiguration?: DatabaseConfiguration;
  SalesforceConfiguration?: SalesforceConfiguration;
  OneDriveConfiguration?: OneDriveConfiguration;
  ServiceNowConfiguration?: ServiceNowConfiguration;
  ConfluenceConfiguration?: ConfluenceConfiguration;
  GoogleDriveConfiguration?: GoogleDriveConfiguration;
  WebCrawlerConfiguration?: WebCrawlerConfiguration;
  WorkDocsConfiguration?: WorkDocsConfiguration;
  FsxConfiguration?: FsxConfiguration;
  SlackConfiguration?: SlackConfiguration;
  BoxConfiguration?: BoxConfiguration;
  QuipConfiguration?: QuipConfiguration;
  JiraConfiguration?: JiraConfiguration;
  GitHubConfiguration?: GitHubConfiguration;
  AlfrescoConfiguration?: AlfrescoConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
}
export interface Tag {
  Key: string | undefined;
  Value: string | undefined;
}
export declare const DataSourceType: {
  readonly ALFRESCO: "ALFRESCO";
  readonly BOX: "BOX";
  readonly CONFLUENCE: "CONFLUENCE";
  readonly CUSTOM: "CUSTOM";
  readonly DATABASE: "DATABASE";
  readonly FSX: "FSX";
  readonly GITHUB: "GITHUB";
  readonly GOOGLEDRIVE: "GOOGLEDRIVE";
  readonly JIRA: "JIRA";
  readonly ONEDRIVE: "ONEDRIVE";
  readonly QUIP: "QUIP";
  readonly S3: "S3";
  readonly SALESFORCE: "SALESFORCE";
  readonly SERVICENOW: "SERVICENOW";
  readonly SHAREPOINT: "SHAREPOINT";
  readonly SLACK: "SLACK";
  readonly TEMPLATE: "TEMPLATE";
  readonly WEBCRAWLER: "WEBCRAWLER";
  readonly WORKDOCS: "WORKDOCS";
};
export type DataSourceType =
  (typeof DataSourceType)[keyof typeof DataSourceType];
export interface CreateDataSourceRequest {
  Name: string | undefined;
  IndexId: string | undefined;
  Type: DataSourceType | undefined;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  Description?: string;
  Schedule?: string;
  RoleArn?: string;
  Tags?: Tag[];
  ClientToken?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface CreateDataSourceResponse {
  Id: string | undefined;
}
export interface ContentSourceConfiguration {
  DataSourceIds?: string[];
  FaqIds?: string[];
  DirectPutContent?: boolean;
}
export interface UserIdentityConfiguration {
  IdentityAttributeName?: string;
}
export interface ExperienceConfiguration {
  ContentSourceConfiguration?: ContentSourceConfiguration;
  UserIdentityConfiguration?: UserIdentityConfiguration;
}
export interface CreateExperienceRequest {
  Name: string | undefined;
  IndexId: string | undefined;
  RoleArn?: string;
  Configuration?: ExperienceConfiguration;
  Description?: string;
  ClientToken?: string;
}
export interface CreateExperienceResponse {
  Id: string | undefined;
}
export declare const FaqFileFormat: {
  readonly CSV: "CSV";
  readonly CSV_WITH_HEADER: "CSV_WITH_HEADER";
  readonly JSON: "JSON";
};
export type FaqFileFormat = (typeof FaqFileFormat)[keyof typeof FaqFileFormat];
export interface CreateFaqRequest {
  IndexId: string | undefined;
  Name: string | undefined;
  Description?: string;
  S3Path: S3Path | undefined;
  RoleArn: string | undefined;
  Tags?: Tag[];
  FileFormat?: FaqFileFormat;
  ClientToken?: string;
  LanguageCode?: string;
}
export interface CreateFaqResponse {
  Id?: string;
}
export interface FeaturedDocument {
  Id?: string;
}
export declare const FeaturedResultsSetStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly INACTIVE: "INACTIVE";
};
export type FeaturedResultsSetStatus =
  (typeof FeaturedResultsSetStatus)[keyof typeof FeaturedResultsSetStatus];
export interface CreateFeaturedResultsSetRequest {
  IndexId: string | undefined;
  FeaturedResultsSetName: string | undefined;
  Description?: string;
  ClientToken?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
  Tags?: Tag[];
}
export interface FeaturedResultsSet {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export interface CreateFeaturedResultsSetResponse {
  FeaturedResultsSet?: FeaturedResultsSet;
}
export interface ConflictingItem {
  QueryText?: string;
  SetName?: string;
  SetId?: string;
}
export declare class FeaturedResultsConflictException extends __BaseException {
  readonly name: "FeaturedResultsConflictException";
  readonly $fault: "client";
  Message?: string;
  ConflictingItems?: ConflictingItem[];
  constructor(
    opts: __ExceptionOptionType<
      FeaturedResultsConflictException,
      __BaseException
    >
  );
}
export declare const IndexEdition: {
  readonly DEVELOPER_EDITION: "DEVELOPER_EDITION";
  readonly ENTERPRISE_EDITION: "ENTERPRISE_EDITION";
};
export type IndexEdition = (typeof IndexEdition)[keyof typeof IndexEdition];
export interface ServerSideEncryptionConfiguration {
  KmsKeyId?: string;
}
export declare const UserContextPolicy: {
  readonly ATTRIBUTE_FILTER: "ATTRIBUTE_FILTER";
  readonly USER_TOKEN: "USER_TOKEN";
};
export type UserContextPolicy =
  (typeof UserContextPolicy)[keyof typeof UserContextPolicy];
export declare const UserGroupResolutionMode: {
  readonly AWS_SSO: "AWS_SSO";
  readonly NONE: "NONE";
};
export type UserGroupResolutionMode =
  (typeof UserGroupResolutionMode)[keyof typeof UserGroupResolutionMode];
export interface UserGroupResolutionConfiguration {
  UserGroupResolutionMode: UserGroupResolutionMode | undefined;
}
export interface JsonTokenTypeConfiguration {
  UserNameAttributeField: string | undefined;
  GroupAttributeField: string | undefined;
}
export declare const KeyLocation: {
  readonly SECRET_MANAGER: "SECRET_MANAGER";
  readonly URL: "URL";
};
export type KeyLocation = (typeof KeyLocation)[keyof typeof KeyLocation];
export interface JwtTokenTypeConfiguration {
  KeyLocation: KeyLocation | undefined;
  URL?: string;
  SecretManagerArn?: string;
  UserNameAttributeField?: string;
  GroupAttributeField?: string;
  Issuer?: string;
  ClaimRegex?: string;
}
export interface UserTokenConfiguration {
  JwtTokenTypeConfiguration?: JwtTokenTypeConfiguration;
  JsonTokenTypeConfiguration?: JsonTokenTypeConfiguration;
}
export interface CreateIndexRequest {
  Name: string | undefined;
  Edition?: IndexEdition;
  RoleArn: string | undefined;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  Description?: string;
  ClientToken?: string;
  Tags?: Tag[];
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface CreateIndexResponse {
  Id?: string;
}
export interface CreateQuerySuggestionsBlockListRequest {
  IndexId: string | undefined;
  Name: string | undefined;
  Description?: string;
  SourceS3Path: S3Path | undefined;
  ClientToken?: string;
  RoleArn: string | undefined;
  Tags?: Tag[];
}
export interface CreateQuerySuggestionsBlockListResponse {
  Id?: string;
}
export interface CreateThesaurusRequest {
  IndexId: string | undefined;
  Name: string | undefined;
  Description?: string;
  RoleArn: string | undefined;
  Tags?: Tag[];
  SourceS3Path: S3Path | undefined;
  ClientToken?: string;
}
export interface CreateThesaurusResponse {
  Id?: string;
}
export interface DeleteAccessControlConfigurationRequest {
  IndexId: string | undefined;
  Id: string | undefined;
}
export interface DeleteAccessControlConfigurationResponse {}
export interface DeleteDataSourceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface DeleteExperienceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface DeleteExperienceResponse {}
export interface DeleteFaqRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface DeleteIndexRequest {
  Id: string | undefined;
}
export interface DeletePrincipalMappingRequest {
  IndexId: string | undefined;
  DataSourceId?: string;
  GroupId: string | undefined;
  OrderingId?: number;
}
export interface DeleteQuerySuggestionsBlockListRequest {
  IndexId: string | undefined;
  Id: string | undefined;
}
export interface DeleteThesaurusRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface DescribeAccessControlConfigurationRequest {
  IndexId: string | undefined;
  Id: string | undefined;
}
export interface DescribeAccessControlConfigurationResponse {
  Name: string | undefined;
  Description?: string;
  ErrorMessage?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
}
export interface DescribeDataSourceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export declare const DataSourceStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly UPDATING: "UPDATING";
};
export type DataSourceStatus =
  (typeof DataSourceStatus)[keyof typeof DataSourceStatus];
export interface DescribeDataSourceResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Type?: DataSourceType;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Description?: string;
  Status?: DataSourceStatus;
  Schedule?: string;
  RoleArn?: string;
  ErrorMessage?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface DescribeExperienceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export declare const EndpointType: {
  readonly HOME: "HOME";
};
export type EndpointType = (typeof EndpointType)[keyof typeof EndpointType];
export interface ExperienceEndpoint {
  EndpointType?: EndpointType;
  Endpoint?: string;
}
export declare const ExperienceStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
};
export type ExperienceStatus =
  (typeof ExperienceStatus)[keyof typeof ExperienceStatus];
export interface DescribeExperienceResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Endpoints?: ExperienceEndpoint[];
  Configuration?: ExperienceConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Description?: string;
  Status?: ExperienceStatus;
  RoleArn?: string;
  ErrorMessage?: string;
}
export interface DescribeFaqRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export declare const FaqStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly UPDATING: "UPDATING";
};
export type FaqStatus = (typeof FaqStatus)[keyof typeof FaqStatus];
export interface DescribeFaqResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  S3Path?: S3Path;
  Status?: FaqStatus;
  RoleArn?: string;
  ErrorMessage?: string;
  FileFormat?: FaqFileFormat;
  LanguageCode?: string;
}
export interface DescribeFeaturedResultsSetRequest {
  IndexId: string | undefined;
  FeaturedResultsSetId: string | undefined;
}
export interface FeaturedDocumentMissing {
  Id?: string;
}
export interface FeaturedDocumentWithMetadata {
  Id?: string;
  Title?: string;
  URI?: string;
}
export interface DescribeFeaturedResultsSetResponse {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocumentsWithMetadata?: FeaturedDocumentWithMetadata[];
  FeaturedDocumentsMissing?: FeaturedDocumentMissing[];
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export interface DescribeIndexRequest {
  Id: string | undefined;
}
export interface CapacityUnitsConfiguration {
  StorageCapacityUnits: number | undefined;
  QueryCapacityUnits: number | undefined;
}
export declare const Order: {
  readonly ASCENDING: "ASCENDING";
  readonly DESCENDING: "DESCENDING";
};
export type Order = (typeof Order)[keyof typeof Order];
export interface Relevance {
  Freshness?: boolean;
  Importance?: number;
  Duration?: string;
  RankOrder?: Order;
  ValueImportanceMap?: Record<string, number>;
}
export interface Search {
  Facetable?: boolean;
  Searchable?: boolean;
  Displayable?: boolean;
  Sortable?: boolean;
}
export declare const DocumentAttributeValueType: {
  readonly DATE_VALUE: "DATE_VALUE";
  readonly LONG_VALUE: "LONG_VALUE";
  readonly STRING_LIST_VALUE: "STRING_LIST_VALUE";
  readonly STRING_VALUE: "STRING_VALUE";
};
export type DocumentAttributeValueType =
  (typeof DocumentAttributeValueType)[keyof typeof DocumentAttributeValueType];
export interface DocumentMetadataConfiguration {
  Name: string | undefined;
  Type: DocumentAttributeValueType | undefined;
  Relevance?: Relevance;
  Search?: Search;
}
export interface FaqStatistics {
  IndexedQuestionAnswersCount: number | undefined;
}
export interface TextDocumentStatistics {
  IndexedTextDocumentsCount: number | undefined;
  IndexedTextBytes: number | undefined;
}
export interface IndexStatistics {
  FaqStatistics: FaqStatistics | undefined;
  TextDocumentStatistics: TextDocumentStatistics | undefined;
}
export declare const IndexStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly SYSTEM_UPDATING: "SYSTEM_UPDATING";
  readonly UPDATING: "UPDATING";
};
export type IndexStatus = (typeof IndexStatus)[keyof typeof IndexStatus];
export interface DescribeIndexResponse {
  Name?: string;
  Id?: string;
  Edition?: IndexEdition;
  RoleArn?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  Status?: IndexStatus;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DocumentMetadataConfigurations?: DocumentMetadataConfiguration[];
  IndexStatistics?: IndexStatistics;
  ErrorMessage?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface DescribePrincipalMappingRequest {
  IndexId: string | undefined;
  DataSourceId?: string;
  GroupId: string | undefined;
}
export declare const PrincipalMappingStatus: {
  readonly DELETED: "DELETED";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly PROCESSING: "PROCESSING";
  readonly SUCCEEDED: "SUCCEEDED";
};
export type PrincipalMappingStatus =
  (typeof PrincipalMappingStatus)[keyof typeof PrincipalMappingStatus];
export interface GroupOrderingIdSummary {
  Status?: PrincipalMappingStatus;
  LastUpdatedAt?: Date;
  ReceivedAt?: Date;
  OrderingId?: number;
  FailureReason?: string;
}
export interface DescribePrincipalMappingResponse {
  IndexId?: string;
  DataSourceId?: string;
  GroupId?: string;
  GroupOrderingIdSummaries?: GroupOrderingIdSummary[];
}
export interface DescribeQuerySuggestionsBlockListRequest {
  IndexId: string | undefined;
  Id: string | undefined;
}
export declare const QuerySuggestionsBlockListStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly ACTIVE_BUT_UPDATE_FAILED: "ACTIVE_BUT_UPDATE_FAILED";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly UPDATING: "UPDATING";
};
export type QuerySuggestionsBlockListStatus =
  (typeof QuerySuggestionsBlockListStatus)[keyof typeof QuerySuggestionsBlockListStatus];
export interface DescribeQuerySuggestionsBlockListResponse {
  IndexId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: QuerySuggestionsBlockListStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  SourceS3Path?: S3Path;
  ItemCount?: number;
  FileSizeBytes?: number;
  RoleArn?: string;
}
export interface DescribeQuerySuggestionsConfigRequest {
  IndexId: string | undefined;
}
export declare const Mode: {
  readonly ENABLED: "ENABLED";
  readonly LEARN_ONLY: "LEARN_ONLY";
};
export type Mode = (typeof Mode)[keyof typeof Mode];
export declare const QuerySuggestionsStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly UPDATING: "UPDATING";
};
export type QuerySuggestionsStatus =
  (typeof QuerySuggestionsStatus)[keyof typeof QuerySuggestionsStatus];
export interface DescribeQuerySuggestionsConfigResponse {
  Mode?: Mode;
  Status?: QuerySuggestionsStatus;
  QueryLogLookBackWindowInDays?: number;
  IncludeQueriesWithoutUserInformation?: boolean;
  MinimumNumberOfQueryingUsers?: number;
  MinimumQueryCount?: number;
  LastSuggestionsBuildTime?: Date;
  LastClearTime?: Date;
  TotalSuggestionsCount?: number;
  AttributeSuggestionsConfig?: AttributeSuggestionsDescribeConfig;
}
export interface DescribeThesaurusRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export declare const ThesaurusStatus: {
  readonly ACTIVE: "ACTIVE";
  readonly ACTIVE_BUT_UPDATE_FAILED: "ACTIVE_BUT_UPDATE_FAILED";
  readonly CREATING: "CREATING";
  readonly DELETING: "DELETING";
  readonly FAILED: "FAILED";
  readonly UPDATING: "UPDATING";
};
export type ThesaurusStatus =
  (typeof ThesaurusStatus)[keyof typeof ThesaurusStatus];
export interface DescribeThesaurusResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Description?: string;
  Status?: ThesaurusStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  RoleArn?: string;
  SourceS3Path?: S3Path;
  FileSizeBytes?: number;
  TermCount?: number;
  SynonymRuleCount?: number;
}
export interface DisassociateEntitiesFromExperienceRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  EntityList: EntityConfiguration[] | undefined;
}
export interface DisassociateEntitiesFromExperienceResponse {
  FailedEntityList?: FailedEntity[];
}
export interface DisassociatePersonasFromEntitiesRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  EntityIds: string[] | undefined;
}
export interface DisassociatePersonasFromEntitiesResponse {
  FailedEntityList?: FailedEntity[];
}
export declare const SuggestionType: {
  readonly DOCUMENT_ATTRIBUTES: "DOCUMENT_ATTRIBUTES";
  readonly QUERY: "QUERY";
};
export type SuggestionType =
  (typeof SuggestionType)[keyof typeof SuggestionType];
export interface SourceDocument {
  DocumentId?: string;
  SuggestionAttributes?: string[];
  AdditionalAttributes?: DocumentAttribute[];
}
export interface SuggestionHighlight {
  BeginOffset?: number;
  EndOffset?: number;
}
export interface SuggestionTextWithHighlights {
  Text?: string;
  Highlights?: SuggestionHighlight[];
}
export interface SuggestionValue {
  Text?: SuggestionTextWithHighlights;
}
export interface Suggestion {
  Id?: string;
  Value?: SuggestionValue;
  SourceDocuments?: SourceDocument[];
}
export interface GetQuerySuggestionsResponse {
  QuerySuggestionsId?: string;
  Suggestions?: Suggestion[];
}
export declare const Interval: {
  readonly ONE_MONTH_AGO: "ONE_MONTH_AGO";
  readonly ONE_WEEK_AGO: "ONE_WEEK_AGO";
  readonly THIS_MONTH: "THIS_MONTH";
  readonly THIS_WEEK: "THIS_WEEK";
  readonly TWO_MONTHS_AGO: "TWO_MONTHS_AGO";
  readonly TWO_WEEKS_AGO: "TWO_WEEKS_AGO";
};
export type Interval = (typeof Interval)[keyof typeof Interval];
export declare const MetricType: {
  readonly AGG_QUERY_DOC_METRICS: "AGG_QUERY_DOC_METRICS";
  readonly DOCS_BY_CLICK_COUNT: "DOCS_BY_CLICK_COUNT";
  readonly QUERIES_BY_COUNT: "QUERIES_BY_COUNT";
  readonly QUERIES_BY_ZERO_CLICK_RATE: "QUERIES_BY_ZERO_CLICK_RATE";
  readonly QUERIES_BY_ZERO_RESULT_RATE: "QUERIES_BY_ZERO_RESULT_RATE";
  readonly TREND_QUERY_DOC_METRICS: "TREND_QUERY_DOC_METRICS";
};
export type MetricType = (typeof MetricType)[keyof typeof MetricType];
export interface GetSnapshotsRequest {
  IndexId: string | undefined;
  Interval: Interval | undefined;
  MetricType: MetricType | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface TimeRange {
  StartTime?: Date;
  EndTime?: Date;
}
export interface GetSnapshotsResponse {
  SnapShotTimeFilter?: TimeRange;
  SnapshotsDataHeader?: string[];
  SnapshotsData?: string[][];
  NextToken?: string;
}
export declare class InvalidRequestException extends __BaseException {
  readonly name: "InvalidRequestException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<InvalidRequestException, __BaseException>
  );
}
export interface ListAccessControlConfigurationsRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAccessControlConfigurationsResponse {
  NextToken?: string;
  AccessControlConfigurations: AccessControlConfigurationSummary[] | undefined;
}
export interface ListDataSourcesRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataSourceSummary {
  Name?: string;
  Id?: string;
  Type?: DataSourceType;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: DataSourceStatus;
  LanguageCode?: string;
}
export interface ListDataSourcesResponse {
  SummaryItems?: DataSourceSummary[];
  NextToken?: string;
}
export declare const DataSourceSyncJobStatus: {
  readonly ABORTED: "ABORTED";
  readonly FAILED: "FAILED";
  readonly INCOMPLETE: "INCOMPLETE";
  readonly STOPPING: "STOPPING";
  readonly SUCCEEDED: "SUCCEEDED";
  readonly SYNCING: "SYNCING";
  readonly SYNCING_INDEXING: "SYNCING_INDEXING";
};
export type DataSourceSyncJobStatus =
  (typeof DataSourceSyncJobStatus)[keyof typeof DataSourceSyncJobStatus];
export interface ListDataSourceSyncJobsRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
  StartTimeFilter?: TimeRange;
  StatusFilter?: DataSourceSyncJobStatus;
}
export interface DataSourceSyncJobMetrics {
  DocumentsAdded?: string;
  DocumentsModified?: string;
  DocumentsDeleted?: string;
  DocumentsFailed?: string;
  DocumentsScanned?: string;
}
export interface DataSourceSyncJob {
  ExecutionId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Status?: DataSourceSyncJobStatus;
  ErrorMessage?: string;
  ErrorCode?: ErrorCode;
  DataSourceErrorCode?: string;
  Metrics?: DataSourceSyncJobMetrics;
}
export interface ListDataSourceSyncJobsResponse {
  History?: DataSourceSyncJob[];
  NextToken?: string;
}
export interface ListEntityPersonasRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface PersonasSummary {
  EntityId?: string;
  Persona?: Persona;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface ListEntityPersonasResponse {
  SummaryItems?: PersonasSummary[];
  NextToken?: string;
}
export interface ListExperienceEntitiesRequest {
  Id: string | undefined;
  IndexId: string | undefined;
  NextToken?: string;
}
export interface EntityDisplayData {
  UserName?: string;
  GroupName?: string;
  IdentifiedUserName?: string;
  FirstName?: string;
  LastName?: string;
}
export interface ExperienceEntitiesSummary {
  EntityId?: string;
  EntityType?: EntityType;
  DisplayData?: EntityDisplayData;
}
export interface ListExperienceEntitiesResponse {
  SummaryItems?: ExperienceEntitiesSummary[];
  NextToken?: string;
}
export interface ListExperiencesRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface ExperiencesSummary {
  Name?: string;
  Id?: string;
  CreatedAt?: Date;
  Status?: ExperienceStatus;
  Endpoints?: ExperienceEndpoint[];
}
export interface ListExperiencesResponse {
  SummaryItems?: ExperiencesSummary[];
  NextToken?: string;
}
export interface ListFaqsRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface FaqSummary {
  Id?: string;
  Name?: string;
  Status?: FaqStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  FileFormat?: FaqFileFormat;
  LanguageCode?: string;
}
export interface ListFaqsResponse {
  NextToken?: string;
  FaqSummaryItems?: FaqSummary[];
}
export interface ListFeaturedResultsSetsRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface FeaturedResultsSetSummary {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Status?: FeaturedResultsSetStatus;
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export interface ListFeaturedResultsSetsResponse {
  FeaturedResultsSetSummaryItems?: FeaturedResultsSetSummary[];
  NextToken?: string;
}
export interface ListGroupsOlderThanOrderingIdRequest {
  IndexId: string | undefined;
  DataSourceId?: string;
  OrderingId: number | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface GroupSummary {
  GroupId?: string;
  OrderingId?: number;
}
export interface ListGroupsOlderThanOrderingIdResponse {
  GroupsSummaries?: GroupSummary[];
  NextToken?: string;
}
export interface ListIndicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface IndexConfigurationSummary {
  Name?: string;
  Id?: string;
  Edition?: IndexEdition;
  CreatedAt: Date | undefined;
  UpdatedAt: Date | undefined;
  Status: IndexStatus | undefined;
}
export interface ListIndicesResponse {
  IndexConfigurationSummaryItems?: IndexConfigurationSummary[];
  NextToken?: string;
}
export interface ListQuerySuggestionsBlockListsRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface QuerySuggestionsBlockListSummary {
  Id?: string;
  Name?: string;
  Status?: QuerySuggestionsBlockListStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ItemCount?: number;
}
export interface ListQuerySuggestionsBlockListsResponse {
  BlockListSummaryItems?: QuerySuggestionsBlockListSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string | undefined;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export declare class ResourceUnavailableException extends __BaseException {
  readonly name: "ResourceUnavailableException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ResourceUnavailableException, __BaseException>
  );
}
export interface ListThesauriRequest {
  IndexId: string | undefined;
  NextToken?: string;
  MaxResults?: number;
}
export interface ThesaurusSummary {
  Id?: string;
  Name?: string;
  Status?: ThesaurusStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface ListThesauriResponse {
  NextToken?: string;
  ThesaurusSummaryItems?: ThesaurusSummary[];
}
export interface MemberGroup {
  GroupId: string | undefined;
  DataSourceId?: string;
}
export interface MemberUser {
  UserId: string | undefined;
}
export interface GroupMembers {
  MemberGroups?: MemberGroup[];
  MemberUsers?: MemberUser[];
  S3PathforGroupMembers?: S3Path;
}
export interface PutPrincipalMappingRequest {
  IndexId: string | undefined;
  DataSourceId?: string;
  GroupId: string | undefined;
  GroupMembers: GroupMembers | undefined;
  OrderingId?: number;
  RoleArn?: string;
}
export interface ExpandConfiguration {
  MaxResultItemsToExpand?: number;
  MaxExpandedResultsPerItem?: number;
}
export declare const MissingAttributeKeyStrategy: {
  readonly COLLAPSE: "COLLAPSE";
  readonly EXPAND: "EXPAND";
  readonly IGNORE: "IGNORE";
};
export type MissingAttributeKeyStrategy =
  (typeof MissingAttributeKeyStrategy)[keyof typeof MissingAttributeKeyStrategy];
export declare const SortOrder: {
  readonly ASC: "ASC";
  readonly DESC: "DESC";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export interface SortingConfiguration {
  DocumentAttributeKey: string | undefined;
  SortOrder: SortOrder | undefined;
}
export interface CollapseConfiguration {
  DocumentAttributeKey: string | undefined;
  SortingConfigurations?: SortingConfiguration[];
  MissingAttributeKeyStrategy?: MissingAttributeKeyStrategy;
  Expand?: boolean;
  ExpandConfiguration?: ExpandConfiguration;
}
export interface DocumentRelevanceConfiguration {
  Name: string | undefined;
  Relevance: Relevance | undefined;
}
export declare const QueryResultType: {
  readonly ANSWER: "ANSWER";
  readonly DOCUMENT: "DOCUMENT";
  readonly QUESTION_ANSWER: "QUESTION_ANSWER";
};
export type QueryResultType =
  (typeof QueryResultType)[keyof typeof QueryResultType];
export interface SpellCorrectionConfiguration {
  IncludeQuerySpellCheckSuggestions: boolean | undefined;
}
export interface FeaturedResultsItem {
  Id?: string;
  Type?: QueryResultType;
  AdditionalAttributes?: AdditionalResultAttribute[];
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  FeedbackToken?: string;
}
export interface ExpandedResultItem {
  Id?: string;
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
}
export interface CollapsedResultDetail {
  DocumentAttribute: DocumentAttribute | undefined;
  ExpandedResults?: ExpandedResultItem[];
}
export declare const QueryResultFormat: {
  readonly TABLE: "TABLE";
  readonly TEXT: "TEXT";
};
export type QueryResultFormat =
  (typeof QueryResultFormat)[keyof typeof QueryResultFormat];
export declare const ServerSideEncryptionConfigurationFilterSensitiveLog: (
  obj: ServerSideEncryptionConfiguration
) => any;
export declare const CreateIndexRequestFilterSensitiveLog: (
  obj: CreateIndexRequest
) => any;
export declare const DescribeIndexResponseFilterSensitiveLog: (
  obj: DescribeIndexResponse
) => any;
export declare const EntityDisplayDataFilterSensitiveLog: (
  obj: EntityDisplayData
) => any;
export declare const ExperienceEntitiesSummaryFilterSensitiveLog: (
  obj: ExperienceEntitiesSummary
) => any;
export declare const ListExperienceEntitiesResponseFilterSensitiveLog: (
  obj: ListExperienceEntitiesResponse
) => any;
