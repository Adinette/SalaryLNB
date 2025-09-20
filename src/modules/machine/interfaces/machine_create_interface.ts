import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { MachineInterface } from "./machine_interface";

export type MachineCreateInterface = Omit<MachineInterface, keyof ApiResourceInterface>;



// export interface MachineSalaryCreateInterface {
//   chiffreAffaireMensuelttc: number;
//   percentCommissionBrute: number;
//   percentFraisMomo: number;
//   payement: number;
//   remboursement?: number;
//   dette?: number;
//   ecart?: number;
//   date: string;
// }
