

import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import type { RoleCreateInterface, RoleInterface } from "../interfaces";
import { RoleModel } from "../models/role_model";
import type { RoleStore } from "../store";
import { RoleRoute } from "./_role_route";
import { faker } from "@faker-js/faker";

export class RoleCreateRoute extends RoleRoute {
  data: RoleCreateInterface;

  constructor(data: RoleCreateInterface) {
    super(`/${RoleRoute.name}`, ApiHttpMethod.POST, data);
    this.data = data;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new RoleModel(response as RoleInterface);
  }

  async mock() {
    const store: RoleStore = await this.store;
    const model = new RoleModel({
      ...this.data,
      id: faker.string.uuid(),
      created_at: new Date().toISOString()
    });
    store.add(model.interface);
    return model;
  }
}