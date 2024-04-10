import {
  AwsSdkSigV4AuthInputConfig,
  AwsSdkSigV4AuthResolvedConfig,
  AwsSdkSigV4PreviouslyResolved,
} from "@aws-sdk/core";
import {
  HandlerExecutionContext,
  HttpAuthScheme,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
} from "@smithy/types";
import { DynamoDBStreamsClientResolvedConfig } from "../DynamoDBStreamsClient";
export interface DynamoDBStreamsHttpAuthSchemeParameters
  extends HttpAuthSchemeParameters {
  region?: string;
}
export interface DynamoDBStreamsHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    DynamoDBStreamsClientResolvedConfig,
    HandlerExecutionContext,
    DynamoDBStreamsHttpAuthSchemeParameters,
    object
  > {}
export declare const defaultDynamoDBStreamsHttpAuthSchemeParametersProvider: (
  config: DynamoDBStreamsClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
) => Promise<DynamoDBStreamsHttpAuthSchemeParameters>;
export interface DynamoDBStreamsHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<DynamoDBStreamsHttpAuthSchemeParameters> {}
export declare const defaultDynamoDBStreamsHttpAuthSchemeProvider: DynamoDBStreamsHttpAuthSchemeProvider;
export interface HttpAuthSchemeInputConfig extends AwsSdkSigV4AuthInputConfig {
  httpAuthSchemes?: HttpAuthScheme[];
  httpAuthSchemeProvider?: DynamoDBStreamsHttpAuthSchemeProvider;
}
export interface HttpAuthSchemeResolvedConfig
  extends AwsSdkSigV4AuthResolvedConfig {
  readonly httpAuthSchemes: HttpAuthScheme[];
  readonly httpAuthSchemeProvider: DynamoDBStreamsHttpAuthSchemeProvider;
}
export declare const resolveHttpAuthSchemeConfig: <T>(
  config: T & HttpAuthSchemeInputConfig & AwsSdkSigV4PreviouslyResolved
) => T & HttpAuthSchemeResolvedConfig;
