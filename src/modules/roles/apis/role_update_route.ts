import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import type { RoleInterface, RoleUpdateInterface } from "../interfaces";
import { RoleModel } from "../models/role_model";
import type { RoleStore } from "../store";
import { RoleRoute } from "./_role_route";

export class RoleUpdateRoute extends RoleRoute {
	
  constructor(id: RoleInterface["id"], data: RoleUpdateInterface) {
    super(`/${RoleRoute.name}`, ApiHttpMethod.PUT, data);
    this.data = data;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new RoleModel(response as RoleInterface);
  }

  async mock() {
    const store: RoleStore = await this.store;
		const roleToUpdate = store.find(id);
    const roleUpdated = new RoleModel({
      ...roleToUpdate.interface,
      ...this.data,
      updated_at: new Date().toISOString()
    });
    store.update(id, roleUpdated.interface);
    return roleUpdated;
  }

}