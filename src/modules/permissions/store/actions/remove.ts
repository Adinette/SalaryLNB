import type { PermissionStore } from "..";
import type { PermissionInterface } from "../../interfaces/permission_interface";
/**
 * remove action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param {{ id: PermissionInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: PermissionStore, { id }: { id: PermissionInterface["id"] }) {
  store.elements = store.elements.filter((e) => e.id !== id);
}
