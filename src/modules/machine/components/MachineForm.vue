<script setup lang="ts">
import {
  requiredValidator,
} from "../../../utils/validators";
import { ref, watch, defineEmits, defineProps } from "vue";
import type { MachineCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { Checkbox } from "ant-design-vue";

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
  <form ref="formRef" @submit.prevent="onSubmit">
    <div>
      <div cols="12" class="text-left">
        <span class="text-subtitle-1"
          >Remplissez les informations de l'utilisateur</span
        ><br />
        <span class="text-subtitle-2 text-muted"
          >Les champs marqués d'un * sont obligatoires</span
        >
      </div>
      <div cols="12" md="6">
        <label class="mb-3" for="machine-first-name">Code de la machine *</label>
        <input
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
      </div>
      <div cols="12" md="6">
        <label class="mb-3" for="machine-last-name">Emplacement de la machine *</label>
        <input
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
      </div>
      <div cols="12">
        <label class="mb-3" for="machine-phone">Est-il en activité</label>
        <Checkbox
          id="machine-phone"
          v-model="localForm.is_active"
          v-maska="'229 01 ## ## ## ##'"
          placeholder="Ex: 229 01 66 66 66 66"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :error-messages="props.errors?.is_active"
          @update:model-value="(val:any) => updateField('is_active', val)"
        />
      </div>
    </div>

    <!-- Alert Section -->
    <div v-if="props.alert">
      <div cols="12">
        <div
          :type="
            props.alert.type === 'danger'
              ? 'error'
              : (props.alert.type as 'error' | 'info' | 'success' | 'warning')
          "
          :title="props.alert.title"
          class="mb-3"
        >
          {{ props.alert.message }}
			</div>
      </div>
    </div>

    <!-- Submit Button -->
    <div>
      <div cols="12" class="text-right">
        <button
          type="submit"
          color="primary"
          size="small"
          :loading="props.loading"
          :prepend-icon="props.actionIcon"
          class="px-8"
        >
          {{ props.actionText || "Enregistrer" }}
			</button>
      </div>
    </div>
  </form>
</template>
