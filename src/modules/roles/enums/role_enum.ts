import { AppPermissions } from "../../permissions/enums/permission_enum";

export enum AppRole {
	EMPLOYEE = "EMPLOYEE",
	MANAGER = "MANAGER",
	ADMIN = "ADMIN",
}

export namespace AppRoles {
	export abstract class Employee {
		static readonly name = "Employé";
		static readonly code = AppRole.EMPLOYEE;
		static readonly description = "Rôle de base pour les employés avec des permissions limitées";
		static readonly permissions = [
			AppPermissions.Dashboard.VIEW_DASHBOARD,
			AppPermissions.Operator.VIEW_MACHINES,
			AppPermissions.Operator.ADD_MACHINES,
			AppPermissions.Operator.EDIT_MACHINES,
			AppPermissions.Operator.VIEW_OPERATORS,
			AppPermissions.Operator.ADD_OPERATORS,
			AppPermissions.Operator.EDIT_OPERATORS,
			AppPermissions.Operator.VIEW_OPERATORS_SALARY,
			AppPermissions.Operator.ADD_OPERATORS_SALARY,
		];
	}

	export abstract class Manager {
		static readonly name = "Manager";
		static readonly code = AppRole.MANAGER;
		static readonly description =
			"Rôle de manager avec des permissions étendues pour la gestion des équipes";
		static readonly permissions = [
			...Employee.permissions,
			AppPermissions.Administration.VIEW_USERS,
			AppPermissions.Administration.ADD_USERS,
			AppPermissions.Administration.EDIT_USERS,
			AppPermissions.Administration.DELETE_USERS,
			AppPermissions.Administration.EXPORT_USERS,
		];
	}

	export abstract class Admin {
		static readonly name = "Administrateur";
		static readonly code = AppRole.ADMIN;
		static readonly description =
			"Rôle d'administrateur avec des permissions étendues pour la gestion du système";
		static readonly permissions = [
			...Manager.permissions,

			AppPermissions.Administration.VIEW_USERS,
			AppPermissions.Administration.ADD_USERS,
			AppPermissions.Administration.EDIT_USERS,
			AppPermissions.Administration.DELETE_USERS,
			AppPermissions.Administration.EXPORT_USERS,
		];
	}

	// export abstract class Developer {
	//   static readonly name = "Développeur";
	//   static readonly code = AppRole.DEVELOPER;
	//   static readonly description =
	//     "Rôle de développeur avec des permissions de développement";
	//   static readonly permissions = [
	//     ...Admin.permissions,
	//     AppPermissions.Administration.VIEW_USERS,
	//     AppPermissions.Administration.ADD_USERS,
	//     AppPermissions.Administration.EDIT_USERS,
	//     AppPermissions.Administration.DELETE_USERS,
	//     AppPermissions.Administration.EXPORT_USERS,
	//   ];
	// }

	// export abstract class SuperAdmin {
	//   static readonly name = "Super Administrateur";
	//   static readonly code = AppRole.SUPERADMIN;
	//   static readonly description =
	//     "Rôle de super administrateur avec tous les droits et permissions";
	//   static readonly permissions = [
	//     ...Developer.permissions,
	//     // Toutes les permissions sont déjà héritées de Developer qui hérite de Admin qui hérite de Manager
	//     // qui contient déjà toutes les permissions d'évaluations
	//   ];
	// }
}
