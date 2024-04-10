import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usage, LocationListUsageOptionalParams, CachedImages, LocationListCachedImagesOptionalParams, Capabilities, LocationListCapabilitiesOptionalParams } from "../models";
/** Interface representing a Location. */
export interface Location {
    /**
     * Get the usage for a subscription
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listUsage(location: string, options?: LocationListUsageOptionalParams): PagedAsyncIterableIterator<Usage>;
    /**
     * Get the list of cached images on specific OS type for a subscription in a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCachedImages(location: string, options?: LocationListCachedImagesOptionalParams): PagedAsyncIterableIterator<CachedImages>;
    /**
     * Get the list of CPU/memory/GPU capabilities of a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCapabilities(location: string, options?: LocationListCapabilitiesOptionalParams): PagedAsyncIterableIterator<Capabilities>;
}
//# sourceMappingURL=location.d.ts.map