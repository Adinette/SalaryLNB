
import { UserStore } from "../index";
import { UserInterface } from "../../interfaces/user_interface";
/**
 * update action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {{ id: UserInterface["id"], data: UserInterface }} payload - Data to update
 * @returns {void}
 */
export function update(store: UserStore, { id, data }: { id: UserInterface["id"], data: UserInterface }) {
  const index = store.elements.findIndex((e) => e.id === id);
  if (index !== -1) {
    store.elements[index] = { ...store.elements[index], ...data };
  }
}
