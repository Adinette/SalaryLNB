
import type { RoleStore } from "..";
import type { RoleInterface } from "../../interfaces";
/**
 * update action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param {{ id: RoleInterface["id"], data: RoleInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: RoleStore, { id, data }: { id: RoleInterface["id"], data: RoleInterface }) {
  const index = store.elements.findIndex((e) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
