<script setup lang="ts">
	// Declare window.bootstrap for TypeScript
	declare global {
		interface Window {
			bootstrap?: any;
		}
	}

	import { DarkModeEnum } from "../enums";
	import { useTemplateStore } from "../stores/template";
	import { ref, onMounted } from "vue";

	const store = useTemplateStore();
	
	// Animation state
	const isChangingTheme = ref(false);
	const animationClass = ref("");
	const iconAnimationClass = ref("");
	const buttonRef = ref<HTMLElement | null>(null);
	const dropdownMenuRef = ref<HTMLElement | null>(null);

	// const iconButton = computed(() => {
	// 	return store.settings.darkModeActive ? "fa fa-fw fa-moon" : "far fa-fw fa-sun";
	// });

	// Fonction pour fermer le dropdown
	const closeDropdown = () => {
		if (buttonRef.value) {
			// Utiliser l'API Bootstrap pour fermer le dropdown
			// Vérifier si window et bootstrap existent (ils devraient exister dans un environnement navigateur)
			if (typeof window !== "undefined" && window.bootstrap) {
				const dropdownInstance = window.bootstrap.Dropdown.getInstance(buttonRef.value);
				if (dropdownInstance) {
					dropdownInstance.hide();
				}
			}
		}
	};

	// Fonction pour déclencher l'animation lors du changement de thème
	const changeTheme = (mode: "off" | "on" | "system") => {
		isChangingTheme.value = true;

		// Fermer le dropdown
		closeDropdown();

		// Assigner la classe d'animation appropriée en fonction du mode
		if (mode === "on") {
			animationClass.value = "theme-transition-to-dark";
			iconAnimationClass.value = "icon-rotate-dark";
		} else if (mode === "off") {
			animationClass.value = "theme-transition-to-light";
			iconAnimationClass.value = "icon-rotate-light";
		} else {
			animationClass.value = "theme-transition-to-system";
			iconAnimationClass.value = "icon-scale-system";
		}

		// Ajouter un effet de rayonnement autour du bouton
		if (buttonRef.value) {
			buttonRef.value.classList.add("theme-glow");
		}

		// Changer le thème après un court délai pour voir l'animation
		setTimeout(() => {
			store.darkMode({ mode });

			// Réinitialiser l'animation
			setTimeout(() => {
				isChangingTheme.value = false;
				animationClass.value = "";
				iconAnimationClass.value = "";

				if (buttonRef.value) {
					buttonRef.value.classList.remove("theme-glow");
				}
			}, 600);
		}, 300);
	};

	// Ajouter un effet subtil au chargement
	onMounted(() => {
		setTimeout(() => {
			if (buttonRef.value) {
				buttonRef.value.classList.add("theme-loaded");
				setTimeout(() => {
					buttonRef.value?.classList.remove("theme-loaded");
				}, 800);
			}
		}, 200);
	});
