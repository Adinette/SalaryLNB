import type { UserStore } from "..";
import { ApiError } from "../../../../api/errors";
import type { ListApiArgsInterface } from "../../../../api/interfaces/list_api_args_interface";
import { UserListRoute } from "../../apis/user_list_route";

/**
 * getUsers action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { args }: { args?: ListApiArgsInterface } = {} - Optional API parameters
 * @returns {Promise<UserModel[] | ApiError>}
 */
export async function getUsers(store: UserStore, { args }: { args?: ListApiArgsInterface } = {}) {
	const apiRoute = new UserListRoute(args);
	const result = await apiRoute.request();

	if (result instanceof ApiError) return result;

	store.elements = result.map((model: { interface: any; }) => model.interface);
	return result;
}
