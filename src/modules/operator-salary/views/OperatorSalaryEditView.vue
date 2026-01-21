<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref, onMounted, computed } from "vue";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { useInitializedOperatorSalaryStore, type OperatorSalaryStore } from "../store";
import { toast } from "../../../utils/toast";
import router from "../../../router";
import { useRoute } from "vue-router";
import { createLogger } from "../../../utils/logger";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";

const logger = createLogger("operatorSalaryEditView");

const route = useRoute();
const isEditMode = computed(() => !!(route.params as { id?: string }).id);

const operatorStore = ref<OperatorSalaryStore | null>(null);
const form = ref<OperatorSalaryCreateInterface>({
  date: "",
  chiffreAffaireMensuelttc: 0,
  // chiffreAffaireHorsTaxe: 0,
  percentCommissionBrute: 0,
	// commissionBrute: 0,
	// fel:0,
	// aib:0,
	// penalite:0,
	// calculatedFraisMomo:0,
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
  // chiffreAffaireHorsTaxe: [],
  percentCommissionBrute: [],
	// commissionBrute: [],
	// fel:[],
	// aib:[],
	// penalite:[],
	// calculatedFraisMomo:[],
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

const actionDescription = "Modifier le calcul de salaire de l'opérateur";
const actionText = "Enregistrer";
const actionIcon = "fa fa-floppy-o";

const { processing: loading } = useOperatorSalaryActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.date = apiError.data.date || [];
  fieldsErrors.value.chiffreAffaireMensuelttc = apiError.data.chiffreAffaireMensuelttc || [];
  // fieldsErrors.value.chiffreAffaireHorsTaxe = apiError.data.chiffreAffaireHorsTaxe || [];
  fieldsErrors.value.percentCommissionBrute = apiError.data.percentCommissionBrute || [];
  // fieldsErrors.value.commissionBrute = apiError.data.commissionBrute || [];
  // fieldsErrors.value.fel = apiError.data.fel || [];
  // fieldsErrors.value.aib = apiError.data.aib || [];
  // fieldsErrors.value.penalite = apiError.data.penalite || [];
  // fieldsErrors.value.calculatedFraisMomo = apiError.data.calculatedFraisMomo || [];
  fieldsErrors.value.dette = apiError.data.dette || [];
  fieldsErrors.value.remboursement = apiError.data.remboursement || [];
  fieldsErrors.value.ecart = apiError.data.ecart || [];
  fieldsErrors.value.totalPrelevements = apiError.data.totalPrelevements || [];
  fieldsErrors.value.salaireBrut = apiError.data.salaireBrut || [];
  fieldsErrors.value.percentFraisMomo = apiError.data.percentFraisMomo || [];
  fieldsErrors.value.payement = apiError.data.payement || [];
  fieldsErrors.value.operator_id = apiError.data.operator_id || [];
};

const fetchOperatorSalary = async () => {
  if (!operatorStore.value) {
    operatorStore.value = await useInitializedOperatorSalaryStore();
  }
  const id = (route.params as any).id as string;
  await operatorStore.value.getOperatorSalarys();
  const result = await operatorStore.value.findOperatorSalary(id);
  if (result instanceof ApiError) {
    alert.value = {
      type: "danger",
      id: "0012",
      title: "Erreur",
      message: result.message,
    };
    return;
  }
  const currentOperatorSalary = new OperatorSalaryModel(result.interface);
  form.value = {
    date: currentOperatorSalary.date,
    chiffreAffaireMensuelttc: currentOperatorSalary.chiffreAffaireMensuelttc,
    // chiffreAffaireHorsTaxe: currentOperatorSalary.chiffreAffaireHorsTaxe,
    percentCommissionBrute: currentOperatorSalary.percentCommissionBrute,
    // commissionBrute: currentOperatorSalary.commissionBrute,
    // fel: currentOperatorSalary.fel,
    // aib: currentOperatorSalary.aib,
    // penalite: currentOperatorSalary.penalite,
    // calculatedFraisMomo: currentOperatorSalary.calculatedFraisMomo,
    dette: currentOperatorSalary.dette,
    remboursement: currentOperatorSalary.remboursement,
    ecart: currentOperatorSalary.ecart,
    totalPrelevements: currentOperatorSalary.totalPrelevements,
    salaireBrut: currentOperatorSalary.salaireBrut,
    percentFraisMomo: currentOperatorSalary.percentFraisMomo,
    payement: currentOperatorSalary.payement,
	operator_id: currentOperatorSalary.operator_id ?? "",
  };
};

const updateOperatorSalary = async (operator: OperatorSalaryCreateInterface) => {
  if (!operatorStore.value) {
    logger.error("Le store operator Salary n'est pas initialisé.");
    return false;
  }
  logger.info("Mise à jour du calcul de salaire", operator);
  const result = await operatorStore.value.updateOperatorSalary(
    (route.params as any).id as string,
    operator
  );
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la mise à jour du calcul de salaire", result);
    }
    alert.value = {
      type: "danger",
      id: "0012",
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Calcul de salaire mis à jour avec succès", result);
  toast.success("Calcul de salaire modifié avec succès !");
  return true;
};

const resetForm = () => {
  fieldsErrors.value = {
    date: [],
  chiffreAffaireMensuelttc: [],
  // chiffreAffaireHorsTaxe: [],
  percentCommissionBrute: [],
	// commissionBrute: [],
	// fel:[],
	// aib:[],
	// penalite:[],
	// calculatedFraisMomo:[],
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
  if (!operatorStore.value) {
    logger.error("Le store operator salary n'est pas initialisé.");
    return;
  }
  logger.info("Soumission du formulaire de calcul de salaire", form.value);
  const result = await updateOperatorSalary({
    ...form.value,
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/operators");
  }
};

onMounted(async () => {
  await fetchOperatorSalary();
});
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
        :is-edit-mode="isEditMode"
        @submit="onSubmit"
      />
    </div>
  </BaseBlock>
</template>
