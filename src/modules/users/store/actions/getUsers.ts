import { UserStore } from "../index";
import ApiError from "@/api/errors/ApiError";
import { UserListRoute } from "../../../operator/apis/operator_list_route";
import config from "@/config";
import { ApiModeEnum } from "@/enums/api_mode_enum";
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

	store.elements = result.map((model) => model.interface);
	return result;
}
