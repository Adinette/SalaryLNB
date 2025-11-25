// import type { PermissionStore } from "..";
import { ApiError } from "../../../../api/errors";
import { PermissionFindRoute } from "../../apis/permission_find_route";
import {type PermissionInterface } from "../../interfaces/permission_interface";
/**
 * findPermission action
 *
 * @param {PermissionStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: PermissionInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<PermissionModel | ApiError>}
 */
export async function findPermission(
  // store: PermissionStore, 
  { elementId, mock = false }: { elementId: PermissionInterface["id"], mock?: boolean }) {
  const apiRoute = new PermissionFindRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;

}
