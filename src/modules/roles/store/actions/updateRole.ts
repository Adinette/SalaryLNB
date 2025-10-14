import type { RoleStore } from "..";
import { ApiError } from "../../../../api/errors";
import { RoleUpdateRoute } from "../../apis/role_update_route";
import type { RoleInterface, RoleUpdateInterface } from "../../interfaces";

/**
 * updateRole action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param { elementId, data, mock = false }: { elementId: RoleInterface["id"], data: RoleUpdateInterface, mock?: boolean } - Element ID, data to update and optional mock flag
 * @returns {Promise<RoleModel | ApiError>}
 */
export async function updateRole(store: RoleStore, { elementId, data, mock = false }: { elementId: RoleInterface["id"], data: RoleUpdateInterface, mock?: boolean }) {
  const apiRoute = new RoleUpdateRoute(elementId, data);
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
