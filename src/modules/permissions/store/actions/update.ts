import type { PermissionStore } from "..";
import type { PermissionInterface } from "../../interfaces/permission_interface";
/**
 * update action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param {{ id: PermissionInterface["id"], data: PermissionInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: PermissionStore, { id, data }: { id: PermissionInterface["id"], data: PermissionInterface }) {
  const index = store.elements.findIndex((e) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
