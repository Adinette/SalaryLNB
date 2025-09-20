import { UserStore } from "../index";
import { UserModel } from "../../models/user_model";
import ApiError from "@/api/errors/ApiError";
import { UserDeleteRoute } from "../../../operator/apis/operator_delete_route";
import { UserInterface } from "../../interfaces/user_interface";
import config from "@/config";
import { ApiModeEnum } from "@/enums/api_mode_enum";
/**
 * deleteUser action
 *
 * @param {UserStore} store - The Pinia store instance
 * @param { elementId }: { elementId: UserInterface["id"] } - Element ID
 * @returns {Promise<UserModel | ApiError>}
 */
export async function deleteUser(
	store: UserStore,
	{ elementId }: { elementId: UserInterface["id"] }
) {
	const apiRoute = new UserDeleteRoute(elementId);
	const result = await apiRoute.request();
	if (result instanceof ApiError) return result;
	return result;
}
