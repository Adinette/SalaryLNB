<template>
	<div class="module-view">
		<!-- En-tête de page -->
		<BasePageHeading v-if="title" :title="title" :subtitle="subtitle">
			<template #actions>
				<slot name="header-actions" />
			</template>
			<template #extra>
				<nav v-if="breadcrumbs.length" aria-label="breadcrumb">
					<ol class="breadcrumb breadcrumb-alt">
						<li
							v-for="(crumb, index) in breadcrumbs"
							:key="index"
							class="breadcrumb-item"
							:class="{ active: index === breadcrumbs.length - 1 }"
							:aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
						>
							<router-link
								v-if="crumb.to && index !== breadcrumbs.length - 1"
								:to="crumb.to"
								class="link-fx"
							>
								{{ crumb.label }}
							</router-link>
							<span v-else>{{ crumb.label }}</span>
						</li>
					</ol>
				</nav>
			</template>
		</BasePageHeading>

		<!-- Contenu principal -->
		<div class="content">
			<VContainer :fluid="fluid">
				<!-- Alertes globales -->
				<VRow v-if="alerts.length">
					<VCol cols="12">
						<VAlert
							v-for="(alert, index) in alerts"
							:key="index"
							:type="alert.type"
							:variant="alert.variant || 'tonal'"
							:closable="alert.closable"
							class="mb-4"
						>
							<VAlertTitle v-if="alert.title">{{ alert.title }}</VAlertTitle>
							<div v-html="alert.message"></div>
						</VAlert>
					</VCol>
				</VRow>

				<!-- Contenu principal -->
				<VRow>
					<VCol cols="12">
						<BaseBlock v-if="useBlock" :class="blockClass" :title="blockTitle">
							<template v-if="blockTitle" #title>
								<div class="d-flex align-center gap-2">
									<VIcon v-if="blockIcon" :icon="blockIcon" />
									<span>{{ blockTitle }}</span>
								</div>
							</template>
							<slot />
						</BaseBlock>
						<div v-else>
							<slot />
						</div>
					</VCol>
				</VRow>

				<!-- Contenu additionnel -->
				<slot name="additional" />
			</VContainer>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Breadcrumb {
		label: string;
		to?: any;
	}

	interface Alert {
		type: "success" | "error" | "warning" | "info";
		title?: string;
		message: string;
		variant?: "flat" | "tonal" | "outlined" | "text";
		closable?: boolean;
	}

	interface Props {
		title?: string;
		subtitle?: string;
		breadcrumbs?: Breadcrumb[];
		alerts?: Alert[];
		fluid?: boolean;
		useBlock?: boolean;
		blockTitle?: string;
		blockIcon?: string;
		blockClass?: string;
	}

	withDefaults(defineProps<Props>(), {
		breadcrumbs: () => [],
		alerts: () => [],
		fluid: true,
		useBlock: false,
	});
</script>

<style scoped>
	.module-view {
		min-height: 100vh;
	}
</style>
