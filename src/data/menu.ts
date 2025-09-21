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
      permissions: [AppPermissions.sprints.VIEW_Machines],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "machines",
          permissions: [AppPermissions.sprints.VIEW_Machines],
        },
         {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "machines-add",
          permissions: [
            AppPermissions.sprints.ADD_Machines,
            AppPermissions.sprints.ADD_Machines,
          ],
        },
        {
          name: "Exportation",
          icon: "ri-export-fill",
          to: "machines-exportation",
          permissions: [
            AppPermissions.sprints.VIEW_Machines,
            AppPermissions.sprints.EXPORT_Machines,
          ],
        },
      ],
    },
    {
      name: "Operators",
      icon: "ri-file-user-fill",
      subActivePaths: "/operators",
      permissions: [AppPermissions.sprints.VIEW_Operators],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "operators",
          permissions: [AppPermissions.sprints.VIEW_Machines],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "operators-add",
          permissions: [
            AppPermissions.sprints.ADD_Operators,
            AppPermissions.sprints.ADD_Operators,
          ],
        },
        {
          name: "Exportation",
          icon: "ri-export-fill",
          to: "operators-exportation",
          permissions: [
            AppPermissions.sprints.VIEW_Machines,
            AppPermissions.sprints.EXPORT_Operators,
          ],
        },
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
