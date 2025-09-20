import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedMachineStore, type MachineStore } from "../store";


export class MachineRoute extends ApiRoute {
  static name = "machines";

  get store(): Promise<MachineStore> {
    return useInitializedMachineStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
