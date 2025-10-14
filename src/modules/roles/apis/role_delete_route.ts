

import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import type { RoleInterface } from "../interfaces";
import { RoleModel } from "../models/role_model";
import type { RoleStore } from "../store";
import { RoleRoute } from "./_role_route";

export class RoleDeleteRoute extends RoleRoute {
	
  constructor(id: RoleInterface["id"]) {
    super(`/${RoleRoute.name}`, ApiHttpMethod.DELETE, { id });
    
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new RoleModel(response as RoleInterface);
  }

  async mock() {
    const store: RoleStore = await this.store;
    store.remove({ id });
    return new RoleModel({ id, deleted_at: new Date().toISOString() });
  }

}