<script setup lang="ts">
import OperatorSalaryListView from "../../modules/operator-salary/views/OperatorSalaryListView.vue";

	const pageTitle = "Listes des salaires";
	const pageSubtitle = "Gérez la listes des  salaires.";
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
										<li class="breadcrumb-item" aria-current="page">Salaires des opérateurs</li>
					<li class="breadcrumb-item" aria-current="page">Listes des salaires</li>
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