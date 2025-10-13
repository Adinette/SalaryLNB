<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { toast } from "../../../utils/toast";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import { useSelectableList } from "../../../composables/useSelectableList";
import { useCustomTable } from "../../../composables/useCustomTable";
import CustomTable from "../../../components/CustomTable.vue";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";
import { useOperatorActions } from "../../operator/composable/use_operator_actions";
import { useDebounceFn } from "@vueuse/core";
import router from "../../../router";
import type { OperatorSalaryListFilterInterface } from "../interfaces/operator_salary_list_filter_interface";

const {
  processing: loading,
  operatorSalary,
  getOperatorSalary,
  deleteOperatorSalary,
} = useOperatorSalaryActions();

const {
  operators,
getOperators,
} = useOperatorActions();

const {
  selected,
  selectedCount,
  allSelected,
  someSelected,
  isSelected,
  toggleSelect,
  toggleSelectAll,
  clearSelection,
} = useSelectableList<OperatorSalaryModel>(() => operatorSalary.value);


// Configuration de la table 
const { tableClasses, commonHeaders } =
  useCustomTable();
const tableHeaders = commonHeaders.operatorSalary();
	const operatorIdQuery = ref<string | null>(null);
	const statusArgs = computed<OperatorSalaryListFilterInterface>(() => ({
		operator_id: operatorIdQuery.value !== null ? operatorIdQuery.value : undefined,
	}));

const debouncedOperator = useDebounceFn(async () => {
		await getOperatorSalary(statusArgs.value);
		clearSelection(); // Nettoie la sélection après le filtre
	}, 300);

const deleteSelected = async () => {
  if (selected.value.length === 0) return;

  if (selected.value.length > 20) {
    toast.error(
      "Vous ne pouvez pas supprimer plus de 20 utilisateurs à la fois."
    );
    return;
  }

  const confirmed = confirm(
    `Êtes-vous sûr de vouloir supprimer ${selectedCount.value} utilisateur(s) sélectionné(s) ?`
  );
  if (!confirmed) return;

  for (const element of selected.value) {
    await deleteOperatorSalary(element.interface);
  }

  clearSelection();
  // Recharger les données après suppression
  await getOperatorSalary();
};

// operators est ta liste de tous les opérateurs
const getOperatorById = (id: string) => {
  return operators.value.find(operator => operator.id === id) || null;
};

const formatMonth = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // options pour afficher uniquement le mois et l'année
  return date.toLocaleString("fr-FR", { month: "long", year: "numeric" });
};

