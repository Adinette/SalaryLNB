
import { OperatorSalaryListRoute } from "../../apis/operator_salary_list_route";
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { ApiError } from "../../../../api/errors";
import type { OperatorSalaryStore } from "..";
/**
 * getOperatorSalarys action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param { args }: { args?: ListApiArgsInterface } = {} - Optional API parameters
 * @returns {Promise<OperatorSalaryModel[] | ApiError>}
 */
export async function getOperatorSalary(store: OperatorSalaryStore, { args }: { args?: ListApiArgsInterface } = {}) {
	const apiRoute = new OperatorSalaryListRoute(args);
	const result = await apiRoute.request();

	if (result instanceof ApiError) return result;

	store.elements = result.map((model) => model.interface);
	return result;
}
