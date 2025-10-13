import { operatorSalaryStoreDefinition } from "./definition";
import { operatorSalaryStoreGetters } from "./getters";
import type { OperatorSalaryCreateInterface, OperatorSalaryInterface, OperatorSalaryStoreInterface, OperatorSalaryUpdateInterface } from "../interfaces";
import { operatorSalaryStoreActions } from "./actions";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { defineStore } from "pinia";

const useOperatorSalaryStore = defineStore(operatorSalaryStoreDefinition.key, {
  state: (): OperatorSalaryStoreInterface =>
    structuredClone(operatorSalaryStoreDefinition.service.defaults),
  getters: operatorSalaryStoreGetters,
  actions: {
    add(element: OperatorSalaryInterface) {
      return operatorSalaryStoreActions.add(this, element);
    },
    find(id: OperatorSalaryInterface["id"]) {
      return operatorSalaryStoreActions.find(this, { id });
    },
    update(id: OperatorSalaryInterface["id"], element: OperatorSalaryInterface) {
      return operatorSalaryStoreActions.update(this, { id, data: element });
    },
    remove(id: OperatorSalaryInterface["id"]) {
      return operatorSalaryStoreActions.remove(this, { id });
    },
    getOperatorSalarys(args?: ListApiArgsInterface ) {
      return operatorSalaryStoreActions.getOperatorSalary(this, { args,  });
    },
    findOperatorSalary(id: OperatorSalaryInterface["id"]) {
      return operatorSalaryStoreActions.findOperatorSalary(this, { elementId: id });
    },
    createOperatorSalary(data: OperatorSalaryCreateInterface) {
      return operatorSalaryStoreActions.createOperatorSalary(this, { data });
    },
    updateOperatorSalary(elementId: OperatorSalaryInterface["id"], data: OperatorSalaryUpdateInterface) {
      return operatorSalaryStoreActions.updateOperatorSalary(this, { elementId, data });
    },
    deleteOperatorSalary(elementId: OperatorSalaryInterface["id"]) {
      return operatorSalaryStoreActions.deleteOperatorSalary(this, { elementId });
    },
    initialize({ reset = false } = {}) {
      return operatorSalaryStoreActions.initialize(this, { reset });
    },
    setLoading(loading: boolean) {
      return operatorSalaryStoreActions.setLoading(this, loading);
    },
    setOperatorSalarys(payload: object) {
      return operatorSalaryStoreActions.setOperatorSalary(this, payload);
    },
  },
});

export async function useInitializedOperatorSalaryStore(): Promise<
  ReturnType<typeof useOperatorSalaryStore>
> {
  const store = useOperatorSalaryStore();
  if (!store.initialized) await store.initialize({ reset: false });
  return store;
}

export type OperatorSalaryStore = ReturnType<typeof useOperatorSalaryStore>;
