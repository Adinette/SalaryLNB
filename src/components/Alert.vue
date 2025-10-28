<script setup lang="ts">
	import { computed } from "vue";
import type { AppAlertInterface } from "../interfaces/AppAlertInterface";
	// Props du composant
	const props = defineProps<AppAlertInterface>();

	// Classe dynamique pour l'alerte
	const alertClass = computed(() => `alert alert-${props.type} alert-dismissible`);
</script>

<template>
	<div :class="alertClass" role="alert">
		<h3 class="alert-heading h4 my-2">{{ props.title }}</h3>
		<p class="mb-0" v-html="props.message" />
		<button
			v-if="props.closable"
			type="button"
			class="btn-close"
			aria-label="Close"
			@click="props.onClose ? props.onClose(props.id) : null"
		></button>
	</div>
</template>
