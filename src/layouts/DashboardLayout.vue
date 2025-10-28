<script setup lang="ts">
	import { onBeforeRouteLeave } from "vue-router";
	import { useTemplateStore } from "../stores/template";

	import BaseNavigation from "../components/BaseNavigation.vue";

	import BaseLayout from "./BaseLayout.vue";

	// Import appRoutes
	import { appRoutes } from "../router/routes";

	// Import navigation composable
	import { useNavigation } from "../composables/useNavigation";
	import { applicationsMock } from "../data/applications";
	import { useCurrentSession } from "../composables/useCurrentSession";
import { useInitializedGlobalStore, type GlobalStore } from "../stores";
import type { AppAlertInterface } from "../interfaces/AppAlertInterface";
import { computed, onMounted, ref } from "vue";
import { ApplicationModel } from "../modules/applications/models/application_model";

	// Get filtered navigation with permissions
	const { navigation } = useNavigation();
	const { handleLogout } = useCurrentSession();

	// Main store
	const store = useTemplateStore();
	const globalStore = ref<GlobalStore | null>(null);

	// Alerts for AppAlerts component
	const alerts = ref<AppAlertInterface[]>([]);

	const apps = applicationsMock.map((app) => {
		return new ApplicationModel(app);
	});
	const appsToShowOnMiniNav = computed(() => apps.slice(0, 10));

	// Set default elements for this layout
	store.setLayout({
		header: true,
		sidebar: true,
		sideOverlay: true,
		footer: true,
	});

	// Set various template options for this layout variation
	store.sidebarStyle({ mode: "light" });
	store.sidebarMini({ mode: "off" });
	store.mainContent({ mode: "narrow" });

	// Before leaving this page
	onBeforeRouteLeave(() => {
		// Restore original settings
		// store.sidebarStyle({ mode: "dark" });
	});

	onMounted(async () => {
		globalStore.value = await useInitializedGlobalStore();
	});
</script>

<template>
	<BaseLayout sidebar-with-mini-nav>
		<!-- Sidebar Content -->
		<!-- Using the available v-slot, we can override the default Header content from layouts/partials/Sidebar.vue -->
		<template #sidebar>
			<!-- Sidebar Mini Nav -->
			<!-- <div class="sidebar-mini-nav"> -->
				<!-- Logo -->
				<!-- <RouterLink :to="{ name: appRoutes.dashboard }" class="mini-nav-item h-header">
						<span class="smini-visible">
							<h2 class="text-2xl font-extrabold text-green-700 font-[Quicksand, sans-serif]">TEA</h2>
							<p class="text-xs font-extrabold text-green-700 font-[Quicksand, sans-serif]">Services</p>
						</span>				
				</RouterLink> -->
				<!-- END Logo -->

				<!-- Mini Main Nav -->
				<!-- <nav class="flex-grow-1 space-y-1">
					<a
						v-for="app in appsToShowOnMiniNav"
						:key="app.id"
						class="mini-nav-item nav-link"
					 
						href="javascript:void(0)"
					>
						<i :class="app.icon + ' fs-sm'"></i>
					</a>
				</nav> -->
				<!-- END Mini Main Nav -->

				<!-- Mini User Nav -->
				<!-- <nav class="space-y-1 pb-2">
					<a class="mini-nav-item" href="javascript:void(0)" @click="handleLogout">
						<i class="text-white si si-logout fs-sm"></i>
					</a>
				</nav> -->
				<!-- END Mini User Nav -->
			<!-- </div> -->
			<!-- END Sidebar Mini Nav -->

			<!-- Sidebar Scrolling -->
			<div id="simplebar-sidebar" class="js-sidebar-scroll full-height">
				<!-- Side Header -->
				<div class="content-header">
					<!-- Logo -->
					<RouterLink :to="{ name: appRoutes.dashboard }" class="fw-semibold text-dual">
						<span class="smini-visible">
							<!-- <AppLogoIcon class="h-2" /> -->
						</span>
						<span class="smini-hide fs-5 tracking-wider">
							<!-- <AppLogo class="w-full" /> -->
						</span>
					</RouterLink>
					<!-- END Logo -->

					<!-- Extra -->
					<div>
						<!-- Close Sidebar, Visible only on mobile screens -->
						<button
							type="button"
							class="d-lg-none btn btn-sm btn-alt-secondary ms-1"
							@click="store.sidebar({ mode: 'close' })"
						>
							<i class="fa fa-fw fa-times"></i>
						</button>
						<!-- END Close Sidebar -->
					</div>
					<!-- END Extra -->
				</div>
				<!-- END Side Header -->

				<!-- Side Navigation -->
				<div class="content-side">
					<BaseNavigation :nodes="navigation" />
				</div>
				<!-- END Side Navigation -->
			</div>
			<!-- END Sidebar Scrolling -->
		</template>
		<!-- END Sidebar Content -->

		<!-- Header Content Left -->
		<!-- Using the available v-slot, we can override the default Header content from layouts/partials/Header.vue -->
		<template #header-content-left>
			<!-- Toggle Sidebar -->
			<button
				type="button"
				class="btn btn-sm btn-alt-secondary me-2"
				@click="store.sidebar({ mode: 'toggle' })"
			>
				<i class="fa fa-fw fa-bars"></i>
			</button>
			<!-- END Toggle Sidebar -->
			<ThemeSwitcher2 />

			<!-- HeaderSearchForm :onSubmitSearch="onSubmitSearch" /-->
		</template>
		<!-- END Header Content Left -->

		<AppAlerts :alerts="alerts" />
		<RouterView />
	</BaseLayout>
</template>
