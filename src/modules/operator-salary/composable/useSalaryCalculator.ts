import type { SalaryCalculation } from '../../../stores copy/operators';

export interface SalaryInput {
  chiffreAffaireMensuelttc: number;
  percentCommissionBrute: number;
  percentFraisMomo: number;
  payement: number;
  remboursement?: number;
  dette?: number;
  ecart?: number;
  date: string;
}

// This composable encapsulates the business logic for salary calculation.
export function useSalaryCalculator() {

  const calculate = (input: SalaryInput): Omit<SalaryCalculation, 'operatorName' | 'calculationDate'> => {
    const {
      chiffreAffaireMensuelttc,
      percentCommissionBrute,
      remboursement,
      ecart,
      dette,
      percentFraisMomo,
      payement,
      date,
    } = input;

    const chiffreAffaireHorsTaxe = chiffreAffaireMensuelttc / 1.10;
    const commissionBrute = chiffreAffaireHorsTaxe * (percentCommissionBrute / 100);

    const FEL = 2500;
    const AIB = commissionBrute * 0.05;
    const penalite = ecart! * 0.15;
     // const debours = chiffreAffaireMensuelttc * 0.10;
    const calculatedFraisMomo = payement * percentFraisMomo / 100
    const autresPrelevements = (penalite || 0) + (remboursement || 0) + (dette || 0) + (ecart || 0) + (calculatedFraisMomo || 0);
    console.log("autrePrelevement", penalite, dette, remboursement, ecart, autresPrelevements);
    
    const totalPrelevements = FEL + AIB + autresPrelevements;

    const salaireBrut = commissionBrute - totalPrelevements;

    return {
      chiffreAffaireMensuelttc,
      chiffreAffaireHorsTaxe,
      commissionBrute,
      fel: FEL,
      aib: AIB,
      penalite: (penalite || 0),
       calculatedFraisMomo: (calculatedFraisMomo || 0),
      remboursement: (remboursement || 0),
       dette: (dette || 0),
      ecart: (ecart || 0),
      // debours: (debours || 0),
      totalPrelevements,
      salaireBrut,
      percentCommissionBrute,
      date,
    };
  };

  return {
    calculate,
  };
}
