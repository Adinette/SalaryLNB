
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import ApiError from "../../../api/errors/ApiError";
import NotFoundApiError from "../../../api/errors/NotFoundApiError";
import type { UserInterface } from "../interfaces/user_interface";
import type { UserUpdateInterface } from "../interfaces/user_update_interface";
import { UserModel } from "../models/user_model";
import type { UserStore } from "../store";
import { UserRoute } from "./_user_route";

export class UserUpdateRoute extends UserRoute {
	elementId: UserInterface["id"];
	data: UserUpdateInterface;

	constructor(
		elementId: UserInterface["id"],
		data: UserUpdateInterface
	) {
		super(`/${UserRoute.name}/${elementId}`, ApiHttpMethod.PUT, data);
		this.elementId = elementId;
		this.data = data;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new UserModel(response as UserInterface);
	}

	async mock() {
		const store: UserStore = await this.store;

		const userToUpdate = store.find(this.elementId);

		if (!userToUpdate) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		const userUpdated = new UserModel({
			...userToUpdate,
			...this.data,
			updated_at: new Date().toISOString(),
		});

		store.update(this.elementId, userUpdated.interface);
		return userUpdated;
	}
}
