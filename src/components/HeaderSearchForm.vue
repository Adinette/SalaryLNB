<script setup lang="ts">
import { useTemplateStore } from "../stores/template";

	const props = defineProps<{
		onSubmitSearch: (query: string) => void;
	}>();

	const store = useTemplateStore();

	const onSubmit = () => {
		const searchInput = document.querySelector("#page-header-search-input2") as HTMLInputElement;
		if (searchInput) {
			const searchValue = searchInput.value;
			if (searchValue) {
				// Perform search action here
				console.log("Searching for:", searchValue);
				props.onSubmitSearch(searchValue);
				store.headerSearch({ mode: 'off' }); // Close the search after submitting
			}
		}
	};

</script>

<template>
	<!-- Open Search Section (visible on smaller screens) -->
	<button
		type="button"
		class="btn btn-sm btn-alt-secondary d-md-none"
		@click="store.headerSearch({ mode: 'on' })"
	>
		<i class="fa fa-fw fa-search"></i>
	</button>
	<!-- END Open Search Section -->

	<!-- Search Form (visible on larger screens) -->
	<form class="d-none d-md-inline-block" @submit.prevent="onSubmit">
		<div class="input-group input-group-sm">
			<input
				type="text"
				class="form-control form-control-alt"
				placeholder="Search.."
				id="page-header-search-input2"
				name="page-header-search-input2"
			/>
			<span class="input-group-text border-0">
				<i class="fa fa-fw fa-search"></i>
			</span>
		</div>
	</form>
	<!-- END Search Form -->
</template>
