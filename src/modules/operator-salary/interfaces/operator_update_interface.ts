import type { OperatorCreateInterface } from "../../../interfaces";
import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";

export type OperatorUpdateInterface = Omit<OperatorCreateInterface, keyof ApiResourceInterface>;
