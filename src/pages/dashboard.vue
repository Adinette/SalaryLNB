<script setup lang="ts">
	const pageTitle = "Tableau de bord";
	const pageSubtitle = "Tableau de bord";
declare function definePage(arg: any): void;

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
					<li class="breadcrumb-item" aria-current="page">Tableau de bord</li>
				</ol>
			</nav>
		</template>
	</BasePageHeading>
	<!-- Page Content -->
	<div class="content"></div>
	<!-- END Page Content -->
</template>