const formatNumber = (value: number | string) => {
  if (!value && value !== 0) return "";
  return Number(value).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


const refreshOperatorSalary = async () => {
  await getOperatorSalary();
};

onMounted(async () => {
  await getOperatorSalary();
	await getOperators();
});
</script>

<template>
  <BaseBlock
    class="block-mode-loading-oneui"
    :class="{
      'block-mode-loading': loading,
    }"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <VBtn
          icon="fa fa-refresh"
          :loading="loading"
          :disabled="loading"
					color="success"
          type="button"
          @click="refreshOperatorSalary"
          class="btn-block-option"
          variant="tonal"
        />
      </div>
    </template>
    <template #options>
      <div class="flex justify-end items-center gap-2">
				<!--Champ de filtre des operateurs-->
				<VCol cols="4">
					<VSelect
						v-model="operatorIdQuery"
						:items="operators"
						item-title="fullName"
						item-value="id"
						placeholder="Filtrer par opérateurs"
						density="compact"
						:disabled="loading"
					/>
				</VCol>
				<VBtn
					variant="flat"
					color="success"
					prepend-icon="fa fa-filter"
					:disabled="loading"
					:loading="loading"
					@click="debouncedOperator"
				>
					Filtrer
				</VBtn>
        <!-- Champ de recherche -->
        <!-- <VTextField
          v-model="searchQuery"
          placeholder="Rechercher des utilisateurs..."
          density="compact"
          class="order-2 order-sm-1 max-w-md"
          clearable
          append-inner-icon="ri-search-line"
          :disabled="loading"
          @keyup.enter="() => getOperatorSalary()"
          @click:append-inner="() => getOperatorSalary()"
        /> -->

        <div v-if="selectedCount > 0" class="mr-2 flex items-center">
          <VChip color="primary" size="small" class="mr-2"
            >{{ selectedCount }} sélectionné(s)</VChip
          >
          <VBtn
            type="button"
            variant="flat"
            color="error"
            class="mr-1"
            :loading="loading"
            :disabled="loading"
            @click="deleteSelected"
          >
            <VIcon icon="fa fa-delete" size="small" />
            <span class="ml-1">Supprimer</span>
          </VBtn>
        </div>
        <VBtn
          type="button"
          variant="flat"
          color="success"
          @click="router.push('/operators-salary/add')"
        >
          <VIcon icon="fa fa-plus" size="small" />
          <span class="ml-1">Ajouter</span>
        </VBtn>
      </div>
    </template>

    <CustomTable
      :headers="tableHeaders"
      :items="operatorSalary"
      :selectable="true"
      :all-selected="allSelected"
      :some-selected="someSelected && !allSelected"
      @toggle-select-all="toggleSelectAll"
    >
      <template #body="{ items }">
        <tr v-if="items.length === 0">
          <td colspan="4" class="text-center text-muted py-4">
            Aucun salaire calculé trouvé
          </td>
        </tr>
        <tr
          v-for="operatorSalary in items"
          :key="operatorSalary.id"
          :class="{ 'table-active': isSelected(operatorSalary) }"
        >
          <td>
            <VCheckbox
              :model-value="isSelected(operatorSalary)"
              hide-details
              @update:model-value="() => toggleSelect(operatorSalary)"
            />
          </td>
          <td class="info-column">
						<div v-if="operatorSalary.operator_id" class="info-detail">
  						<i class="fa fa-mobile me-1"></i>
							Nom et prénom de l'operateur: {{ getOperatorById(operatorSalary.operator_id)?.first_name }} {{ getOperatorById(operatorSalary.operator_id)?.last_name }}
											</div>
						<!-- Chiffre d'affaire mensuel TTC -->
						<div class="info-detail" v-if="operatorSalary.chiffreAffaireMensuelttc">
						<i class="fa fa-money-bill-wave me-1"></i>
						Chiffre d'affaire mensuel TTC: {{ formatNumber(operatorSalary.chiffreAffaireMensuelttc) }}
					</div>

					<div class="info-detail" v-if="operatorSalary.chiffreAffaireHorsTaxe">
						<i class="fa fa-coins me-1"></i>
						Chiffre d'affaire hors taxe: {{ formatNumber(operatorSalary.chiffreAffaireHorsTaxe) }}
					</div>

					<div v-if="operatorSalary.commissionBrute" class="info-detail">
						<i class="fa fa-chart-line me-1"></i>
						Commission brute: {{ formatNumber(operatorSalary.commissionBrute) }}
					</div>

					<div v-if="operatorSalary.salaireBrut" class="info-detail">
						<i class="fa fa-wallet me-1"></i>
						Salaire: {{ formatNumber(operatorSalary.salaireBrut) }} du mois de 
						{{ formatMonth(operatorSalary.date) }}
					</div>

					</td>

          <td class="text-center">
            <div class="btn-group btn-group-">
              <button
                type="button"
                :class="tableClasses.button.action"
                @click="
                  router.push(`/operators-salary/edit/${operatorSalary.id}`);

                "
              >
                <i class="fa fa-fw fa-pencil-alt mr-0"></i>
                <VTooltip activator="parent" location="top">Modifier</VTooltip>
              </button>
							<button
                type="button"
                :class="tableClasses.button.action"
                @click="
                  router.push(`/operators-salary/details/${operatorSalary.id}`);

                "
              >
                <i class="fa fa-eye mr-0"></i>
                <VTooltip activator="parent" location="top">Details et Impression</VTooltip>
              </button>
							
              <button
                type="button"
                :class="tableClasses.button.danger"
                @click="deleteOperatorSalary(operatorSalary.interface)"
              >
                <i class="fa fa-fw fa-times mr-0"></i>
                <VTooltip activator="parent" location="top">Supprimer</VTooltip>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </CustomTable>
  </BaseBlock>
</template>
