<script setup lang="ts">
import MachineEditView from "../../../modules/machine/views/MachineEditView.vue";

	const pageTitle = "Formulaire des machines";
	const pageSubtitle = "Modifier une machine.";
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
	<li class="breadcrumb-item" aria-current="page"> 
						<RouterLink to="/machines">
						Liste des machines</RouterLink>
					</li>					<li class="breadcrumb-item active" aria-current="page">Formulaire de modification des machines</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<MachineEditView />
	</div>
	<!-- END Page Content -->
</template>