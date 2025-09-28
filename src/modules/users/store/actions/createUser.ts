import { UserStore } from "../index";
import { UserModel } from "../../models/user_model";
import ApiError from "@/api/errors/ApiError";
import { UserCreateRoute } from "../../../operator/apis/operator_create_route";
import { UserCreateInterface } from "../../interfaces/user_create_interface";
import config from "@/config";
import { ApiModeEnum } from "@/enums/api_mode_enum";
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
