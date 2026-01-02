import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedUserStore, type UserStore } from "../store";

export class UserRoute extends ApiRoute {
  static name = "user";

  get store(): Promise<UserStore> {
    return useInitializedUserStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
