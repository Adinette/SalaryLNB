import ApiHttpMethod from "@/api/enums/api_http_method_enum";
import ApiError from "@/api/errors/ApiError";
import { UserInterface } from "../interfaces/user_interface";

import { UserModel } from "../models/user_model";
import { UserRoute } from "./_user_route";
import { faker } from "@faker-js/faker";
import { UserStore } from "../store";
import { UserCreateInterface } from "../interfaces/user_create_interface";

export class UserCreateRoute extends UserRoute {
	data: UserCreateInterface;

	constructor(data: UserCreateInterface) {
		super(`/${UserRoute.name}`, ApiHttpMethod.POST, data);
		this.data = data;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new UserModel(response as UserInterface);
	}

	async mock() {
		const store: UserStore = await this.store;
		const model = new UserModel({
			...this.data,
			id: faker.string.uuid(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});
		store.add(model.interface);
		return model;
	}
}
