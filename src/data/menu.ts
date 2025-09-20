/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

import { AppPermissions } from "@/modules/permissions/enums/permission_enum";

export default {
  main: [
    {
      name: "Tableau de bord",
      to: appRoutes.dashboard,
      icon: "ri-dashboard-horizontal-fill",
      permissions: [AppPermissions.Dashboard.VIEW_DASHBOARD],
    },
    {
      name: "Sprint",
      heading: true,
      permissions: [AppPermissions.sprints.VIEW_SPRINTS],
    },
    {
      name: "Suivis",
      icon: "ri-search-eye-fill",
      subActivePaths: "/sprint-trackings",
      permissions: [AppPermissions.sprints.VIEW_SPRINTS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "sprint-trackings",
          permissions: [AppPermissions.sprints.VIEW_SPRINTS_TRACKING],
        },
        {
          name: "Evaluer",
          icon: "ri-list-check-3",
          to: "sprint-trackings-evaluate",
          permissions: [
            AppPermissions.sprints.VIEW_SPRINTS_TRACKING,
            AppPermissions.sprints.EVALUATE_SPRINTS_TRACKING,
          ],
        },
        {
          name: "Exportation",
          icon: "ri-export-fill",
          to: "sprint-trackings-exportation",
          permissions: [
            AppPermissions.sprints.VIEW_SPRINTS_TRACKING,
            AppPermissions.sprints.EXPORT_SPRINTS_TRACKING,
          ],
        },
      ],
    },
    {
      name: "Objectifs",
      icon: "ri-file-user-fill",
      subActivePaths: "/sprint-objectives",
      permissions: [AppPermissions.sprints.VIEW_SPRINTS_OBJECTIVES],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "sprint-objectives",
          permissions: [AppPermissions.sprints.VIEW_SPRINTS_OBJECTIVES],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "sprint-objectives-add",
          permissions: [
            AppPermissions.sprints.VIEW_SPRINTS_OBJECTIVES,
            AppPermissions.sprints.ADD_SPRINTS_OBJECTIVES,
          ],
        },
        {
          name: "Exportation",
          icon: "ri-export-fill",
          to: "sprint-objectives-exportation",
          permissions: [
            AppPermissions.sprints.VIEW_SPRINTS_OBJECTIVES,
            AppPermissions.sprints.EXPORT_SPRINTS_OBJECTIVES,
          ],
        },
      ],
    },
    {
      name: "Evaluations",
      icon: "ri-shake-hands-fill",
      subActivePaths: "/sprint-evaluations",
      permissions: [AppPermissions.sprints.VIEW_SPRINTS_EVALUATIONS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "sprint-evaluations",
          permissions: [AppPermissions.sprints.VIEW_SPRINTS_EVALUATIONS],
        },
        // {
        // 	name: "Ajouter",
        // 	icon: "ri-function-add-fill",
        // 	to: "sprint-evaluations-add",
        // 	permissions: [
        // 		AppPermissions.sprints.VIEW_SPRINTS_EVALUATIONS,
        // 		AppPermissions.sprints.ADD_SPRINTS_EVALUATIONS,
        // 	],
        // },
        {
          name: "Statistiques",
          icon: "ri-bar-chart-box-fill",
          to: "sprint-evaluations-statistics",
          permissions: [AppPermissions.sprints.VIEW_SPRINTS_EVALUATIONS],
        },
        {
          name: "Exportation",
          icon: "ri-export-fill",
          to: "sprint-evaluations-exportation",
          permissions: [
            AppPermissions.sprints.VIEW_SPRINTS_EVALUATIONS,
            AppPermissions.sprints.EXPORT_SPRINTS_EVALUATIONS,
          ],
        },
      ],
    },
    {
      name: "Administration",
      heading: true,
      permissions: [
        AppPermissions.Administration.VIEW_EMPLOYEES,
        AppPermissions.Administration.VIEW_USERS,
        AppPermissions.Administration.VIEW_DEPARTMENTS,
        AppPermissions.Administration.VIEW_POSITIONS,
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
    {
      name: "Départements",
      icon: "ri-building-4-fill",
      subActivePaths: "/departments",
      permissions: [AppPermissions.Administration.VIEW_DEPARTMENTS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "departments",
          permissions: [AppPermissions.Administration.VIEW_DEPARTMENTS],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "departments-add",
          permissions: [
            AppPermissions.Administration.VIEW_DEPARTMENTS,
            AppPermissions.Administration.ADD_DEPARTMENTS,
          ],
        },
      ],
    },
    {
      name: "Positions",
      icon: "ri-id-card-fill",
      subActivePaths: "/positions",
      permissions: [AppPermissions.Administration.VIEW_POSITIONS],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "positions",
          permissions: [AppPermissions.Administration.VIEW_POSITIONS],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "positions-add",
          permissions: [
            AppPermissions.Administration.VIEW_POSITIONS,
            AppPermissions.Administration.ADD_POSITIONS,
          ],
        },
      ],
    },

    {
      name: "Employés",
      icon: "ri-group-2-fill",
      subActivePaths: "/employees",
      permissions: [AppPermissions.Administration.VIEW_EMPLOYEES],
      sub: [
        {
          name: "Liste",
          icon: "ri-list-check-2",
          to: "employees",
          permissions: [AppPermissions.Administration.VIEW_EMPLOYEES],
        },
        {
          name: "Ajouter",
          icon: "ri-function-add-fill",
          to: "employees-add",
          permissions: [
            AppPermissions.Administration.VIEW_EMPLOYEES,
            AppPermissions.Administration.ADD_EMPLOYEES,
          ],
        },
      ],
    },
  ],
};
