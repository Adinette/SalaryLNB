import type { RoleStore } from "..";
import type { RoleInterface } from "../../interfaces";

/**
 * add action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param {RoleInterface} element - Element to add
 * @returns {void}
 */
export function add(store: RoleStore, element: RoleInterface) {
  store.elements.push(element);
}
