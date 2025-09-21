import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { PermissionInterface } from "../interfaces/permission_interface";
import { PermissionUpdateInterface } from "../interfaces/permission_update_interface";
import { PermissionModel } from "../models/permission_model";
import { PermissionRoute } from "./_permission_route";
import { faker } from "@faker-js/faker";
import { PermissionStore } from "../store";

export class PermissionUpdateRoute extends PermissionRoute {
	
  constructor(id: PermissionInterface["id"], data: PermissionUpdateInterface) {
    super(`/${PermissionRoute.name}`, ApiHttpMethod.PUT, data);
    this.data = data;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new PermissionModel(response as PermissionInterface);
  }

  async mock() {
    const store: PermissionStore = await this.store;
		const permissionToUpdate = store.find(id);
    const permissionUpdated = new PermissionModel({
      ...permissionToUpdate.interface,
      ...this.data,
      updated_at: new Date().toISOString()
    });
    store.update(id, permissionUpdated.interface);
    return permissionUpdated;
  }

}