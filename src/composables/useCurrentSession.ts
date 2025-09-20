export const useCurrentSession = () => {
	const currentSession = ref<SessionModel | null>(null);

	const fetchCurrentSession = async () => {
		const globalStore = await useInitializedGlobalStore();
		if (!globalStore) {
			console.error("Global store is not initialized.");
			return;
		}

		currentSession.value = globalStore.currentSession;
	};

	const handleLogout = async () => {
		const globalStore = await useInitializedGlobalStore();
		if (!globalStore) {
			console.error("Global store is not initialized.");
			return;
		}

		AppUtils.showAlert({
			title: "Êtes-vous sûr ?",
			html: `Vous êtes sur le point de vous déconnecter. Êtes-vous sûr de vouloir continuer ?</b>.`,
			confirmButtonText: `Oui,Déconnexion`,
			onConfirm: async () => {
				await globalStore.logoutAction();
				router.push({ name: appRoutes.authentication.login });
				toast.success("Utilisateur déconnecter avec succès !");
			},
		});
	};

	onMounted(fetchCurrentSession);

	return {
		currentSession,
		fetchCurrentSession,
		handleLogout,
	};
};
