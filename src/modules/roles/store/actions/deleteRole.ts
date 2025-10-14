
import type { RoleStore } from "..";
import { ApiError } from "../../../../api/errors";
import { RoleDeleteRoute } from "../../apis/role_delete_route";
import type { RoleInterface } from "../../interfaces";
/**
 * deleteRole action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: RoleInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<RoleModel | ApiError>}
 */
export async function deleteRole(store: RoleStore, { elementId, mock = false }: { elementId: RoleInterface["id"], mock?: boolean }) {
  const apiRoute = new RoleDeleteRoute(elementId);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
