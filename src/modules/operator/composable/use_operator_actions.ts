import {  type OperatorCreateInterface, type OperatorInterface, type OperatorUpdateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import { computed, onMounted, ref } from "vue";
import { OperatorModel } from "../models/operator-model";
import type { OperatorStore } from "../store";
import { useInitializedOperatorStore } from "../store";
import { toast } from "../../../utils/toast";
import { AppUtils } from "../../../utils";
import { ApiError } from "../../../api/errors";

const logger = createLogger("use_operator_actions");

export const useOperatorActions = () => {
  const operatorStore = ref<OperatorStore | null>(null);
  const operators = ref<OperatorModel[]>([]);
  const processing = computed(() =>
    operatorStore.value ? operatorStore.value.loading : true
  );

  const getOperators = async () => {
    if (!operatorStore.value) {
      operatorStore.value = await useInitializedOperatorStore();
    }

    const result = await operatorStore.value.getOperators();

    if (result instanceof ApiError) {
      logger.error("Error fetching operators:", { result });
      toast.error("Erreur lors de la récupération des utilisateurs");

      return [];
    }

    operators.value = [...result];
  };

  const findOperator = async (id: OperatorInterface["id"]) => {
    if (!operatorStore.value) {
      operatorStore.value = await useInitializedOperatorStore();
    }

    const result = await operatorStore.value.findOperator(id);
    if (result instanceof ApiError) {
      logger.error("Error finding operator:", result);
      toast.error(
        `Erreur lors de la recherche de l'utilisateur avec l'ID ${id}`
      );
      return null;
    }

    toast.success(`Utilisateur avec l'ID ${id} trouvé avec succès.`);
    return new OperatorModel(result.interface);
  };

  const createOperator = async (data: OperatorCreateInterface) => {
    if (!operatorStore.value) {
      operatorStore.value = await useInitializedOperatorStore();
    }

    const result = await operatorStore.value.createOperator(data);
    if (result instanceof ApiError) {
      logger.error("Error creating operator:", result);

      toast.error(
        `Erreur lors de la création de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur créé avec succès.`);

    return new OperatorModel(result.interface);
  };

  const updateOperator = async (
    elementId: OperatorInterface["id"],
    data: OperatorUpdateInterface
  ) => {
    if (!operatorStore.value) {
      operatorStore.value = await useInitializedOperatorStore();
    }

    const result = await operatorStore.value.updateOperator(elementId, data);
    if (result instanceof ApiError) {
      logger.error("Error updating operator:", result);
      toast.error(
        `Erreur lors de la mise à jour de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur mis à jour avec succès.`);

    return new OperatorModel(result.interface);
  };

  const deleteOperator = async (element: OperatorInterface) => {
    AppUtils.showAlert({
      title: "Êtes-vous sûr?",
      html: `Vous êtes sur le point de supprimer l'utilisateur <b class="font-mono">${element.first_name} ${element.last_name}</b>. Cette action est <b class="text-pink-950">irréversible</b>`,
      confirmButtonText: "Oui, supprimer",
      onConfirm: async () => {
        if (!operatorStore.value) {
          operatorStore.value = await useInitializedOperatorStore();
        }

        const result = await operatorStore.value.deleteOperator(element.id);
        if (result instanceof ApiError) {
          logger.error("Error deleting operator:", result);

          toast.error(
            `Erreur lors de la suppression de l'utilisateur: ${result.message}`
          );
          return false;
        }

        toast.success(
          `Utilisateur ${element.first_name} ${element.last_name} supprimé avec succès.`
        );
        getOperators();

        return true;
      },
    });
  };

  onMounted(async () => {
    operatorStore.value = await useInitializedOperatorStore();
    operators.value = operatorStore.value.elements.map((operator) => new OperatorModel(operator));
  });

  return {
    processing,
    operators,
    getOperators,
    findOperator,
    createOperator,
    updateOperator,
    deleteOperator,
  };
};
