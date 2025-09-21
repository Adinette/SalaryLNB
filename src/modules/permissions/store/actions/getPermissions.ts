import { PermissionStore } from "../index";
import ApiError from "@/api/errors/ApiError";
import { PermissionListRoute } from "../../apis/permission_list_route";
/**
 * getPermissions action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param { args, mock }: { args?: ListApiArgsInterface; mock?: boolean } = {} - Optional API parameters and mock flag
 * @returns {Promise<PermissionModel[] | ApiError>}
 */
export async function getPermissions(store: PermissionStore, { args, mock }: { args?: ListApiArgsInterface; mock?: boolean } = {}) {
  const apiRoute = new PermissionListRoute(args);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();

  if (result instanceof ApiError) return result;

  store.elements = result.map((model) => model.interface);
  return result;

}
