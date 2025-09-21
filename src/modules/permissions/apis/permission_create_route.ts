import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { PermissionInterface } from "../interfaces/permission_interface";

import { PermissionModel } from "../models/permission_model";
import { PermissionRoute } from "./_permission_route";
import { faker } from "@faker-js/faker";
import { PermissionStore } from "../store";
import { PermissionCreateInterface } from "../interfaces/permission_create_interface";

export class PermissionCreateRoute extends PermissionRoute {
  data: PermissionCreateInterface;

  constructor(data: PermissionCreateInterface) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.POST, data);
    this.data = data;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

  async mock() {
    const store: PermissionStore = await this.store;
    const model = new PermissionModel({
      ...this.data,
      id: faker.string.uuid(),
      created_at: new Date().toISOString()
    });
    store.add(model.interface);
    return model;
  }
}