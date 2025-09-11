<script setup>
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
</script>

<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        isSidebarCollapsed ? 'w-20' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4">
        <span
          v-if="!isSidebarCollapsed"
          class="text-xl font-semibold text-green-900"
        >
          TEA
        </span>

        <button
          @click="toggleCollapse"
          class="p-2 bg-gray-200 rounded-lg text-white"
        >
          <img src="/icons/tab.svg" alt="toggle" class="w-5 h-5" />
        </button>
      </div>

      <!-- Links -->
      <!-- Links -->
			<nav class="flex-1 overflow-y-auto p-4">
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
			</nav>

    </aside>

    <!-- Overlay on mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black/40 sm:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 transition-all duration-300 ml-0 overflow-x-hidden"

         :class="isSidebarCollapsed ? 'sm:ml-20' : 'sm:ml-64'">
      
      <!-- Topbar -->
      <nav class="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <!-- mobile menu btn -->
        <button
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
      </nav>

      <!-- Page content -->
  <main class="flex-1 p-4 sm:p-6 bg-gray-100 overflow-x-hidden">
        <RouterView />
      </main>
    </div>
  </div>
</template>
