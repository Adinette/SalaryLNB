
// import type { PermissionStore } from "..";s
import { ApiError } from "../../../../api/errors";
import { PermissionDeleteRoute } from "../../apis/permission_delete_route";
import type { PermissionInterface } from "../../interfaces/permission_interface";
/**
 * deletePermission action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: PermissionInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<PermissionModel | ApiError>}
 */
export async function deletePermission(
  // store: PermissionStore, 
  { elementId, mock = false }: { elementId: PermissionInterface["id"], mock?: boolean }) {
  const apiRoute = new PermissionDeleteRoute(elementId);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
