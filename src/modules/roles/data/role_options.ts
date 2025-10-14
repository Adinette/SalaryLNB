import { AppRoles } from "../enums/role_enum";

export const appRoleOptions = [
	{
		label: AppRoles.Employee.name,
		value: AppRoles.Employee.code,
		description: AppRoles.Employee.description,
	},
	{
		label: AppRoles.Manager.name,
		value: AppRoles.Manager.code,
		description: AppRoles.Manager.description,
	},
	{
		label: AppRoles.Admin.name,
		value: AppRoles.Admin.code,
		description: AppRoles.Admin.description,
	},
];
