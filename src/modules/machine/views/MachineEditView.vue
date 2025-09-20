<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref, onMounted, computed } from "vue";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { useInitializedMachineStore, type MachineStore } from "../store";
import { AppUtils } from "../../../utils";
import { toast } from "../../../utils/toast";
import router from "../../..";
import { useMachineActions } from "../composable/use_machine_actions";
import { useRoute } from "vue-router";
import { createLogger } from "../../../utils/logger";
import type { MachineCreateInterface } from "../interfaces";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";

const logger = createLogger("machineEditView");

const route = useRoute();
const isEditMode = computed(() => !!(route.params as { id?: string }).id);

const machineStore = ref<MachineStore | null>(null);
const form = ref<MachineCreateInterface>({
  code: "",
  emplacement: "",
	is_active: false
});

const fieldsErrors = ref<{ [key in keyof MachineCreateInterface]: string[] }>({
  code: [],
  emplacement: [],
	is_active:[]
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Modifier l'utilisateur";
const actionText = "Enregistrer";
const actionIcon = "ri-save-line";

const { processing: loading } = useMachineActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.code = apiError.data.code || [];
  fieldsErrors.value.emplacement = apiError.data.emplacement || [];
};

const fetchMachine = async () => {
  if (!machineStore.value) {
    machineStore.value = await useInitializedMachineStore();
  }
  const id = (route.params as any).id as string;
  await machineStore.value.getMachines();
  const result = await machineStore.value.findMachine(id);
  if (result instanceof ApiError) {
    alert.value = {
      type: "danger",
      id: "0012",
      title: "Erreur",
      message: result.message,
    };
    return;
  }
  const currentMachine = new MachineModel(result.interface);
  form.value = {
    code: currentMachine.code,
    emplacement: currentMachine.emplacement,
    is_active: currentMachine.is_active,
  };
};

const updateMachine = async (machine: MachineCreateInterface) => {
  if (!machineStore.value) {
    logger.error("Le store utilisateur n'est pas initialisé.");
    return false;
  }
  logger.info("Mise à jour de l'utilisateur", machine);
  const result = await machineStore.value.updateMachine(
    (route.params as any).id as string,
    machine
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
    code: [],
    emplacement: [],
    is_active: [],
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  if (!machineStore.value) {
    logger.error("Le store utilisateur n'est pas initialisé.");
    return;
  }
  logger.info("Soumission du formulaire d'utilisateur", form.value);
  const result = await updateMachine({
    ...form.value,
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/machines");
  }
};

onMounted(async () => {
  await fetchMachine();
});
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
        :is-edit-mode="isEditMode"
        @submit="onSubmit"
      />
    </div>
  </BaseBlock>
</template>
