import type { RoleStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { RoleListRoute } from "../../apis/role_list_route";
/**
 * getRoles action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param { args, mock }: { args?: ListApiArgsInterface; mock?: boolean } = {} - Optional API parameters and mock flag
 * @returns {Promise<RoleModel[] | ApiError>}
 */
export async function getRoles(store: RoleStore, { args, mock }: { args?: ListApiArgsInterface; mock?: boolean } = {}) {
  const apiRoute = new RoleListRoute(args);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();

  if (result instanceof ApiError) return result;

  store.elements = result.map((model:any) => model.interface);
  return result;

}
