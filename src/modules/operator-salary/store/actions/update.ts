import type { OperatorSalaryStore } from "..";
import type { OperatorSalaryInterface } from "../../interfaces";

/**
 * update action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param {{ id: OperatorSalaryInterface["id"], data: OperatorSalaryInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: OperatorSalaryStore, { id, data }: { id: OperatorSalaryInterface["id"], data: OperatorSalaryInterface }) {
  const index = store.elements.findIndex((e:any) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
