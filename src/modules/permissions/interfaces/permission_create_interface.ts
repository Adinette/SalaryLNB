import { PermissionInterface } from "./permission_interface";

export type PermissionCreateInterface = Omit<PermissionInterface, keyof ApiResourceInterface>;
