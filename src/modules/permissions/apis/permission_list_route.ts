

import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import type { PermissionInterface } from "../interfaces/permission_interface";
import type { PermissionStore } from "../store";import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import { PermissionModel } from "../models/permission_model";
import { PermissionRoute } from "./_permission_route";

export class PermissionListRoute extends PermissionRoute {
  constructor(args: ListApiArgsInterface = {}) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.GET, args);
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return (response as PermissionInterface[]).map(data => new PermissionModel(data));
  }

  async mock() {
    const store: PermissionStore = await this.store;
    return store.elements.map(e => new PermissionModel(e));
  }
}