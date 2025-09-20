import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { faker } from "@faker-js/faker";
import { UserStore } from "../store";
import { UserRoute } from "./_user_route";

export class UserDesactivateUpdateRoute extends UserRoute {
  elementId: UserInterface["id"];
  constructor({ elementId }: { elementId: UserInterface["id"] }) {
    super(`/${UserRoute.name}/${elementId}/deactivate`, ApiHttpMethod.PUT);
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
    // return found ? new UserModel(found) : new ApiError("Not found");
  }
}
