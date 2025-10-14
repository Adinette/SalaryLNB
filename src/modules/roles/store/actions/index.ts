import { roleStoreDefinition } from "../definition";
import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getRoles } from "./getRoles";
import { findRole } from "./findRole";
import { createRole } from "./createRole";
import { updateRole } from "./updateRole";
import { deleteRole } from "./deleteRole";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";

export const roleStoreActions = {
  ...createBaseStoreActions(roleStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getRoles,
  findRole,
  createRole,
  updateRole,
  deleteRole,
  // Add any other specific actions for the Role store here
  // For example, you might have actions like:
  // fetchRoleDetails, searchRoles, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
