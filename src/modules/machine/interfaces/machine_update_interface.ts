import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { MachineCreateInterface } from "./machine_create_interface";

export type MachineUpdateInterface = Omit<MachineCreateInterface, keyof ApiResourceInterface>;
