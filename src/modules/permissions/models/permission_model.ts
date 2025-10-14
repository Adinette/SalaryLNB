import { ApiResourceModel } from "../../../models/ApiResourceModel";
import { AppPermissions } from "../enums/permission_enum";
import type { PermissionInterface } from "../interfaces/permission_interface";

export class PermissionModel extends ApiResourceModel implements PermissionInterface {
	code: PermissionInterface["code"];
	name: PermissionInterface["name"];
	description: PermissionInterface["description"];
	is_active: PermissionInterface["is_active"];

	constructor(data: PermissionInterface) {
		super(data);
		this.code = data.code;
		this.name = data.name;
		this.description = data.description;
		this.is_active = data.is_active ?? true;
	}

	get interface(): PermissionInterface {
		return {
			...super.interface,
			code: this.code,
			name: this.name,
			description: this.description,
			is_active: this.is_active,
		};
	}

	get json(): string {
		return JSON.stringify(this.interface);
	}

	static toEnum(code: string): AppPermissions | undefined {
		return Object.values(AppPermissions).find((v) => v === code);
	}

	get enum(): AppPermissions | undefined {
		return PermissionModel.toEnum(this.code);
	}
}
