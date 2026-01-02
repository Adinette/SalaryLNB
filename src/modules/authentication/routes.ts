import { createRoutes } from "../../utils/routes";

const routes = createRoutes({
	login: "authentication-login",
	userActivate: "authentication-user-activate",
	forgotPassword: "authentication-forgot-password",
});

export default routes;
