import { PermissionCreateRoute } from "../../apis/permission_create_route"
import type { PermissionStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { PermissionCreateInterface } from "../../interfaces/permission_create_interface";

/* * createPermission action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param { data, mock = false }: { data: PermissionCreateInterface, mock?: boolean } - Data to create and optional mock flag
 * @returns {Promise<PermissionModel | ApiError>}
 */
export async function createPermission(store: PermissionStore, { data, mock = false }: { data: PermissionCreateInterface, mock?: boolean }) {
  const apiRoute = new PermissionCreateRoute(data);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
