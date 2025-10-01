import type { OperatorSalaryStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorSalaryDeleteRoute } from "../../apis/operator_salary_delete_route";
import type { OperatorSalaryInterface } from "../../interfaces";
/**
 * deleteOperatorSalary action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param { elementId }: { elementId: OperatorSalaryInterface["id"] } - Element ID
 * @returns {Promise<OperatorSalaryModel | ApiError>}
 */
export async function deleteOperatorSalary(
	store: OperatorSalaryStore,
	{ elementId }: { elementId: OperatorSalaryInterface["id"] }
) {
	const apiRoute = new OperatorSalaryDeleteRoute(elementId);
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
