import type { OperatorStore } from "..";
import type { OperatorInterface } from "../../interfaces";

/**
 * update action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param {{ id: OperatorInterface["id"], data: OperatorInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: OperatorStore, { id, data }: { id: OperatorInterface["id"], data: OperatorInterface }) {
  const index = store.elements.findIndex((e:any) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
