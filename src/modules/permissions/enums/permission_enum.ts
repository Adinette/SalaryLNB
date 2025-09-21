export namespace AppPermissions {
  export enum Dashboard {
    VIEW_DASHBOARD = "view_dashboard",
  }

  export enum sprints {
    VIEW_Machines = "view_machines",
    VIEW_Operators = "view_operators",
    ADD_Machines = "add_machines",
    EDIT_Machines = "edit_machines",
    EXPORT_Machines = "export_machines",
    ADD_Operators = "add_operators",
    EDIT_Operators = "edit_operators",
    DELETE_Operators = "delete_operators",
    EXPORT_Operators = "export_operators",
  }

  export enum Administration {
    VIEW_USERS = "view_users",
    ADD_USERS = "add_users",
    EDIT_USERS = "edit_users",
    DELETE_USERS = "delete_users",
    EXPORT_USERS = "export_users",
  }
}

// Type qui combine toutes les valeurs des énumérations de permissions
export type AppPermission =
  | `${AppPermissions.Dashboard}`
  | `${AppPermissions.sprints}`
  | `${AppPermissions.Administration}`;

// Types spécifiques pour chaque catégorie (optionnel)
export type DashboardPermission = `${AppPermissions.Dashboard}`;
export type sprintsPermission = `${AppPermissions.sprints}`;
export type AdministrationPermission = `${AppPermissions.Administration}`;
