import type { OperatorStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorUpdateRoute } from "../../apis/operator_update_route";
import type { OperatorInterface, OperatorUpdateInterface } from "../../interfaces";
/**
 * updateOperator action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { elementId, data }: { elementId: OperatorInterface["id"], data: OperatorUpdateInterface } - Element ID and data to update
 * @returns {Promise<OperatorModel | ApiError>}
 */
export async function updateOperator(
	store: OperatorStore,
	{ elementId, data }: { elementId: OperatorInterface["id"]; data: OperatorUpdateInterface }
) {
	const apiRoute = new OperatorUpdateRoute(elementId, data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
