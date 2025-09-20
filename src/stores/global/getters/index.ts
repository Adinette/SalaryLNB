export const globalStoreGetters = {
	currentSession: (state: GlobalStoreInterface) =>
		state.session ? new SessionModel(state.session) : null,

	isAuthenticated: (state: GlobalStoreInterface) => state.session !== null,
};
