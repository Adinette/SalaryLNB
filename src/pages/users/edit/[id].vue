<script setup lang="ts">
	import { definePage } from "vue-router/auto";

	const pageTitle = "Formulaire des utilisateurs";
	const pageSubtitle = "Modifier un utilisateur.";

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
					<li class="breadcrumb-item" aria-current="page">Utilisateurs</li>
					<li class="breadcrumb-item" aria-current="page">Liste des utilisateurs</li>
					<li class="breadcrumb-item active" aria-current="page">Formulaire des utilisateurs</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<UserEditView />
	</div>
	<!-- END Page Content -->
</template>
