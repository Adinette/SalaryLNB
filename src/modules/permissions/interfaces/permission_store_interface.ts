import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { PermissionInterface } from "./permission_interface";

export interface PermissionStoreInterface extends StoreInterface {
  elements: PermissionInterface[];
}