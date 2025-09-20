import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { OperatorInterface } from "./operator_interface";

export interface OperatorStoreInterface extends StoreInterface {
  elements: OperatorInterface[];
}