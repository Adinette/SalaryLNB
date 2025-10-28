import type {  OperatorSalaryInterface, OperatorSalaryUpdateInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";

export class OperatorSalaryUpdateRoute extends OperatorSalaryRoute {
	elementId: OperatorSalaryInterface["id"];
	constructor(elementId: OperatorSalaryInterface["id"], data: OperatorSalaryUpdateInterface
	) {
		super(`/${OperatorSalaryRoute.name}/${elementId}`, ApiHttpMethod.PUT, data);
		this.data = data;
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorSalaryModel(response as OperatorSalaryInterface);
	}

	async mock() {
		const store: OperatorSalaryStore = await this.store;

		const operatorToUpdate = store.find(this.elementId);

		if (!operatorToUpdate) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		const operatorUpdated = new OperatorSalaryModel({
			...operatorToUpdate,
			...this.data,
			updated_at: new Date().toISOString(),
		});

		store.update(this.elementId, operatorUpdated.interface);
		return operatorUpdated;
	}
}
