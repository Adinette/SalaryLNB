import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import { MachineFindRoute } from "../../apis/machine_find_route";
import type { MachineInterface } from "../../interfaces";

/**
 * findMachine action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { elementId }: { elementId: MachineInterface["id"] } - Element ID
 * @returns {Promise<MachineModel | ApiError>}
 */
export async function findMachine(
	store: MachineStore,
	{ elementId }: { elementId: MachineInterface["id"] }
) {
	const apiRoute = new MachineFindRoute({ elementId });
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
