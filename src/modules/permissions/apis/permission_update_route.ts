import { PermissionRoute } from "./_permission_route";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { PermissionInterface } from "../interfaces/permission_interface";
import { PermissionModel } from "../models/permission_model";
import type { PermissionStore } from "../store";
import type { PermissionUpdateInterface } from "../interfaces/permission_update_interface";

export class PermissionUpdateRoute extends PermissionRoute {
	id: PermissionInterface["id"];
  data: PermissionUpdateInterface;
  constructor(id: PermissionInterface["id"], data: PermissionUpdateInterface) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.PUT, data);
    this.id = id;
    this.data = data;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

  async mock() {
    const store: PermissionStore = await this.store;
		const permissionToUpdate = store.find(this.id);
    if (!permissionToUpdate) {
      return new NotFoundApiError({
        message: `Permission avec l'ID ${this.id} non trouvé`,
      });
    }
    const permissionUpdated = new PermissionModel({
      ...permissionToUpdate,
      ...this.data,
      updated_at: new Date().toISOString()
    });
    store.update(this.id, permissionUpdated.interface);
    return permissionUpdated;
  }

}