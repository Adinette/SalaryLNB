import { UserStore } from "../index";
import { UserModel } from "../../models/user_model";
import ApiError from "@/api/errors/ApiError";
import { UserFindRoute } from "../../../operator/apis/operator_find_route";
import { UserInterface } from "../../interfaces/user_interface";
import config from "@/config";
import { ApiModeEnum } from "@/enums/api_mode_enum";
/**
 * findUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId }: { elementId: UserInterface["id"] } - Element ID
 * @returns {Promise<UserModel | ApiError>}
 */
export async function findUser(
	store: UserStore,
	{ elementId }: { elementId: UserInterface["id"] }
) {
	const apiRoute = new UserFindRoute({ elementId });
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
