<script setup lang="ts">
import MachineListView from "../../modules/machine/views/MachineListView.vue";

	const pageTitle = "Machines";
	const pageSubtitle = "Gérez les machines de l'entreprise efficacement.";
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
					<li class="breadcrumb-item" aria-current="page">Machines</li>
					<li class="breadcrumb-item" aria-current="page">Liste des machines</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<MachineListView />
	</div>
	<!-- END Page Content -->
</template>