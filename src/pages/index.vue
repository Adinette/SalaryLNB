<script setup lang="ts">
	import { appRoutes } from "../router/routes";
	import { useNavigation } from "../composables/useNavigation";
	import { useInitializedGlobalStore } from "../stores";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

	const router = useRouter();
	const { firstAccessibleMenu } = useNavigation();

	const redirectToAppropriateRoute = async () => {
		try {
			const globalStore = await useInitializedGlobalStore();

			if (globalStore.isAuthenticated) {
				// Utilisateur connecté : rediriger vers le premier menu accessible
				const accessibleRoute = firstAccessibleMenu.value || appRoutes.dashboard;
				router.push(accessibleRoute);
			} else {
				// Utilisateur non connecté : rediriger vers login
				router.push({ name: appRoutes.authentication.login });
			}
		} catch (error) {
			// En cas d'erreur, rediriger vers login par sécurité
			router.push({ name: appRoutes.authentication.login });
		}
	};

	onMounted(() => {
		// Redirection immédiate
		redirectToAppropriateRoute();
	});
</script>

<template>
	<!-- Page Content -->
	<div class="hero">
		<div class="hero-inner text-center">
			<div class="bg-body-extra-light">
				<div class="content content-full overflow-hidden">
					<div class="py-4">
						<!-- Error Header -->
						<h1 class="display-1 fw-bolder text-smooth animated tada text-primary">
							<i class="fa fa-compass text-primary"></i>
						</h1>
						<h2 class="h4 fw-normal text-muted mb-5 items-center">
							<span><i class="fa fa-cog fa-spin text-warning"></i></span> Redirection en cours...
						</h2>
						<!-- END Error Header -->
					</div>
				</div>
			</div>
			<div class="content content-full text-muted fs-sm fw-medium">
				<!-- Error Footer -->
				<p class="mb-1">Si la redirection ne fonctionne pas...</p>
				<a class="link-fx" href="javascript:void(0)" @click="redirectToAppropriateRoute"
					>Cliquez ici</a
				>
				<!-- END Error Footer -->
			</div>
		</div>
	</div>
	<!-- END Page Content -->
</template>
