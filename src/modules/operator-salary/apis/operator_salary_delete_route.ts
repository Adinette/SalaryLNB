
import type { OperatorSalaryInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";

export class OperatorSalaryDeleteRoute extends OperatorSalaryRoute {
	private elementId: OperatorSalaryInterface["id"];
	constructor(elementId: OperatorSalaryInterface["id"]) {
		super(`/${OperatorSalaryRoute.name}/${elementId}`, ApiHttpMethod.DELETE, { elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorSalaryModel(response as OperatorSalaryInterface);
	}

	async mock() {
		const store: OperatorSalaryStore = await this.store;

		const operatorToDelete = store.find(this.elementId);

		if (!operatorToDelete) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		store.remove(this.elementId);
		return new OperatorSalaryModel(operatorToDelete);
	}
}
