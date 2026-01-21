import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { OperatorSalaryInterface } from "./operator_salary_interface";

export type OperatorSalaryCreateInterface = Omit<
  OperatorSalaryInterface,
  keyof ApiResourceInterface | "operator"
> & {
  operator_id: string;
  // chiffreAffaireHorsTaxe?: number;
  // commissionBrute?: number;
  // aib?: number;
  // penalite?: number;
  // calculatedFraisMomo?: number;
  // fel?: number;
};


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
