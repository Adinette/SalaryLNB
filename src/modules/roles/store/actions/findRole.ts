import type { RoleStore } from "..";
import { ApiError } from "../../../../api/errors";
import { RoleFindRoute } from "../../apis/role_find_route";
import type { RoleInterface } from "../../interfaces";
/**
 * findRole action
 *
 * @param {RoleStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: RoleInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<RoleModel | ApiError>}
 */
export async function findRole(
  _store: RoleStore, 
  { elementId, mock = false }: { elementId: RoleInterface["id"], mock?: boolean }) {
  const apiRoute = new RoleFindRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
