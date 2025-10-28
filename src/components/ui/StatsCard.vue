<template>
	<VCard :elevation="elevation" :variant="variant" :color="color">
		<VCardText class="text-center pa-6">
			<VIcon :size="iconSize" :color="iconColor || color" class="mb-3">
				{{ icon }}
			</VIcon>
			<div class="text-h3 font-weight-bold mb-2" :class="valueClass">
				{{ value }}
			</div>
			<div class="text-subtitle-1 text-medium-emphasis mb-1">
				{{ title }}
			</div>
			<div v-if="subtitle" class="text-caption text-medium-emphasis">
				{{ subtitle }}
			</div>
			<slot name="extra" />
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		value: string | number;
		subtitle?: string;
		icon: string;
		iconSize?: string | number;
		iconColor?: string;
		color?: string;
		valueClass?: string;
		variant?: "flat" | "tonal" | "outlined" | "text" | "elevated" | "plain";
		elevation?: string | number;
	}

	withDefaults(defineProps<Props>(), {
		iconSize: 48,
		variant: "elevated",
		elevation: 2,
	});
</script>
