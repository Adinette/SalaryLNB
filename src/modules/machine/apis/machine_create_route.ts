
import type { MachineCreateInterface, MachineInterface } from "../interfaces";
import { MachineRoute } from "./_machine_route";
import { ApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { MachineStore } from "../store";

export class MachineCreateRoute extends MachineRoute {
	data: MachineCreateInterface;

	constructor(data: MachineCreateInterface) {
		super(`/${MachineRoute.name}`, ApiHttpMethod.POST, data);
		this.data = data;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new MachineModel(response as MachineInterface);
	}

	async mock() {
		const store: MachineStore = await this.store;
		const model = new MachineModel({
			...this.data,
			id: "1",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});
		store.add(model.interface);
		return model;
	}
}
