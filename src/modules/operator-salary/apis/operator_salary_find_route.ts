
import type {  OperatorSalaryInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";
import type { OperatorInterface } from "../../operator/interfaces";


export class OperatorSalaryFindRoute extends OperatorSalaryRoute {
	elementId: OperatorSalaryInterface["id"];
	id: OperatorInterface["id"];

	constructor({ elementId, id }: { elementId: OperatorSalaryInterface["id"]; id: OperatorInterface["id"] }) {
		super(`/${OperatorSalaryRoute.name}/${id}/${elementId}`, ApiHttpMethod.GET, { id: elementId });
		this.elementId = elementId;
		this.id = id;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorSalaryModel(response as OperatorSalaryInterface);
	}

	async mock() {
		const store: OperatorSalaryStore = await this.store;
		const found = store.find(this.elementId);
		if (!found) {
			return new NotFoundApiError({
				message: `Utilisateur avec l'ID ${this.elementId} non trouvé`,
			});
		}
		return new OperatorSalaryModel(found);
	}
}
