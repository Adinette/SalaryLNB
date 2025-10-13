import {  type OperatorSalaryCreateInterface, type OperatorSalaryInterface, type OperatorSalaryUpdateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import { computed, onMounted, ref } from "vue";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import type { OperatorSalaryStore } from "../store";
import { useInitializedOperatorSalaryStore } from "../store";
import { toast } from "../../../utils/toast";
import { AppUtils } from "../../../utils";
import { ApiError } from "../../../api/errors";
import type { OperatorSalaryListFilterInterface } from "../interfaces/operator_salary_list_filter_interface";

const logger = createLogger("use_operator_actions");

export const useOperatorSalaryActions = () => {
  const operatorSalaryStore = ref<OperatorSalaryStore | null>(null);
  const operatorSalary = ref<OperatorSalaryModel[]>([]);
  const processing = computed(() =>
    operatorSalaryStore.value ? operatorSalaryStore.value.loading : true
  );

  const getOperatorSalary = async (args?: OperatorSalaryListFilterInterface) => {
    if (!operatorSalaryStore.value) {
      operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
    }

    const result = await operatorSalaryStore.value.getOperatorSalarys(args);

    if (result instanceof ApiError) {
      logger.error("Error fetching operatorSalary:", { result });
      toast.error("Erreur lors de la récupération des utilisateurs");

      return [];
    }

    operatorSalary.value = [...result];
  };

  const findOperatorSalary = async (id: OperatorSalaryInterface["id"]) => {
    if (!operatorSalaryStore.value) {
      operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
    }

    const result = await operatorSalaryStore.value.findOperatorSalary(id);
    if (result instanceof ApiError) {
      logger.error("Error finding operatorSalary:", result);
      toast.error(
        `Erreur lors de la recherche du calcul du salaire de l'opérateur avec l'ID ${id}`
      );
      return null;
    }

    toast.success(`Calcul du salaire de l'opérateur avec l'ID ${id} trouvé avec succès.`);
    return new OperatorSalaryModel(result.interface);
  };

  const createOperatorSalary = async (data: OperatorSalaryCreateInterface) => {
    if (!operatorSalaryStore.value) {
      operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
    }

    const result = await operatorSalaryStore.value.createOperatorSalary(data);
    if (result instanceof ApiError) {
      logger.error("Error creating operatorSalary:", result);

      toast.error(
        `Erreur lors du calcul du salaire de l'opérateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Calcul du salaire de l'opérateur créé avec succès.`);

    return new OperatorSalaryModel(result.interface);
  };

  const updateOperatorSalary = async (
    elementId: OperatorSalaryInterface["id"],
    data: OperatorSalaryUpdateInterface
  ) => {
    if (!operatorSalaryStore.value) {
      operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
    }

    const result = await operatorSalaryStore.value.updateOperatorSalary(elementId, data);
    if (result instanceof ApiError) {
      logger.error("Error updating operatorSalary:", result);
      toast.error(
        `Erreur lors de la mise à jour du calcul du salaire de l'opérateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Calcul du salaire de l'opérateur mis à jour avec succès.`);

    return new OperatorSalaryModel(result.interface);
  };

  const deleteOperatorSalary = async (element: OperatorSalaryInterface) => {
    AppUtils.showAlert({
      title: "Êtes-vous sûr?",
      html: `Vous êtes sur le point de supprimer le calcul du salaire de l'opérateur à la date <b class="font-mono">${element.date}</b>. Cette action est <b class="text-pink-950">irréversible</b>`,
      confirmButtonText: "Oui, supprimer",
      onConfirm: async () => {
        if (!operatorSalaryStore.value) {
          operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
        }

        const result = await operatorSalaryStore.value.deleteOperatorSalary(element.id);
        if (result instanceof ApiError) {
          logger.error("Error deleting operatorSalary:", result);

          toast.error(
            `Erreur lors de la suppression du  l'opérateur: ${result.message}`
          );
          return false;
        }

        toast.success(
          `Calcul du salaire de l'opérateur à la date ${element.date} supprimé avec succès.`
        );
        getOperatorSalary();

        return true;
      },
    });
  };

  onMounted(async () => {
    operatorSalaryStore.value = await useInitializedOperatorSalaryStore();
    operatorSalary.value = operatorSalaryStore.value.elements.map((operator) => new OperatorSalaryModel(operator));
  });

  return {
    processing,
    operatorSalary,
    getOperatorSalary,
    findOperatorSalary,
    createOperatorSalary,
    updateOperatorSalary,
    deleteOperatorSalary,
  };
};
