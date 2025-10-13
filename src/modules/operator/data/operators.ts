import { machine1, machine2 } from "../../machine/data/machines";
import type { OperatorInterface } from "../interfaces";

export const operator1: OperatorInterface = {
	id: "039dd848-52a2-4913-8d7e-5108a19a649c",
	first_name: "Atilio",
	last_name: "Azino",
	email: "atilio.azino@bj.com",
	phone: "229 96 12 34 56",
	machine: machine1,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export const operator2: OperatorInterface = {
	id: "a84cc86e-4116-4102-8457-118af39ba8eb",
	first_name: "Elise",
	last_name: "Badou",
	email: "elise.badou@bj.com",
	phone: "229 96 12 55 56",
	machine: machine2,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export default [operator1, operator2];
