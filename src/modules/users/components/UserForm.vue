<script setup lang="ts">
import {
  requiredValidator,
  emailValidator,
  phoneValidator,
} from "@/utils/validators";
import { VForm } from "vuetify/components/VForm";
import { ref, watch, defineEmits, defineProps } from "vue";
import { useUserActions } from "../composables/use_user_actions";
import { vMaska } from "maska/vue";

const props = defineProps<{
  modelValue: UserCreateInterface;
  loading?: boolean;
  errors?: { [key in keyof UserCreateInterface]?: string[] };
  alert?: AppAlertInterface | null;
  actionDescription?: string;
  actionText?: string;
  actionIcon?: string;
  isEditMode?: boolean; // 👈 Ajout ici
}>();
const emit = defineEmits(["update:modelValue", "submit"]);

const { processing: loading } = useUserActions();

const formRef = ref<VForm>();
const localForm = ref<UserCreateInterface>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => {
    localForm.value = { ...val };
  }
);

function updateField<K extends keyof UserCreateInterface>(
  key: K,
  value: UserCreateInterface[K]
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
        <VLabel class="mb-3" for="user-first-name">Prénom *</VLabel>
        <VTextField
          id="user-first-name"
          v-model="localForm.first_name"
          placeholder="Ex: Jean"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-user-line"
          persistent-placeholder
          :error-messages="props.errors?.first_name"
          @update:model-value="(val) => updateField('first_name', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="user-last-name">Nom *</VLabel>
        <VTextField
          id="user-last-name"
          v-model="localForm.last_name"
          placeholder="Ex: Dupont"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-user-line"
          persistent-placeholder
          :error-messages="props.errors?.last_name"
          @update:model-value="(val) => updateField('last_name', val)"
        />
      </VCol>
      <VCol cols="12">
        <VLabel class="mb-3" for="user-email">Email *</VLabel>
        <VTextField
          id="user-email"
          v-model="localForm.email"
          placeholder="Ex: jean.dupont@example.com"
          :rules="[requiredValidator, emailValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-mail-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :error-messages="props.errors?.email"
          @update:model-value="(val) => updateField('email', val)"
        />
      </VCol>
      <VCol cols="12">
        <VLabel class="mb-3" for="user-phone">Téléphone</VLabel>
        <VTextField
          id="user-phone"
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
          @update:model-value="(val) => updateField('phone', val)"
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
          color="primary"
          size="small"
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
