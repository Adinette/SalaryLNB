import { ApiHttpMethod } from "../enums/api_http_method_enum";

export default interface ApiRouteInterface {
  path: string;
  method: ApiHttpMethod;
  data: object;

  request(): object;
}
