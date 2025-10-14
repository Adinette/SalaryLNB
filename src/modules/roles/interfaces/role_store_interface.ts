import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { RoleInterface } from "./role_interface";

export interface RoleStoreInterface extends StoreInterface {
  elements: RoleInterface[];
}