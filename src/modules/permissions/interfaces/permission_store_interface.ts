import { PermissionInterface } from "./permission_interface";

export interface PermissionStoreInterface extends StoreInterface {
  elements: PermissionInterface[];
}