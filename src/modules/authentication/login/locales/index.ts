import { AppLocalesEnum } from "../../../../locales/enum.ts";

import fr from "./fr.json" assert { type: "json" };

export type LoginPageLocalization = typeof fr;
const loginPageLocalization: LoginPageLocalization = fr;

export default {
	[AppLocalesEnum.fr]: { ...loginPageLocalization },
};
