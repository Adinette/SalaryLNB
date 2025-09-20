import type { OperatorStore } from "..";
import { appLogger } from "../../../../utils/logger";
import type { OperatorModel } from "../../models/operator-model";


/**
 * setOperators action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param {Object} [payload={}] - Optional parameters
 * @returns {Promise<void>}
 */
export async function setOperators(
	store: OperatorStore,
	payload: { users?: OperatorModel[] } = {}
): Promise<void> {
	store.loading = true;
	appLogger.info(`[🍍][${store.$id}]: Executing setOperators()`);

	store.elements = payload.users || [];

	store.loading = false;
	appLogger.success(`[🍍][${store.$id}]: setOperators() completed`);
}
