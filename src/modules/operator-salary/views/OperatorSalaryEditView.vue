<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref, onMounted, computed } from "vue";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { useInitializedOperatorSalaryStore, type OperatorSalaryStore } from "../store";
import { AppUtils } from "../../../utils";
import { toast } from "../../../utils/toast";
import router from "../../../router";
import { useRoute } from "vue-router";
import { createLogger } from "../../../utils/logger";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";

const logger = createLogger("operatorEditView");

const route = useRoute();
const isEditMode = computed(() => !!(route.params as { id?: string }).id);

const operatorStore = ref<OperatorSalaryStore | null>(null);
const form = ref<OperatorSalaryCreateInterface>({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  machine_id: "",
});

const fieldsErrors = ref<{ [key in keyof OperatorSalaryCreateInterface]: string[] }>({
  first_name: [],
  last_name: [],
  email: [],
  phone: [],
  machine_id: [],
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Modifier l'utilisateur";
const actionText = "Enregistrer";
const actionIcon = "ri-save-line";

const { processing: loading } = useOperatorSalaryActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.first_name = apiError.data.first_name || [];
  fieldsErrors.value.last_name = apiError.data.last_name || [];
  fieldsErrors.value.email = apiError.data.email || [];
  fieldsErrors.value.phone = apiError.data.phone || [];
  fieldsErrors.value.machine_id = apiError.data.machine_id || [];
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
    first_name: currentOperatorSalary.first_name,
    last_name: currentOperatorSalary.last_name,
    email: currentOperatorSalary.email,
    phone: currentOperatorSalary.phone
      ? AppUtils.formatPhoneWithSpaces(currentOperatorSalary.phone)
      : "",
    machine_id: currentOperatorSalary.machine_id,
  };
};

const updateOperatorSalary = async (operator: OperatorSalaryCreateInterface) => {
  if (!operatorStore.value) {
    logger.error("Le store utilisateur n'est pas initialisé.");
    return false;
  }
  logger.info("Mise à jour de l'utilisateur", operator);
  const result = await operatorStore.value.updateOperatorSalary(
    (route.params as any).id as string,
    operator
  );
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la mise à jour de l'utilisateur", result);
    }
    alert.value = {
      type: "danger",
      id: "0012",
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Utilisateur mis à jour avec succès", result);
  toast.success("Utilisateur modifié avec succès !");
  return true;
};

const resetForm = () => {
  fieldsErrors.value = {
    first_name: [],
    last_name: [],
    email: [],
    phone: [],
    machine_id: [],
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  if (!operatorStore.value) {
    logger.error("Le store operator n'est pas initialisé.");
    return;
  }
  logger.info("Soumission du formulaire d'operateur", form.value);
  const result = await updateOperatorSalary({
    ...form.value,
    phone: AppUtils.removeWhitespace(form.value.phone),
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
