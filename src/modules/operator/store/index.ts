import { operatorStoreDefinition } from "./definition";
import { operatorStoreGetters } from "./getters";
import type { OperatorCreateInterface, OperatorInterface, OperatorStoreInterface, OperatorUpdateInterface } from "../interfaces";
import { operatorStoreActions } from "./actions";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { defineStore } from "pinia";

const useOperatorStore = defineStore(operatorStoreDefinition.key, {
  state: (): OperatorStoreInterface =>
    structuredClone(operatorStoreDefinition.service.defaults),
  getters: operatorStoreGetters,
  actions: {
    add(element: OperatorInterface) {
      return operatorStoreActions.add(this, element);
    },
    find(id: OperatorInterface["id"]) {
      return operatorStoreActions.find(this, { id });
    },
    update(id: OperatorInterface["id"], element: OperatorInterface) {
      return operatorStoreActions.update(this, { id, data: element });
    },
    remove(id: OperatorInterface["id"]) {
      return operatorStoreActions.remove(this, { id });
    },
    getOperators(args?: ListApiArgsInterface) {
      return operatorStoreActions.getOperators(this, { args });
    },
    findOperator(id: OperatorInterface["id"]) {
      return operatorStoreActions.findOperator(this, { elementId: id });
    },
    createOperator(data: OperatorCreateInterface) {
      return operatorStoreActions.createOperator(this, { data });
    },
    updateOperator(elementId: OperatorInterface["id"], data: OperatorUpdateInterface) {
      return operatorStoreActions.updateOperator(this, { elementId, data });
    },
       updateOperatorActivate(id: OperatorInterface["id"]) {
          return operatorStoreActions.updateOperatorActivate(this, {
            elementId: id, mock: true
          });
        },
        updateOperatorDeactivate(id: OperatorInterface["id"]) {
          return operatorStoreActions.updateOperatorDeactivate(this, {
            elementId: id, mock: true
          });
        },
    deleteOperator(elementId: OperatorInterface["id"]) {
      return operatorStoreActions.deleteOperator(this, { elementId });
    },
    initialize({ reset = false } = {}) {
      return operatorStoreActions.initialize(this, { reset });
    },
    setLoading(loading: boolean) {
      return operatorStoreActions.setLoading(this, loading);
    },
    setOperators(payload: object) {
      return operatorStoreActions.setOperators(this, payload);
    },
  },
});

export async function useInitializedOperatorStore(): Promise<
  ReturnType<typeof useOperatorStore>
> {
  const store = useOperatorStore();
  if (!store.initialized) await store.initialize({ reset: false });
  return store;
}

export type OperatorStore = ReturnType<typeof useOperatorStore>;
