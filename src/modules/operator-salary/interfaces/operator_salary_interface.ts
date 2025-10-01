import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";

export interface OperatorSalaryInterface extends ApiResourceInterface {
  chiffreAffaireMensuelttc: number;
  percentCommissionBrute:number;
  dette: number;
  remboursement: number;
  ecart: number;
  totalPrelevements: number;
  salaireBrut: number;
  date: string;
  percentFraisMomo: number;
  payement: number;
  // debours: number;
}