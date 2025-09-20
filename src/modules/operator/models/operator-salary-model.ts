// operator-salary.model.ts
import type { OperatorSalaryInterface } from "../interfaces/operator_salary_interface";

export class OperatorSalaryModel implements OperatorSalaryInterface {
  chiffreAffaireMensuelttc: OperatorSalaryInterface["chiffreAffaireMensuelttc"];
  chiffreAffaireHorsTaxe: OperatorSalaryInterface["chiffreAffaireHorsTaxe"];
  commissionBrute: OperatorSalaryInterface["commissionBrute"];
  percentCommissionBrute: OperatorSalaryInterface["percentCommissionBrute"];
  fel: OperatorSalaryInterface["fel"];
  aib: OperatorSalaryInterface["aib"];
  dette: OperatorSalaryInterface["dette"];
  penalite: OperatorSalaryInterface["penalite"];
  calculatedFraisMomo: OperatorSalaryInterface["calculatedFraisMomo"];
  remboursement: OperatorSalaryInterface["remboursement"];
  ecart: OperatorSalaryInterface["ecart"];
  totalPrelevements: OperatorSalaryInterface["totalPrelevements"];
  salaireBrut: OperatorSalaryInterface["salaireBrut"];
  date: OperatorSalaryInterface["date"];

constructor(data: OperatorSalaryInterface) {
    this.chiffreAffaireMensuelttc = data.chiffreAffaireMensuelttc;
    this.chiffreAffaireHorsTaxe = data.chiffreAffaireHorsTaxe;
    this.commissionBrute = data.commissionBrute;
    this.percentCommissionBrute = data.percentCommissionBrute;
    this.fel = data.fel;
    this.aib = data.aib;
    this.dette = data.dette;
    this.penalite = data.penalite;
    this.calculatedFraisMomo = data.calculatedFraisMomo;
    this.remboursement = data.remboursement;
    this.ecart = data.ecart;
    this.totalPrelevements = data.totalPrelevements;
    this.salaireBrut = data.salaireBrut;
    this.date = data.date;
}
//

  get netSalary() {
    return this.salaireBrut;
  }
}
