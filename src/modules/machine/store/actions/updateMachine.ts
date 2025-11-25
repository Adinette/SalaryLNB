// import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import { MachineUpdateRoute } from "../../apis/machine_update_route";
import type { MachineInterface, MachineUpdateInterface } from "../../interfaces";
/**
 * updateMachine action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { elementId, data }: { elementId: MachineInterface["id"], data: MachineUpdateInterface } - Element ID and data to update
 * @returns {Promise<MachineModel | ApiError>}
 */
export async function updateMachine(
	// store: MachineStore,
	{ elementId, data }: { elementId: MachineInterface["id"]; data: MachineUpdateInterface }
) {
	const apiRoute = new MachineUpdateRoute(elementId, data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
