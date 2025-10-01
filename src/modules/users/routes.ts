import { createRoutes } from "../../utils/routes";

const routes = createRoutes({
	list: "users",
	add: "users-add",
	edit: "users-edit-id",
});

export default routes;
