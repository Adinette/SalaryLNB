import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import type { RoleInterface } from "../interfaces";
import { RoleModel } from "../models/role_model";
import type { RoleStore } from "../store";
import { RoleRoute } from "./_role_route";

export class RoleListRoute extends RoleRoute {
  constructor(args: ListApiArgsInterface = {}) {
    super(`/${RoleRoute.name}`, ApiHttpMethod.GET, args);
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return (response as RoleInterface[]).map(data => new RoleModel(data));
  }

  async mock() {
    const store: RoleStore = await this.store;
    return store.elements.map(e => new RoleModel(e));
  }
}