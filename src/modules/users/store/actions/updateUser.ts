import type { UserStore } from "..";
import { ApiError } from "../../../../api/errors";
import { UserUpdateRoute } from "../../apis/user_update_route";
import type { UserInterface, UserUpdateInterface } from "../../interfaces";

/**
 * updateUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId, data }: { elementId: UserInterface["id"], data: UserUpdateInterface } - Element ID and data to update
 * @returns {Promise<UserModel | ApiError>}
 */
export async function updateUser(
	store: UserStore,
	{ elementId, data }: { elementId: UserInterface["id"]; data: UserUpdateInterface }
) {
	const apiRoute = new UserUpdateRoute(elementId, data);
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
