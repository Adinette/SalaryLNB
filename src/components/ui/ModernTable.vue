<template>
	<VCard :elevation="elevation">
		<VCardTitle v-if="title" class="d-flex align-center justify-space-between">
			<div class="d-flex align-center">
				<VIcon v-if="titleIcon" :icon="titleIcon" class="me-2" />
				{{ title }}
			</div>
			<div class="d-flex align-center gap-2">
				<slot name="title-actions" />
			</div>
		</VCardTitle>

		<!-- Barre d'actions -->
		<VCardText v-if="$slots.actions || search || selectable" class="pb-0">
			<VRow align="center">
				<VCol v-if="search" cols="12" md="6">
					<VTextField
						:model-value="searchValue"
						@update:model-value="$emit('update:search', $event)"
						:placeholder="searchPlaceholder"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-magnify"
						clearable
						hide-details
					/>
				</VCol>
				<VCol class="d-flex justify-end">
					<div class="d-flex align-center gap-2">
						<div v-if="selectable && selectedCount && selectedCount > 0" class="text-caption me-4">
							{{ selectedCount }} élément(s) sélectionné(s)
						</div>
						<slot name="actions" />
					</div>
				</VCol>
			</VRow>
		</VCardText>

		<!-- Table -->
		<VDataTable
			:headers="computedHeaders"
			:items="items"
			:loading="loading"
			:items-per-page="itemsPerPage"
			:search="searchValue"
			:show-select="selectable"
			:model-value="selectedItems"
			@update:model-value="$emit('update:selected', $event)"
			class="elevation-0"
			:class="tableClass"
		>
			<!-- Slots personnalisés pour les colonnes -->
			<template
				v-for="header in headers.filter((h) => $slots[`item.${h.key}`])"
				:key="header.key"
				#[`item.${header.key}`]="{ item }"
			>
				<slot :name="`item.${header.key}`" :item="item" />
			</template>

			<!-- Slot pour les actions par défaut -->
			<template v-if="!$slots['item.actions']" #item.actions="{ item }">
				<div class="d-flex align-center gap-1">
					<VBtn
						v-if="showViewAction"
						:to="getViewRoute?.(item)"
						icon="mdi-eye"
						variant="text"
						size="small"
						color="primary"
						density="comfortable"
					/>
					<VBtn
						v-if="showEditAction"
						:to="getEditRoute?.(item)"
						icon="mdi-pencil"
						variant="text"
						size="small"
						color="primary"
						density="comfortable"
					/>
					<VBtn
						v-if="showDeleteAction"
						@click="$emit('delete-item', item)"
						icon="mdi-delete"
						variant="text"
						size="small"
						color="error"
						density="comfortable"
					/>
				</div>
			</template>

			<!-- Slot pour les actions en cas de sélection -->
			<template #item.actions="{ item }" v-if="$slots['item.actions']">
				<slot name="item.actions" :item="item" />
			</template>

			<!-- États vides -->
			<template #no-data>
				<div class="text-center pa-8">
					<VIcon :icon="emptyStateIcon" size="64" color="grey-lighten-1" class="mb-4" />
					<div class="text-h6 mb-2">{{ emptyStateTitle }}</div>
					<div class="text-body-2 text-medium-emphasis">{{ emptyStateSubtitle }}</div>
				</div>
			</template>
		</VDataTable>
	</VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

	interface TableHeader {
		key: string;
		title: string;
		sortable?: boolean;
		width?: string;
		align?: "start" | "center" | "end";
	}

	interface Props {
		title?: string;
		titleIcon?: string;
		headers: TableHeader[];
		items: any[];
		loading?: boolean;
		search?: boolean;
		searchValue?: string;
		searchPlaceholder?: string;
		selectable?: boolean;
		selectedItems?: any[];
		selectedCount?: number;
		itemsPerPage?: number;
		elevation?: number;
		tableClass?: string;

		// Actions par défaut
		showViewAction?: boolean;
		showEditAction?: boolean;
		showDeleteAction?: boolean;
		getViewRoute?: (item: any) => any;
		getEditRoute?: (item: any) => any;

		// États vides
		emptyStateIcon?: string;
		emptyStateTitle?: string;
		emptyStateSubtitle?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		searchPlaceholder: "Rechercher...",
		itemsPerPage: 25,
		elevation: 1,
		emptyStateIcon: "mdi-database-outline",
		emptyStateTitle: "Aucune donnée",
		emptyStateSubtitle: "Il n'y a actuellement aucun élément à afficher.",
	});

	defineEmits<{
		"update:search": [value: string];
		"update:selected": [items: any[]];
		"delete-item": [item: any];
	}>();

	const computedHeaders = computed(() => {
		const baseHeaders = [...props.headers];

		// Ajouter la colonne actions si nécessaire
		if (props.showViewAction || props.showEditAction || props.showDeleteAction) {
			const hasActionsColumn = baseHeaders.some((h) => h.key === "actions");
			if (!hasActionsColumn) {
				baseHeaders.push({
					key: "actions",
					title: "Actions",
					sortable: false,
					width: "120px",
					align: "center" as const,
				});
			}
		}

		return baseHeaders;
	});
</script>
