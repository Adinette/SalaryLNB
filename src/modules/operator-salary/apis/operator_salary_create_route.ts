
import type { OperatorSalaryCreateInterface, OperatorSalaryInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";
import type { OperatorInterface } from "../../../interfaces";

export class OperatorSalaryCreateRoute extends OperatorSalaryRoute {
	data: OperatorSalaryCreateInterface;
id: OperatorInterface["id"];

	constructor(data: OperatorSalaryCreateInterface, id: OperatorInterface["id"]) {
		super(`/${OperatorSalaryRoute.name}/${id}`, ApiHttpMethod.POST, data);
		this.data = data;
				this.id = id;

	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorSalaryModel(response as OperatorSalaryInterface);
	}

	async mock() {
		const store: OperatorSalaryStore = await this.store;
		const model = new OperatorSalaryModel({
			...this.data,
			id: "1",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});
		store.add(model.interface);
		return model;
	}
}
