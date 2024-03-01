import { AwsCredentialIdentity, AwsCredentialIdentityProvider, HttpAuthScheme } from "@smithy/types";
import { DynamoDBStreamsHttpAuthSchemeProvider } from "./httpAuthSchemeProvider";
/**
 * @internal
 */
export interface HttpAuthExtensionConfiguration {
    setHttpAuthScheme(httpAuthScheme: HttpAuthScheme): void;
    httpAuthSchemes(): HttpAuthScheme[];
    setHttpAuthSchemeProvider(httpAuthSchemeProvider: DynamoDBStreamsHttpAuthSchemeProvider): void;
    httpAuthSchemeProvider(): DynamoDBStreamsHttpAuthSchemeProvider;
    setCredentials(credentials: AwsCredentialIdentity | AwsCredentialIdentityProvider): void;
    credentials(): AwsCredentialIdentity | AwsCredentialIdentityProvider | undefined;
}
/**
 * @internal
 */
export type HttpAuthRuntimeConfig = Partial<{
    httpAuthSchemes: HttpAuthScheme[];
    httpAuthSchemeProvider: DynamoDBStreamsHttpAuthSchemeProvider;
    credentials: AwsCredentialIdentity | AwsCredentialIdentityProvider;
}>;
/**
 * @internal
 */
export declare const getHttpAuthExtensionConfiguration: (runtimeConfig: HttpAuthRuntimeConfig) => HttpAuthExtensionConfiguration;
/**
 * @internal
 */
export declare const resolveHttpAuthRuntimeConfig: (config: HttpAuthExtensionConfiguration) => HttpAuthRuntimeConfig;
