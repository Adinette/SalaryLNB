import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { OperatorSalaryInterface } from "./operator_salary_interface";
export interface OperatorSalaryStoreInterface extends StoreInterface {
  elements: OperatorSalaryInterface[];
}