
import type { UserInterface } from "../../interfaces";
import { UserFindRoute } from "../../apis/user_find_route";
import { ApiError } from "../../../../api/errors";
// import type { UserStore } from "..";
/**
 * findUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId }: { elementId: UserInterface["id"] } - Element ID
 * @returns {Promise<UserModel | ApiError>}
 */
export async function findUser(
	// store: UserStore,
	{ elementId }: { elementId: UserInterface["id"] }
) {
	const apiRoute = new UserFindRoute({ elementId });
	const result = await apiRoute.mock();
	if (result instanceof ApiError) return result;
	return result;
}
