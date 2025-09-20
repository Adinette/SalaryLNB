import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { MachineCreateInterface } from "../../interfaces";

import { MachineCreateRoute } from "../../apis/machine_create_route";

export async function createMachine(store: MachineStore, { data }: { data: MachineCreateInterface }) {
	const apiRoute = new MachineCreateRoute(data);
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
