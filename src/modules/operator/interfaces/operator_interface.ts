import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { MachineInterface } from "../../machine/interfaces";

export interface OperatorInterface extends ApiResourceInterface {
  id: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  is_active?: boolean;
  machine: MachineInterface;
  machine_id?: MachineInterface["id"]
}