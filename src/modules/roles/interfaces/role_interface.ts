import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";
import type { PermissionInterface } from "../../permissions/interfaces/permission_interface";

export interface RoleInterface extends ApiResourceInterface {
	/** Code unique du rôle */
	code: string;
	/** Libellé du rôle */
	name: string;
	/** Description du rôle */
	description?: string;
	/** Rôle actif ou non */
	is_active?: boolean;
	/** Liste des permissions associées au rôle */
	permissions?: PermissionInterface[];
}
