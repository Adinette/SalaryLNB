import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { PermissionInterface } from "../interfaces/permission_interface";

import { PermissionModel } from "../models/permission_model";
import { PermissionRoute } from "./_permission_route";
import { faker } from "@faker-js/faker";
import { PermissionStore } from "../store";

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