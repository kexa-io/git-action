import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { KendraServiceException as __BaseException } from "./KendraServiceException";
import {
  AdditionalResultAttribute,
  AttributeSuggestionsUpdateConfig,
  CapacityUnitsConfiguration,
  CollapseConfiguration,
  CollapsedResultDetail,
  CustomDocumentEnrichmentConfiguration,
  DataSourceConfiguration,
  DataSourceVpcConfiguration,
  DocumentAttribute,
  DocumentAttributeValue,
  DocumentAttributeValueType,
  DocumentMetadataConfiguration,
  DocumentRelevanceConfiguration,
  ExperienceConfiguration,
  FeaturedDocument,
  FeaturedResultsItem,
  FeaturedResultsSet,
  FeaturedResultsSetStatus,
  HierarchicalPrincipal,
  Mode,
  Principal,
  QueryResultFormat,
  QueryResultType,
  S3Path,
  SortingConfiguration,
  SpellCorrectionConfiguration,
  SuggestionType,
  Tag,
  TextWithHighlights,
  UserContext,
  UserContextPolicy,
  UserGroupResolutionConfiguration,
  UserTokenConfiguration,
} from "./models_0";
export declare const ScoreConfidence: {
  readonly HIGH: "HIGH";
  readonly LOW: "LOW";
  readonly MEDIUM: "MEDIUM";
  readonly NOT_AVAILABLE: "NOT_AVAILABLE";
  readonly VERY_HIGH: "VERY_HIGH";
};
export type ScoreConfidence =
  (typeof ScoreConfidence)[keyof typeof ScoreConfidence];
