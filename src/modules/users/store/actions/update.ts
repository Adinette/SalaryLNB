import type { UserStore } from "..";
import type { UserInterface } from "../../interfaces";

/**
 * update action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {{ id: UserInterface["id"], data: UserInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: UserStore, { id, data }: { id: UserInterface["id"], data: UserInterface }) {
  const index = store.elements.findIndex((e: UserInterface) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
