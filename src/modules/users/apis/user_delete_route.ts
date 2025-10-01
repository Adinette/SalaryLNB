
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import ApiError from "../../../api/errors/ApiError";
import NotFoundApiError from "../../../api/errors/NotFoundApiError";
import type { UserInterface } from "../interfaces/user_interface";
import { UserModel } from "../models/user_model";
import type { UserStore } from "../store";
import { UserRoute } from "./_user_route";

export class UserDeleteRoute extends UserRoute {
	private elementId: UserInterface["id"]

	constructor(elementId: UserInterface["id"]) {
		super(`/${UserRoute.name}/${elementId}`, ApiHttpMethod.DELETE, { elementId });
		this.elementId = elementId;
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
