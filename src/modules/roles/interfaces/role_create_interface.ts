import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { RoleInterface } from "./role_interface";

export type RoleCreateInterface = Omit<RoleInterface, keyof ApiResourceInterface>;
