<script setup lang="ts">
	import { useTemplateStore } from "../../stores/template";

	import { appLocalesMapping } from "../../locales/appLocalesMapping";
	// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
	import LoginForm from "@/modules/authentication/login/views/LoginForm.vue";
	



	definePage({
				name: "authentication-login",
		meta: {
			layout: "blank",
			public: true,
		},
	});

	// Main store and Router
	const store = useTemplateStore();


function definePage(arg0: { name?: string; meta: { layout: string; public: boolean; }; }) {
	throw new Error("Function not implemented.");
}
</script>

<template>
	<!-- Page Content -->
	<div class="hero-static d-flex align-items-center bg-body-extra-light">
		<div class="w-100 bg-body-light shadow-sm">
			<!-- Sign In Section -->
			<div class="bg-body-light">
				<div class="content content-full">
					<div class="row g-0 justify-content-center">
						<div class="col-md-8 col-lg-6 col-xl-4 py-4 px-4 px-lg-5">
							<!-- Header -->
							<div class="text-center">
								<div class="mb-2 flex justify-center">
								</div>
								<h1 class="h4 mb-1">Connecter vous</h1>
							</div>
							<!-- END Header -->

							<!-- Sign In Form -->
							<LoginForm />
							<!-- END Sign In Form -->
						</div>
					</div>
				</div>
			</div>
			<!-- END Sign In Section -->

			<!-- Footer -->
			<div
				class="fs-sm text-center text-muted py-3 flex justify-center items-center gap-2 flex-col sm:flex-row"
			>
				<div>
					<strong>{{ store.app.name + " " + store.app.version }}</strong> &copy;
					{{ store.app.copyright }}
				</div>
				<div class="hidden sm:inline">&mdash;</div>
				<div class="flex items-center gap-2">
					&bullet;
					<span class="text-primary">copyRight</span>
				</div>
			</div>
			<!-- END Footer -->
		</div>
	</div>
	<!-- END Page Content -->
</template>
