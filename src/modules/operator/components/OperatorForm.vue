<script setup lang="ts">
import {
  requiredValidator,
  emailValidator,
  phoneValidator,
} from "../../../utils/validators";
import { ref, watch, defineEmits, defineProps } from "vue";
import type { OperatorCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";

const props = defineProps<{
  modelValue: OperatorCreateInterface;
  loading?: boolean;
  errors?: { [key in keyof OperatorCreateInterface]?: string[] };
  alert?: AppAlertInterface | null;
  actionDescription?: string;
  actionText?: string;
  actionIcon?: string;
  isEditMode?: boolean; // 👈 Ajout ici
}>();
const emit = defineEmits(["update:modelValue", "submit"]);


const formRef = ref<form>();
const localForm = ref<OperatorCreateInterface>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => {
    localForm.value = { ...val };
  }
);

function updateField<K extends keyof OperatorCreateInterface>(
  key: K,
  value: OperatorCreateInterface[K]
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
        <label class="mb-3" for="operator-first-name">Prénom *</label>
        <input
          id="operator-first-name"
          v-model="localForm.first_name"
          placeholder="Ex: Jean"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-operator-line"
          persistent-placeholder
          :error-messages="props.errors?.first_name"
          @update:model-value="(val:any) => updateField('first_name', val)"
        />
      </div>
      <div cols="12" md="6">
        <label class="mb-3" for="operator-last-name">Nom *</label>
        <input
          id="operator-last-name"
          v-model="localForm.last_name"
          placeholder="Ex: Dupont"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-operator-line"
          persistent-placeholder
          :error-messages="props.errors?.last_name"
          @update:model-value="(val:any) => updateField('last_name', val)"
        />
      </div>
      <div cols="12">
        <label class="mb-3" for="operator-email">Email *</label>
        <input
          id="operator-email"
          v-model="localForm.email"
          placeholder="Ex: jean.dupont@example.com"
          :rules="[requiredValidator, emailValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-mail-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :error-messages="props.errors?.email"
          @update:model-value="(val:any) => updateField('email', val)"
        />
      </div>
      <div cols="12">
        <label class="mb-3" for="operator-phone">Téléphone</label>
        <input
          id="operator-phone"
          v-model="localForm.phone"
          v-maska="'229 01 ## ## ## ##'"
          placeholder="Ex: 229 01 66 66 66 66"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[phoneValidator]"
          :error-messages="props.errors?.phone"
          @update:model-value="(val:any) => updateField('phone', val)"
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
