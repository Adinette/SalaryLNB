<script setup lang="ts">
import OperatorSalaryEditView from "../../../modules/operator-salary/views/OperatorSalaryEditView.vue";

	const pageTitle = "Formulaire de modification du salaire d'un opérateur";
	const pageSubtitle = "Modifier le salaire d'un opérateur.";
</script>

<route lang="yaml">
meta:
  layout: DashboardLayout
  public: false
</route>

<template>
	<BasePageHeading :title="pageTitle" :subtitle="pageSubtitle">
		<template #extra>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb breadcrumb-alt">
					<li class="breadcrumb-item" aria-current="page">Salaires de l'opérateur</li>
					<li class="breadcrumb-item" aria-current="page">Liste des salaires de l'opérateur</li>
					<li class="breadcrumb-item active" aria-current="page">Formulaire de modification du salaire d'un opérateur</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorSalaryEditView />
	</div>
	<!-- END Page Content -->
</template>