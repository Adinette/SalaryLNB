import type { MachineStore } from "..";
import type { MachineInterface } from "../../interfaces";

/**
 * remove action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param {{ id: MachineInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: MachineStore, { id }: { id: MachineInterface["id"] }) {
  store.elements = store.elements.filter((e:any) => e.id !== id);
}
