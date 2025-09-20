import type { OperatorStore } from "..";
import type { OperatorInterface } from "../../interfaces";

/**
 * find action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param {{ id: OperatorInterface["id"] }} payload - ID to find
 * @returns {OperatorInterface | undefined}
 */
export function find(store: OperatorStore, { id }: { id: OperatorInterface["id"] }) {
  return store.elements.find((e:any) => e.id === id);
}
