<script setup lang="ts">
import OperatorAddView from "../../modules/operator/views/OperatorAddView.vue";

	const pageTitle = "Formulaire des Opérateurs";
	const pageSubtitle = "Ajouter un Opérateurs.";
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
					<li class="breadcrumb-item" aria-current="page">Opérateurs</li>
						<li class="breadcrumb-item" aria-current="page"> 
						<RouterLink to="/operators">
						Liste des Opérateurs</RouterLink>
					</li>
					<li class="breadcrumb-item active" aria-current="page">Formulaire des Opérateurs</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<OperatorAddView />
	</div>
	<!-- END Page Content -->
</template>