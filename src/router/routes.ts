
import operatorRoutes from "../modules/operator/routes";
import operatorSalaryRoutes from "../modules/operator-salary/routes";
import machineRoutes from "../modules/machine/routes";
import authenticationRoutes from "../modules/authentication/routes"
import userRoutes from "../modules/users/routes";


interface Routes {
  dashboard: "dashboard";
  comingSoon: "$all";
    authentication: typeof authenticationRoutes;

  operators: typeof operatorRoutes;
    operatorsSalary: typeof operatorSalaryRoutes;

    machines: typeof machineRoutes;
      users: typeof userRoutes;

}

export const appRoutes: Readonly<Routes> = Object.freeze({
  dashboard: "dashboard",
    authentication: authenticationRoutes,

  comingSoon: "$all", 
   operators: operatorRoutes,
       operatorsSalary: operatorSalaryRoutes,
 
   machines: machineRoutes,
      users: userRoutes,

});

const { login, forgotPassword } = authenticationRoutes;

export const guestRoutes = Object.freeze([
  login,
  forgotPassword,
  appRoutes.comingSoon,
]);


// Déstructuration des routes d'authentification pour plus de lisibilité

export default appRoutes;
