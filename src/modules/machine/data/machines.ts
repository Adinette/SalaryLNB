import type { MachineInterface } from "../interfaces";

export const machine1: MachineInterface = {
	id: "048bb848-52a2-4913-8d7e-5108a19a645x",
	code: "001123",
	emplacement: "Bohicon",
	is_active: true,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export const machine2: MachineInterface = {
	id: "048bb851-52a2-4913-8d7e-5108a19a6123w",
    code: "001124",
	emplacement: "Calavi",
	is_active: true,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export default [machine1, machine2];
