import { ApiResourceModel } from "../../../models/ApiResourceModel";
import { AppRoles, type AppRole } from "../enums/role_enum";
import type { RoleInterface } from "../interfaces";

export class RoleModel extends ApiResourceModel implements RoleInterface {
	code: RoleInterface["code"];
	name: RoleInterface["name"];
	description: RoleInterface["description"];
	is_active: RoleInterface["is_active"];
	permissions: RoleInterface["permissions"];

	constructor(data: RoleInterface) {
		super(data);
		this.code = data.code;
		this.name = data.name;
		this.description = data.description;
		this.is_active = data.is_active ?? true;
		this.permissions = data.permissions;
	}

	get interface(): RoleInterface {
		return {
			...super.interface,
			code: this.code,
			name: this.name,
			description: this.description,
			is_active: this.is_active,
			permissions: this.permissions,
		};
	}

	get json(): string {
		return JSON.stringify(this.interface);
	}

    static toEnum(code: string): AppRole | undefined {
        const values = Object.values(AppRoles) as Array<{ code: AppRole }>;
        const found = values.find((v) => v.code === code);
        return found?.code;
    }

	get enum(): AppRole | undefined {
		return RoleModel.toEnum(this.code);
	}
}
