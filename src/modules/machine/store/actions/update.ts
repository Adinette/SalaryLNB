import type { MachineStore } from "..";
import type { MachineInterface } from "../../interfaces";

/**
 * update action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param {{ id: MachineInterface["id"], data: MachineInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: MachineStore, { id, data }: { id: MachineInterface["id"], data: MachineInterface }) {
  const index = store.elements.findIndex((e:any) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
