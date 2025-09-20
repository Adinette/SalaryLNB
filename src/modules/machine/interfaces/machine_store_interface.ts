import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { MachineInterface } from "./machine_interface";

export interface MachineStoreInterface extends StoreInterface {
  elements: MachineInterface[];
}