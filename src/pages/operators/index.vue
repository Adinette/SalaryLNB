<script setup lang="ts">
	import { definePage } from "vue-router/auto";
import OperatorListView from "../../modules/operator/views/OperatorListView.vue";

	const pageTitle = "Opérateurs";
	const pageSubtitle = "Gérez les pérateurs de l'entreprise efficacement.";

	definePage({
		meta: {
			layout: "DashboardLayout",
			public: false,
		},
	});
</script>

<template>
	<BasePageHeading :title="pageTitle" :subtitle="pageSubtitle">
		<template #extra>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb breadcrumb-alt">
					<li class="breadcrumb-item" aria-current="page">Opérateurs</li>
					<li class="breadcrumb-item" aria-current="page">Liste des opérateurs</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorListView />
	</div>
	<!-- END Page Content -->
</template>
