<script setup lang="ts">
	import { appRoutes } from "../router/routes"; // Adjust the path as needed
</script>

<template>
	<!-- Page Content -->
	<BaseBackground image="/assets/media/photos/photo8@2x.jpg">
		<div class="bg-primary-op">
			<div class="hero bg-black-50">
				<div class="hero-inner">
					<div class="content content-full">
						<div class="row justify-content-center">
							<div class="col-md-6 py-3 text-center">
								<div class="push">
									<RouterLink :to="{ name: appRoutes.dashboard }" class="link-fx fw-bold fs-1">
										<span class="text-white">Sahges Eval</span>
									</RouterLink>
									<p class="text-white-75">
										Stay tuned! We are working on it and it is coming soon!
									</p>
								</div>

								<RouterLink :to="{ name: appRoutes.dashboard }" class="btn btn-dark">
									<i class="fa fa-arrow-left opacity-50 me-1"></i> Go Back to Dashboard
								</RouterLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseBackground>
	<!-- END Page Content -->
</template>
