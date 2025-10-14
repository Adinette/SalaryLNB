<script setup lang="ts">
import { onMounted } from "vue";
import { toast } from "../../../utils/toast";
import { useMachineActions } from "../composable/use_machine_actions";
import { useSelectableList } from "../../../composables/useSelectableList";
import type { MachineModel } from "../models/machine-model";
import router from "../../../router";
import { useCustomTable } from "../../../composables/useCustomTable";
import CustomTable from "../../../components/CustomTable.vue";


const {
  processing: loading,
  machines,
  getMachines,
  updateMachineActivateOrDeactivate,
  deleteMachine,
} = useMachineActions();


const {
  selected,
  selectedCount,
  allSelected,
  someSelected,
  isSelected,
  toggleSelect,
  toggleSelectAll,
  clearSelection,
} = useSelectableList<MachineModel>(() => machines.value);


// Configuration de la table 
const { tableClasses, getStatusBadge, getStatusText, commonHeaders } =
  useCustomTable();
const tableHeaders = commonHeaders.machine();

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
    await deleteMachine(element.interface);
  }

  clearSelection();
  // Recharger les données après suppression
  await getMachines();
};

const refreshMachines = async () => {
  await getMachines();
};

onMounted(async () => {
  await getMachines();
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
          @click="refreshMachines"
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
          @keyup.enter="() => getMachines()"
          @click:append-inner="() => getMachines()"
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
          @click="router.push('/machines/add')"
        >
          <VIcon icon="fa fa-plus" size="small" />
          <span class="ml-1">Ajouter</span>
        </VBtn>
      </div>
    </template>

    <CustomTable
      :headers="tableHeaders"
      :items="machines"
      :selectable="true"
      :all-selected="allSelected"
      :some-selected="someSelected && !allSelected"
      @toggle-select-all="toggleSelectAll"
    >
      <template #body="{ items }">
        <tr v-if="items.length === 0">
          <td colspan="4" class="text-center text-muted py-4">
            Aucune machine trouvé
          </td>
        </tr>
        <tr
          v-for="machines in items"
          :key="machines.id"
          :class="{ 'table-active': isSelected(machines) }"
        >
          <td>
            <VCheckbox
              :model-value="isSelected(machines)"
              hide-details
              @update:model-value="() => toggleSelect(machines)"
            />
          </td>
          <td class="info-column-">
            <div class="info-detail">
              <i class="fa fa-code me-1"></i>[{{ machines.code }}]
            </div>
            <div class="info-detail">
              <i class="fa fa-map-marker me-1"></i>{{ machines.emplacement }}
            </div>
          </td>
          <td>
            <span :class="getStatusBadge(machines.is_active)">
              {{ getStatusText(machines.is_active) }}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group btn-group">
								<button
								type="button"
								class="btn btn-sm btn-alt-secondary"
								@click="
									updateMachineActivateOrDeactivate(machines.id, machines.is_active, {
										code: machines.code,
										emplacement: machines.emplacement,
									})
								"
							>
								<i :class="`${machines.is_active ? 'fa-ban' : 'fa-check-double'} fa fa-fw mr-0`"></i>
								<VTooltip activator="parent" location="top">{{
									machines.is_active ? "Désactiver" : "Activer"
								}}</VTooltip>
							</button>
              <button
                type="button"
                :class="tableClasses.button.action"
                @click="router.push(`/machines/edit/${machines.id}`);
                "
              >
                <i class="fa fa-fw fa-pencil-alt mr-0"></i>
                <VTooltip activator="parent" location="top">Modifier</VTooltip>
              </button>
              <button
                type="button"
                :class="tableClasses.button.danger"
                @click="deleteMachine(machines.interface)"
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
