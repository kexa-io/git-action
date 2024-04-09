import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Location } from "../operationsInterfaces";
import { ContainerInstanceManagementClient } from "../containerInstanceManagementClient";
import { Usage, LocationListUsageOptionalParams, CachedImages, LocationListCachedImagesOptionalParams, Capabilities, LocationListCapabilitiesOptionalParams } from "../models";
/** Class containing Location operations. */
export declare class LocationImpl implements Location {
    private readonly client;
    /**
     * Initialize a new instance of the class Location class.
     * @param client Reference to the service client
     */
    constructor(client: ContainerInstanceManagementClient);
    /**
     * Get the usage for a subscription
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listUsage(location: string, options?: LocationListUsageOptionalParams): PagedAsyncIterableIterator<Usage>;
    private listUsagePagingPage;
    private listUsagePagingAll;
    /**
     * Get the list of cached images on specific OS type for a subscription in a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCachedImages(location: string, options?: LocationListCachedImagesOptionalParams): PagedAsyncIterableIterator<CachedImages>;
    private listCachedImagesPagingPage;
    private listCachedImagesPagingAll;
    /**
     * Get the list of CPU/memory/GPU capabilities of a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    listCapabilities(location: string, options?: LocationListCapabilitiesOptionalParams): PagedAsyncIterableIterator<Capabilities>;
    private listCapabilitiesPagingPage;
    private listCapabilitiesPagingAll;
    /**
     * Get the usage for a subscription
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    private _listUsage;
    /**
     * Get the list of cached images on specific OS type for a subscription in a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    private _listCachedImages;
    /**
     * Get the list of CPU/memory/GPU capabilities of a region.
     * @param location The identifier for the physical azure location.
     * @param options The options parameters.
     */
    private _listCapabilities;
    /**
     * ListCachedImagesNext
     * @param location The identifier for the physical azure location.
     * @param nextLink The nextLink from the previous successful call to the ListCachedImages method.
     * @param options The options parameters.
     */
    private _listCachedImagesNext;
    /**
     * ListCapabilitiesNext
     * @param location The identifier for the physical azure location.
     * @param nextLink The nextLink from the previous successful call to the ListCapabilities method.
     * @param options The options parameters.
     */
    private _listCapabilitiesNext;
}
//# sourceMappingURL=location.d.ts.map