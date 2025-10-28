/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

import { AppPermissions } from "../modules/permissions/enums/permission_enum";
import appRoutes from "../router/routes";

export default {
  main: [
    {
      name: "Tableau de bord",
      to: appRoutes.dashboard,
      icon: "ri-dashboard-horizontal-fill",
      permissions: [AppPermissions.Dashboard.VIEW_DASHBOARD],
    },
    {
      name: "Suivi et Calcul",
      heading: true,
    },
    {
      name: "Machine",
      icon: "ri-search-eye-fill",
      subActivePaths: "/machines",
      permissions: [AppPermissions.Operator.VIEW_MACHINES],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: appRoutes.machines.list,
          permissions: [AppPermissions.Operator.VIEW_MACHINES],
        },
         {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: appRoutes.machines.add,
          permissions: [
            AppPermissions.Operator.ADD_MACHINES,
            AppPermissions.Operator.ADD_MACHINES,
          ],
        },
      ],
    },
    {
      name: "Operators",
      icon: "ri-file-user-fill",
      subActivePaths: "/operators",
      permissions: [AppPermissions.Operator.VIEW_OPERATORS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "operators",
          permissions: [AppPermissions.Operator.VIEW_MACHINES],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "operators-add",
          permissions: [
            AppPermissions.Operator.ADD_OPERATORS,
            AppPermissions.Operator.ADD_OPERATORS,
          ],
        },
      ],
    },
    {
      name: "Operator Salaires",
      icon: "ri-file-user-fill",
      subActivePaths: "/operators-salary",
      permissions: [AppPermissions.Operator.VIEW_OPERATORS_SALARY],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "operators-salary",
          permissions: [AppPermissions.Operator.VIEW_OPERATORS_SALARY],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "operators-salary-add",
          permissions: [
            AppPermissions.Operator.ADD_OPERATORS_SALARY,
            AppPermissions.Operator.ADD_OPERATORS_SALARY,
          ],
        },
      ],
    },
      {
      name: "Administration",
      heading: true,
      permissions: [
        AppPermissions.Administration.VIEW_USERS,
      ],
    },
    {
      name: "Utilisateurs",
      icon: "ri-group-3-fill",
      subActivePaths: "/users",
      permissions: [AppPermissions.Administration.VIEW_USERS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "users",
          permissions: [AppPermissions.Administration.VIEW_USERS],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "users-add",
          permissions: [
            AppPermissions.Administration.VIEW_USERS,
            AppPermissions.Administration.ADD_USERS,
          ],
        },
      ],
    },
  ],
};
