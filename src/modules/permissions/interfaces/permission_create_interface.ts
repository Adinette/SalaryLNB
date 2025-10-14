import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { PermissionInterface } from "./permission_interface";

export type PermissionCreateInterface = Omit<PermissionInterface, keyof ApiResourceInterface>;
