import type { PermissionStore } from "..";
import { ApiError } from "../../../../api/errors";
import { PermissionUpdateRoute } from "../../apis/permission_update_route";
import type { PermissionInterface } from "../../interfaces/permission_interface";
import type { PermissionUpdateInterface } from "../../interfaces/permission_update_interface";
/**
 * updatePermission action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param { elementId, data, mock = false }: { elementId: PermissionInterface["id"], data: PermissionUpdateInterface, mock?: boolean } - Element ID, data to update and optional mock flag
 * @returns {Promise<PermissionModel | ApiError>}
 */
export async function updatePermission(store: PermissionStore, { elementId, data, mock = false }: { elementId: PermissionInterface["id"], data: PermissionUpdateInterface, mock?: boolean }) {
  const apiRoute = new PermissionUpdateRoute(elementId, data);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
