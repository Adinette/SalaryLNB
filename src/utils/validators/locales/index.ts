import { AppLocalesEnum } from "../../../locales/enum.ts";

import fr from "./fr.json" assert { type: "json" };

export type FormValidatorLocalization = typeof fr;
const formValidatorLocalization: FormValidatorLocalization = fr;

export default {
	[AppLocalesEnum.fr]: { ...formValidatorLocalization },
};
