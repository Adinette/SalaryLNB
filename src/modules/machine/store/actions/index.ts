import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getMachines } from "./getMachine";
import { findMachine } from "./findMachine";
import { createMachine } from "./createMachine";
import { updateMachine } from "./updateMachine";
import { deleteMachine } from "./deleteMachine";
import { setMachines } from "./setMachine";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";
import { machineStoreDefinition } from "../definition";

export const machineStoreActions = {
  setMachines,
  ...createBaseStoreActions(machineStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getMachines,
  findMachine,
  createMachine,
  updateMachine,
  deleteMachine,
  // Add any other specific actions for the Machine store here
  // For example, you might have actions like:
  // fetchMachineDetails, searchMachines, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
