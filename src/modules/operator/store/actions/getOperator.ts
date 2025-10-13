
import { OperatorListRoute } from "../../apis/operator_list_route";
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { ApiError } from "../../../../api/errors";
import type { OperatorStore } from "..";
/**
 * getOperators action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { args }: { args?: ListApiArgsInterface } = {} - Optional API parameters
 * @returns {Promise<OperatorModel[] | ApiError>}
 */
export async function getOperators(store: OperatorStore, { args }: { args?: ListApiArgsInterface } = {}) {
	const apiRoute = new OperatorListRoute(args);
	const result = await apiRoute.mock();

	if (result instanceof ApiError) return result;

	store.elements = result.map((model) => model.interface);
	return result;
}
