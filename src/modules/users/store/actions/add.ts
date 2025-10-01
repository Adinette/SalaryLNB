import type { UserStore } from "..";
import type { UserInterface } from "../../interfaces";
/**
 * add action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {UserInterface} element - Element to add
 * @returns {void}
 */
export function add(store: UserStore, element: UserInterface) {
  store.elements.push(element);
}
