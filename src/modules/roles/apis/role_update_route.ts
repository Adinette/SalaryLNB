import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { RoleInterface, RoleUpdateInterface } from "../interfaces";
import { RoleModel } from "../models/role_model";
import type { RoleStore } from "../store";
import { RoleRoute } from "./_role_route";

export class RoleUpdateRoute extends RoleRoute {
	id: RoleInterface["id"];
  data: RoleUpdateInterface;  
  constructor(id: RoleInterface["id"], data: RoleUpdateInterface) {
    super(`/${RoleRoute.name}`, ApiHttpMethod.PUT, data);
    this.data = data;
    this.id = id;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new RoleModel(response as RoleInterface);
  }

  async mock() {
    const store: RoleStore = await this.store;
		const roleToUpdate = store.find(this.id);
    if (!roleToUpdate) {
      return new NotFoundApiError({
        message: `Role avec l'ID ${this.id} non trouvé`,
      });
    }
    const roleUpdated = new RoleModel({
      ...roleToUpdate,
      ...this.data,
      updated_at: new Date().toISOString()
    });
    store.update(this.id, roleUpdated.interface);
    return roleUpdated;
  }

}