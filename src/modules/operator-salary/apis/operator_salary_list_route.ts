import type {  OperatorSalaryInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import type { OperatorInterface } from "../../../interfaces";

export class OperatorSalaryListRoute extends OperatorSalaryRoute {
	id: OperatorInterface["id"];
	constructor(args: ListApiArgsInterface = {}, id: OperatorInterface["id"]) {
		super(`/${OperatorSalaryRoute.name}/${id}`, ApiHttpMethod.GET, args);
		this.id = id;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return (response as OperatorSalaryInterface[]).map((data) => new OperatorSalaryModel(data));
	}

	async mock() {
		const store: OperatorSalaryStore = await this.store;
		let results = store.elements.map((e:any) => new OperatorSalaryModel(e));

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
