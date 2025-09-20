
import type { OperatorCreateInterface, OperatorInterface } from "../interfaces";
import { OperatorRoute } from "./_operator_route";
import { ApiError } from "../../../api/errors";
import { OperatorModel } from "../models/operator-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorStore } from "../store";

export class OperatorCreateRoute extends OperatorRoute {
	data: OperatorCreateInterface;

	constructor(data: OperatorCreateInterface) {
		super(`/${OperatorRoute.name}`, ApiHttpMethod.POST, data);
		this.data = data;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorModel(response as OperatorInterface);
	}

	async mock() {
		const store: OperatorStore = await this.store;
		const model = new OperatorModel({
			...this.data,
			id: "1",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});
		store.add(model.interface);
		return model;
	}
}
