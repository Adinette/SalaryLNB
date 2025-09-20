
import { UserStore } from "../index";
import { UserInterface } from "../../interfaces/user_interface";
/**
 * remove action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {{ id: UserInterface["id"] }} payload - ID to remove
 * @returns {void}
 */
export function remove(store: UserStore, { id }: { id: UserInterface["id"] }) {
  store.elements = store.elements.filter((e) => e.id !== id);
}
