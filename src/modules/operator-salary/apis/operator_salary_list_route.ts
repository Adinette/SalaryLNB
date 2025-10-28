import type {  OperatorSalaryInterface } from "../interfaces";
import { OperatorSalaryRoute } from "./_operator_salary_route";
import { ApiError } from "../../../api/errors";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { OperatorSalaryStore } from "../store";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";
import type { OperatorSalaryListFilterInterface } from "../interfaces/operator_salary_list_filter_interface";

export class OperatorSalaryListRoute extends OperatorSalaryRoute {
	constructor(args: ListApiArgsInterface = {}) {
		super(`/${OperatorSalaryRoute.name}`, ApiHttpMethod.GET, args);
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return (response as OperatorSalaryInterface[]).map((data) => new OperatorSalaryModel(data));
	}

	async mock() {
	const store: OperatorSalaryStore = await this.store;
	let results = store.elements.map((e: any) => new OperatorSalaryModel(e));

	// 🟢 Vérifie si operator_id est présent dans les paramètres (this.data)
	const operatorIdParam = (this.data as OperatorSalaryListFilterInterface)?.operator_id;

	if (operatorIdParam) {
		results = results.filter(
			(operatorSalary: any) => String(operatorSalary.operator_id) === String(operatorIdParam)
		);
	}

	// 🔎 Appliquer la recherche si fournie
	const searchTerm = (this.data as ListApiArgsInterface)?.search?.toLowerCase();
	if (searchTerm) {
		results = results.filter(
			(operatorSalary: any) =>
				operatorSalary.first_name.toLowerCase().includes(searchTerm) ||
				operatorSalary.last_name.toLowerCase().includes(searchTerm) ||
				operatorSalary.email.toLowerCase().includes(searchTerm) ||
				(operatorSalary.phone && operatorSalary.phone.toLowerCase().includes(searchTerm))
		);
	}

	return results;
}

}
