import type {  MachineInterface, MachineUpdateInterface } from "../interfaces";
import { MachineRoute } from "./_machine_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { MachineStore } from "../store";

export class MachineUpdateRoute extends MachineRoute {
	elementId: MachineInterface["id"];

	constructor(elementId: MachineInterface["id"], data: MachineUpdateInterface
	) {
		super(`/${MachineRoute.name}/${elementId}`, ApiHttpMethod.PUT, data);
		this.data = data;
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new MachineModel(response as MachineInterface);
	}

	async mock() {
		const store: MachineStore = await this.store;

		const machineToUpdate = store.find(this.elementId);

		if (!machineToUpdate) {
			return new NotFoundApiError({
				message: `Aucun utilisateur trouvé avec l'ID ${this.elementId}.`,
			});
		}

		const machineUpdated = new MachineModel({
			...machineToUpdate,
			...this.data,
			updated_at: new Date().toISOString(),
		});

		store.update(this.elementId, machineUpdated.interface);
		return machineUpdated;
	}
}
