import { UserInterface } from "./user_interface";

export type UserCreateInterface = Omit<UserInterface, keyof ApiResourceInterface>;
