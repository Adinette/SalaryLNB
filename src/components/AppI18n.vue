<script setup lang="ts">
	import { AppLocalesEnum } from "@/locales";
	import { GlobalStore, useInitializedGlobalStore } from "@/stores";

	const globalStore = ref<GlobalStore | null>(null);

	const locale = computed({
		get: () => globalStore.value?.locale,
		set: (value: AppLocalesEnum) => {
			globalStore.value?.setLocale(value);
		},
	});

	const resolveLocaleLabel = (lang: AppLocalesEnum) => {
		switch (lang) {
			case AppLocalesEnum.fr:
				return "Français";
			default:
				return lang;
		}
	};

	const locales = computed(() => {
		return Object.values(AppLocalesEnum).map((lang) => ({
			code: lang,
			label: resolveLocaleLabel(lang),
		}));
	});

	onMounted(async () => {
		globalStore.value = await useInitializedGlobalStore();
	});
</script>

<template>
	<VBtn v-if="globalStore && locale" variant="tonal" class="flex text-xs" size="x-small">
		<template #prepend>
			<VIcon icon="ri-translate-2" />
		</template>
		<div class="font-bold">{{ resolveLocaleLabel(locale) }}</div>

		<!-- Menu -->
		<VMenu activator="parent" :location="'bottom end'" offset="15px" width="160">
			<!-- List -->
			<VList :selected="[locale]" color="primary" density="compact" mandatory>
				<!-- List item -->
				<VListItem
					v-for="lang in locales"
					:key="lang.code"
					class="px-4"
					:value="lang.code"
					@click="locale = lang.code"
					density="compact"
				>
					<!-- Language label -->
					<VListItemTitle class="text-xs">
						{{ lang.code }} -
						{{ lang.label }}
					</VListItemTitle>
				</VListItem>
			</VList>
		</VMenu>
	</VBtn>
</template>
