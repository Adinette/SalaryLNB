<script setup lang="ts">
import {
  requiredValidator,
  phoneValidator,
} from "../../../utils/validators";
import { ref, watch, onMounted, computed } from "vue";
import type { OperatorCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { useMachineActions } from "../../machine/composable/use_machine_actions";

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

	const { machines, getMachines } = useMachineActions();

interface FormRef {
  validate: () => Promise<{ valid: boolean }>;
  reset?: () => void;
  resetValidation?: () => void;
}
const formRef = ref<FormRef>();
const localForm = ref<OperatorCreateInterface>({ ...props.modelValue });

// Charger les machines au montage du composant
	onMounted(async () => {
		await Promise.all([ getMachines()]);
	});
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
		console.log(localForm.value, "localForm.value");

    emit("submit");
  }
}

watch(machines, (newVal) => {
  console.log("Machines reçues :", newVal);
});

const formattedMachine = computed(() => {
  return machines.value
    ?.filter((m) => m.is_active && (!m.operator_id || m.operator_id === null))
    .map((machine) => ({
      ...machine,
      label: `${machine.code} - ${machine.emplacement}`,
      id: machine.id,
    })) || [];
});


onMounted(async () => {
  console.log(formattedMachine.value, "formattedMachine");
});	
</script>

<template>
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <VRow>
      <VCol cols="12" class="text-left">
        <span class="text-subtitle-1"
          >Remplissez les informations de l'opérateur</span
        ><br />
        <span class="text-subtitle-2 text-muted"
          >Les champs marqués d'un * sont obligatoires</span
        >
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-first-name">Prénom *</VLabel>
        <VTextField
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
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-last-name">Nom *</VLabel>
        <VTextField
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
      </VCol>
     
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-phone">Téléphone</VLabel>
        <VTextField
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
      </VCol>
					<!-- Sélection de la machine attribué -->
			<VCol cols="12" md="6">
				<VLabel class="mb-3" for="operator-machine">Machine attribuée *</VLabel>
				<VAutocomplete
					id="operator-machine"
					v-model="localForm.machine_id"
					:items="formattedMachine"
					item-title="code"
					item-value="id"
					placeholder="Sélectionnez une position"
					variant="filled"
					density="compact"
					prepend-inner-icon="ri-briefcase-line"
					:rules="[requiredValidator]"
					:error-messages="props.errors?.machine_id"
					@update:model-value="(val) => updateField('machine_id', val)"
				>
					<template #item="{ props: itemProps, item }">
						<VListItem
							v-bind="itemProps"
							:title="item.raw.code + ' - ' + item.raw.emplacement"
							:subtitle="item.raw.code"
						/>
					</template>
				</VAutocomplete>
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