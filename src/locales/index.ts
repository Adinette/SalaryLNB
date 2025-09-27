import authenticationLocales from "../modules/authentication/locales/index.ts";
import { type AuthenticationLocalization } from "../modules/authentication/types/authentication_localization";
import formValidatorLocales, { type FormValidatorLocalization } from "../utils/validators/locales/index.ts";

export const AppLocalesEnum = {
	fr: "fr",
} as const;
export type AppLocalesEnum = keyof typeof AppLocalesEnum;

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
