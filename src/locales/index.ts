import authenticationLocales from "../modules/authentication/locales/index.ts";
import { type AuthenticationLocalization } from "../modules/authentication/types/authentication_localization";
import formValidatorLocales, {
	FormValidatorLocalization,
} from "../utils/validators/locales/index.ts";

export enum AppLocalesEnum {
	fr = "fr",
}

export type ModuleLocalization = {
	[key in AppLocalesEnum]: object;
};

export type AppI18n = {
	[key in AppLocalesEnum]: {
		validators: FormValidatorLocalization;
		authentication: AuthenticationLocalization;
	};
};

export const appLocales: AppI18n = {
	[AppLocalesEnum.fr]: {
		validators: formValidatorLocales.fr,
		authentication: authenticationLocales.fr,
	},
};
