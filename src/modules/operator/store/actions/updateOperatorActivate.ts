import { ApiError } from "../../../../api/errors";
import { OperatorActivateUpdateRoute } from "../../apis/operator_activate_update_route";
import type { OperatorInterface } from "../../interfaces";
// import { type OperatorStore } from "../index";
/**
 * findOperator action
 *
 * @param {OperatorStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: OperatorInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<OperatorModel | ApiError>}
 */
export async function updateOperatorActivate(
  // store: OperatorStore,
  {
    elementId,
    mock = false,
  }: { elementId: OperatorInterface["id"]; mock?: boolean }
) {
  const apiRoute = new OperatorActivateUpdateRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
