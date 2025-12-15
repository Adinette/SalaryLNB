<script setup lang="ts">
import {
  requiredValidator,
} from "../../../utils/validators";
import { ref, watch } from "vue";
import type { MachineCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";

const props = defineProps<{
  modelValue: MachineCreateInterface;
  loading?: boolean;
  errors?: { [key in keyof MachineCreateInterface]?: string[] };
  alert?: AppAlertInterface | null;
  actionDescription?: string;
  actionText?: string;
  actionIcon?: string;
  isEditMode?: boolean; // 👈 Ajout ici
}>();
const emit = defineEmits(["update:modelValue", "submit"]);


interface FormRef {
  validate: () => Promise<{ valid: boolean }>;
  reset?: () => void;
  resetValidation?: () => void;
}

const formRef = ref<FormRef>();
const localForm = ref<MachineCreateInterface>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => {
    localForm.value = { ...val };
  }
);

function updateField<K extends keyof MachineCreateInterface>(
  key: K,
  value: MachineCreateInterface[K]
) {
  localForm.value[key] = value;
  emit("update:modelValue", { ...localForm.value });
}

async function onSubmit() {
  // Validation locale avec le composant VForm
  const valid = await formRef.value?.validate();
  if (valid && valid.valid) {
    emit("submit");
  }
}
</script>

<template>
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <VRow>
      <VCol cols="12" class="text-left">
        <span class="text-subtitle-1"
          >Remplissez les informations de l'utilisateur</span
        ><br />
        <span class="text-subtitle-2 text-muted"
          >Les champs marqués d'un * sont obligatoires</span
        >
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="machine-first-name">Code de la machine *</VLabel>
        <VTextField
          id="machine-code"
          v-model="localForm.code"
          placeholder="Ex: 100285"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-machine-line"
          persistent-placeholder
          :error-messages="props.errors?.code"
          @update:model-value="(val:any) => updateField('code', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="machine-last-name">Emplacement de la machine *</VLabel>
        <VTextField
          id="machine-emplacement"
          v-model="localForm.emplacement"
          placeholder="Ex: Lokossa"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-machine-line"
          persistent-placeholder
          :error-messages="props.errors?.emplacement"
          @update:model-value="(val:any) => updateField('emplacement', val)"
        />
      </VCol>
    </VRow>

    <!-- Alert Section -->
    <VRow v-if="props.alert">
      <VCol cols="12">
        <VAlert
          :type="
            props.alert.type === 'danger'
              ? 'error'
              : (props.alert.type as 'error' | 'info' | 'success' | 'warning')
          "
          :title="props.alert.title"
          class="mb-3"
        >
          {{ props.alert.message }}
        </VAlert>
      </VCol>
    </VRow>

    <!-- Submit Button -->
    <VRow>
      <VCol cols="12" class="text-right">
        <VBtn
          type="submit"
          color="success"
          :loading="props.loading"
          :prepend-icon="props.actionIcon"
          class="px-8"
        >
          {{ props.actionText || "Enregistrer" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
