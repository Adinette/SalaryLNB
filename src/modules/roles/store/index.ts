import { roleStoreDefinition } from "./definition";
import { roleStoreGetters } from "./getters";
import { roleStoreActions } from "./actions";
import type { RoleCreateInterface, RoleInterface, RoleStoreInterface, RoleUpdateInterface } from "../interfaces";
import { defineStore } from "pinia";

const useRoleStore = defineStore(roleStoreDefinition.key, {
	state: (): RoleStoreInterface => structuredClone(roleStoreDefinition.service.defaults),
	getters: roleStoreGetters,
	actions: {
	  add(element: RoleInterface) {
	    return roleStoreActions.add(this, element);
	  },
	  find(id: RoleInterface["id"]) {
	    return roleStoreActions.find(this, { id });
	  },
	  update(id: RoleInterface["id"], element: RoleInterface) {
	    return roleStoreActions.update(this, { id, data: element });
	  },
	  remove(id: RoleInterface["id"]) {
	    return roleStoreActions.remove(this, { id });
	  },
	  getRoles() {
	    return roleStoreActions.getRoles(this);
	  },
	  findRole(id: RoleInterface["id"]) {
	    return roleStoreActions.findRole(this, { elementId: id });
	  },
	  createRole(data: RoleCreateInterface) {
	    return roleStoreActions.createRole(this, { data });
	  },
	  updateRole(elementId: RoleInterface["id"], data: RoleUpdateInterface) {
	    return roleStoreActions.updateRole(this, { elementId, data });
	  },
	  deleteRole(elementId: RoleInterface["id"]) {
	    return roleStoreActions.deleteRole(this, { elementId });
	  },
		initialize({ reset = false } = {}) {
			return roleStoreActions.initialize(this, { reset });
		},
		setLoading(loading: boolean) {
			return roleStoreActions.setLoading(this, loading);
		},
	},
});

export async function useInitializedRoleStore(): Promise<ReturnType<typeof useRoleStore>> {
	const store = useRoleStore();
	if (!store.initialized) await store.initialize();
	return store;
}

export type RoleStore = ReturnType<typeof useRoleStore>;
