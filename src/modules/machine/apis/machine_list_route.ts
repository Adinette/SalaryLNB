import type {  MachineInterface } from "../interfaces";
import { MachineRoute } from "./_machine_route";
import { ApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { MachineStore } from "../store";
import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";

export class MachineListRoute extends MachineRoute {
	constructor(args: ListApiArgsInterface = {}) {
		super(`/${MachineRoute.name}`, ApiHttpMethod.GET, args);
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return (response as MachineInterface[]).map((data) => new MachineModel(data));
	}

	async mock() {
		const store: MachineStore = await this.store;
		let results = store.elements.map((e:any) => new MachineModel(e));

		// Appliquer la recherche si elle est fournie
		if (this.data && (this.data as ListApiArgsInterface).search) {
			const searchTerm = (this.data as ListApiArgsInterface).search!.toLowerCase();
			results = results.filter(
				(machine: any) =>
					machine.first_name.toLowerCase().includes(searchTerm) ||
					machine.last_name.toLowerCase().includes(searchTerm) ||
					machine.email.toLowerCase().includes(searchTerm) ||
					(machine.phone && machine.phone.toLowerCase().includes(searchTerm))
			);
		}

		return results;
	}
}
