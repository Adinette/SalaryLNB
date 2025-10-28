
import ApiHttpMethod from "../../../api/enums/api_http_method_enum";
import { ApiError, NotFoundApiError } from "../../../api/errors";
import type { OperatorInterface } from "../interfaces";
import { OperatorModel } from "../models/operator-model";
import type { OperatorStore } from "../store";
import { OperatorRoute } from "./_operator_route";

export class OperatorActivateUpdateRoute extends OperatorRoute {
  elementId: OperatorInterface["id"];
  constructor({ elementId }: { elementId: OperatorInterface["id"] }) {
    super(`/${OperatorRoute.name}/${elementId}/publish`, ApiHttpMethod.PUT);
    this.elementId = elementId;
  }

  async request() {
    const response = await super.request();
    if (response instanceof ApiError) return response;
    return new OperatorModel(response as OperatorInterface);
  }

async mock() {
  const store: OperatorStore = await this.store;

  const operatorToUpdate = store.find(this.elementId);

  if (!operatorToUpdate) {
    return new NotFoundApiError({
      message: `Aucune operator trouvée avec l'ID ${this.elementId}.`,
    });
  }

  // 🔁 Inversion de la valeur de is_active
  const operatorUpdated = new OperatorModel({
    ...operatorToUpdate,
    is_active: true, // force à true
    updated_at: new Date().toISOString(),
  });

  await store.update(this.elementId, operatorUpdated.interface);

  return operatorUpdated;
}
}