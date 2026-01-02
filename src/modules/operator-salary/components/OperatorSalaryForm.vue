<script setup lang="ts">
import {
  requiredValidator,
} from "../../../utils/validators";
import { ref, watch, computed, watchEffect, onMounted } from "vue";
import type { OperatorSalaryCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { VRow } from "vuetify/components";
import { useOperatorActions } from "../../operator/composable/use_operator_actions";
import { useRoute } from 'vue-router';

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
const { operators, getOperators } = useOperatorActions();
const route = useRoute();

const operatorIdFromQuery = ref<string | null>(null);

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

// Charger les opérateurs au montage du composant
	onMounted(async () => {
		await Promise.all([ getOperators()]);
	});

function updateField<K extends keyof OperatorSalaryCreateInterface>(
  key: K,
  value: OperatorSalaryCreateInterface[K]
) {
  localForm.value[key] = value;
  emit("update:modelValue", { ...localForm.value });
}

const chiffreAffaireHorsTaxe = computed(
  () => localForm.value.chiffreAffaireMensuelttc / 1.10
);

const commissionBrute = computed(
  () => chiffreAffaireHorsTaxe.value * (localForm.value.percentCommissionBrute / 100)
);

const fel = 2500;

const aib = computed(() => commissionBrute.value * 0.05);

const penalite = computed(() => (localForm.value.ecart || 0) * 0.15);

const calculatedFraisMomo = computed(
  () => (localForm.value.payement || 0) * (localForm.value.percentFraisMomo || 0) / 100
);

// ✅ Transforme aussi ceci en computed pour suivre les changements automatiquement
const autresPrelevements = computed(() =>
  (penalite.value || 0) +
  (localForm.value.remboursement || 0) +
  (localForm.value.dette || 0) +
  (localForm.value.ecart || 0) +
  (calculatedFraisMomo.value || 0)
);


// ✅ totalPrelevements dépend de valeurs réactives => computed aussi
const totalPrelevements = computed(() =>
fel + aib.value + autresPrelevements.value
);

// ✅ Même chose pour le salaireBrut
const salaireBrut = computed(() =>
  commissionBrute.value - totalPrelevements.value
);

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

watch(salaireBrut, (val) => {
  localForm.value.salaireBrut = val;
});

watchEffect(() => {
  localForm.value.fel = fel;
});

// --- Submit ---
async function onSubmit() {
  const valid = await formRef.value?.validate();
  if (valid && valid.valid) {

    // ✅ Force la mise à jour des champs calculés dans localForm avant l’envoi
    localForm.value.chiffreAffaireHorsTaxe = chiffreAffaireHorsTaxe.value;
    localForm.value.commissionBrute = commissionBrute.value;
    localForm.value.aib = aib.value;
    localForm.value.penalite = penalite.value;
    localForm.value.calculatedFraisMomo = calculatedFraisMomo.value;
    localForm.value.fel = fel;
	localForm.value.salaireBrut = salaireBrut.value;

    emit("submit", { ...localForm.value });
  }
}


const formattedOperators = computed(() => {
		return operators.value.map((operator) => ({
			...operator,
			label: `${operator.first_name} - ${operator.last_name}`,
			id: operator.id,
		}));
	});

onMounted(() => {
  // 👉 Pré-remplir operator_id si passé dans l’URL
  if (route.query.operatorId) {
    operatorIdFromQuery.value = String(route.query.operatorId);
    localForm.value.operator_id = operatorIdFromQuery.value;
  }

  // 👉 Remplit la date automatiquement si elle n’est pas déjà définie
  if (!localForm.value.date) {
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
    localForm.value.date = today;

    // Mise à jour du v-model
    emit("update:modelValue", { ...localForm.value });
  }
});

</script>

<template>
	 <div class="p-4">
	   <!-- Sélection de l'opérateur -->
    <div class="mb-6">
      <VCard elevation="0">
        <VCardText>
          <VLabel for="operator-select" class="text-lg font-semibold mb-3"
            >Sélection de l'opérateur</VLabel
          >
          <VAutocomplete
					id="operator-select"
					:items="formattedOperators"
					item-title="label"
					item-value="id"
					v-model="localForm.operator_id"
					placeholder="Sélectionnez l'opérateur"
					variant="filled"
					density="compact"
					:rules="[requiredValidator]"
					return-object
					:error-messages="props.errors?.operator_id"
					@update:model-value="(val: any) => updateField('operator_id', val)"
				/>
        </VCardText>
      </VCard>
    </div>
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <VRow>
      <VCol cols="12" class="text-left">
        <span class="text-subtitle-1"
          >Remplissez les informations du calcul du salaire de l'opérateur</span
        ><br />
        <span class="text-subtitle-2 text-muted"
          >Les champs marqués d'un * sont obligatoires</span
        >
      </VCol>
		<VRow>
      <VCol cols="12">
        <VLabel class="mb-3" for="operator-salary-date">Date de calcul du salaire *</VLabel>
        <VTextField
  id="operator-salary-date"
  v-model="localForm.date"
  placeholder="Ex: 01/10/2025"
  :rules="[requiredValidator]"
  variant="filled"
  density="compact"
  type="date"
  prepend-inner-icon="ri-operator-line"
  persistent-placeholder
  :error-messages="props.errors?.date"
  @update:model-value="(val:any) => updateField('date', val)"
/>

      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-chiffre-affaire-ttc">Chiffre d'affaire TTC  *</VLabel>
        <VTextField
          id="operator-salary-chiffre-affaire-ttc"
          v-model="localForm.chiffreAffaireMensuelttc"
          placeholder="Ex: 200000"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-operator-line"
          persistent-placeholder
          :error-messages="props.errors?.chiffreAffaireMensuelttc"
          @update:model-value="(val:any) => updateField('chiffreAffaireMensuelttc', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-chiffre-affaire-hors-taxe">Chiffre d'affaire hors taxe *</VLabel>
        <VTextField
          id="operator-salary-chiffre-affaire-hors-taxe"
          :model-value="chiffreAffaireHorsTaxe"
          placeholder="Ex: 166666"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-mail-line"
          persistent-placeholder
          :error-messages="props.errors?.chiffreAffaireHorsTaxe"
          @update:model-value="(val:any) => updateField('chiffreAffaireHorsTaxe', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-percent-commission">Commission %</VLabel>
        <VTextField
          id="operator-salary-percent-commission"
          v-model="localForm.percentCommissionBrute"
          placeholder="Ex: 15%"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.percentCommissionBrute"
          @update:model-value="(val:any) => updateField('percentCommissionBrute', val)"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-brute-commission"> Commission brute</VLabel>
        <VTextField
          id="operator-salary-brute-commission"
          :model-value="commissionBrute"
          placeholder="Ex: 150000"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.commissionBrute"
          @update:model-value="(val:any) => updateField('commissionBrute', val)"
        />
      </VCol>
			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-payement"> Nette à verser</VLabel>
        <VTextField
          id="operator-salary-payement"
          v-model="localForm.payement"
          placeholder="Ex: 150000"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.payement"
          @update:model-value="(val:any) => updateField('payement', val)"
        />
      </VCol>
			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-percent-frais-momo">Pourcentage Frais MOMO</VLabel>
        <VTextField
          id="operator-salary-percent-frais-momo"
          v-model="localForm.percentFraisMomo"
          placeholder="Ex: 15%"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.percentFraisMomo"
          @update:model-value="(val:any) => updateField('percentFraisMomo', val)"
        />
      </VCol>

					<VCol cols="12">
						<p class="font-medium mt-4 text-justify">Autres Prélèvements</p>
					</VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-fel">FEL</VLabel>
        <VTextField
          id="operator-salary-fel"
           :model-value="fel"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.fel"
          @update:model-value="(val:any) => updateField('fel', val)"
        />
      </VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-aib">AIB</VLabel>
        <VTextField
          id="operator-salary-aib"
          :model-value="aib"
					readonly
          placeholder="Ex: 2500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.aib"
          @update:model-value="(val:any) => updateField('aib', val)"
        />
      </VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-ecart">Écart</VLabel>
        <VTextField
          id="operator-salary-ecart"
          v-model="localForm.ecart"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.ecart"
          @update:model-value="(val:any) => updateField('ecart', val)"
        />
      </VCol>

				<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-dette">Dette</VLabel>
        <VTextField
          id="operator-salary-dette"
          v-model="localForm.dette"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.date"
          @update:model-value="(val:any) => updateField('dette', val)"
        />
      </VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-remboursement">Remboursement</VLabel>
        <VTextField
          id="operator-salary-remboursement"
          v-model="localForm.remboursement"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.remboursement"
          @update:model-value="(val:any) => updateField('remboursement', val)"
        />
      </VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-penalite">Pénalité</VLabel>
        <VTextField
          id="operator-salary-penalite"
          :model-value="penalite"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.penalite"
          @update:model-value="(val:any) => updateField('penalite', val)"
        />
      </VCol>

			<VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-frais-momo">Frais MOMO</VLabel>
        <VTextField
          id="operator-salary-frais-momo"
          :model-value="calculatedFraisMomo"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.calculatedFraisMomo"
          @update:model-value="(val:any) => updateField('calculatedFraisMomo', val)"
        />
      </VCol>

			<VCol cols="12">
        <VLabel class="mb-3" for="operator-salary-brut">Salaire Brute</VLabel>
        <VTextField
          id="operator-salary-brut"
          :model-value="salaireBrut"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :error-messages="props.errors?.salaireBrut"
          @update:model-value="(val:any) => updateField('salaireBrut', val)"
        />
      </VCol>

			<!-- <VCol cols="12" md="6">
        <VLabel class="mb-3" for="operator-salary-debours">Débours</VLabel>
        <VTextField
          id="operator-salary-debours"
          v-model="localForm.debours"
          placeholder="Ex: 1500"
          variant="filled"
          density="compact"
					type="number"
          prepend-inner-icon="ri-phone-line"
          persistent-placeholder
          :rules="[requiredValidator]"
          :error-messages="props.errors?.debours"
          @update:model-value="(val:any) => updateField('debours', val)"
        />
      </VCol> -->
</VRow>
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
</div>
</template>
