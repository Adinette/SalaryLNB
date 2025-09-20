import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getOperators } from "./getOperator";
import { findOperator } from "./findOperator";
import { createOperator } from "./createOperator";
import { updateOperator } from "./updateOperator";
import { deleteOperator } from "./deleteOperator";
import { setOperators } from "./setOperator";
import { operatorStoreDefinition } from "../definition";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";

export const operatorStoreActions = {
  setOperators,
  ...createBaseStoreActions(operatorStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getOperators,
  findOperator,
  createOperator,
  updateOperator,
  deleteOperator,
  // Add any other specific actions for the Operator store here
  // For example, you might have actions like:
  // fetchOperatorDetails, searchOperators, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
