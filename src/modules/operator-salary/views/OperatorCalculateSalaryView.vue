<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref } from "vue";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { toast } from "../../../utils/toast";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import { faker } from "@faker-js/faker";
import router from "../../../router";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";

const logger = createLogger("operatorAddView");

const form = ref<OperatorSalaryCreateInterface>({
  date: "",
  chiffreAffaireMensuelttc: 0,
  chiffreAffaireHorsTaxe: 0,
  percentCommissionBrute: 0,
	commissionBrute: 0,
	fel:0,
	aib:0,
	penalite:0,
	calculatedFraisMomo:0,
  dette: 0,
  remboursement: 0,
  ecart: 0,
  totalPrelevements: 0,
  salaireBrut: 0,
  percentFraisMomo: 0,
  payement: 0,
  operator_id:"",
});

const fieldsErrors = ref<{ [key in keyof OperatorSalaryCreateInterface]: string[] }>({
  date: [],
  chiffreAffaireMensuelttc: [],
  chiffreAffaireHorsTaxe: [],
  percentCommissionBrute: [],
	commissionBrute: [],
	fel:[],
	aib:[],
	penalite:[],
	calculatedFraisMomo:[],
  dette: [],
  remboursement: [],
  ecart: [],
  totalPrelevements: [],
  salaireBrut: [],
  percentFraisMomo: [],
  payement: [],
  operator_id:[],
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Calculer le salaire de l'opérateur";
const actionText = "Calculer";
const actionIcon = "fa fa-calculator";

const { processing: loading, createOperatorSalary: create } = useOperatorSalaryActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.date = apiError.data.date || [];
  fieldsErrors.value.chiffreAffaireMensuelttc = apiError.data.chiffreAffaireMensuelttc || [];
  fieldsErrors.value.chiffreAffaireHorsTaxe = apiError.data.chiffreAffaireHorsTaxe || [];
  fieldsErrors.value.percentCommissionBrute = apiError.data.percentCommissionBrute || [];
  fieldsErrors.value.commissionBrute = apiError.data.commissionBrute || [];
  fieldsErrors.value.fel = apiError.data.fel || [];
  fieldsErrors.value.aib = apiError.data.aib || [];
  fieldsErrors.value.penalite = apiError.data.penalite || [];
  fieldsErrors.value.calculatedFraisMomo = apiError.data.calculatedFraisMomo || [];
  fieldsErrors.value.dette = apiError.data.dette || [];
  fieldsErrors.value.remboursement = apiError.data.remboursement || [];
  fieldsErrors.value.ecart = apiError.data.ecart || [];
  fieldsErrors.value.totalPrelevements = apiError.data.totalPrelevements || [];
  fieldsErrors.value.salaireBrut = apiError.data.salaireBrut || [];
  fieldsErrors.value.percentFraisMomo = apiError.data.percentFraisMomo || [];
  fieldsErrors.value.payement = apiError.data.payement || [];
  fieldsErrors.value.operator_id = apiError.data.operator_id || [];
};

const createOperatorSalary = async (operator: OperatorSalaryCreateInterface) => {
  logger.info("Calcul de salaire", operator);
  const result = await create(operator);
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors du calcul de salaire", result);
    }
    alert.value = {
      type: "danger",
      id: faker.string.uuid(),
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Calcul de salaire effectué avec succès", result);
  return true;
};

const resetForm = () => {
  fieldsErrors.value = {
  date: [],
  chiffreAffaireMensuelttc: [],
  chiffreAffaireHorsTaxe: [],
  percentCommissionBrute: [],
	commissionBrute: [],
	fel:[],
	aib:[],
	penalite:[],
	calculatedFraisMomo:[], 
  dette: [],
  remboursement: [],
  ecart: [],
  totalPrelevements: [],
  salaireBrut: [],
  percentFraisMomo: [],
  payement: [],
  operator_id:[],
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  logger.info("Soumission du formulaire de calcul de salaire", form.value);
  const result = await createOperatorSalary({
    ...form.value,
  });
  if (result) {
    router.push("/operators-salary");
  }
};
</script>

<template>
  <BaseBlock
    :title="actionDescription"
    class="block-mode-loading-oneui"
    :class="{ 'block-mode-loading': loading }"
  >
    <div class="pb-8">
      <OperatorSalaryForm
        v-model="form"
        :loading="loading"
        :errors="fieldsErrors"
        :alert="alert"
        :action-description="actionDescription"
        :action-text="actionText"
        :action-icon="actionIcon"
        @submit="onSubmit"
      />
    </div>
  </BaseBlock>
</template>
