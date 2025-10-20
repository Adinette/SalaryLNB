
import type { MachineInterface } from "../interfaces";
import { MachineRoute } from "./_machine_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { MachineStore } from "../store";

export class MachineDeleteRoute extends MachineRoute {
	private elementId: MachineInterface["id"];
	constructor(elementId: MachineInterface["id"]) {
		super(`/${MachineRoute.name}/${elementId}`, ApiHttpMethod.DELETE, { elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new MachineModel(response as MachineInterface);
	}

	async mock() {
		const store: MachineStore = await this.store;

		const machineToDelete = store.find(this.elementId);

		if (!machineToDelete) {
			return new NotFoundApiError({
				message: `Aucune machine trouvée avec l'ID ${this.elementId}.`,
			});
		}

		store.remove(this.elementId);
		return new MachineModel(machineToDelete);
	}
}
