import type { MachineStore } from "..";
import { ApiError } from "../../../../api/errors";
import { MachineDeactivateUpdateRoute } from "../../apis/machine_deactivate_update_route";
import type { MachineInterface } from "../../interfaces";
/**
 * findMachine action
 *
 * @param {MachineStore} store - The Pinia store instance
 * @param { elementId, mock = false }: { elementId: MachineInterface["id"], mock?: boolean } - Element ID and optional mock flag
 * @returns {Promise<MachineModel | ApiError>}
 */
export async function updateMachineDeactivate(
  store: MachineStore,
  {
    elementId,
    mock = false,
  }: { elementId: MachineInterface["id"]; mock?: boolean }
) {
  const apiRoute = new MachineDeactivateUpdateRoute({ elementId });
  console.log(apiRoute);

  const result = mock ? await apiRoute.mock() : await apiRoute.request();
  if (result instanceof ApiError) return result;
  return result;
}
