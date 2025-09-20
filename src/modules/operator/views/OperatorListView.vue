<script setup lang="ts">
import Table from "@/components/Table.vue";
import { computed, onMounted, ref } from "vue";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { toast } from "../../../utils/toast";
import { useOperatorActions } from "../composable/use_operator_actions";
import type { OperatorModel } from "../models/operator-model";
import { useSelectableList } from "../../../composables/useSelectableList";
import { useTable } from "../../../composables/useTable";

const {
  processing: loading,
  operators,
  getOperators,
  deleteOperator,
} = useOperatorActions();

// État pour la recherche
const searchQuery = ref<string>("");

const searchArgs = computed<ListApiArgsInterface>(() => ({
  search: searchQuery.value || undefined,
}));


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
  useTable();
const tableHeaders = commonHeaders.user();

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
          icon="ri-refresh-line"
          :loading="loading"
          :disabled="loading"
          type="button"
          @click="refreshOperators"
          class="btn-block-option"
          size="x-small"
          variant="tonal"
        />
      </div>
    </template>
    <template #options>
      <div class="flex justify-end items-center gap-2">
   
        <!-- Champ de recherche -->
        <VTextField
          v-model="searchQuery"
          placeholder="Rechercher des utilisateurs..."
          density="compact"
          class="order-2 order-sm-1 max-w-md"
          clearable
          append-inner-icon="ri-search-line"
          :disabled="loading"
          @keyup.enter="() => getOperators()"
          @click:append-inner="() => getOperators()"
        />

        <div v-if="selectedCount > 0" class="mr-2 flex items-center">
          <VChip color="primary" size="small" class="mr-2"
            >{{ selectedCount }} sélectionné(s)</VChip
          >
          <VBtn
            type="button"
            variant="flat"
            color="error"
            size="x-small"
            class="mr-1"
            :loading="loading"
            :disabled="loading"
            @click="deleteSelected"
          >
            <VIcon icon="ri-delete-bin-line" size="small" />
            <span class="ml-1">Supprimer</span>
          </VBtn>
        </div>
        <VBtn
          type="button"
          variant="flat"
          color="primary"
          @click="router.push('/operators/add')"
        >
          <VIcon icon="ri-add-line" size="small" />
          <span class="ml-1">Ajouter</span>
        </VBtn>
      </div>
    </template>

    <Table
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
            Aucun utilisateur trouvé
          </td>
        </tr>
        <tr
          v-for="user in items"
          :key="user.id"
          :class="{ 'table-active': isSelected(user) }"
        >
          <td>
            <VCheckbox
              :model-value="isSelected(user)"
              hide-details
              @update:model-value="() => toggleSelect(user)"
            />
          </td>
          <td class="info-column-">
            <div class="info-name">{{ user.fullName }}</div>
            <div class="info-detail">
              <i class="fa fa-envelope me-1"></i>{{ user.email }}
            </div>
            <div v-if="user.phone" class="info-detail">
              <i class="fa fa-phone me-1"></i>{{ user.phone }}
            </div>
          </td>
          <td>
            <span :class="getStatusBadge(user.is_active)">
              {{ getStatusText(user.is_active) }}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group btn-group-">
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary"
                @click="
                  updateOperatorActivateOrDesactivate(user.id, user.is_active, {
                    fullname: user.fullName,
                  })
                "
              >
                <i
                  :class="`${user.is_active ? 'fa-ban' : 'fa-check-double'} fa fa-fw mr-0`"
                ></i>
                <VTooltip activator="parent" location="top">{{
                  user.is_active ? "Désactiver" : "Activer"
                }}</VTooltip>
              </button>
              <button
                type="button"
                :class="tableClasses.button.action"
                @click="
                  router.push({
                    name: appRoutes.operators.edit,
                    params: { id: user.id },
                  })
                "
              >
                <i class="fa fa-fw fa-pencil-alt mr-0"></i>
                <VTooltip activator="parent" location="top">Modifier</VTooltip>
              </button>
              <button
                type="button"
                class="btn text-error btn-sm btn-alt-secondary"
                @click="updateResetPassword(user.interface)"
              >
                <i class="ri-reset-left-fill" style="color: #009ddc"></i>
                <VTooltip activator="parent" location="top">
                  Réinitialiser le mot de passe
                </VTooltip>
              </button>
              <button
                type="button"
                :class="tableClasses.button.danger"
                @click="deleteOperator(user.interface)"
              >
                <i class="fa fa-fw fa-times mr-0"></i>
                <VTooltip activator="parent" location="top">Supprimer</VTooltip>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </Table>
  </BaseBlock>
</template>
