import type { RoleInterface } from "../../roles/interfaces";
import type { UserInterface } from "../../users/interfaces";

export interface SessionInterface {
  token: string;
  user: UserInterface;
  role?: RoleInterface;
}
