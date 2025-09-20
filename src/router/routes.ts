
import operatorRoutes from "../modules/operator/routes";

interface Routes {
  dashboard: "dashboard";
  comingSoon: "$all";
  operators: typeof operatorRoutes;
}

export const appRoutes: Readonly<Routes> = Object.freeze({
  dashboard: "dashboard",
  comingSoon: "$all",  operators: operatorRoutes,

});

// Déstructuration des routes d'authentification pour plus de lisibilité

export default appRoutes;
