import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorInterface } from "./operator_interface";

export type OperatorCreateInterface = Omit<OperatorInterface, 
keyof
 ApiResourceInterface | "machine"> & {
    machine_id: string;
};

