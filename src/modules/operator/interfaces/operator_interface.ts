import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorSalaryInterface } from "./operator_salary_interface";

export interface OperatorInterface extends ApiResourceInterface {
  id: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  machine_id: string;
  salary_history?: OperatorSalaryInterface[];
}