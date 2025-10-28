import type { OperatorInterface } from "../../../interfaces";
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
  operator?: OperatorInterface
  operator_id?: OperatorInterface["id"]
  // debours: number;
}