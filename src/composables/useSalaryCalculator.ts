import type { SalaryCalculation } from '@/stores/operators';

export interface SalaryInput {
  chiffreAffaireMensuelttc: number;
  percentCommissionBrute: number;
  remboursement?: number;
  ecart?: number;
}

// This composable encapsulates the business logic for salary calculation.
export function useSalaryCalculator() {

  const calculate = (input: SalaryInput): Omit<SalaryCalculation, 'operatorName' | 'calculationDate'> => {
    const {
      chiffreAffaireMensuelttc,
      percentCommissionBrute,
      remboursement,
      ecart,
    } = input;

    const chiffreAffaireFinal = chiffreAffaireMensuelttc / 1.10;
    const chiffreAffaireHorsTaxe = chiffreAffaireFinal * 0.06;

    const FEL = 2500;
    const AIB = chiffreAffaireHorsTaxe * 0.05;
        const penalite = ecart! * 0.15;
          const debours = chiffreAffaireMensuelttc * 0.10;

    const autresPrelevements = (debours || 0) + (penalite || 0) + (remboursement || 0) + (ecart || 0);
    const totalPrelevements = FEL + AIB + autresPrelevements;

    const salaireBrut = chiffreAffaireHorsTaxe - totalPrelevements;

    return {
      chiffreAffaireMensuelttc,
      chiffreAffaireFinal,
      chiffreAffaireHorsTaxe,
      fel: FEL,
      aib: AIB,
      penalite: (penalite || 0),
      remboursement: (remboursement || 0),
      ecart: (ecart || 0),
      debours: (debours || 0),
      totalPrelevements,
      salaireBrut,
      percentCommissionBrute,
      dette: 0, // or calculate the correct value for 'dette' if needed
    };
  };

  return {
    calculate,
  };
}
