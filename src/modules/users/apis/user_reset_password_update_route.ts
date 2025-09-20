import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { UserRoute } from "./_user_route";
import { UserModel } from "../models/user_model";
import { UserStore } from "../store";

export class UserResetPasswordUpdateRoute extends UserRoute {
  elementId: UserInterface["id"];
  constructor({ elementId }: { elementId: UserInterface["id"] }) {
    super(`/${UserRoute.name}/${elementId}/reset-password`, ApiHttpMethod.PUT);
    this.elementId = elementId;
  }
  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new UserModel(response as UserInterface);
  }

  async mock() {
    const store: UserStore = await this.store;
    const found = store.find(this.elementId);
  }
}
