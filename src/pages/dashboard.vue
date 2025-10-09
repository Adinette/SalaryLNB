<route lang="yaml">
name: dashboard
meta:
  layout: DashboardLayout
  public: false
</route>

<script setup lang="ts">
	const pageTitle = "Tableau de bord";
	const pageSubtitle = "Tableau de bord";
</script>

<template>
	<BasePageHeading :title="pageTitle" :subtitle="pageSubtitle">
		<template #extra>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb breadcrumb-alt">
					<li class="breadcrumb-item" aria-current="page">Tableau de bord</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content"></div>
	<!-- END Page Content -->
</template>