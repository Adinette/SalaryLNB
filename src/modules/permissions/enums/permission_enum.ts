// src/modules/permissions/enums/permission_enum.ts
export const AppPermissions = {
  Dashboard: {
    VIEW_DASHBOARD: "view_dashboard" as const,
  },
  Operator: {
    VIEW_MACHINES: "view_machines" as const,
    VIEW_OPERATORS: "view_operators" as const,
    VIEW_OPERATORS_SALARY: "view_operators_salary" as const,
    ADD_MACHINES: "add_machines" as const,
    EDIT_MACHINES: "edit_machines" as const,
    EXPORT_MACHINES: "export_machines" as const,
    ADD_OPERATORS: "add_operators" as const,
    EDIT_OPERATORS: "edit_operators" as const,
    DELETE_OPERATORS: "delete_operators" as const,
    EXPORT_OPERATORS: "export_operators" as const,
    ADD_OPERATORS_SALARY: "add_operators_salary" as const,
    EXPORT_OPERATORS_SALARY: "export_operators_salary" as const,
  },
  Administration: {
    VIEW_USERS: "view_users" as const,
    ADD_USERS: "add_users" as const,
    EDIT_USERS: "edit_users" as const,
    DELETE_USERS: "delete_users" as const,
    EXPORT_USERS: "export_users" as const,
  },
} as const;

export type AppPermission =
  | (typeof AppPermissions.Dashboard)[keyof typeof AppPermissions.Dashboard]
  | (typeof AppPermissions.Operator)[keyof typeof AppPermissions.Operator]
  | (typeof AppPermissions.Administration)[keyof typeof AppPermissions.Administration];
