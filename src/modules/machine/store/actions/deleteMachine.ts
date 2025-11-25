// import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import { MachineDeleteRoute } from "../../apis/machine_delete_route";
import type { MachineInterface } from "../../interfaces";
/**
 * deleteMachine action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { elementId }: { elementId: MachineInterface["id"] } - Element ID
 * @returns {Promise<MachineModel | ApiError>}
 */
export async function deleteMachine(
	// store: MachineStore,
	{ elementId }: { elementId: MachineInterface["id"] }
) {
	const apiRoute = new MachineDeleteRoute(elementId);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
