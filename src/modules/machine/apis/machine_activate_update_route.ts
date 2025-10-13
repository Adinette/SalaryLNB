
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { MachineInterface } from "../interfaces";
import { MachineModel } from "../models/machine-model";
import type { MachineStore } from "../store";
import { MachineRoute } from "./_machine_route";

export class MachineActivateUpdateRoute extends MachineRoute {
  elementId: MachineInterface["id"];
  constructor({ elementId }: { elementId: MachineInterface["id"] }) {
    super(`/${MachineRoute.name}/${elementId}/publish`, ApiHttpMethod.PUT);
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
      message: `Aucune machine trouvée avec l'ID ${this.elementId}.`,
    });
  }

  // 🔁 Inversion de la valeur de is_active
const machineUpdated = new MachineModel({
    ...machineToUpdate,
    is_active: true, // force à true
    updated_at: new Date().toISOString(),
  });

  await store.update(this.elementId, machineUpdated.interface);

  return machineUpdated;
}
}