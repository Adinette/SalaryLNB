import type { OperatorSalaryStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { OperatorSalaryCreateInterface } from "../../interfaces";

import { OperatorSalaryCreateRoute } from "../../apis/operator_salary_create_route";

export async function createOperatorSalary(store: OperatorSalaryStore, { data, }: { data: OperatorSalaryCreateInterface }) {
	const apiRoute = new OperatorSalaryCreateRoute(data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
