import type { OperatorStore } from "..";
import type { OperatorInterface } from "../../interfaces";

/**
 * remove action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param {{ id: OperatorInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: OperatorStore, { id }: { id: OperatorInterface["id"] }) {
  store.elements = store.elements.filter((e:any) => e.id !== id);
}
