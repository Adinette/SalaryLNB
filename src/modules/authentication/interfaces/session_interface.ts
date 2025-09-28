import type { UserInterface } from "../../users/interfaces";

export interface SessionInterface {
  token: string;
  user: UserInterface;
}
