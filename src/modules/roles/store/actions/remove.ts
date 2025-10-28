import type { RoleStore } from "..";
import type { RoleInterface } from "../../interfaces";
/**
 * remove action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param {{ id: RoleInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: RoleStore, { id }: { id: RoleInterface["id"] }) {
  store.elements = store.elements.filter((e) => e.id !== id);
}
