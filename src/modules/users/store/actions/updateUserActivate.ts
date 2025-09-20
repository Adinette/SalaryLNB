import { UserActivateUpdateRoute } from "../../../operator/apis/operator_activate_update_route";
import { UserStore } from "../index";
import ApiError from "@/api/errors/ApiError";
/**
 * findUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: UserInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<UserModel | ApiError>}
 */
export async function updateUserActivate(
  store: UserStore,
  {
    elementId,
    mock = false,
  }: { elementId: UserInterface["id"]; mock?: boolean }
) {
  const apiRoute = new UserActivateUpdateRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
