<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref } from "vue";
import type { MachineCreateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { toast } from "../../../utils/toast";
import router from "../../../router";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import { useMachineActions } from "../composable/use_machine_actions";


const logger = createLogger("machineAddView");

const form = ref<MachineCreateInterface>({
  code: "",
  emplacement: "",
	is_active:false
});

const fieldsErrors = ref<{ [key in keyof MachineCreateInterface]: string[] }>({
  code: [],
  emplacement: [],
	is_active:[]
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Ajouter un utilisateur";
const actionText = "Ajouter";
const actionIcon = "ri-add-fill";

const { processing: loading, createMachine: create } = useMachineActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.code = apiError.data.code || [];
  fieldsErrors.value.emplacement = apiError.data.emplacement || [];
  fieldsErrors.value.is_active = apiError.data.is_active || [];
};

const createMachine = async (machine: MachineCreateInterface) => {
  logger.info("Création de l'utilisateur", machine);
  const result = await create(machine);
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la création de l'utilisateur", result);
    }
    alert.value = {
      type: "danger",
      id: "0012",
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
     code: [],
  emplacement: [],
	is_active:[]
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  logger.info("Soumission du formulaire d'utilisateur", form.value);
  const result = await createMachine({
    ...form.value,
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/machines");
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
      <MachineForm
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
