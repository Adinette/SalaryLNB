import type { OperatorStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorDeleteRoute } from "../../apis/operator_delete_route";
import type { OperatorInterface } from "../../interfaces";
/**
 * deleteOperator action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { elementId }: { elementId: OperatorInterface["id"] } - Element ID
 * @returns {Promise<OperatorModel | ApiError>}
 */
export async function deleteOperator(
	_store: OperatorStore,
	{ elementId }: { elementId: OperatorInterface["id"] }
) {
	const apiRoute = new OperatorDeleteRoute(elementId);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
