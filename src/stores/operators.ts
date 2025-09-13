import { defineStore } from 'pinia'
import { ref } from 'vue'

// --- TYPE DEFINITIONS ---

// This interface now includes each specific deduction for historical accuracy.
export interface SalaryCalculation {
  operatorName?: string; // Optional: To store the name at the time of calculation
    tel?: string;
  chiffreAffaireMensuelttc: number;
  chiffreAffaireHorsTaxe: number;
  commissionBrute:number
  percentCommissionBrute:number;
  fel: number;
  aib: number;
  dette: number;
  penalite: number;
  calculatedFraisMomo: number;
  remboursement: number;
  ecart: number;
  totalPrelevements: number;
  salaireBrut: number;
  date: string;
  // debours: number;
}

export interface Operator {
  id: string;
  last_name: string;
  first_name: string;
  tel: string;
  machineId: string;
  salaryHistory: SalaryCalculation[];
}

export const useOperatorsStore = defineStore('operators', () => {
  // --- STATE ---
  const operators = ref<Operator[]>([
    // {
    //   id: "1",
    //   last_name: 'Dupont',
    //   first_name: 'Jean',
    //   tel: '0612345678',
    //   machineId: 'MACHINE-001',
    //   salaryHistory: [],
    // },
    // {
    //   id: "2",
    //   last_name: 'Curie',
    //   first_name: 'Marie',
    //   tel: '0687654321',
    //   machineId: 'MACHINE-002',
    //   salaryHistory: [],
    // },
  ]);

  // --- ACTIONS ---

  function addOperator(op: Omit<Operator, 'id' | 'salaryHistory'>) {
    // const newId = operators.value.length > 0 ? Math.max(...operators.value.map(o => o.id)) + 1 : 1;
    operators.value.push({
      ...op,
      id: crypto.randomUUID(),
      salaryHistory: [],
    });
  }

  function updateOperator(op: Operator) {
    const index = operators.value.findIndex(o => o.id === op.id);
    if (index !== -1) {
      operators.value[index] = op;
    }
  }

  function deleteOperator(operatorId: string) {
    const index = operators.value.findIndex(o => o.id === operatorId);
    if (index !== -1) {
      operators.value.splice(index, 1);
    }
  }

function addSalaryRecord(operatorId: string, record: SalaryCalculation) {
  const operator = operators.value.find(o => o.id === operatorId);
  if (!operator) return;

  // Toujours ajouter le nom
  record.operatorName = `${operator.first_name} ${operator.last_name}`;

  // Sécuriser l'initialisation
  if (!Array.isArray(operator.salaryHistory)) {
    operator.salaryHistory = [];
  }

  // Ajouter le nouveau record
  operator.salaryHistory.unshift(record);

  // Garder max 3
  if (operator.salaryHistory.length > 3) {
    operator.salaryHistory.pop();
  }
}


  return {
    operators,
    addOperator,
    updateOperator,
    deleteOperator,
    addSalaryRecord,
  }
}, {
  persist: true, // Enable persistence for this store
});
