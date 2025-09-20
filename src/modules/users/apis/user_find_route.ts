import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { UserInterface } from "../interfaces/user_interface";
import { UserModel } from "../models/user_model";
import { UserRoute } from "./_user_route";
import { faker } from "@faker-js/faker";
import { UserStore } from "../store";
import { NotFoundApiError } from "@/api/errors";

export class UserFindRoute extends UserRoute {
	elementId: UserInterface["id"];
	constructor({ elementId }: { elementId: UserInterface["id"] }) {
		super(`/${UserRoute.name}/${elementId}`, ApiHttpMethod.GET, { id: elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new UserModel(response as UserInterface);
	}

	async mock() {
		const store: UserStore = await this.store;
		const found = store.find(this.elementId);
		if (!found) {
			return new NotFoundApiError({
				message: `Utilisateur avec l'ID ${this.elementId} non trouvé`,
			});
		}
		return new UserModel(found);
	}
}
