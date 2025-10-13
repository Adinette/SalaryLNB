<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed } from "vue";
	import { useRouter } from "vue-router";
	import { useTemplateStore } from "../../stores/template";

	const { formatInitials } = useFormatting();

	// Grab example data
	import { UserModel } from "../../modules/users/models/user_model";
	import { useFormatting } from "../../composables/useFormatting";
	import { useCurrentSession } from "../../composables/useCurrentSession";
import { useInitializedGlobalStore, type GlobalStore } from "../../stores";

	// Main store and Router
	const store = useTemplateStore();
	const router = useRouter();
	const { handleLogout } = useCurrentSession();

	const globalStore = ref<GlobalStore | null>(null);

	const currentSession = computed(() => {
		return globalStore.value?.currentSession || null;
	});

	const currentEmployee = computed(() => {
		return currentSession.value?.user ? new UserModel(currentSession.value.user) : null;
	});

	const currentUser = computed(() => {
		return currentSession.value?.user ? new UserModel(currentSession.value.user) : null;
	});

	const defaultAvatar = "/assets/media/avatars/avatar10.jpg";

	// Reactive variables
	const baseSearchTerm = ref("");

	// On form search submit functionality
	function onSubmitSearch() {
		router.push("/backend/pages/generic/search?" + baseSearchTerm.value);
	}

	// When ESCAPE key is hit close the header search section
	function eventHeaderSearch(event: KeyboardEvent) {
		if (event.which === 27) {
			event.preventDefault();
			store.headerSearch({ mode: "off" });
		}
	}

	// Attach ESCAPE key event listener
	onMounted(async () => {
		document.addEventListener("keydown", eventHeaderSearch);
		globalStore.value = await useInitializedGlobalStore();
	});

	// Remove keydown event listener
	onUnmounted(() => {
		document.removeEventListener("keydown", eventHeaderSearch);
	});
</script>

