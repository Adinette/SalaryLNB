import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorInterface } from "./operator_interface";

export type OperatorCreateInterface = Omit<OperatorInterface, keyof ApiResourceInterface>;



// export interface OperatorSalaryCreateInterface {
//   chiffreAffaireMensuelttc: number;
//   percentCommissionBrute: number;
//   percentFraisMomo: number;
//   payement: number;
//   remboursement?: number;
//   dette?: number;
//   ecart?: number;
//   date: string;
// }
