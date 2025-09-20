/**
 * Generic arguments for list API requests, including search and pagination.
 */
export interface ListApiArgsInterface {
	/** Optional search keyword */
	search?: string;

	/** Page number for pagination */
	page?: number;
}
