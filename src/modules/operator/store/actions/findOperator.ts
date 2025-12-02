import type { OperatorStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorFindRoute } from "../../apis/operator_find_route";
import type { OperatorInterface } from "../../interfaces";

/**
 * findOperator action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { elementId }: { elementId: OperatorInterface["id"] } - Element ID
 * @returns {Promise<OperatorModel | ApiError>}
 */
export async function findOperator(
	_store: OperatorStore,
	{ elementId }: { elementId: OperatorInterface["id"] }
) {
	const apiRoute = new OperatorFindRoute({ elementId });
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
