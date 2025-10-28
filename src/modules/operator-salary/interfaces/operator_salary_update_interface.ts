import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorSalaryCreateInterface } from "./operator_salary_create_interface";

export type OperatorSalaryUpdateInterface = Omit<OperatorSalaryCreateInterface, keyof ApiResourceInterface>;
