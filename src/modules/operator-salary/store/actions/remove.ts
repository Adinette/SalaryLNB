import type { OperatorSalaryStore } from "..";
import type { OperatorSalaryInterface } from "../../interfaces";

/**
 * remove action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param {{ id: OperatorSalaryInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: OperatorSalaryStore, { id }: { id: OperatorSalaryInterface["id"] }) {
  store.elements = store.elements.filter((e:any) => e.id !== id);
}
