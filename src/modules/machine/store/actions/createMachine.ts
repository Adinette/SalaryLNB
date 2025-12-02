// import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { MachineCreateInterface } from "../../interfaces";

import { MachineCreateRoute } from "../../apis/machine_create_route";
import type { MachineStore } from "..";

export async function createMachine(_store: MachineStore, { data }: { data: MachineCreateInterface }) {
	const apiRoute = new MachineCreateRoute(data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
