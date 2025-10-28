<script setup lang="ts">
	// Pas de logique spécifique pour ce loader
</script>
<template>
	<div class="app-loader-container">
		<div class="app-loader-spinner">
			<span class="visually-hidden">Chargement...</span>
		</div>
	</div>
</template>

<style scoped>
	.app-loader-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
		width: 100%;
	}
	.app-loader-spinner {
		width: 48px;
		height: 48px;
		border: 5px solid #e0e0e0;
		border-top: 5px solid var(--v-theme-primary, #1976d2);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
