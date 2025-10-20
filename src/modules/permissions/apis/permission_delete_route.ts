

import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { PermissionInterface } from "../interfaces/permission_interface";
import { PermissionModel } from "../models/permission_model";
import type { PermissionStore } from "../store";
import { PermissionRoute } from "./_permission_route";

export class PermissionDeleteRoute extends PermissionRoute {
	private id: PermissionInterface["id"];
  constructor(id: PermissionInterface["id"]) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.DELETE, { id });
    this.id = id;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

 async mock() {
    const store: PermissionStore = await this.store;

    const permissionToDelete = store.find(this.id);

    if (!permissionToDelete) {
      return new NotFoundApiError({
        message: `Aucune permission trouvée avec l'ID ${this.id}.`,
      });
    }

    store.remove(this.id);
    return new PermissionModel(permissionToDelete);
  }

}