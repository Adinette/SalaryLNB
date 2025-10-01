import type { OperatorSalaryStore } from "..";
import type { OperatorSalaryInterface } from "../../interfaces";
/**
 * add action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param {OperatorSalaryInterface} element - Element to add
 * @returns {void}
 */
export function add(store: OperatorSalaryStore, element: OperatorSalaryInterface) {
  store.elements.push(element);
}
