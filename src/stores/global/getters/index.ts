import { SessionModel } from "../../../modules/authentication/models/session_model";
import type { GlobalStoreInterface } from "../../interfaces/global_store_interface";

export const globalStoreGetters = {
	currentSession: (state: GlobalStoreInterface) =>
		state.session ? new SessionModel(state.session) : null,

	isAuthenticated: (state: GlobalStoreInterface) => state.session !== null,
};
