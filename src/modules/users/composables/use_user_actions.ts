
import { createLogger } from "../../../utils/logger";
import { computed, onMounted, ref } from "vue";
import { toast } from "../../../utils/toast";
import type { UserListFilterInterface } from "../interfaces/user_list_filter_interface";
import { useInitializedUserStore, type UserStore } from "../store";
import { UserModel } from "../models/user_model";
import ApiError from "../../../api/errors/ApiError";
import type { UserInterface } from "../interfaces/user_interface";
import type { UserCreateInterface } from "../interfaces/user_create_interface";
import type { UserUpdateInterface } from "../interfaces";
import { AppUtils } from "../../../utils";

const logger = createLogger("use_user_actions");

export const useUserActions = () => {
  const userStore = ref<UserStore | null>(null);
  const users = ref<UserModel[]>([]);
  const processing = computed(() =>
    userStore.value ? userStore.value.loading : true
  );

  const getUsers = async (args?: UserListFilterInterface) => {
    if (!userStore.value) {
      userStore.value = await useInitializedUserStore();
    }
    const result = await userStore.value.getUsers(args);

    if (result instanceof ApiError) {
      logger.error("Error fetching users:", { result });
      toast.error("Erreur lors de la récupération des utilisateurs");

      return [];
    }


    users.value = [...result];
  };

  const findUser = async (id: UserInterface["id"]) => {
    if (!userStore.value) {
      userStore.value = await useInitializedUserStore();
    }

    const result = await userStore.value.findUser(id);
    if (result instanceof ApiError) {
      logger.error("Error finding user:", result);
      toast.error(
        `Erreur lors de la recherche de l'utilisateur avec l'ID ${id}`
      );
      return null;
    }

    toast.success(`Utilisateur avec l'ID ${id} trouvé avec succès.`);
    return new UserModel(result.interface);
  };

  const createUser = async (data: UserCreateInterface) => {
    if (!userStore.value) {
      userStore.value = await useInitializedUserStore();
    }

    const result = await userStore.value.createUser(data);
    if (result instanceof ApiError) {
      logger.error("Error creating user:", result);

      toast.error(
        `Erreur lors de la création de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur créé avec succès.`);

    return new UserModel(result.interface);
  };

  const updateUser = async (
    elementId: UserInterface["id"],
    data: UserUpdateInterface
  ) => {
    if (!userStore.value) {
      userStore.value = await useInitializedUserStore();
    }

    const result = await userStore.value.updateUser(elementId, data);
    if (result instanceof ApiError) {
      logger.error("Error updating user:", result);
      toast.error(
        `Erreur lors de la mise à jour de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur mis à jour avec succès.`);

    return new UserModel(result.interface);
  };

  const deleteUser = async (element: UserInterface) => {
    AppUtils.showAlert({
      title: "Êtes-vous sûr?",
      html: `Vous êtes sur le point de supprimer l'utilisateur <b class="font-mono">${element.first_name} ${element.last_name}</b>. Cette action est <b class="text-pink-950">irréversible</b>`,
      confirmButtonText: "Oui, supprimer",
      onConfirm: async () => {
        if (!userStore.value) {
          userStore.value = await useInitializedUserStore();
        }

        const result = await userStore.value.deleteUser(element.id);
        if (result instanceof ApiError) {
          logger.error("Error deleting user:", result);

          toast.error(
            `Erreur lors de la suppression de l'utilisateur: ${result.message}`
          );
          return false;
        }

        toast.success(
          `Utilisateur ${element.first_name} ${element.last_name} supprimé avec succès.`
        );
        getUsers();

        return true;
      },
    });
  };

  onMounted(async () => {
    userStore.value = await useInitializedUserStore();
  });

  return {
    processing,
    users,
    getUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
