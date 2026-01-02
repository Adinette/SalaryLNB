import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import { ApiRoute } from "../../../api/routes/api_route";
import type { LoginInterface } from "../interfaces/login_interface";
import type { SessionInterface } from "../interfaces/session_interface";
import { SessionModel } from "../models/session_model";

export default class LoginRoute extends ApiRoute {
  data: LoginInterface;

  constructor(data: LoginInterface) {
    super("/auth/login", ApiHttpMethod.POST, data);
    this.data = data;
  }
  async request(): Promise<SessionModel | ApiError> {
    const response = await super.request();

    if (response instanceof ApiError) return response;
    return new SessionModel(response as SessionInterface);
  }
}
