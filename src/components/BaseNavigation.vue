<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useTemplateStore } from "../stores/template";
import type { RouteNamedMap } from "vue-router/auto";

	// Define the navigation node type
	interface NavigationNode {
		heading?: boolean;
		name?: string;
		to?: keyof RouteNamedMap | string; // Allow both route names and paths
		icon?: string;
		badge?: string | number;
		"badge-variant"?: string;
		target?: string;
		sub?: NavigationNode[];
		subActivePaths?: string[] | string;
	}

	// Main store and Route
	const store = useTemplateStore();
	const route = useRoute();

	// Component properties
	const props = defineProps<{
		nodes: NavigationNode[];
		subMenu?: boolean;
		dark?: boolean;
		horizontal?: boolean;
		horizontalHover?: boolean;
		horizontalCenter?: boolean;
		horizontalJustify?: boolean;
		disableClick?: boolean;
	}>();

	// Set CSS classes accordingly
	const classContainer = computed(() => {
		return {
			"nav-main": !props.subMenu,
			"nav-main-submenu": props.subMenu,
			"nav-main-dark": props.dark,
			"nav-main-horizontal": props.horizontal,
			"nav-main-hover": props.horizontalHover,
			"nav-main-horizontal-center": props.horizontalCenter,
			"nav-main-horizontal-justify": props.horizontalJustify,
		};
	});

	// Checks if a submenu path is part of the URL path or matches route name
	function subIsActive(paths: string[] | string): boolean {
		const activePaths = Array.isArray(paths) ? paths : [paths];

		return activePaths.some((path) => {
			// Si le path ressemble à un nom de route (sans '/'), comparer avec route.name
			if (!path.startsWith("/")) {
				return route.name === path;
			}
			// Sinon, utiliser la logique path traditionnelle
			return route.path.indexOf(path) === 0;
		});
	}

	// Check if a navigation node is active based on route name or path
	function isNodeActive(node: NavigationNode): boolean {
		if (!node.to) return false;

		// Si node.to ressemble à un nom de route (sans '/'), comparer avec route.name
		if (!node.to.startsWith("/")) {
			return route.name === node.to;
		}
		// Sinon, utiliser la logique path traditionnelle
		return route.path === node.to;
	}

	// Main menu toggling and mobile functionality
	function linkClicked(e: MouseEvent, submenu?: boolean): void {
		if (submenu) {
			// Get closest li element
			let el = (e.target as HTMLElement).closest("li");

			// Check if we are in a large screen, have horizontal navigation and hover is enabled
			if (
				!(
					window.innerWidth > 991 &&
					((props.horizontal && props.horizontalHover) || props.disableClick)
				)
			) {
				if (el && el.classList.contains("open")) {
					// If submenu is open, close it..
					el.classList.remove("open");
				} else if (el) {
					// .. else if submenu is closed, close all other (same level) submenus first before open it
					Array.from(el.closest("ul")!.children).forEach((element) => {
						(element as HTMLElement).classList.remove("open");
					});

					el.classList.add("open");
				}
			}
		} else {
			// If we are in mobile, close the sidebar
			if (window.innerWidth < 992) {
				store.sidebar({ mode: "close" });
			}
		}
	}
</script>

<template>
	<ul :class="classContainer">
		<li
			v-for="(node, index) in nodes"
			:key="`node-${index}`"
			:class="{
				'nav-main-heading': node.heading,
				'nav-main-item': !node.heading,
				open: node.sub && node.subActivePaths ? subIsActive(node.subActivePaths) : false,
			}"
		>
			<!-- Heading -->
			{{ node.heading ? node.name : "" }}
			<!-- Normal Link -->
			<div v-if="!node.heading && !node.sub" @click="linkClicked($event)">
				<RouterLink
					v-if="node.to && !node.to.startsWith('http://') && !node.to.startsWith('https://')"
					:to="{
						name: node.to as keyof RouteNamedMap,
					}"
					class="nav-main-link"
					:class="{ active: isNodeActive(node) }"
				>
					<i v-if="node.icon" :class="`nav-main-link-icon ${node.icon}`"></i>
					<span v-if="node.name" class="nav-main-link-name">
						{{ node.name }}
					</span>
					<span
						v-if="node.badge"
						class="nav-main-link-badge badge rounded-pill"
						:class="node['badge-variant'] ? `bg-${node['badge-variant']}` : 'bg-primary'"
						>{{ node.badge }}</span
					>
				</RouterLink>
				<a v-else :href="node.to" class="nav-main-link" :target="node.target">
					<i v-if="node.icon" :class="`nav-main-link-icon ${node.icon}`"></i>
					<span v-if="node.name" class="nav-main-link-name">
						{{ node.name }}
					</span>
					<span
						v-if="node.badge"
						class="nav-main-link-badge badge rounded-pill"
						:class="node['badge-variant'] ? `bg-${node['badge-variant']}` : 'bg-primary'"
						>{{ node.badge }}</span
					>
				</a>
			</div>
			<!-- END Normal Link -->

			<!-- Submenu Link -->
			<a
				v-else-if="!node.heading && node.sub"
				href="#"
				class="nav-main-link nav-main-link-submenu"
				@click.prevent="linkClicked($event, true)"
			>
				<i v-if="node.icon" :class="`nav-main-link-icon ${node.icon}`"></i>
				<span v-if="node.name" class="nav-main-link-name">{{ node.name }}</span>
				<span
					v-if="node.badge"
					class="nav-main-link-badge badge rounded-pill"
					:class="node['badge-variant'] ? `bg-${node['badge-variant']}` : 'bg-primary'"
					>{{ node.badge }}</span
				>
			</a>
			<!-- END Submenu Link -->

			<BaseNavigation
				v-if="node.sub"
				:nodes="node.sub"
				sub-menu
				:disable-click="props.horizontal && props.horizontalHover"
			/>
		</li>
	</ul>
</template>
