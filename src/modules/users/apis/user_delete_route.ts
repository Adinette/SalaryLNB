import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { UserInterface } from "../interfaces/user_interface";
import { UserModel } from "../models/user_model";
import { UserRoute } from "./_user_route";
import { faker } from "@faker-js/faker";
import { UserStore } from "../store";
import NotFoundApiError from "@/api/errors/NotFoundApiError";

export class UserDeleteRoute extends UserRoute {
	constructor(private elementId: UserInterface["id"]) {
		super(`/${UserRoute.name}/${elementId}`, ApiHttpMethod.DELETE, { elementId });
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new UserModel(response as UserInterface);
	}

	async mock() {
		const store: UserStore = await this.store;

		const userToDelete = store.find(this.elementId);

		if (!userToDelete) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		store.remove(this.elementId);
		return new UserModel(userToDelete);
	}
}
