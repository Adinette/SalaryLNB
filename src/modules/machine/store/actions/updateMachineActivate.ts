import { ApiError } from "../../../../api/errors";
import { MachineActivateUpdateRoute } from "../../apis/machine_activate_update_route";
import type { MachineInterface } from "../../interfaces";
import { type MachineStore } from "../index";
/**
 * findMachine action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: MachineInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<MachineModel | ApiError>}
 */
export async function updateMachineActivate(
  _store: MachineStore,
  {
    elementId,
    mock = false,
  }: { elementId: MachineInterface["id"]; mock?: boolean }
) {
  const apiRoute = new MachineActivateUpdateRoute({ elementId });
  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
