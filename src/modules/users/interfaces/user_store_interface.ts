import { UserInterface } from "./user_interface";

export interface UserStoreInterface extends StoreInterface {
  elements: UserInterface[];
}