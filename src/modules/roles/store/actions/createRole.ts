import type { RoleStore } from "..";
import { ApiError } from "../../../../api/errors";
import { RoleCreateRoute } from "../../apis/role_create_route";
import type { RoleCreateInterface } from "../../interfaces";
/**
 * createRole action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param { data, mock = false }: { data: RoleCreateInterface, mock?: boolean } - Data to create and optional mock flag
 * @returns {Promise<RoleModel | ApiError>}
 */
export async function createRole(
  _store: RoleStore, 
  { data, mock = false }: { data: RoleCreateInterface, mock?: boolean }) {
  const apiRoute = new RoleCreateRoute(data);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
