import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { UserInterface } from "./user_interface";

export type UserCreateInterface = Omit<UserInterface, keyof ApiResourceInterface>;
