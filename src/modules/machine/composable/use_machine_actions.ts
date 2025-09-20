import {  type MachineCreateInterface, type MachineInterface, type MachineUpdateInterface } from "../interfaces";
import { createLogger } from "../../../utils/logger";
import { computed, onMounted, ref } from "vue";
import { MachineModel } from "../models/machine-model";
import type { MachineStore } from "../store";
import { useInitializedMachineStore } from "../store";
import { toast } from "../../../utils/toast";
import { AppUtils } from "../../../utils";
import { ApiError } from "../../../api/errors";

const logger = createLogger("use_machine_actions");

export const useMachineActions = () => {
  const machineStore = ref<MachineStore | null>(null);
  const machines = ref<MachineModel[]>([]);
  const processing = computed(() =>
    machineStore.value ? machineStore.value.loading : true
  );

  const getMachines = async () => {
    if (!machineStore.value) {
      machineStore.value = await useInitializedMachineStore();
    }

    const result = await machineStore.value.getMachines();

    if (result instanceof ApiError) {
      logger.error("Error fetching machines:", { result });
      toast.error("Erreur lors de la récupération des utilisateurs");

      return [];
    }

    machines.value = [...result];
  };

  const findMachine = async (id: MachineInterface["id"]) => {
    if (!machineStore.value) {
      machineStore.value = await useInitializedMachineStore();
    }

    const result = await machineStore.value.findMachine(id);
    if (result instanceof ApiError) {
      logger.error("Error finding machine:", result);
      toast.error(
        `Erreur lors de la recherche de l'utilisateur avec l'ID ${id}`
      );
      return null;
    }

    toast.success(`Utilisateur avec l'ID ${id} trouvé avec succès.`);
    return new MachineModel(result.interface);
  };

  const createMachine = async (data: MachineCreateInterface) => {
    if (!machineStore.value) {
      machineStore.value = await useInitializedMachineStore();
    }

    const result = await machineStore.value.createMachine(data);
    if (result instanceof ApiError) {
      logger.error("Error creating machine:", result);

      toast.error(
        `Erreur lors de la création de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur créé avec succès.`);

    return new MachineModel(result.interface);
  };

  const updateMachine = async (
    elementId: MachineInterface["id"],
    data: MachineUpdateInterface
  ) => {
    if (!machineStore.value) {
      machineStore.value = await useInitializedMachineStore();
    }

    const result = await machineStore.value.updateMachine(elementId, data);
    if (result instanceof ApiError) {
      logger.error("Error updating machine:", result);
      toast.error(
        `Erreur lors de la mise à jour de l'utilisateur: ${result.message}`
      );
      return result;
    }

    toast.success(`Utilisateur mis à jour avec succès.`);

    return new MachineModel(result.interface);
  };

  const deleteMachine = async (element: MachineInterface) => {
    AppUtils.showAlert({
      title: "Êtes-vous sûr?",
      html: `Vous êtes sur le point de supprimer la machine <b class="font-mono">${element.code} </b>. Cette action est <b class="text-pink-950">irréversible</b>`,
      confirmButtonText: "Oui, supprimer",
      onConfirm: async () => {
        if (!machineStore.value) {
          machineStore.value = await useInitializedMachineStore();
        }

        const result = await machineStore.value.deleteMachine(element.id);
        if (result instanceof ApiError) {
          logger.error("Error deleting machine:", result);

          toast.error(
            `Erreur lors de la suppression de l'utilisateur: ${result.message}`
          );
          return false;
        }

        toast.success(
          `Machine ${element.code} supprimé avec succès.`
        );
        getMachines();

        return true;
      },
    });
  };

  onMounted(async () => {
    machineStore.value = await useInitializedMachineStore();
    machines.value = machineStore.value.elements.map((machine) => new MachineModel(machine));
  });

  return {
    processing,
    machines,
    getMachines,
    findMachine,
    createMachine,
    updateMachine,
    deleteMachine,
  };
};
