<script setup lang="ts">
import { appRoutes } from '../router/routes'; // Adjust the path if needed
</script>

<template>
	<!-- Page Content -->
	<div class="hero">
		<div class="hero-inner text-center">
			<div class="bg-body-extra-light">
				<div class="content content-full overflow-hidden">
					<div class="py-4">
						<!-- Error Header -->
						<h1 class="display-1 fw-bolder text-smooth">404</h1>
						<h2 class="h4 fw-normal text-muted mb-5">
							Nous sommes désolés, mais la page que vous recherchez est introuvable...
						</h2>
						<!-- END Error Header -->

						<!-- Search Form -->
						<form @submit.prevent>
							<div class="row justify-content-center mb-4">
								<div class="col-sm-6 col-xl-3">
									<div class="input-group input-group-lg">
										<input
											class="form-control form-control-alt"
											type="text"
											placeholder="Atteindre un menu..."
										/>
										<button type="submit" class="btn btn-dark">
											<i class="fa fa-search opacity-75"></i>
										</button>
									</div>
								</div>
							</div>
						</form>
						<!-- END Search Form -->
					</div>
				</div>
			</div>
			<div class="content content-full text-muted fs-sm fw-medium">
				<!-- Error Footer -->
				<p class="mb-1">Voulez-vous nous le notifier ?</p>
				<a class="link-fx" href="javascript:void(0)">Signalez-le</a> ou
				<RouterLink :to="{ name: appRoutes.dashboard }" class="link-fx"
					>Retour au tableau de bord</RouterLink
				>
				<!-- END Error Footer -->
			</div>
		</div>
	</div>
	<!-- END Page Content -->
</template>
