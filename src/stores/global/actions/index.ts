import type { AppLocalesEnum } from "../../../locales";
import { createLogger } from "../../../utils/logger";
import type { GlobalStore } from "../..";
import type { LoginInterface } from "../../../modules/authentication/interfaces/login_interface";
import type { ForgotPasswordInterface } from "../../../modules/authentication/interfaces/forgot_password_interface";
import type { GlobalStoreInterface } from "../../interfaces/global_store_interface";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";

const logger = createLogger("GlobalStoreActions");

export const globalStoreActions = {
	async initialize(store: GlobalStore, { reset = false } = {}) {
		if (store.initialized && !reset) {
			return;
		}
		if (reset) {
			store.$reset();
		}
		store.initialized = true;
	},

	setLocale(store: GlobalStore, locale: AppLocalesEnum): void {
		logger.info(`[🌍][${store.$id}]: Setting locale to ${locale}`);
		store.locale = locale;
	},

	async loginAction(store: GlobalStore, { credential }: LoginInterface) {
		logger.info(`[🔐][${store.$id}]: Logging in with ${credential}`);
		// login logic here
	},

	async logoutAction(store: GlobalStore) {
		logger.info(`[🔐][${store.$id}]: Logging out`);
		store.session = null;
		store.loading = false;
	},

	async forgotPassword(
		store: GlobalStore,
		data: ForgotPasswordInterface
	): Promise<object | "error"> {
		logger.info(`[🔐][${store.$id}]: Forgot password for ${data.credential}`);
		return {};
	},

	async resetPasswordChallenge(store: GlobalStore, token: string): Promise<object | "error"> {
		logger.info(`[🔐][${store.$id}]: Reset password challenge with token ${token}`);
		return {};
	},

	async resetPassword(
		store: GlobalStore,
		token: string
	): Promise<object | "error"> {
		logger.info(`[🔐][${store.$id}]: Reset password with token ${token}`);
		return {};
	},

	setSession(store: GlobalStore, session: GlobalStoreInterface["session"]): void {
		logger.info(`[🌍][${store.$id}]: Setting session`);
		store.session = session;
		store.loading = false;
	},
	addAlert(store: GlobalStore, alert: AppAlertInterface): void {
		logger.info(`[🌍][${store.$id}]: Adding alert`, alert);
		store.alerts.push(alert);
	},
	removeAlert(store: GlobalStore, alertId: AppAlertInterface["id"]): void {
		logger.info(`[🌍][${store.$id}]: Removing alert with ID ${alertId}`);
		store.alerts = store.alerts.filter((alert: any) => alert.id !== alertId);
	},
	clearAlerts(store: GlobalStore): void {
		logger.info(`[🌍][${store.$id}]: Clearing all alerts`);
		store.alerts = [];
	},
};
