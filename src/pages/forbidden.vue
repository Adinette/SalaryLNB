<script setup lang="ts">
	import { useNavigation } from "../composables/useNavigation";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const { firstAccessibleMenu } = useNavigation();

	const goBack = () => {
		if (window.history.length > 1) {
			router.go(-1);
		} else {
			router.push(firstAccessibleMenu.value || "/");
		}
	};

	const goToAccessibleMenu = () => {
		router.push(firstAccessibleMenu.value || "/");
	};
</script>

<template>
	<!-- Page Content -->
	<div class="hero">
		<div class="hero-inner text-center">
			<div class="bg-body-extra-light">
				<div class="content content-full overflow-hidden">
					<div class="py-4">
						<!-- Error Header -->
						<h1 class="display-1 fw-bolder text-smooth">403</h1>
						<h2 class="h4 fw-normal text-muted mb-5">
							Accès interdit : Vous n'avez pas les permissions nécessaires pour accéder à cette
							page.
						</h2>
						<!-- END Error Header -->

						<!-- Action Buttons -->
						<div class="row justify-content-center mb-4">
							<div class="col-sm-8 col-xl-6">
								<div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
									<button @click="goBack" class="btn btn-primary btn-lg">
										<i class="fa fa-arrow-left me-1"></i>
										Retour
									</button>
									<button @click="goToAccessibleMenu" class="btn btn-outline-primary btn-lg">
										<i class="fa fa-home me-1"></i>
										Menu principal
									</button>
								</div>
							</div>
						</div>
						<!-- END Action Buttons -->
					</div>
				</div>
			</div>
			<div class="content content-full text-muted fs-sm fw-medium">
				<!-- Error Footer -->
				<p class="mb-1">
					Si vous pensez qu'il s'agit d'une erreur, contactez votre administrateur.
				</p>
				<a class="link-fx" href="javascript:void(0)">Signaler le problème</a> ou
				<button @click="goToAccessibleMenu" class="btn btn-link link-fx p-0">
					Retour au menu accessible
				</button>
				<!-- END Error Footer -->
			</div>
		</div>
	</div>
	<!-- END Page Content -->
</template>
