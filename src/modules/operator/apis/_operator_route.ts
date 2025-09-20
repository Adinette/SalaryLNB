import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedOperatorStore, type OperatorStore } from "../store";


export class OperatorRoute extends ApiRoute {
  static name = "operators";

  get store(): Promise<OperatorStore> {
    return useInitializedOperatorStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
