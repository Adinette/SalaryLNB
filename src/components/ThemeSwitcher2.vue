<script setup lang="ts">
	import { computed } from "vue";
	import { DarkModeEnum } from "../enums";
	import { useTemplateStore } from "../stores/template";

	const store = useTemplateStore();

	const currentIcon = computed(() => {
		switch (store.settings.darkMode) {
			case DarkModeEnum.Off:
				return "far fa-sun text-warning";
			case DarkModeEnum.On:
				return "far fa-moon text-primary";
			case DarkModeEnum.System:
				return "fa fa-desktop text-info";
			default:
				return "far fa-sun text-warning";
		}
	});
</script>
<template>
	<div class="dropdown d-inline-block mx-1">
		<button
			type="button"
			class="btn btn-sm btn-alt-secondary"
			id="sidebar-dark-mode-dropdown"
			data-bs-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
		>
			<transition name="icon-rotate" mode="out-in">
				<i :key="store.settings.darkMode" :class="currentIcon" class="fa-fw fs-5"></i>
			</transition>
		</button>

		<div
			class="dropdown-menu dropdown-menu-start smini-hide border-0"
			aria-labelledby="sidebar-dark-mode-dropdown"
		>
			<button
				@click="() => store.darkMode({ mode: 'off' })"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2"
				:class="{ active: store.settings.darkMode === 'off' }"
			>
				<i class="far fa-sun fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Clair</span>
			</button>
			<button
				@click="() => store.darkMode({ mode: 'on' })"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2"
				:class="{ active: store.settings.darkMode === 'on' }"
			>
				<i class="far fa-moon fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Sombre</span>
			</button>
			<button
				@click="() => store.darkMode({ mode: 'system' })"
				type="button"
				class="dropdown-item d-flex align-items-center gap-2"
				:class="{ active: store.settings.darkMode === 'system' }"
			>
				<i class="fa fa-desktop fa-fw opacity-50"></i>
				<span class="fs-sm fw-medium">Système</span>
			</button>
		</div>
	</div>
</template>
<style scoped>
	.icon-rotate-enter-active,
	.icon-rotate-leave-active {
		transition: all 0.5s ease;
	}
	.icon-rotate-enter-from,
	.icon-rotate-leave-to {
		opacity: 0;
		transform: rotate(-180deg) scale(0.7);
	}
	.icon-rotate-enter-to,
	.icon-rotate-leave-from {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}
</style>
