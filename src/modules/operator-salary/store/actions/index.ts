import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getOperatorSalary } from "./getOperatorSalary";
import { findOperatorSalary } from "./findOperatorSalary";
import { createOperatorSalary } from "./createOperatorSalary";
import { updateOperatorSalary } from "./updateOperatorSalary";
import { deleteOperatorSalary } from "./deleteOperatorSalary";
import { setOperatorSalary } from "./setOperatorSalary";
import { operatorSalaryStoreDefinition } from "../definition";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";

export const operatorSalaryStoreActions = {
  setOperatorSalary,
  ...createBaseStoreActions(operatorSalaryStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getOperatorSalary,
  findOperatorSalary,
  createOperatorSalary,
  updateOperatorSalary,
  deleteOperatorSalary,
  // Add any other specific actions for the Operator store here
  // For example, you might have actions like:
  // fetchOperatorDetails, searchOperators, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
