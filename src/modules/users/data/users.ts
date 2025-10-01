import type { UserInterface } from "../interfaces";

export const dgTSUser: UserInterface = {
	id: "039dd848-52a2-4913-8d7e-5108a19a649c",
	first_name: "Rostrand",
	last_name: "Fauré",
	email: "rost.faure@bj.com",
	phone: "229 96 12 34 56",
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export const comptaUser: UserInterface = {
	id: "a84cc86e-4116-4102-8457-118af39ba8eb",
	first_name: "Afi",
	last_name: "Rutherford",
	email: "afi.rutherford@bj.com",
	phone: "229 96 12 34 55",
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export default [dgTSUser, comptaUser];
