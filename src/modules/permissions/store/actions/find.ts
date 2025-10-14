import type { PermissionStore } from "..";
import type { PermissionInterface } from "../../interfaces/permission_interface";
/**
 * find action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param {{ id: PermissionInterface["id"] }} payload - ID to find
 * @returns {PermissionInterface | undefined}
 */
export function find(store: PermissionStore, { id }: { id: PermissionInterface["id"] }) {
  return store.elements.find((e) => e.id === id);
}
