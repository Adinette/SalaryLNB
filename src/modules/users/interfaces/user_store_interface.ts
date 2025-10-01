import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { UserInterface } from "./user_interface";

export interface UserStoreInterface extends StoreInterface {
  elements: UserInterface[];
}