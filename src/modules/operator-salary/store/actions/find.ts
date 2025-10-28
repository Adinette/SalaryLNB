import type { OperatorSalaryStore } from "..";
import type { OperatorSalaryInterface } from "../../interfaces";

/**
 * find action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param {{ id: OperatorSalaryInterface["id"] }} payload - ID to find
 * @returns {OperatorSalaryInterface | undefined}
 */
export function find(store: OperatorSalaryStore, { id }: { id: OperatorSalaryInterface["id"] }) {
  return store.elements.find((e:any) => e.id === id);
}
