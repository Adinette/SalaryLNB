import { userStoreDefinition } from "./definition";
import { userStoreGetters } from "./getters";
import { userStoreActions } from "./actions";

const useUserStore = defineStore(userStoreDefinition.key, {
  state: (): UserStoreInterface =>
    structuredClone(userStoreDefinition.service.defaults),
  getters: userStoreGetters,
  actions: {
    add(element: UserInterface) {
      return userStoreActions.add(this, element);
    },
    find(id: UserInterface["id"]) {
      return userStoreActions.find(this, { id });
    },
    update(id: UserInterface["id"], element: UserInterface) {
      return userStoreActions.update(this, { id, data: element });
    },
    remove(id: UserInterface["id"]) {
      return userStoreActions.remove(this, { id });
    },
    getUsers(args?: ListApiArgsInterface) {
      return userStoreActions.getUsers(this, { args });
    },
    findUser(id: UserInterface["id"]) {
      return userStoreActions.findUser(this, { elementId: id });
    },
    createUser(data: UserCreateInterface) {
      return userStoreActions.createUser(this, { data });
    },
    updateUser(elementId: UserInterface["id"], data: UserUpdateInterface) {
      return userStoreActions.updateUser(this, { elementId, data });
    },
    updateUserResetPassword(elementId: UserInterface["id"]) {
      return userStoreActions.updateUserResetPassword(this, { elementId });
    },
    updateUserActivate(id: UserInterface["id"]) {
      return userStoreActions.updateUserActivate(this, {
        elementId: id,
      });
    },
    updateUserDesactivate(id: UserInterface["id"]) {
      return userStoreActions.updateUserDesactivate(this, {
        elementId: id,
      });
    },
    deleteUser(elementId: UserInterface["id"]) {
      return userStoreActions.deleteUser(this, { elementId });
    },
    initialize({ reset = false } = {}) {
      return userStoreActions.initialize(this, { reset });
    },
    setLoading(loading: boolean) {
      return userStoreActions.setLoading(this, loading);
    },
    setUsers(payload: object) {
      return userStoreActions.setUsers(this, payload);
    },
  },
});

export async function useInitializedUserStore(): Promise<
  ReturnType<typeof useUserStore>
> {
  const store = useUserStore();
  if (!store.initialized) await store.initialize({ reset: false });
  return store;
}

export type UserStore = ReturnType<typeof useUserStore>;
