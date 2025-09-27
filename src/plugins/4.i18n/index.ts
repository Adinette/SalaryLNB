import { createI18n } from "vue-i18n";
import { type App } from "vue";

import { appLocales, AppLocalesEnum } from "../../locales";

export const i18n = createI18n({
	legacy: false,
	locale: AppLocalesEnum.fr,
	fallbackLocale: AppLocalesEnum.fr,
	messages: {
		fr: appLocales.fr,
	},
});

export default function setupI18n(app: App) {
	app.use(i18n);
}
