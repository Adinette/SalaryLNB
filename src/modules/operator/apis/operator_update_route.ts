import type {  OperatorInterface, OperatorUpdateInterface } from "../interfaces";
import { OperatorRoute } from "./_operator_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorModel } from "../models/operator-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorStore } from "../store";

export class OperatorUpdateRoute extends OperatorRoute {
	elementId: OperatorInterface["id"];

	constructor(elementId: OperatorInterface["id"], data: OperatorUpdateInterface
	) {
		super(`/${OperatorRoute.name}/${elementId}`, ApiHttpMethod.PUT, data);
		this.data = data;
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorModel(response as OperatorInterface);
	}

	async mock() {
		const store: OperatorStore = await this.store;

		const operatorToUpdate = store.find(this.elementId);

		if (!operatorToUpdate) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		const operatorUpdated = new OperatorModel({
			...operatorToUpdate,
			...this.data,
			updated_at: new Date().toISOString(),
		});

		store.update(this.elementId, operatorUpdated.interface);
		return operatorUpdated;
	}
}
