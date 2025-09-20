import type { OperatorStore } from "..";
import type { OperatorInterface } from "../../interfaces";
/**
 * add action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param {OperatorInterface} element - Element to add
 * @returns {void}
 */
export function add(store: OperatorStore, element: OperatorInterface) {
  store.elements.push(element);
}
