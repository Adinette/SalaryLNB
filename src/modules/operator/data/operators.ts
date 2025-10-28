import { machine1 } from "../../machine/data/machines";
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

export default [operator1];
