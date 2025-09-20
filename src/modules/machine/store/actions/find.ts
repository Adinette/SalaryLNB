import type { MachineStore } from "..";
import type { MachineInterface } from "../../interfaces";

/**
 * find action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param {{ id: MachineInterface["id"] }} payload - ID to find
 * @returns {MachineInterface | undefined}
 */
export function find(store: MachineStore, { id }: { id: MachineInterface["id"] }) {
  return store.elements.find((e:any) => e.id === id);
}
