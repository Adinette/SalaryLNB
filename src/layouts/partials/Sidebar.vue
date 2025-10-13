<script setup lang="ts">
import { computed, onMounted } from 'vue';
import menu from '../../data/menu';
import { useTemplateStore } from '../../stores/template';
import { ColorThemeEnum } from '../../enums';
import { appRoutes } from '../../router/routes';
import BaseNavigation from '../../components/BaseNavigation.vue';

// SimpleBar, for more info and examples you can check out https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-vue
import SimpleBar from "simplebar";

const navigation = computed(() => menu.main);

	// Component properties
	defineProps({
		withMiniNav: {
			type: Boolean,
			default: false,
			description: "If the sidebar is in Mini Nav Mode",
		},
	});

	// Main store
	const store = useTemplateStore();

	// Init SimpleBar (custom scrolling)
	onMounted(() => {
		const sidebarElement = document.getElementById("simplebar-sidebar");
		if (sidebarElement) {
			new SimpleBar(sidebarElement);
		}
  console.log("Menu imported Navigation to sidebar:", navigation.value);

	});
</script>

<template>
	<!-- Sidebar -->
	<!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
    If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
  -->

	<nav id="sidebar" :class="{ 'with-mini-nav': withMiniNav }" aria-label="Main Navigation">
		<slot>
			<!-- Side Header -->
			<div class="content-header">
				<slot name="header">
					<!-- Logo -->
					<RouterLink :to="{ name: appRoutes.dashboard }" class="fw-semibold text-dual">
						<span class="smini-visible">
							<h2 class="text-2xl font-extrabold text-green-700 font-[Quicksand, sans-serif]">TEA</h2>
					<p class="text-xs font-extrabold text-green-700 font-[Quicksand, sans-serif]">Services</p>
						</span>
					</RouterLink>
					<!-- END Logo -->
				</slot>

				<!-- Extra -->
				<div>
					<slot name="header-extra">
						<!-- Dark Mode -->
						<div class="dropdown d-inline-block mx-1">
							<button
								type="button"
								class="btn btn-sm btn-alt-secondary"
								id="sidebar-dark-mode-dropdown"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i v-if="!store.settings.darkModeActive" class="far fa-fw fa-moon"></i>
								<i v-if="store.settings.darkModeActive" class="fa fa-fw fa-moon"></i>
							</button>
							<div
								class="dropdown-menu dropdown-menu-end smini-hide border-0"
								aria-labelledby="sidebar-dark-mode-dropdown"
							>
								<button
									@click="() => store.darkMode({ mode: 'off' })"
									type="button"
									class="dropdown-item d-flex align-items-center gap-2"
									:class="{ active: store.settings.darkMode === 'off' }"
								>
									<i class="far fa-sun fa-fw opacity-50"></i>
									<span class="fs-sm fw-medium">Light</span>
								</button>
								<button
									@click="() => store.darkMode({ mode: 'on' })"
									type="button"
									class="dropdown-item d-flex align-items-center gap-2"
									:class="{ active: store.settings.darkMode === 'on' }"
								>
									<i class="far fa-moon fa-fw opacity-50"></i>
									<span class="fs-sm fw-medium">Dark</span>
								</button>
								<button
									@click="() => store.darkMode({ mode: 'system' })"
									type="button"
									class="dropdown-item d-flex align-items-center gap-2"
									:class="{ active: store.settings.darkMode === 'system' }"
								>
									<i class="fa fa-desktop fa-fw opacity-50"></i>
									<span class="fs-sm fw-medium">System</span>
								</button>
							</div>
						</div>
						<!-- END Dark Mode -->

						<!-- Options -->
						<div class="dropdown d-inline-block ms-1">
							<button
								type="button"
								class="btn btn-sm btn-alt-secondary"
								id="sidebar-themes-dropdown"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i class="fa fa-fw fa-brush"></i>
							</button>
							<div
								class="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0"
								aria-labelledby="sidebar-themes-dropdown"
							>
								<!-- Color Themes -->
								<button
									@click="store.setColorTheme({ theme: '' })"
									type="button"
									:class="{ active: store.settings.colorTheme === ColorThemeEnum.Default }"
								>
									<span>Default</span>
									<i class="fa fa-circle text-default"></i>
								</button>
								<button
									@click="store.setColorTheme({ theme: 'amethyst' })"
									type="button"
									class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
									:class="{ active: store.settings.colorTheme === 'amethyst' }"
								>
									<span>Amethyst</span>
									<i class="fa fa-circle text-amethyst"></i>
								</button>
								<button
									@click="store.setColorTheme({ theme: 'city' })"
									type="button"
									class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
									:class="{ active: store.settings.colorTheme === 'city' }"
								>
									<span>City</span>
									<i class="fa fa-circle text-city"></i>
								</button>
								<button
									@click="store.setColorTheme({ theme: 'flat' })"
									type="button"
									class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
									:class="{ active: store.settings.colorTheme === 'flat' }"
								>
									<span>Flat</span>
									<i class="fa fa-circle text-flat"></i>
								</button>
								<button
									@click="store.setColorTheme({ theme: 'modern' })"
									type="button"
									class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
									:class="{ active: store.settings.colorTheme === 'modern' }"
								>
									<span>Modern</span>
									<i class="fa fa-circle text-modern"></i>
								</button>
								<button
									@click="store.setColorTheme({ theme: 'smooth' })"
									type="button"
									class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
									:class="{ active: store.settings.colorTheme === 'smooth' }"
								>
									<span>Smooth</span>
									<i class="fa fa-circle text-smooth"></i>
								</button>
								<!-- END Color Themes -->

								<template v-if="!store.settings.darkModeActive">
									<div class="dropdown-divider"></div>

									<!-- Sidebar Styles -->
									<button
										@click="store.sidebarStyle({ mode: 'light' })"
										type="button"
										class="dropdown-item fw-medium"
										:class="{ active: !store.settings.sidebarDark }"
									>
										<span>Sidebar Light</span>
									</button>
									<button
										@click="store.sidebarStyle({ mode: 'dark' })"
										type="button"
										class="dropdown-item fw-medium"
										:class="{ active: store.settings.sidebarDark }"
									>
										<span>Sidebar Dark</span>
									</button>
									<!-- END Sidebar Styles -->

									<div class="dropdown-divider"></div>

									<!-- Header Styles -->
									<button
										@click="store.headerStyle({ mode: 'light' })"
										type="button"
										class="dropdown-item fw-medium"
										:class="{ active: !store.settings.headerDark }"
									>
										<span>Header Light</span>
									</button>
									<button
										@click="store.headerStyle({ mode: 'dark' })"
										type="button"
										class="dropdown-item fw-medium"
										:class="{ active: store.settings.headerDark }"
									>
										<span>Header Dark</span>
									</button>
									<!-- END Header Styles -->
								</template>
							</div>
						</div>
						<!-- END Options -->
					</slot>

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
			
			<!-- Sidebar Scrolling -->
			<div>{{ navigation }}</div>
			<div id="simplebar-sidebar" class="js-sidebar-scroll">
				<slot name="content">
					<!-- Side Navigation -->
					<div class="content-side">
						

						<BaseNavigation :nodes="navigation" />
					</div>
					<!-- END Side Navigation -->
				</slot>
			</div>
			<!-- END Sidebar Scrolling -->
		</slot>
	</nav>
	<!-- END Sidebar -->
