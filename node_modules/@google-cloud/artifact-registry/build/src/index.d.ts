import * as v1 from './v1';
import * as v1beta2 from './v1beta2';
declare const ArtifactRegistryClient: typeof v1.ArtifactRegistryClient;
type ArtifactRegistryClient = v1.ArtifactRegistryClient;
export { v1, v1beta2, ArtifactRegistryClient };
declare const _default: {
    v1: typeof v1;
    v1beta2: typeof v1beta2;
    ArtifactRegistryClient: typeof v1.ArtifactRegistryClient;
};
export default _default;
import * as protos from '../protos/protos';
export { protos };
