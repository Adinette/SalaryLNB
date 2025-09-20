import { UserStore } from "..";
import { userStoreDefinition } from "../definition";

/**
 * setUsers action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {Object} [payload={}] - Optional parameters
 * @returns {Promise<void>}
 */
export async function setUsers(
	store: UserStore,
	payload: { users?: UserModel[] } = {}
): Promise<void> {
	store.loading = true;
	appLogger.info(`[🍍][${store.$id}]: Executing setUsers()`);

	store.elements = payload.users || [];

	store.loading = false;
	appLogger.success(`[🍍][${store.$id}]: setUsers() completed`);
}
