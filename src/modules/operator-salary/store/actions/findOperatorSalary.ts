import type { OperatorSalaryStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorSalaryFindRoute } from "../../apis/operator_salary_find_route";
import type { OperatorSalaryInterface } from "../../interfaces";

/**
 * findOperatorSalary action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param { elementId }: { elementId: OperatorSalaryInterface["id"] } - Element ID
 * @returns {Promise<OperatorSalaryModel | ApiError>}
 */
export async function findOperatorSalary(
	store: OperatorSalaryStore,
	{ elementId }: { elementId: OperatorSalaryInterface["id"] }
) {
	const apiRoute = new OperatorSalaryFindRoute({ elementId });
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
