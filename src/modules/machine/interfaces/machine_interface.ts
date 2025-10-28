import type { OperatorInterface } from "../../../interfaces";
import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";

export interface MachineInterface extends ApiResourceInterface {
  code: string;
  emplacement: string;
  is_active?: boolean;
  operator_id?: OperatorInterface["id"] | null;
}