<script setup lang="ts">
	import { definePage } from "vue-router/auto";
import OperatorSalaryListView from "../../modules/operator-salary/views/OperatorSalaryListView.vue";

	const pageTitle = "Salaire de l'opérateur";
	const pageSubtitle = "Gérez les salaires des opérateurs de l'entreprise efficacement.";

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
					<li class="breadcrumb-item" aria-current="page">Salaire d'un opérateur</li>
					<li class="breadcrumb-item" aria-current="page">Liste des salaires de l'opérateur</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorSalaryListView />
	</div>
	<!-- END Page Content -->
</template>
