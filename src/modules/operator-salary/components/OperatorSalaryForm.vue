<script setup lang="ts">
import {
  requiredValidator,
} from "../../../utils/validators";
import { ref, watch, defineEmits, defineProps, computed, watchEffect } from "vue";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { VRow } from "vuetify/components";

const props = defineProps<{
  modelValue: OperatorSalaryCreateInterface;
  loading?: boolean;
  errors?: { [key in keyof OperatorSalaryCreateInterface]?: string[] };
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
const localForm = ref<OperatorSalaryCreateInterface>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => {
    localForm.value = { ...val };
  }
);

function updateField<K extends keyof OperatorSalaryCreateInterface>(
  key: K,
  value: OperatorSalaryCreateInterface[K]
) {
  localForm.value[key] = value;
  emit("update:modelValue", { ...localForm.value });
}

    const chiffreAffaireHorsTaxe = computed(() =>localForm.value.chiffreAffaireMensuelttc / 1.10);
    const commissionBrute = computed(() =>chiffreAffaireHorsTaxe.value * (localForm.value.percentCommissionBrute / 100));
    const fel = 2500;
    const aib = computed(() =>commissionBrute.value * 0.05);
    const penalite = computed(() =>localForm.value.ecart! * 0.15);
    const calculatedFraisMomo = computed(() =>localForm.value.payement * localForm.value.percentFraisMomo / 100);
	// const debours = chiffreAffaireMensuelttc * 0.10;

// --- Sync computed values into localForm ---
watch(chiffreAffaireHorsTaxe, (val) => {
  localForm.value.chiffreAffaireHorsTaxe = val;
});

watch(commissionBrute, (val) => {
  localForm.value.commissionBrute = val;
});

watch(aib, (val) => {
  localForm.value.aib = val;
});

watch(penalite, (val) => {
  localForm.value.penalite = val;
});

watch(calculatedFraisMomo, (val) => {
  localForm.value.calculatedFraisMomo = val;
});

watchEffect(() => {
  localForm.value.fel = fel;
});

// --- Submit ---
async function onSubmit() {
  const valid = await formRef.value?.validate();
  if (valid && valid.valid) {
    console.log("Payload envoyée au backend :", localForm.value);
    emit("submit", { ...localForm.value });
  }
}

</script>

<template>
  <form ref="formRef" @submit.prevent="onSubmit">
    <div>
      <div cols="12" class="text-left">
        <span class="text-subtitle-1"
          >Remplissez les informations du calcul du salaire de l'opérateur</span
        ><br />
        <span class="text-subtitle-2 text-muted"
          >Les champs marqués d'un * sont obligatoires</span
        >
      </div>
<VRow>
      <VCol cols="12" md="6">
        <label class="mb-3" for="operator-salary-date">Date de calcul du salaire *</label>
        <input
          id="operator-salary-date"
          v-model="localForm.date"
          placeholder="Ex: 01/10/2025"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-operator-line"
          persistent-placeholder
          :error-messages="props.errors?.date"
          @update:model-value="(val:any) => updateField('date', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <label class="mb-3" for="operator-salary-chiffre-affaire-ttc">Chiffre d'affaire TTC  *</label>
        <input
          id="operator-salary-chiffre-affaire-ttc"
          v-model="localForm.chiffreAffaireMensuelttc"
          placeholder="Ex: 200000"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-operator-line"
          persistent-placeholder
          :error-messages="props.errors?.chiffreAffaireMensuelttc"
          @update:model-value="(val:any) => updateField('chiffreAffaireMensuelttc', val)"
        />
      </VCol>
      <VCol cols="12">
        <label class="mb-3" for="operator-salary-chiffre-affaire-hors-taxe">Chiffre d'affaire hors taxe *</label>
        <input
          id="operator-salary-chiffre-affaire-hors-taxe"
          :model-value="chiffreAffaireHorsTaxe"
          placeholder="Ex: 166666"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-mail-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :error-messages="props.errors?.chiffreAffaireHorsTaxe"
          @update:model-value="(val:any) => updateField('chiffreAffaireHorsTaxe', val)"
        />
      </VCol>
      <VCol cols="12">
        <label class="mb-3" for="operator-salary-percent-commission">Commission %</label>
        <input
          id="operator-salary-percent-commission"
          v-model="localForm.percentCommissionBrute"
          placeholder="Ex: 15%"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.percentCommissionBrute"
          @update:model-value="(val:any) => updateField('percentCommissionBrute', val)"
        />
      </VCol>
      <VCol cols="12">
        <label class="mb-3" for="operator-salary-brute-commission"> Commission brute</label>
        <input
          id="operator-salary-brute-commission"
           :model-value="commissionBrute"
          placeholder="Ex: 150000"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.commissionBrute"
          @update:model-value="(val:any) => updateField('commissionBrute', val)"
        />
      </VCol>
			<VCol cols="12">
        <label class="mb-3" for="operator-salary-payement"> Nette à verser</label>
        <input
          id="operator-salary-payement"
          v-model="localForm.payement"
          placeholder="Ex: 150000"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.payement"
          @update:model-value="(val:any) => updateField('payement', val)"
        />
      </VCol>
			<VCol cols="12">
        <label class="mb-3" for="operator-salary-percent-frais-momo">Pourcentage Frais MOMO</label>
        <input
          id="operator-salary-percent-frais-momo"
          v-model="localForm.percentFraisMomo"
          placeholder="Ex: 15%"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.percentFraisMomo"
          @update:model-value="(val:any) => updateField('percentFraisMomo', val)"
        />
      </VCol>

					<p class="font-medium mt-4 text-justify">Autres Prélèvements</p>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-fel">FEL</label>
        <input
          id="operator-salary-fel"
           :model-value="fel"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.fel"
          @update:model-value="(val:any) => updateField('fel', val)"
        />
      </VCol>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-aib">AIB</label>
        <input
          id="operator-salary-aib"
          :model-value="aib"
					readonly
          placeholder="Ex: 2500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.aib"
          @update:model-value="(val:any) => updateField('aib', val)"
        />
      </VCol>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-ecart">Écart</label>
        <input
          id="operator-salary-ecart"
          v-model="localForm.ecart"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.ecart"
          @update:model-value="(val:any) => updateField('ecart', val)"
        />
      </VCol>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-remboursement">Remboursement</label>
        <input
          id="operator-salary-remboursement"
          v-model="localForm.remboursement"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.remboursement"
          @update:model-value="(val:any) => updateField('remboursement', val)"
        />
      </VCol>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-penalite">Pénalité</label>
        <input
          id="operator-salary-penalite"
          :model-value="penalite"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.penalite"
          @update:model-value="(val:any) => updateField('penalite', val)"
        />
      </VCol>

			<VCol cols="12">
        <label class="mb-3" for="operator-salary-frais-momo">Frais MOMO</label>
        <input
          id="operator-salary-frais-momo"
          :model-value="calculatedFraisMomo"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.calculatedFraisMomo"
          @update:model-value="(val:any) => updateField('calculatedFraisMomo', val)"
        />
      </VCol>

			<!-- <VCol cols="12">
        <label class="mb-3" for="operator-salary-debours">Débours</label>
        <input
          id="operator-salary-debours"
          v-model="localForm.debours"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
          prepend-inner-icon="ri-phone-line"
          :disabled="props.isEditMode"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.debours"
          @update:model-value="(val:any) => updateField('debours', val)"
        />
      </VCol> -->
</VRow>
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
