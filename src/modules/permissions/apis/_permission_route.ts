import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedPermissionStore, type PermissionStore } from "../store";

export class PermissionRoute extends ApiRoute {
  static name = "permission";

  get store(): Promise<PermissionStore> {
    return useInitializedPermissionStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
