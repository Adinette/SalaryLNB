<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "../../stores/template";
import { useCurrentSession } from "../../composables/useCurrentSession";
import { useInitializedGlobalStore, type GlobalStore } from "../../stores";

// --- Configuration & Stores ---
const store = useTemplateStore();
const router = useRouter();
const { handleLogout } = useCurrentSession();
const globalStore = ref<GlobalStore | null>(null);

// --- États Réactifs (UI) ---
const baseSearchTerm = ref("");
const isUserDropdownOpen = ref(false);
const isThemeDropdownOpen = ref(false);

// --- Logique de Recherche ---
function onSubmitSearch() {
  router.push("/backend/pages/generic/search?" + baseSearchTerm.value);
}

function eventHeaderSearch(event: KeyboardEvent) {
  if (event.key === "Escape") { // Utilisation de .key (plus moderne que .which)
    event.preventDefault();
    store.headerSearch({ mode: "off" });
  }
}

// --- Logique des Dropdowns ---
const toggleUserDropdown = () => isUserDropdownOpen.value = !isUserDropdownOpen.value;
const toggleThemeDropdown = () => isThemeDropdownOpen.value = !isThemeDropdownOpen.value;

function selectTheme(mode: 'light' | 'dark' | 'system') {
  const darkModeValue = mode === 'dark' ? 'on' : mode === 'light' ? 'off' : 'system';
  store.darkMode({ mode: darkModeValue });
  isThemeDropdownOpen.value = false;
}

// Fermeture intelligente des menus au clic extérieur
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement;
  
  if (!target.closest('#page-header-user-dropdown-container')) {
    isUserDropdownOpen.value = false;
  }
  if (!target.closest('#theme-dropdown-container')) {
    isThemeDropdownOpen.value = false;
  }
}

// --- Cycle de vie ---
onMounted(async () => {
  document.addEventListener("keydown", eventHeaderSearch);
  document.addEventListener("click", handleClickOutside);
  globalStore.value = await useInitializedGlobalStore();
});

onUnmounted(() => {
  document.removeEventListener("keydown", eventHeaderSearch);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header id="page-header">
    <slot>
      <div class="content-header bg-white">
        <slot name="content">
          
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
                @click="store.sidebar({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-bars"></i>
              </button>

              <div id="theme-dropdown-container" class="dropdown d-inline-block" style="position: relative;">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary"
                  @click="toggleThemeDropdown"
                  :aria-expanded="isThemeDropdownOpen"
                >
                  <i class="fa fa-fw fa-desktop text-primary"></i>
                </button>

                <div
                  class="dropdown-menu dropdown-menu-md p-0 border-0"
                  :class="{ 'show': isThemeDropdownOpen }"
                  style="position: absolute; left: 0; top: 100%; margin-top: 10px;"
                >
                  <div class="p-2">
                    <button class="dropdown-item d-flex align-items-center justify-content-between" @click="selectTheme('light')">
                      <span class="fs-sm fw-medium">Mode Clair</span>
                      <i class="fa fa-sun opacity-50"></i>
                    </button>
                    <button class="dropdown-item d-flex align-items-center justify-content-between" @click="selectTheme('dark')">
                      <span class="fs-sm fw-medium">Mode Sombre</span>
                      <i class="fa fa-moon opacity-50"></i>
                    </button>
                    <div role="separator" class="dropdown-divider"></div>
                    <button class="dropdown-item d-flex align-items-center justify-content-between" @click="selectTheme('system')">
                      <span class="fs-sm fw-medium">Système</span>
                      <i class="fa fa-display opacity-50"></i>
                    </button>
                  </div>
                </div>
              </div>

              <form class="d-none d-md-inline-block ms-2" @submit.prevent="onSubmitSearch">
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control form-control-alt"
                    placeholder="Rechercher.."
                    v-model="baseSearchTerm"
                  />
                  <span class="input-group-text border-0">
                    <i class="fa fa-fw fa-search"></i>
                  </span>
                </div>
              </form>
            </slot>
          </div>

          <div class="d-flex align-items-center">
            <slot name="content-right">
              <span class="fs-xs fw-semibold d-inline-block py-1 px-3 bg-success-light text-success rounded-md d-none d-sm-inline-block">
                Administration
              </span>

              <div id="page-header-user-dropdown-container" class="dropdown d-inline-block ms-2">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  @click="toggleUserDropdown"
                  :aria-expanded="isUserDropdownOpen"
                >
                  <img src="/assets/media/avatars/avatar10.jpg" alt="avatar" class="rounded-circle" style="width: 24px; height: 24px;">
                  <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>
                </button>

                <div
                  class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  :class="{ 'show': isUserDropdownOpen }"
                  style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 38px);"
                >
                  <div class="p-3 text-center bg-body-light border-bottom rounded-top">
                    <img src="/assets/media/avatars/avatar10.jpg" alt="avatar" class="rounded-circle" style="width: 48px; height: 48px;">
                    <p class="mt-2 mb-0 fw-medium">
                      {{ globalStore?.session?.user?.first_name || 'Utilisateur' }}
                    </p>
                    <p class="mb-0 text-muted fs-sm fw-medium">Administrateur</p>
                  </div>
                  <div class="p-2">
                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                      <span class="fs-sm fw-medium">Profil</span>
                      <i class="fa fa-user-circle opacity-50"></i>
                    </a>
                    <div role="separator" class="dropdown-divider m-0"></div>
                    <RouterLink
                      :to="{}"
                      @click.prevent="handleLogout"
                      class="dropdown-item d-flex align-items-center justify-content-between text-danger"
                    >
                      <span class="fs-sm fw-medium">Déconnexion</span>
                      <i class="fa fa-sign-out-alt opacity-50"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </slot>
          </div>

        </slot>
      </div>

      <div id="page-header-search" class="overlay-header bg-body-extra-light" :class="{ show: store.settings.headerSearch }">
        <div class="content-header">
          <form class="w-100" @submit.prevent="onSubmitSearch">
            <div class="input-group">
              <button type="button" class="btn btn-alt-danger" @click="store.headerSearch({ mode: 'off' })">
                <i class="fa fa-fw fa-times-circle"></i>
              </button>
              <input type="text" class="form-control" placeholder="Rechercher ou ESC.." v-model="baseSearchTerm" />
            </div>
          </form>
        </div>
      </div>

      <div id="page-header-loader" class="overlay-header bg-body-extra-light" :class="{ show: store.settings.headerLoader }">
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
          </div>
        </div>
      </div>
    </slot>
  </header>
</template>