import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import { ApiError, UnauthorizedApiError } from "@/api/errors";
import { ApiRoute } from "@/api/routes/api_route";

export default class LoginRoute extends ApiRoute {
  data: LoginInterface;

  constructor(data: LoginInterface) {
    super("/authentication/login", ApiHttpMethod.POST, data);
    this.data = data;
  }
  async request(): Promise<SessionModel | ApiError> {
    const response = await super.request();

    if (response instanceof ApiError) return response;
    console.log("response", response);
    return new SessionModel(response as SessionInterface);
  }
}
