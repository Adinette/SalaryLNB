
import {UserInterface} from "../../interfaces/user_interface";
import { UserStore } from "../index";
/**
 * find action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param {{ id: UserInterface["id"] }} payload - ID to find
 * @returns {UserInterface | undefined}
 */
export function find(store: UserStore, { id }: { id: UserInterface["id"] }) {
  return store.elements.find((e) => e.id === id);
}
