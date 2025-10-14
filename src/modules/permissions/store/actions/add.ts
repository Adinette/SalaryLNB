import type { PermissionStore } from "..";
import type { PermissionInterface } from "../../interfaces/permission_interface";

/**
 * add action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param {PermissionInterface} element - Element to add
 * @returns {void}
 */
export function add(store: PermissionStore, element: PermissionInterface) {
  store.elements.push(element);
}
