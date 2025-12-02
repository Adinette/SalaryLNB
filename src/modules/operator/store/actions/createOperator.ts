import type { OperatorStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { OperatorCreateInterface } from "../../interfaces";

import { OperatorCreateRoute } from "../../apis/operator_create_route";

export async function createOperator(
	_store: OperatorStore, 
	{ data }: { data: OperatorCreateInterface }) {
	const apiRoute = new OperatorCreateRoute(data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
