
import type { RoleStore } from "..";
import type { RoleInterface } from "../../interfaces";
/**
 * find action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param {{ id: RoleInterface["id"] }} payload - ID to find
 * @returns {RoleInterface | undefined}
 */
export function find(store: RoleStore, { id }: { id: RoleInterface["id"] }) {
  return store.elements.find((e) => e.id === id);
}
