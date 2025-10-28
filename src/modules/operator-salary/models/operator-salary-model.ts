import { ApiResourceModel } from "../../../models/ApiResourceModel";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import type { OperatorSalaryInterface } from "../interfaces/operator_salary_interface";

export class OperatorSalaryModel
  extends ApiResourceModel
  implements OperatorSalaryInterface
{
  chiffreAffaireMensuelttc: OperatorSalaryInterface["chiffreAffaireMensuelttc"];
  percentCommissionBrute: OperatorSalaryInterface["percentCommissionBrute"];
  dette: OperatorSalaryInterface["dette"];
  remboursement: OperatorSalaryInterface["remboursement"];
  ecart: OperatorSalaryInterface["ecart"];
  date: OperatorSalaryInterface["date"];
  percentFraisMomo: OperatorSalaryInterface["percentFraisMomo"];
  payement: OperatorSalaryInterface["payement"];
  operator?: OperatorSalaryInterface["operator"];
  operator_id?: OperatorSalaryInterface["operator_id"];


  constructor(data: OperatorSalaryInterface) {
    super(data);
    this.chiffreAffaireMensuelttc = data.chiffreAffaireMensuelttc;
    this.percentCommissionBrute = data.percentCommissionBrute;
    this.dette = data.dette;
    this.remboursement = data.remboursement;
    this.ecart = data.ecart;
    this.date = data.date;
    this.percentFraisMomo = data.percentFraisMomo;
    this.payement = data.payement;
    this.operator = data.operator;
    this.operator_id = data.operator_id

  }

get interface(): OperatorSalaryInterface & Partial<OperatorSalaryCreateInterface> {
  return {
    ...super.interface,
    // Champs fournis par l'utilisateur
    chiffreAffaireMensuelttc: this.chiffreAffaireMensuelttc,
    percentCommissionBrute: this.percentCommissionBrute,
    dette: this.dette,
    remboursement: this.remboursement,
    ecart: this.ecart,
    date: this.date,
    percentFraisMomo: this.percentFraisMomo,
    payement: this.payement,
    operator: this.operator,
    operator_id: this.operator_id,

    // Champs calculés
    chiffreAffaireHorsTaxe: this.chiffreAffaireHorsTaxe,
    commissionBrute: this.commissionBrute,
    aib: this.aib,
    fel: this.fel,
    penalite: this.penalite,
    calculatedFraisMomo: this.calculatedFraisMomo,
    totalPrelevements: this.totalPrelevements,
    salaireBrut: this.salaireBrut,
  };
}


// === 🧮 GETTERS CALCULÉS ===
  get chiffreAffaireHorsTaxe() {
    return this.chiffreAffaireMensuelttc / 1.10;
  }

  get commissionBrute() {
    return this.chiffreAffaireHorsTaxe * (this.percentCommissionBrute / 100);
  }

  get aib() {
    return this.commissionBrute * 0.05;
  }

  get fel() {
    return 2500;
  }

  get penalite() {
    return (this.ecart || 0) * 0.15;
  }

  get calculatedFraisMomo() {
    return (this.payement || 0) * (this.percentFraisMomo || 0) / 100;
  }

get autresPrelevements() {
  return (
    Number(this.penalite || 0) +
    Number(this.remboursement || 0) +
    Number(this.dette || 0) +
    Number(this.ecart || 0) +
    Number(this.calculatedFraisMomo || 0)
  );
}


  get totalPrelevements() {
    return this.fel + this.aib + this.autresPrelevements;
  }

  get salaireBrut() {
    return this.commissionBrute - this.totalPrelevements;
  }

  get netSalary() {
    return this.salaireBrut;
  }
}