<template>
	<!-- Header -->
	<header id="page-header">
		<slot>
			<!-- Header Content -->
			<div class="content-header bg-white">
				<slot name="content">
					<!-- Left Section -->
					<div class="d-flex align-items-center">
						<slot name="content-left">
							<!-- Toggle Sidebar -->
							<button
								type="button"
								class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
								@click="store.sidebar({ mode: 'toggle' })"
							>
								<i class="fa fa-fw fa-bars"></i>
							</button>
							<!-- END Toggle Sidebar -->

							<!-- Open Search Section (visible on smaller screens) -->
							<button
								type="button"
								class="btn btn-sm btn-alt-secondary d-md-none"
								@click="store.headerSearch({ mode: 'on' })"
							>
								<i class="fa fa-fw fa-search"></i>
							</button>
							<!-- END Open Search Section -->

							<!-- Search Form (visible on larger screens) -->
							<form class="d-none d-md-inline-block" @submit.prevent="onSubmitSearch">
								<div class="input-group input-group-sm">
									<input
										type="text"
										class="form-control form-control-alt"
										placeholder="Search.."
										id="page-header-search-input2"
										name="page-header-search-input2"
										v-model="baseSearchTerm"
									/>
									<span class="input-group-text border-0">
										<i class="fa fa-fw fa-search"></i>
									</span>
								</div>
							</form>
							<!-- END Search Form -->
						</slot>
					</div>
					<!-- END Left Section -->

					<!-- Right Section -->
					<div class="d-flex align-items-center">
						<slot name="content-right">
						<span class="fs-xs fw-semibold d-inline-block py-1 px-3 bg-success-light text-success rounded-md">Administration</span>

							<!-- User Dropdown -->
							<div class="dropdown d-inline-block ms-2">
								<button
									type="button"
									class="btn btn-sm btn-alt-secondary d-flex align-items-center"
									id="page-header-user-dropdown"
									data-bs-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
								<img src="/assets/media/avatars/avatar10.jpg" alt="avatar" class="rounded-circle" style="width: 24px; height: 24px;">
									<!-- <VAvatar
									size="x-small"
									color="primary"
									:image="defaultAvatar"
								>
										{{ formatInitials(currentUser?.fullName || 'XX') }}
								</VAvatar> -->

									<!-- <span class="d-none d-sm-inline-block ms-2">{{
										currentUser?.first_name || "..."
									}}</span>
									<i
										class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"
									></i> -->
								</button>
								<div
									class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
									aria-labelledby="page-header-user-dropdown"
								>
									<div class="p-3 text-center bg-body-light border-bottom rounded-top">
										<img src="/assets/media/avatars/avatar10.jpg" alt="avatar" class="rounded-circle" style="width: 24px; height: 24px;">
										<!-- <p class="mt-2 mb-0 fw-medium">
											{{ currentUser?.fullName || "..." }}
										</p> -->
									</div>
									<!-- div class="p-2">
										<a
											class="dropdown-item d-flex align-items-center justify-content-between"
											href="javascript:void(0)"
										>
											<span class="fs-sm fw-medium">Boîte de réception</span>
											<span class="badge rounded-pill bg-primary ms-2">3</span>
										</a>
										<RouterLink
											:to="{ name: appRoutes.dashboard }"
											class="dropdown-item d-flex align-items-center justify-content-between"
										>
											<span class="fs-sm fw-medium">Profil</span>
											<span class="badge rounded-pill bg-primary ms-2">1</span>
										</RouterLink>
										<a
											class="dropdown-item d-flex align-items-center justify-content-between"
											href="javascript:void(0)"
										>
											<span class="fs-sm fw-medium">Paramètres</span>
										</a>
									</!-->
									<div role="separator" class="dropdown-divider m-0"></div>
									<div class="p-2">
										<!-- RouterLink
											:to="{ name: appRoutes.dashboard }"
											class="dropdown-item d-flex align-items-center justify-content-between"
										>
											<span class="fs-sm fw-medium">Verrouiller le compte</span>
										</!-->
										<RouterLink
											:to="{}"
											@click.prevent="handleLogout"
											class="dropdown-item d-flex align-items-center justify-content-between"
										>
											<span class="fs-sm fw-medium">Déconnexion</span>
										</RouterLink>
									</div>
								</div>
							</div>
							<!-- END User Dropdown -->

							<!-- Notifications Dropdown -->
							<!-- div class="dropdown d-inline-block ms-2">
								<button
									type="button"
									class="btn btn-sm btn-alt-secondary space-x-1"
									id="page-header-notifications-dropdown"
									data-bs-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i class="fa fa-fw fa-bell"></i>
									<span v-if="notifications.length > 0" class="text-primary">•</span>
								</button>
								<div
									class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 border-0 fs-sm"
									aria-labelledby="page-header-notifications-dropdown"
								>
									<div class="p-2 bg-body-light border-bottom text-center rounded-top">
										<h5 class="dropdown-header text-uppercase">Notifications</h5>
									</div>
									<ul class="nav-items mb-0">
										<li
											v-for="(notification, index) in notifications"
											:key="`notification-${index}`"
										>
											<a class="text-dark d-flex py-2" :href="`${notification.href}`">
												<div class="flex-shrink-0 me-2 ms-3">
													<i :class="`${notification.icon}`"></i>
												</div>
												<div class="flex-grow-1 pe-2">
													<div class="fw-semibold">
														{{ notification.title }}
													</div>
													<span class="fw-medium text-muted">
														{{ notification.time }}
													</span>
												</div>
											</a>
										</li>
										<li v-if="!notifications.length" class="p-2">
											<div
												class="alert alert-light d-flex align-items-center space-x-2 mb-0"
												role="alert"
											>
												<i class="fa fa-exclamation-triangle opacity-50"></i>
												<p class="mb-0">No new ones!</p>
											</div>
										</li>
									</ul>
									<div v-if="notifications.length > 0" class="p-2 border-top text-center">
										<a class="d-inline-block fw-medium" href="javascript:void(0)">
											<i class="fa fa-fw fa-arrow-down me-1 opacity-50"></i>
											Load More..
										</a>
									</div>
								</div>
							</!-->
							<!-- END Notifications Dropdown -->

							<!-- Toggle Side Overlay -->
							<!-- <button
                type="button"
                class="btn btn-sm btn-alt-secondary ms-2"
                @click="store.sideOverlay({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-list-ul fa-flip-horizontal"></i>
              </button> -->
							<!-- END Toggle Side Overlay -->
						</slot>
					</div>
					<!-- END Right Section -->
				</slot>
			</div>
			<!-- END Header Content -->

			<!-- Header Search -->
			<div
				id="page-header-search"
				class="overlay-header bg-body-extra-light"
				:class="{ show: store.settings.headerSearch }"
			>
				<div class="content-header">
					<form class="w-100" @submit.prevent="onSubmitSearch">
						<div class="input-group">
							<button
								type="button"
								class="btn btn-alt-danger"
								@click="store.headerSearch({ mode: 'off' })"
							>
								<i class="fa fa-fw fa-times-circle"></i>
							</button>
							<input
								type="text"
								class="form-control"
								placeholder="Search or hit ESC.."
								id="page-header-search-input"
								name="page-header-search-input"
								v-model="baseSearchTerm"
							/>
						</div>
					</form>
				</div>
			</div>
			<!-- END Header Search -->

			<!-- Header Loader -->
			<div
				id="page-header-loader"
				class="overlay-header bg-body-extra-light"
				:class="{ show: store.settings.headerLoader }"
			>
				<div class="content-header">
					<div class="w-100 text-center">
						<i class="fa fa-fw fa-circle-notch fa-spin"></i>
					</div>
				</div>
			</div>
			<!-- END Header Loader -->
		</slot>
	</header>
	<!-- END Header -->
</template>

