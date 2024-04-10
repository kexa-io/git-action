import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operation, OperationsListOptionalParams } from "../models";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * List the operations for Azure Container Instance service.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}
//# sourceMappingURL=operations.d.ts.map