<script setup lang="ts">
	import { definePage } from "vue-router/auto";
import OperatorEditView from "../../../modules/operator/views/OperatorEditView.vue";

	const pageTitle = "Formulaire des Opérateurs";
	const pageSubtitle = "Modifier un Opérateurs.";

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
					<li class="breadcrumb-item" aria-current="page">Liste des Opérateurs</li>
					<li class="breadcrumb-item active" aria-current="page">Formulaire des Opérateurs</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorEditView />
	</div>
	<!-- END Page Content -->
</template>
