import { ApiRoute } from "../../../api/routes/api_route";
import { useInitializedOperatorSalaryStore, type OperatorSalaryStore } from "../store";


export class OperatorSalaryRoute extends ApiRoute {
  static name = "operator-salary";

  get store(): Promise<OperatorSalaryStore> {
    return useInitializedOperatorSalaryStore();
  }

  async request() {
    const store = await this.store;
    store.setLoading(true);
    const result = await super.request();
    store.setLoading(false);
    return result;
  }
}
