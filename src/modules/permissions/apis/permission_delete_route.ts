import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { PermissionInterface } from "../interfaces/permission_interface";

import { PermissionModel } from "../models/permission_model";
import { PermissionRoute } from "./_permission_route";
import { faker } from "@faker-js/faker";
import { PermissionStore } from "../store";

export class PermissionDeleteRoute extends PermissionRoute {
	
  constructor(id: PermissionInterface["id"]) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.DELETE, { id });
    
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

  async mock() {
    const store: PermissionStore = await this.store;
    store.remove({ id });
    return new PermissionModel({ id, deleted_at: new Date().toISOString() });
  }

}