/* eslint-disable regex/invalid */
import appConfig from "../../config";
import { router } from "../../router";
import axios from "axios";
import { useInitializedGlobalStore } from "../../stores";
import AppLocalStorage from "../../services/AppLocalStorage";

const salaryApiClient = axios.create({
	baseURL: appConfig.env.apiUrl,
	timeout: 30000,
});

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
salaryApiClient.interceptors.request.use(async (config) => {
	const globalStore = await useInitializedGlobalStore();
	const currentSession = globalStore.session;

	config.headers = config.headers || {};

	// If token is found
	if (currentSession && currentSession.token.length !== 0)
		config.headers.Authorization = currentSession.token ? `Bearer ${currentSession.token}` : "";

	return config;
});

// ℹ️ Add response interceptor to handle 401 response
salaryApiClient.interceptors.response.use(
	(response) => {
		// const csrfTokenFromApi = response.config.headers.get('X-CSRF-Token') as string
		// const appLocalStorage = new AppLocalStorage()

		// appLocalStorage.set(appLocalStorage.keys.csrfToken, csrfTokenFromApi)

		return response;
	},
	(error) => {
		// Handle error
		if (error.response?.status === 401) {
			AppLocalStorage.clear();

			router.push("/authentication/login");

			return Promise.reject(error);
		} else {
			return Promise.reject(error);
		}
	}
);

export { salaryApiClient };
