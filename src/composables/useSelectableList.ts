// src/composables/useSelectableList.ts
import { ref, computed } from "vue";

export function useSelectableList<T extends { id: string }>(items: () => T[]) {
	const selected = ref<T[]>([]) as import("vue").Ref<T[]>;

	const selectedCount = computed(() => selected.value.length);
	const allSelected = computed(
		() => items().length > 0 && selected.value.length === items().length
	);
	const someSelected = computed(() => selected.value.length > 0 && !allSelected.value);

	function isSelected(item: T) {
		return selected.value.some((i) => i.id === item.id);
	}

	function toggleSelect(item: T) {
		if (isSelected(item)) {
			selected.value = selected.value.filter((i) => i.id !== item.id);
		} else {
			selected.value.push(item);
		}
	}

	function toggleSelectAll() {
		if (allSelected.value) {
			selected.value = [];
		} else {
			selected.value = [...items()];
		}
	}

	function clearSelection() {
		selected.value = [];
	}

	return {
		selected,
		selectedCount,
		allSelected,
		someSelected,
		isSelected,
		toggleSelect,
		toggleSelectAll,
		clearSelection,
	};
}