</script>
<template>
	<div class="dropdown d-inline-block mx-1">
		<button
			type="button"
			class="btn btn-sm btn-alt-secondary theme-button"
			id="sidebar-dark-mode-dropdown"
			data-bs-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
			:class="[animationClass, { 'active-theme-button': isChangingTheme }]"
			ref="buttonRef"
		>
			<i
				v-if="store.settings.darkMode === DarkModeEnum.Off"
				class="far fa-fw fa-sun"
				:class="iconAnimationClass"
			></i>
			<i
				v-if="store.settings.darkMode === DarkModeEnum.On"
				class="far fa-fw fa-moon"
				:class="iconAnimationClass"
			></i>
			<i
				v-if="store.settings.darkMode === DarkModeEnum.System"
				class="fa fa-fw fa-desktop"
				:class="iconAnimationClass"
			></i>
		</button>
		<div
			class="dropdown-menu dropdown-menu-start smini-hide border-0"
			aria-labelledby="sidebar-dark-mode-dropdown"
			ref="dropdownMenuRef"
		>
			<button
				@click="() => changeTheme('off')"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2 theme-button-item"
				:class="{ active: store.settings.darkMode === 'off' }"
			>
				<i class="far fa-sun fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Clair</span>
			</button>
			<button
				@click="() => changeTheme('on')"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2 theme-button-item"
				:class="{ active: store.settings.darkMode === 'on' }"
			>
				<i class="far fa-moon fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Sombre</span>
			</button>
			<button
				@click="() => changeTheme('system')"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2 theme-button-item"
				:class="{ active: store.settings.darkMode === 'system' }"
			>
				<i class="fa fa-desktop fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Système</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
	.theme-button {
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-button:hover {
		transform: scale(1.05);
		box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
	}

	.theme-button-item {
		transition: all 0.2s ease-in-out;
		position: relative;
		border-radius: 6px;
		margin-bottom: 2px;
	}

	.theme-button-item:hover {
		transform: translateX(3px);
		background-color: rgba(var(--v-theme-primary), 0.1);
	}

	.theme-button-item.active {
		background-color: rgba(var(--v-theme-primary), 0.15);
		font-weight: bold;
	}

	.theme-transition-to-dark {
		animation: pulse-dark 0.7s ease-in-out;
	}

	.theme-transition-to-light {
		animation: pulse-light 0.7s ease-in-out;
	}

	.theme-transition-to-system {
		animation: pulse-system 0.7s ease-in-out;
	}

	.active-theme-button {
		box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
	}

	.theme-glow {
		box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
	}

	.theme-loaded {
		animation: loading-pulse 0.8s ease-in-out;
	}

	/* Animations pour les icônes */
	.icon-rotate-dark {
		animation: rotate-fade 0.6s ease-in-out;
	}

	.icon-rotate-light {
		animation: rotate-fade-reverse 0.6s ease-in-out;
	}

	.icon-scale-system {
		animation: scale-bounce 0.6s ease-in-out;
	}

	@keyframes pulse-dark {
		0% {
			transform: scale(1);
			background: transparent;
		}
		50% {
			transform: scale(1.15);
			background: rgba(0, 0, 0, 0.25);
		}
		75% {
			transform: scale(1.05);
			background: rgba(0, 0, 0, 0.15);
		}
		100% {
			transform: scale(1);
			background: transparent;
		}
	}

	@keyframes pulse-light {
		0% {
			transform: scale(1);
			background: transparent;
		}
		50% {
			transform: scale(1.15);
			background: rgba(255, 220, 100, 0.35);
		}
		75% {
			transform: scale(1.05);
			background: rgba(255, 220, 100, 0.25);
		}
		100% {
			transform: scale(1);
			background: transparent;
		}
	}

	@keyframes pulse-system {
		0% {
			transform: scale(1);
			background: transparent;
		}
		50% {
			transform: scale(1.15);
			background: rgba(100, 150, 255, 0.3);
		}
		75% {
			transform: scale(1.05);
			background: rgba(100, 150, 255, 0.2);
		}
		100% {
			transform: scale(1);
			background: transparent;
		}
	}

	@keyframes loading-pulse {
		0% {
			transform: scale(0.9);
			opacity: 0.7;
		}
		50% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes rotate-fade {
		0% {
			transform: rotate(0deg);
			opacity: 1;
		}
		50% {
			transform: rotate(180deg);
			opacity: 0.5;
		}
		100% {
			transform: rotate(360deg);
			opacity: 1;
		}
	}

	@keyframes rotate-fade-reverse {
		0% {
			transform: rotate(0deg);
			opacity: 1;
		}
		50% {
			transform: rotate(-180deg);
			opacity: 0.5;
		}
		100% {
			transform: rotate(-360deg);
			opacity: 1;
		}
	}

	@keyframes scale-bounce {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(0.6);
		}
		60% {
			transform: scale(1.2);
		}
		80% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}

	/* Effet de ripple au clic sur les boutons */
	.theme-button-item {
		position: relative;
		overflow: hidden;
	}

	.theme-button-item::after {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		background-image: radial-gradient(circle, rgba(0, 123, 255, 0.2) 10%, transparent 10.01%);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: scale(10, 10);
		opacity: 0;
		transition:
			transform 0.3s,
			opacity 0.5s;
	}

	.theme-button-item:active::after {
		transform: scale(0, 0);
		opacity: 0.3;
		transition: 0s;
	}

	/* Animation de l'icône principale */
	.theme-button i {
		transition: all 0.3s ease;
		display: block;
		font-size: 1.15rem;
	}

	.theme-button:hover i {
		transform: rotate(20deg) scale(1.2);
		opacity: 0.9;
	}

	/* Effet subtil sur les items du menu */
	.dropdown-menu {
		transition: all 0.3s ease;
		transform-origin: top center;
		animation: dropdown-appear 0.2s ease;
	}

	@keyframes dropdown-appear {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
