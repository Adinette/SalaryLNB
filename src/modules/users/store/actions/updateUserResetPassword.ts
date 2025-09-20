import ApiError from "@/api/errors/ApiError";
import { UserResetPasswordUpdateRoute } from "../../../operator/apis/user_reset_password_update_route";

/**
 * findSale action
 *
 * @param {SaleStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: SaleInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<SaleModel | ApiError>}
 */
export async function updateUserResetPassword(
  store: UserStore,
  {
    elementId,
    mock = false,
  }: { elementId: UserInterface["id"]; mock?: boolean }
) {
  const apiRoute = new UserResetPasswordUpdateRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
