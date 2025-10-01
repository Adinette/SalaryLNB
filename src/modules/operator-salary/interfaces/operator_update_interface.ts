import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorCreateInterface } from "./operator_create_interface";

export type OperatorUpdateInterface = Omit<OperatorCreateInterface, keyof ApiResourceInterface>;
