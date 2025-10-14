import { permissionStoreDefinition } from "../definition";
import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getPermissions } from "./getPermissions";
import { findPermission } from "./findPermission";
import { createPermission } from "./createPermission";
import { updatePermission } from "./updatePermission";
import { deletePermission } from "./deletePermission";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";

export const permissionStoreActions = {
  ...createBaseStoreActions(permissionStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getPermissions,
  findPermission,
  createPermission,
  updatePermission,
  deletePermission,
  // Add any other specific actions for the Permission store here
  // For example, you might have actions like:
  // fetchPermissionDetails, searchPermissions, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
