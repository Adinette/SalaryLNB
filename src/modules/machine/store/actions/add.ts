import type { MachineStore } from "..";
import type { MachineInterface } from "../../interfaces";
/**
 * add action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param {MachineInterface} element - Element to add
 * @returns {void}
 */
export function add(store: MachineStore, element: MachineInterface) {
  store.elements.push(element);
}
