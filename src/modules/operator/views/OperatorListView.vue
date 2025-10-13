<script setup lang="ts">
import {  onMounted } from "vue";
import { toast } from "../../../utils/toast";
import { useOperatorActions } from "../composable/use_operator_actions";
import type { OperatorModel } from "../models/operator-model";
import { useSelectableList } from "../../../composables/useSelectableList";
import { useCustomTable } from "../../../composables/useCustomTable";
import { useRouter } from 'vue-router';
import CustomTable from "../../../components/CustomTable.vue";
import { useMachineActions } from "../../machine/composable/use_machine_actions";

const {
  processing: loading,
  operators,
  getOperators,
updateOperatorActivateOrDeactivate,
  deleteOperator,
} = useOperatorActions();

const {
  machines,
} = useMachineActions();

const router = useRouter();

function goToAddSalary(operatorId: number) {
  router.push({
    path: '/operators-salary/add',
    query: { operatorId } // 🔥 on passe l'id dans la query
  });
}

const {
  selected,
  selectedCount,
  allSelected,
  someSelected,
  isSelected,
  toggleSelect,
  toggleSelectAll,
  clearSelection,
} = useSelectableList<OperatorModel>(() => operators.value);


// Configuration de la table 
const { tableClasses, getStatusBadge, getStatusText, commonHeaders } =
  useCustomTable();
const tableHeaders = commonHeaders.operator();

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
    await deleteOperator(element.interface);
  }

  clearSelection();
  // Recharger les données après suppression
  await getOperators();
};

// machines est ta liste de toutes les machines
const getMachineById = (id: string) => {
  return machines.value.find(machine => machine.id === id) || null;
};

const refreshOperators = async () => {
  await getOperators();
};

onMounted(async () => {
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
          @click="refreshOperators"
          class="btn-block-option"
          variant="tonal"
        />
      </div>
    </template>
    <template #options>
      <div class="flex justify-end items-center gap-2">
   
        <!-- Champ de recherche -->
        <!-- <VTextField
          v-model="searchQuery"
          placeholder="Rechercher des utilisateurs..."
          density="compact"
          class="order-2 order-sm-1 max-w-md"
          clearable
          append-inner-icon="ri-search-line"
          :disabled="loading"
          @keyup.enter="() => getOperators()"
          @click:append-inner="() => getOperators()"
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
          @click="router.push('/operators/add')"
        >
          <VIcon icon="fa fa-plus" size="small" />
          <span class="ml-1">Ajouter</span>
        </VBtn>
      </div>
    </template>

    <CustomTable
      :headers="tableHeaders"
      :items="operators"
      :selectable="true"
      :all-selected="allSelected"
      :some-selected="someSelected && !allSelected"
      @toggle-select-all="toggleSelectAll"
    >
      <template #body="{ items }">
        <tr v-if="items.length === 0">
          <td colspan="4" class="text-center text-muted py-4">
            Aucun opérateur trouvé
          </td>
        </tr>
        <tr
          v-for="operators in items"
          :key="operators.id"
          :class="{ 'table-active': isSelected(operators) }"
        >
          <td>
            <VCheckbox
              :model-value="isSelected(operators)"
              hide-details
              @update:model-value="() => toggleSelect(operators)"
            />
          </td>
          <td class="info-column-">
            <div class="info-name">{{ operators.fullName }}</div>
            <div class="info-detail">
              <i class="fa fa-envelope me-1"></i>{{ operators.email }}
            </div>
            <div v-if="operators.phone" class="info-detail">
              <i class="fa fa-phone me-1"></i>{{ operators.phone }}
            </div>
						<div v-if="operators.machine_id" class="info-detail">
  						<i class="fa fa-mobile me-1"></i>
							[{{ getMachineById(operators.machine_id)?.code }}] - {{ getMachineById(operators.machine_id)?.emplacement }}
						</div>
						<div v-else class="info-detail">
  						<i class="fa fa-mobile me-1"></i>
							[{{ operators.machine.code }}] - {{ operators.machine.emplacement}}

						</div>
          </td>
          <td>
            <span :class="getStatusBadge(operators.is_active)">
              {{ getStatusText(operators.is_active) }}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group btn-group">
							<button
								type="button"
								class="btn btn-sm btn-alt-secondary"
								@click="
									updateOperatorActivateOrDeactivate(operators.id, operators.is_active, {
										first_name: operators.first_name,
										last_name: operators.last_name,
									})
								"
							>
								<i :class="`${operators.is_active ? 'fa-ban' : 'fa-check-double'} fa fa-fw mr-0`"></i>
								<VTooltip activator="parent" location="top">{{
									operators.is_active ? "Désactiver" : "Activer"
								}}</VTooltip>
							</button>
							<button
                type="button"
                :class="tableClasses.button.action"
                @click="goToAddSalary(operators.id)"

              >
                <i class="fa fa-calculator mr-0"></i>
                <VTooltip activator="parent" location="top">Calculer le salaire</VTooltip>
              </button>
              <button
                type="button"
                :class="tableClasses.button.action"
                @click=" router.push(`/operators/edit/${operators.id}`);
                "
              >
                <i class="fa fa-fw fa-pencil-alt mr-0"></i>
                <VTooltip activator="parent" location="top">Modifier</VTooltip>
              </button>
							
              <button
                type="button"
                :class="tableClasses.button.danger"
                @click="deleteOperator(operators.interface)"
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
