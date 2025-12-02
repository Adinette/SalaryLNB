import type { OperatorStore } from "..";
import { ApiError } from "../../../../api/errors";
import { OperatorDeactivateUpdateRoute } from "../../apis/operator_deactivate_update_route";
import type { OperatorInterface } from "../../interfaces";
/**
 * findOperator action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: OperatorInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<OperatorModel | ApiError>}
 */
export async function updateOperatorDeactivate(
  _store: OperatorStore,
  {
    elementId,
    mock = false,
  }: { elementId: OperatorInterface["id"]; mock?: boolean }
) {
  const apiRoute = new OperatorDeactivateUpdateRoute({ elementId });
  console.log(apiRoute);

  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