export interface ScoreAttributes {
  ScoreConfidence?: ScoreConfidence;
}
export interface TableCell {
  Value?: string;
  TopAnswer?: boolean;
  Highlighted?: boolean;
  Header?: boolean;
}
export interface TableRow {
  Cells?: TableCell[];
}
export interface TableExcerpt {
  Rows?: TableRow[];
  TotalNumberOfRows?: number;
}
export interface QueryResultItem {
  Id?: string;
  Type?: QueryResultType;
  Format?: QueryResultFormat;
  AdditionalAttributes?: AdditionalResultAttribute[];
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  ScoreAttributes?: ScoreAttributes;
  FeedbackToken?: string;
  TableExcerpt?: TableExcerpt;
  CollapsedResultDetail?: CollapsedResultDetail;
}
export interface Correction {
  BeginOffset?: number;
  EndOffset?: number;
  Term?: string;
  CorrectedTerm?: string;
}
export interface SpellCorrectedQuery {
  SuggestedQueryText?: string;
  Corrections?: Correction[];
}
export declare const WarningCode: {
  readonly QUERY_LANGUAGE_INVALID_SYNTAX: "QUERY_LANGUAGE_INVALID_SYNTAX";
};
export type WarningCode = (typeof WarningCode)[keyof typeof WarningCode];
export interface Warning {
  Message?: string;
  Code?: WarningCode;
}
export interface RetrieveResultItem {
  Id?: string;
  DocumentId?: string;
  DocumentTitle?: string;
  Content?: string;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  ScoreAttributes?: ScoreAttributes;
}
export interface RetrieveResult {
  QueryId?: string;
  ResultItems?: RetrieveResultItem[];
}
export declare class ResourceInUseException extends __BaseException {
  readonly name: "ResourceInUseException";
  readonly $fault: "client";
  Message?: string;
  constructor(
    opts: __ExceptionOptionType<ResourceInUseException, __BaseException>
  );
}
export interface StartDataSourceSyncJobRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface StartDataSourceSyncJobResponse {
  ExecutionId?: string;
}
export interface StopDataSourceSyncJobRequest {
  Id: string | undefined;
  IndexId: string | undefined;
}
export interface ClickFeedback {
  ResultId: string | undefined;
  ClickTime: Date | undefined;
}
export declare const RelevanceType: {
  readonly NOT_RELEVANT: "NOT_RELEVANT";
  readonly RELEVANT: "RELEVANT";
};
export type RelevanceType = (typeof RelevanceType)[keyof typeof RelevanceType];
export interface RelevanceFeedback {
  ResultId: string | undefined;
  RelevanceValue: RelevanceType | undefined;
}
export interface SubmitFeedbackRequest {
  IndexId: string | undefined;
  QueryId: string | undefined;
  ClickFeedbackItems?: ClickFeedback[];
  RelevanceFeedbackItems?: RelevanceFeedback[];
}
export interface TagResourceRequest {
  ResourceARN: string | undefined;
  Tags: Tag[] | undefined;
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceARN: string | undefined;
  TagKeys: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateAccessControlConfigurationRequest {
  IndexId: string | undefined;
  Id: string | undefined;
  Name?: string;
  Description?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
}
export interface UpdateAccessControlConfigurationResponse {}
export interface UpdateDataSourceRequest {
  Id: string | undefined;
  Name?: string;
  IndexId: string | undefined;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  Description?: string;
  Schedule?: string;
  RoleArn?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface UpdateExperienceRequest {
  Id: string | undefined;
  Name?: string;
  IndexId: string | undefined;
  RoleArn?: string;
  Configuration?: ExperienceConfiguration;
  Description?: string;
}
export interface UpdateFeaturedResultsSetRequest {
  IndexId: string | undefined;
  FeaturedResultsSetId: string | undefined;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
}
export interface UpdateFeaturedResultsSetResponse {
  FeaturedResultsSet?: FeaturedResultsSet;
}
export interface UpdateIndexRequest {
  Id: string | undefined;
  Name?: string;
  RoleArn?: string;
  Description?: string;
  DocumentMetadataConfigurationUpdates?: DocumentMetadataConfiguration[];
  CapacityUnits?: CapacityUnitsConfiguration;
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface UpdateQuerySuggestionsBlockListRequest {
  IndexId: string | undefined;
  Id: string | undefined;
  Name?: string;
  Description?: string;
  SourceS3Path?: S3Path;
  RoleArn?: string;
}
export interface UpdateQuerySuggestionsConfigRequest {
  IndexId: string | undefined;
  Mode?: Mode;
  QueryLogLookBackWindowInDays?: number;
  IncludeQueriesWithoutUserInformation?: boolean;
  MinimumNumberOfQueryingUsers?: number;
  MinimumQueryCount?: number;
  AttributeSuggestionsConfig?: AttributeSuggestionsUpdateConfig;
}
export interface UpdateThesaurusRequest {
  Id: string | undefined;
  Name?: string;
  IndexId: string | undefined;
  Description?: string;
  RoleArn?: string;
  SourceS3Path?: S3Path;
}
export interface Facet {
  DocumentAttributeKey?: string;
  Facets?: Facet[];
  MaxResults?: number;
}
export interface DocumentAttributeValueCountPair {
  DocumentAttributeValue?: DocumentAttributeValue;
  Count?: number;
  FacetResults?: FacetResult[];
}
export interface FacetResult {
  DocumentAttributeKey?: string;
  DocumentAttributeValueType?: DocumentAttributeValueType;
  DocumentAttributeValueCountPairs?: DocumentAttributeValueCountPair[];
}
export interface AttributeFilter {
  AndAllFilters?: AttributeFilter[];
  OrAllFilters?: AttributeFilter[];
  NotFilter?: AttributeFilter;
  EqualsTo?: DocumentAttribute;
  ContainsAll?: DocumentAttribute;
  ContainsAny?: DocumentAttribute;
  GreaterThan?: DocumentAttribute;
  GreaterThanOrEquals?: DocumentAttribute;
  LessThan?: DocumentAttribute;
  LessThanOrEquals?: DocumentAttribute;
}
export interface QueryResult {
  QueryId?: string;
  ResultItems?: QueryResultItem[];
  FacetResults?: FacetResult[];
  TotalNumberOfResults?: number;
  Warnings?: Warning[];
  SpellCorrectedQueries?: SpellCorrectedQuery[];
  FeaturedResultsItems?: FeaturedResultsItem[];
}
export interface AttributeSuggestionsGetConfig {
  SuggestionAttributes?: string[];
  AdditionalResponseAttributes?: string[];
  AttributeFilter?: AttributeFilter;
  UserContext?: UserContext;
}
export interface RetrieveRequest {
  IndexId: string | undefined;
  QueryText: string | undefined;
  AttributeFilter?: AttributeFilter;
  RequestedDocumentAttributes?: string[];
  DocumentRelevanceOverrideConfigurations?: DocumentRelevanceConfiguration[];
  PageNumber?: number;
  PageSize?: number;
  UserContext?: UserContext;
}
export interface GetQuerySuggestionsRequest {
  IndexId: string | undefined;
  QueryText: string | undefined;
  MaxSuggestionsCount?: number;
  SuggestionTypes?: SuggestionType[];
  AttributeSuggestionsConfig?: AttributeSuggestionsGetConfig;
}
export interface QueryRequest {
  IndexId: string | undefined;
  QueryText?: string;
  AttributeFilter?: AttributeFilter;
  Facets?: Facet[];
  RequestedDocumentAttributes?: string[];
  QueryResultTypeFilter?: QueryResultType;
  DocumentRelevanceOverrideConfigurations?: DocumentRelevanceConfiguration[];
  PageNumber?: number;
  PageSize?: number;
  SortingConfiguration?: SortingConfiguration;
  SortingConfigurations?: SortingConfiguration[];
  UserContext?: UserContext;
  VisitorId?: string;
  SpellCorrectionConfiguration?: SpellCorrectionConfiguration;
  CollapseConfiguration?: CollapseConfiguration;
}