</template>




<!-- <script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

const isSidebarOpen = ref(false)   // affichage mobile
const isSidebarCollapsed = ref(false) // réduction largeur desktop

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleCollapse = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script> -->

<!-- <template>
  <div class="flex h-screen overflow-hidden"> -->

    <!-- Sidebar -->
    <!-- <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        isSidebarCollapsed ? 'w-20' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0'
      ]"
    >
      <!-- Header -->
      <!-- <div class="flex items-center justify-between p-4"> -->
<!--        
					<div v-if="!isSidebarCollapsed">
					<h2 class="text-2xl font-extrabold text-green-700 font-[Quicksand, sans-serif]">TEA</h2>
					<p class="text-xs font-extrabold text-green-700 font-[Quicksand, sans-serif]">Services</p>
				</div>

        <button
          @click="toggleCollapse"
          class="p-2 bg-gray-200 rounded-lg text-white"
        >
          <img src="/icons/tab.svg" alt="toggle" class="w-5 h-5" />
        </button>
      </div> -->

      <!-- Links -->
      <!-- Links -->
			<!-- <nav class="flex-1 overflow-y-auto p-4">
				<ul class="space-y-2">
					<li>
						<RouterLink
							to="/machines"
							class="flex items-center p-2 rounded-lg transition-colors"
							active-class="bg-green-600 text-white"
						>
							<svg
								class="shrink-0 w-5 h-5 transition duration-75"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 18"
							>
								<path
									d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
								/>
							</svg>
							<span v-if="!isSidebarCollapsed" class="ml-3">Mes machines</span>
						</RouterLink>
					</li>

					<li>
						<RouterLink
							to="/operateurs"
							class="flex items-center p-2 rounded-lg transition-colors"
							active-class="bg-green-600 text-white"
						>
							<svg
								class="shrink-0 w-5 h-5 transition duration-75"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"
								/>
							</svg>
							<span v-if="!isSidebarCollapsed" class="ml-3">Mes opérateurs</span>
						</RouterLink>
					</li>
				</ul>
			</nav> -->

    <!-- </aside> --> 

    <!-- Overlay on mobile -->
    <!-- <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black/40 sm:hidden"
      @click="isSidebarOpen = false"
    ></div> -->

    <!-- Main content -->
    <!-- <div class="flex flex-col flex-1 transition-all duration-300 ml-0 overflow-x-hidden"

         :class="isSidebarCollapsed ? 'sm:ml-20' : 'sm:ml-64'">
       -->
      <!-- Topbar -->
      <!-- <nav class="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between p-4"> -->
        <!-- mobile menu btn -->
        <!-- <button
          @click="toggleSidebar"
          class="sm:hidden p-2 bg-gray-200 rounded-lg text-white"
        >
                   <img src="/icons/tab.svg" alt="toggle" class="w-5 h-5 text-white" />

        </button>

        <div class="flex items-center justify-end gap-2 overflow-hidden">
          <img class="w-10 h-10 rounded-full" src="/icons/profile.svg" alt="" />
                <span class="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
Rostrand Fauré</span>
        </div>
      </nav> -->

      <!-- Page content -->
  <!-- <main class="flex-1 p-4 sm:p-6 bg-gray-100 overflow-x-hidden">
        <RouterView />
      </main>
    </div>
  </div>
</template> -->
