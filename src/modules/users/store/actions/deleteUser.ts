// import type { UserStore } from "..";
import ApiError from "../../../../api/errors/ApiError";
import { UserDeleteRoute } from "../../apis/user_delete_route";
import type { UserInterface } from "../../interfaces";
/**
 * deleteUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId }: { elementId: UserInterface["id"] } - Element ID
 * @returns {Promise<UserModel | ApiError>}
 */
export async function deleteUser(
	// store: UserStore,
	{ elementId }: { elementId: UserInterface["id"] }
) {
	const apiRoute = new UserDeleteRoute(elementId);
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
