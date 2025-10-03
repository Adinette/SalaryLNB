import type { UserStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { UserListRoute } from "../../apis/user_list_route";
import type { UserModel } from "../../models/user_model";

/**
 * getUsers action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { args }: { args?: ListApiArgsInterface } = {} - Optional API parameters
 * @returns {Promise<UserModel[] | ApiError>}
 */

export async function getUsers(
  store: UserStore,
  { args }: { args?: ListApiArgsInterface } = {}
): Promise<UserModel[]> {
  const apiRoute = new UserListRoute(args);
  const result = await apiRoute.mock();

  if (result instanceof ApiError) {
    // logguer ici si tu veux
    return [];
  }

  store.elements = result.map((model: { interface: any }) => model.interface);
  return result;
}
