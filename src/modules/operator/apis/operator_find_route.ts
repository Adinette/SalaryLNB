
import type {  OperatorInterface } from "../interfaces";
import { OperatorRoute } from "./_operator_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { OperatorModel } from "../models/operator-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorStore } from "../store";


export class OperatorFindRoute extends OperatorRoute {
	elementId: OperatorInterface["id"];
	constructor({ elementId }: { elementId: OperatorInterface["id"] }) {
		super(`/${OperatorRoute.name}/${elementId}`, ApiHttpMethod.GET, { id: elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new OperatorModel(response as OperatorInterface);
	}

	async mock() {
		const store: OperatorStore = await this.store;
		const found = store.find(this.elementId);
		if (!found) {
			return new NotFoundApiError({
				message: `Utilisateur avec l'ID ${this.elementId} non trouvé`,
			});
		}
		return new OperatorModel(found);
	}
}
