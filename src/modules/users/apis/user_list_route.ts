import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { UserInterface } from "../interfaces/user_interface";

import { UserModel } from "../models/user_model";
import { UserRoute } from "./_user_route";
import { UserStore } from "../store";

export class UserListRoute extends UserRoute {
	constructor(args: ListApiArgsInterface = {}) {
		super(`/${UserRoute.name}`, ApiHttpMethod.GET, args);
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return (response as UserInterface[]).map((data) => new UserModel(data));
	}

	async mock() {
		const store: UserStore = await this.store;
		let results = store.elements.map((e) => new UserModel(e));

		// Appliquer la recherche si elle est fournie
		if (this.data && (this.data as ListApiArgsInterface).search) {
			const searchTerm = (this.data as ListApiArgsInterface).search!.toLowerCase();
			results = results.filter(
				(user) =>
					user.first_name.toLowerCase().includes(searchTerm) ||
					user.last_name.toLowerCase().includes(searchTerm) ||
					user.email.toLowerCase().includes(searchTerm) ||
					(user.phone && user.phone.toLowerCase().includes(searchTerm))
			);
		}

		return results;
	}
}
