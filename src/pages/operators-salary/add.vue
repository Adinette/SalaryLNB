<script setup lang="ts">
	import { definePage } from "vue-router/auto";
import OperatorSalaryAddView from "../../modules/operator-salary/views/OperatorSalaryAddView.vue";

	const pageTitle = "Formulaire de calcul de l'Opérateur";
	const pageSubtitle = "Calculer le salaire d'un Opérateur.";

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
					<li class="breadcrumb-item active" aria-current="page">Formulaire de calcul de salaire d'un opérateur</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorSalaryAddView />
	</div>
	<!-- END Page Content -->
</template>
