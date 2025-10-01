import { userStoreDefinition } from "../definition";
import { add } from "./add";
import { find } from "./find";
import { update } from "./update";
import { remove } from "./remove";
import { getUsers } from "./getUsers";
import { findUser } from "./findUser";
import { createUser } from "./createUser";
import { updateUser } from "./updateUser";
import { deleteUser } from "./deleteUser";
import { setUsers } from "./setUsers";
import { createBaseStoreActions } from "../../../../stores/utils/create_base_store_actions";

export const userStoreActions = {
  setUsers,
  ...createBaseStoreActions(userStoreDefinition.service),
  add,
  find,
  update,
  remove,
  getUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  // Add any other specific actions for the User store here
  // For example, you might have actions like:
  // fetchUserDetails, searchUsers, etc.
  // These actions can be defined in their respective files and imported here
  // as needed.
};
