import { UserStore } from "../index";
import { UserModel } from "../../models/user_model";
import ApiError from "@/api/errors/ApiError";
import { UserUpdateRoute } from "../../../operator/apis/operator_update_route";
import { UserUpdateInterface } from "../../interfaces/user_update_interface";
import { UserInterface } from "../../interfaces/user_interface";
import config from "@/config";
import { ApiModeEnum } from "@/enums/api_mode_enum";
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
