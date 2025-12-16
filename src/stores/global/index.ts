import { defineStore } from "pinia";
import { globalStoreDefinition } from "./definition";
import { globalStoreGetters } from "./getters";
import type { GlobalStoreInterface } from "../interfaces/global_store_interface";
import type { LoginInterface } from "../../modules/authentication/interfaces/login_interface";
import type { ForgotPasswordInterface } from "../../modules/authentication/interfaces/forgot_password_interface";
import type { AppAlertInterface } from "../../interfaces/AppAlertInterface";
import type { AppLocalesEnum } from "../../locales";
import { createLogger } from "../../utils/logger";

const logger = createLogger("GlobalStore");

export const useGlobalStore = defineStore(globalStoreDefinition.key, {
	state: (): GlobalStoreInterface => ({ ...globalStoreDefinition.defaults }),

	getters: globalStoreGetters,

	actions: {
		initialize({ reset = false } = {}) {
			if (this.initialized && !reset) {
				return;
			}
			if (reset) {
				this.$reset();
			}
			this.initialized = true;
		},

		setLoading(loading: boolean) {
			this.loading = loading;
		},

		setLocale(locale: AppLocalesEnum) {
			logger.info(`[🌍] Setting locale to ${locale}`);
			this.locale = locale;
		},

		async loginAction(payload: LoginInterface) {
			logger.info(`[🔐] Logging in with ${payload.credential}`);
			// La logique de connexion doit être implémentée ici
		},

		async logoutAction() {
			logger.info(`[🔐] Logging out`);
			this.session = null;
			this.loading = false;
		},

		async forgotPassword(data: ForgotPasswordInterface) {
			logger.info(`[🔐] Forgot password for ${data.credential}`);
			return {};
		},

		async resetPasswordChallenge(token: string) {
			logger.info(`[🔐] Reset password challenge with token ${token}`);
			return {};
		},

		async resetPassword(token: string) {
			logger.info(`[🔐] Reset password with token ${token}`);
			return {};
		},

		setSession(session: GlobalStoreInterface["session"]) {
			logger.info(`[🌍] Setting session`);
			this.session = session;
			this.loading = false;
		},

		addAlert(alert: AppAlertInterface) {
			logger.info(`[🌍] Adding alert`, alert);
			this.alerts.push(alert);
		},

		removeAlert(alertId: AppAlertInterface["id"]) {
			logger.info(`[🌍] Removing alert with ID ${alertId}`);
			this.alerts = this.alerts.filter((alert: any) => alert.id !== alertId);
		},

		clearAlerts() {
			logger.info(`[🌍] Clearing all alerts`);
			this.alerts = [];
		},
	},
	persist: true,
});

export async function useInitializedGlobalStore(): Promise<ReturnType<typeof useGlobalStore>> {
	const store = useGlobalStore();
	if (!store.initialized) {
		store.initialize();
	}
	return store;
}

export type GlobalStore = ReturnType<typeof useGlobalStore>;
