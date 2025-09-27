<script setup lang="ts">
	import {  onMounted } from "vue";
	import { useTemplateStore } from "../stores/template";
	import config from "../config";

	// Import all layout partials
	import { DarkModeEnum } from "../enums";

	// Component properties
	defineProps({
		sidebarWithMiniNav: {
			type: Boolean,
			default: false,
			description: "If the sidebar is in Mini Nav Mode",
		},
	});

	// Main store
	const store = useTemplateStore();

	// Set example settings
	store.mainContent({ mode: "boxed" });

	// Set dark mode based on localStorage or on store settings (if not saved before)
	const savedDarkMode = localStorage.getItem("oneuiVueDarkMode") as DarkModeEnum;

	if (["on", "off", "system"].includes(savedDarkMode || "")) {
		store.darkMode({ mode: savedDarkMode });
	} else {
		store.darkMode({ mode: store.settings.darkMode as DarkModeEnum });
	}

	// Set color theme based on localStorage or on store settings (if not saved before)
	const savedTheme = localStorage.getItem("oneuiVueColorTheme");

	if (savedTheme) {
		store.setColorTheme({ theme: savedTheme });
	} else {
		store.setColorTheme({ theme: store.settings.colorTheme });
	}

	// When the component is mounted
	onMounted(() => {
		// Add event listener for dark mode system
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			if (store.settings.darkMode === "system") {
				store.darkMode({ mode: "system" });
			}
		});

		// Remove side transitions on window resizing
		let winResize: number | undefined;

		window.addEventListener("resize", () => {
			clearTimeout(winResize);

			store.setSideTransitions({ transitions: false });

			winResize = window.setTimeout(() => {
				store.setSideTransitions({ transitions: true });
			}, 500);
		});

		// Set meta title and description
		document.title = config.env.apiUrl;
		document
			.querySelector("meta[name='description']")
			?.setAttribute("content", config.env.apiUrl || "");
	});
</script>

<template>
	<div id="page-container h-screen bg-body-light">
		<div id="main-container relative bg-body-light">
			<div class="flex justify-end mr-2 mt-2 absolute top-0 right-0 z-50">
				<AppI18n />
			</div>
			<RouterView />
			<div
				class="fixed bottom-0 left-0 z-50 px-3 py-1 rounded-r-md text-xs shadow text-white uppercase font-bold font-mono mb-5 bg-primary"
			>
				V {{ config.env.apiUrl }}
			</div>
		</div>
	</div>
</template>
