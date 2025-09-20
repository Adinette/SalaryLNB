import { UserStore } from "../index";
import ApiError from "@/api/errors/ApiError";
import { UserDesactivateUpdateRoute } from "../../../operator/apis/user_desactivate_update_route";
/**
 * findUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: UserInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<UserModel | ApiError>}
 */
export async function updateUserDesactivate(
  store: UserStore,
  {
    elementId,
    mock = false,
  }: { elementId: UserInterface["id"]; mock?: boolean }
) {
  const apiRoute = new UserDesactivateUpdateRoute({ elementId });
  console.log(apiRoute);

  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
