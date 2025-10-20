

import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { PermissionInterface } from "../interfaces/permission_interface";
import { PermissionModel } from "../models/permission_model";
import type { PermissionStore } from "../store";
import { PermissionRoute } from "./_permission_route";

export class PermissionFindRoute extends PermissionRoute {
	elementId: PermissionInterface["id"];
  constructor({ elementId }: { elementId: PermissionInterface["id"] }) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.GET, { id: elementId });
    this.elementId = elementId;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

  async mock() {
    const store: PermissionStore = await this.store;
    const found = store.find(this.elementId);
      if (!found) {
          return new NotFoundApiError({
            message: `Permission avec l'ID ${this.elementId} non trouvé`,
          });
        }
    return new PermissionModel(found);
  }

}