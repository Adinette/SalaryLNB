<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref } from "vue";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { toast } from "../../../utils/toast";
import { AppUtils } from "../../../utils";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import { faker } from "@faker-js/faker";
import router from "../../../router";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";

const logger = createLogger("operatorAddView");

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

const actionDescription = "Ajouter un utilisateur";
const actionText = "Ajouter";
const actionIcon = "ri-add-fill";

const { processing: loading, createOperatorSalary: create } = useOperatorSalaryActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.first_name = apiError.data.first_name || [];
  fieldsErrors.value.last_name = apiError.data.last_name || [];
  fieldsErrors.value.email = apiError.data.email || [];
  fieldsErrors.value.phone = apiError.data.phone || [];
  fieldsErrors.value.machine_id = apiError.data.machine_id || [];
};

const createOperatorSalary = async (operator: OperatorSalaryCreateInterface) => {
  logger.info("Création de l'utilisateur", operator);
  const result = await create(operator);
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la création de l'utilisateur", result);
    }
    alert.value = {
      type: "danger",
      id: faker.string.uuid(),
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Utilisateur créé avec succès", result);
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
  logger.info("Soumission du formulaire d'utilisateur", form.value);
  const result = await createOperatorSalary({
    ...form.value,
    phone: AppUtils.removeWhitespace(form.value.phone),
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/operators");
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
