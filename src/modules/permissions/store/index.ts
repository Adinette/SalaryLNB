import { permissionStoreDefinition } from "./definition";
import { permissionStoreGetters } from "./getters";
import { permissionStoreActions } from "./actions";

const usePermissionStore = defineStore(permissionStoreDefinition.key, {
	state: (): PermissionStoreInterface => structuredClone(permissionStoreDefinition.service.defaults),
	getters: permissionStoreGetters,
	actions: {
	  add(element: PermissionInterface) {
	    return permissionStoreActions.add(this, element);
	  },
	  find(id: PermissionInterface["id"]) {
	    return permissionStoreActions.find(this, { id });
	  },
	  update(id: PermissionInterface["id"], element: PermissionInterface) {
	    return permissionStoreActions.update(this, { id, data: element });
	  },
	  remove(id: PermissionInterface["id"]) {
	    return permissionStoreActions.remove(this, { id });
	  },
	  getPermissions() {
	    return permissionStoreActions.getPermissions(this);
	  },
	  findPermission(id: PermissionInterface["id"]) {
	    return permissionStoreActions.findPermission(this, { elementId: id });
	  },
	  createPermission(data: PermissionCreateInterface) {
	    return permissionStoreActions.createPermission(this, { data });
	  },
	  updatePermission(elementId: PermissionInterface["id"], data: PermissionUpdateInterface) {
	    return permissionStoreActions.updatePermission(this, { elementId, data });
	  },
	  deletePermission(elementId: PermissionInterface["id"]) {
	    return permissionStoreActions.deletePermission(this, { elementId });
	  },
		initialize({ reset = false } = {}) {
			return permissionStoreActions.initialize(this, { reset });
		},
		setLoading(loading: boolean) {
			return permissionStoreActions.setLoading(this, loading);
		},
	},
});

export async function useInitializedPermissionStore(): Promise<ReturnType<typeof usePermissionStore>> {
	const store = usePermissionStore();
	if (!store.initialized) await store.initialize();
	return store;
}

export type PermissionStore = ReturnType<typeof usePermissionStore>;

export { permissionStoreDefinition };
