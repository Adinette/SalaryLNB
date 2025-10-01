import type { UserStore } from "..";
import ApiError from "../../../../api/errors/ApiError";
import { UserCreateRoute } from "../../apis/user_create_route";
import type { UserCreateInterface } from "../../interfaces";

/**
 * createUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { data }: { data: UserCreateInterface } - Data to create
 * @returns {Promise<UserModel | ApiError>}
 */
export async function createUser(store: UserStore, { data }: { data: UserCreateInterface }) {
	const apiRoute = new UserCreateRoute(data);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
