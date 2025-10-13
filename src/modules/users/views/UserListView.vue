<script setup lang="ts">
import { useSelectableList } from "../../../composables/useSelectableList";
import { UserModel } from "../models/user_model";
import { useUserActions } from "../composables/use_user_actions";
import { computed, onMounted, ref } from "vue";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { toast } from "../../../utils/toast";
import router from "../../../router";
import appRoutes from "../../../router/routes";
import { useCustomTable } from "../../../composables/useCustomTable";
import CustomTable from "../../../components/CustomTable.vue";
import { useDebounceFn } from "@vueuse/core";


const {
  processing: loading,
  users,
  getUsers,
  deleteUser,
} = useUserActions();

// État pour la recherche
const searchQuery = ref<string>("");
// const isActiveQuery = ref<boolean>();
// const status = [
//   { label: "Tout les utilisateurs", value: null },
//   { label: "Activé", value: true },
//   { label: "Désactivé", value: false },
// ];
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
} = useSelectableList<UserModel>(() => users.value);

// const { show: notify } = useBootstrapToast();

// Configuration de la table 
const { tableClasses, getStatusBadge, getStatusText, commonHeaders } =
  useCustomTable();
const tableHeaders = commonHeaders.user();

// const debouncedIsActive = useDebounceFn(async () => {
//   await getUsers(statusArgs.value);
//   clearSelection(); // Nettoie la sélection après le filtre
// }, 300);

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
    await deleteUser(element.interface);
  }

  clearSelection();
  // Recharger les données après suppression
  await getUsers(searchArgs.value);
};

const refreshUsers = async () => {
  await getUsers(searchArgs.value);
};

onMounted(async () => {
  await getUsers();
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
          @click="refreshUsers"
          class="btn-block-option"
          variant="tonal"
        />
      </div>
    </template>
    <template #options>
      <div class="flex justify-end items-center gap-2">
        <!--Champ de filtre de status-->
        <!-- <VCol cols="4">
          <VSelect
            v-model="isActiveQuery"
            :items="status"
            item-title="label"
            item-value="value"
            placeholder="Filtrer par status"
            density="compact"
            :disabled="loading"
          />
        </VCol>
        <VBtn
          variant="flat"
          color="primary"
          prepend-icon="ri-filter-line"
          :disabled="loading"
          :loading="loading"
          @click="debouncedIsActive"
        >
          Filtrer
        </VBtn> -->
        <!-- Champ de recherche -->
        <!-- <VTextField
          v-model="searchQuery"
          placeholder="Rechercher des utilisateurs..."
          density="compact"
          class="order-2 order-sm-1 max-w-md"
          clearable
          append-inner-icon="ri-search-line"
          :disabled="loading"
          @keyup.enter="() => getUsers({ search: searchQuery })"
          @click:append-inner="() => getUsers({ search: searchQuery })"
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
          @click="router.push('/users/add')"
        >
          <VIcon icon="fa fa-plus" size="small" />
          <span class="ml-1">Ajouter</span>
        </VBtn>
      </div>
    </template>

    <CustomTable
      :headers="tableHeaders"
      :items="users"
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
              <!-- <button
                type="button"
                class="btn btn-sm btn-alt-secondary"
                @click="
                  updateUserActivateOrDesactivate(user.id, user.is_active, {
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
              </button> -->
              <button
                type="button"
                :class="tableClasses.button.action"
                @click="router.push(`/users/edit/${user.id}`);
                "
              >
                <i class="fa fa-fw fa-pencil-alt mr-0"></i>
                <VTooltip activator="parent" location="top">Modifier</VTooltip>
              </button>
              <!-- <button
                type="button"
                class="btn text-error btn-sm btn-alt-secondary"
                @click="updateResetPassword(user.interface)"
              >
                <i class="ri-reset-left-fill" style="color: #009ddc"></i>
                <VTooltip activator="parent" location="top">
                  Réinitialiser le mot de passe
                </VTooltip>
              </button> -->
              <button
                type="button"
                :class="tableClasses.button.danger"
                @click="deleteUser(user.interface)"
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
