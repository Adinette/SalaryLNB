
import type { OperatorInterface } from "../interfaces";
import { OperatorRoute } from "./_operator_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorModel } from "../models/operator-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorStore } from "../store";

export class OperatorDeleteRoute extends OperatorRoute {
	private elementId: OperatorInterface["id"];
	constructor(elementId: OperatorInterface["id"]) {
		super(`/${OperatorRoute.name}/${elementId}`, ApiHttpMethod.DELETE, { elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorModel(response as OperatorInterface);
	}

	async mock() {
		const store: OperatorStore = await this.store;

		const operatorToDelete = store.find(this.elementId);

		if (!operatorToDelete) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		store.remove(this.elementId);
		return new OperatorModel(operatorToDelete);
	}
}
