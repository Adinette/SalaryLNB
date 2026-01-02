import type { OperatorSalaryStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorSalaryUpdateRoute } from "../../apis/operator_salary_update_route";
import type { OperatorSalaryInterface, OperatorSalaryUpdateInterface } from "../../interfaces";
/**
 * updateOperatorSalary action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param { elementId, data }: { elementId: OperatorSalaryInterface["id"], data: OperatorSalaryUpdateInterface } - Element ID and data to update
 * @returns {Promise<OperatorSalaryModel | ApiError>}s
 */
export async function updateOperatorSalary(
	_store: OperatorSalaryStore,
	{ elementId, data }: { elementId: OperatorSalaryInterface["id"]; data: OperatorSalaryUpdateInterface }
) {
	const apiRoute = new OperatorSalaryUpdateRoute(elementId, data);
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
