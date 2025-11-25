import { defineStore } from "pinia";
import { globalStoreDefinition } from "./definition";
import { globalStoreGetters } from "./getters";
import { globalStoreActions } from "./actions";
import type { GlobalStoreInterface } from "../interfaces/global_store_interface";
import type { LoginInterface } from "../../modules/authentication/interfaces/login_interface";
import type { ForgotPasswordInterface } from "../../modules/authentication/interfaces/forgot_password_interface";
import type { AppAlertInterface } from "../../interfaces/AppAlertInterface";
import type { AppLocalesEnum } from "../../locales";

export const useGlobalStore = defineStore(globalStoreDefinition.key, {
	state: (): GlobalStoreInterface => ({ ...globalStoreDefinition.service.defaults }),

	getters: globalStoreGetters,

	actions: {
		async initialize(params?: { reset?: boolean }) {
			return globalStoreActions.initialize(this, params ?? {});
		},
		setLoading(loading: boolean) {
			globalStoreActions.setLoading(this, loading);
		},
		setLocale(locale: AppLocalesEnum) {
			globalStoreActions.setLocale(this, locale);
		},
		async loginAction(payload: LoginInterface) {
			return globalStoreActions.loginAction(this, payload);
		},
		async logoutAction() {
			return globalStoreActions.logoutAction(this);
		},
		async forgotPassword(data: ForgotPasswordInterface) {
			return globalStoreActions.forgotPassword(this, data);
		},
		async resetPasswordChallenge(token: string) {
			return globalStoreActions.resetPasswordChallenge(this, token);
		},
		async resetPassword(token: string) {
			return globalStoreActions.resetPassword(this, token);
		},
		setSession(session: GlobalStoreInterface["session"]) {
			globalStoreActions.setSession(this, session);
		},
		addAlert(alert: AppAlertInterface) {
			globalStoreActions.addAlert(this, alert);
		},
		removeAlert(alertId: AppAlertInterface["id"]) {
			globalStoreActions.removeAlert(this, alertId);
		},
		clearAlerts() {
			globalStoreActions.clearAlerts(this);
		},
	},
});

export async function useInitializedGlobalStore(): Promise<ReturnType<typeof useGlobalStore>> {
	const store = useGlobalStore();
	if (!store.initialized) await store.initialize();
	return store;
}

export type GlobalStore = ReturnType<typeof useGlobalStore>;
