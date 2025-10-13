
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { ApiError } from "../../../../api/errors";
import type { MachineStore } from "..";
import { MachineListRoute } from "../../apis/machine_list_route";
/**
 * getMachines action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { args }: { args?: ListApiArgsInterface } = {} - Optional API parameters
 * @returns {Promise<MachineModel[] | ApiError>}
 */
export async function getMachines(store: MachineStore, { args }: { args?: ListApiArgsInterface } = {}) {
	const apiRoute = new MachineListRoute(args);
	const result = await apiRoute.mock();

	if (result instanceof ApiError) return result;

	store.elements = result.map((model) => model.interface);
	return result;
}
