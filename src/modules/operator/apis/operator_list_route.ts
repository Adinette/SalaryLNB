import type {  OperatorInterface } from "../interfaces";
import { OperatorRoute } from "./_operator_route";
import { ApiError } from "../../../api/errors";
import { OperatorModel } from "../models/operator-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorStore } from "../store";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import operators from "../data/operators";

export class OperatorListRoute extends OperatorRoute {
	constructor(args: ListApiArgsInterface = {}) {
		super(`/${OperatorRoute.name}`, ApiHttpMethod.GET, args);
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return (response as OperatorInterface[]).map((data) => new OperatorModel(data));
	}

	async mock() {
		const store: OperatorStore = await this.store;
		// Initialiser le store avec les données mockées seulement s'il est vide
				if (store.elements.length === 0) {			
					store.elements = [...operators];
				}

		let results = store.elements.map((e:any) => new OperatorModel(e));

		// Appliquer la recherche si elle est fournie
		if (this.data && (this.data as ListApiArgsInterface).search) {
			const searchTerm = (this.data as ListApiArgsInterface).search!.toLowerCase();
			results = results.filter(
				(operator: any) =>
					operator.first_name.toLowerCase().includes(searchTerm) ||
					operator.last_name.toLowerCase().includes(searchTerm) ||
					operator.email.toLowerCase().includes(searchTerm) ||
					(operator.phone && operator.phone.toLowerCase().includes(searchTerm))
			);
		}

		return results;
	}
}
