import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError } from "../../../api/errors";
import { ApiRoute } from "../../../api/routes/api_route";
import type { ActivateInterface } from "../interfaces/activate_interface";


export default class UserActivateRoute extends ApiRoute {
  constructor(data: ActivateInterface) {
    // Note : On utilise le chemin complet vers ton endpoint NestJS
    super("/auth/activate", ApiHttpMethod.POST, data);
  }

  async request(): Promise<any | ApiError> {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return response; // Ici, on attend souvent juste un message de succès
  }
}
