import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedRoleStore, type RoleStore } from "../store";

export class RoleRoute extends ApiRoute {
  static name = "role";

  get store(): Promise<RoleStore> {
    return useInitializedRoleStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
