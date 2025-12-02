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

// ...existing code...
static toEnum(code: string): typeof AppPermissions[keyof typeof AppPermissions][keyof typeof AppPermissions[keyof typeof AppPermissions]] | undefined {
    // Types for nested groups and permission values
    type PermissionGroup = typeof AppPermissions[keyof typeof AppPermissions];
    type PermissionValue = PermissionGroup[keyof PermissionGroup];

    // Get groups, then their values, and search for the matching permission value
    const groups = Object.values(AppPermissions) as PermissionGroup[];
    for (const g of groups) {
        const values = Object.values(g) as PermissionValue[];
        const found = values.find((v) => v === (code as unknown as PermissionValue));
        if (found) return found;
    }

    return undefined;
}


	get enum(): typeof AppPermissions[keyof typeof AppPermissions] | undefined {
		return PermissionModel.toEnum(this.code);
	}
}
