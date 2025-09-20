import type { MachineStore } from "..";
import { appLogger } from "../../../../utils/logger";
import type { MachineModel } from "../../models/machine-model";


/**
 * setMachines action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param {Object} [payload={}] - Optional parameters
 * @returns {Promise<void>}
 */
export async function setMachines(
	store: MachineStore,
	payload: { users?: MachineModel[] } = {}
): Promise<void> {
	store.loading = true;
	appLogger.info(`[🍍][${store.$id}]: Executing setMachines()`);

	store.elements = payload.users || [];

	store.loading = false;
	appLogger.success(`[🍍][${store.$id}]: setMachines() completed`);
}
