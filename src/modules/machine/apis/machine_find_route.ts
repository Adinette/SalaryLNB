
import type {  MachineInterface } from "../interfaces";
import { MachineRoute } from "./_machine_route";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import { MachineModel } from "../models/machine-model";
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import type { MachineStore } from "../store";


export class MachineFindRoute extends MachineRoute {
	elementId: MachineInterface["id"];
	constructor({ elementId }: { elementId: MachineInterface["id"] }) {
		super(`/${MachineRoute.name}/${elementId}`, ApiHttpMethod.GET, { id: elementId });
		this.elementId = elementId;
	}

	async request() {
		const response = await super.request();
		if (response instanceof ApiError) return response;
		return new MachineModel(response as MachineInterface);
	}

	async mock() {
		const store: MachineStore = await this.store;
		const found = store.find(this.elementId);
		if (!found) {
			return new NotFoundApiError({
				message: `Utilisateur avec l'ID ${this.elementId} non trouvé`,
			});
		}
		return new MachineModel(found);
	}
}
