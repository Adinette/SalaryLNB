<script setup lang="ts">
	const pageTitle = "Formulaire des utilisateurs";
	const pageSubtitle = "Ajouter un utilisateur.";
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
					<li class="breadcrumb-item" aria-current="page">Utilisateurs</li>
					<li class="breadcrumb-item" aria-current="page"> 
						<RouterLink to="/users">
						Liste des utilisateurs</RouterLink>
					</li>
					<li class="breadcrumb-item active" aria-current="page">Formulaire des utilisateurs</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content">
		<UserAddView />
	</div>
	<!-- END Page Content -->
</template>