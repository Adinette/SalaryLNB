import { machineStoreDefinition } from "./definition";
import { machineStoreGetters } from "./getters";
import type { MachineCreateInterface, MachineInterface, MachineStoreInterface, MachineUpdateInterface } from "../interfaces";
import { machineStoreActions } from "./actions";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { defineStore } from "pinia";

const useMachineStore = defineStore(machineStoreDefinition.key, {
  state: (): MachineStoreInterface =>
    structuredClone(machineStoreDefinition.service.defaults),
  getters: machineStoreGetters,
  actions: {
    add(element: MachineInterface) {
      return machineStoreActions.add(this, element);
    },
    find(id: MachineInterface["id"]) {
      return machineStoreActions.find(this, { id });
    },
    update(id: MachineInterface["id"], element: MachineInterface) {
      return machineStoreActions.update(this, { id, data: element });
    },
    remove(id: MachineInterface["id"]) {
      return machineStoreActions.remove(this, { id });
    },
    getMachines(args?: ListApiArgsInterface) {
      return machineStoreActions.getMachines(this, { args });
    },
    findMachine(id: MachineInterface["id"]) {
      return machineStoreActions.findMachine(this, { elementId: id });
    },
    createMachine(data: MachineCreateInterface) {
      return machineStoreActions.createMachine(this, { data });
    },
    updateMachine(elementId: MachineInterface["id"], data: MachineUpdateInterface) {
      return machineStoreActions.updateMachine(this, { elementId, data });
    },
    deleteMachine(elementId: MachineInterface["id"]) {
      return machineStoreActions.deleteMachine(this, { elementId });
    },
    initialize({ reset = false } = {}) {
      return machineStoreActions.initialize(this, { reset });
    },
    setLoading(loading: boolean) {
      return machineStoreActions.setLoading(this, loading);
    },
    setMachines(payload: object) {
      return machineStoreActions.setMachines(this, payload);
    },
  },
});

export async function useInitializedMachineStore(): Promise<
  ReturnType<typeof useMachineStore>
> {
  const store = useMachineStore();
  if (!store.initialized) await store.initialize({ reset: false });
  return store;
}

export type MachineStore = ReturnType<typeof useMachineStore>;
