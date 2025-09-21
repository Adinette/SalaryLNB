<script setup lang="ts">
	import { applicationsMock } from "@/data/applications";

	const search = ref("");
	const filteredApplications = ref<ApplicationModel[]>([]);

	const applicationsFromStore = applicationsMock.map((app) => {
		return new ApplicationModel(app);
	});

	const applications = computed(() => {
		return search.value.length > 3 ? filteredApplications.value : applicationsFromStore;
	});

	const searchApplications = () => {
		if (!search.value) {
			filteredApplications.value = applicationsFromStore;
			return;
		}
		const searchLower = search.value.toLowerCase();
		filteredApplications.value = applicationsFromStore.filter((app) =>
			app.name.toLowerCase().includes(searchLower)
		);
	};
</script>
<template>
	<!-- Search Form -->
	<div class="bg-body-extra-light">
		<div class="content content-full">
			<div class="row justify-content-center">
				<div class="col-md-8">
					<VTextField
						placeholder="Rechercher..."
						variant="outlined"
						density="compact"
						append-inner-icon="ri-search-line"
						persistent-placeholder
						hint="Rechercher une application"
						persistent-hint
						v-model="search"
						@keyup.esc="search = ''"
						@keyup.enter="searchApplications"
						@click:append-inner="searchApplications"
						@click:clear="searchApplications"
						clearable
					/>
				</div>
			</div>
		</div>
	</div>
	<!-- END Search Form -->

	<!-- Categories-->
	<div class="content content-boxed">
		<div class="row">
			<div v-if="applications.length === 0" class="col-12 text-center">
				<div class="alert alert-primary d-flex align-items-center" role="alert">
					<div class="flex-shrink-0">
						<i class="ri-error-warning-fill"></i>
					</div>
					<div class="flex-grow-1 ms-3">
						<p class="mb-0">Aucune application trouvée. Veuillez essayer une autre recherche.</p>
					</div>
				</div>
			</div>
			<div v-for="app in applications" class="col-sm-6 col-md-3" :key="app.id">
				<BaseBlock tag="a" :href="app.url" target="_blank" bordered link-shadow>
					<template #content>
						<div class="block-content block-content-full border-bottom text-center">
							<div class="py-3">
								<i
									:class="`${app.icon} ri-3x text-[${app.color}]`"
									:style="{
										color: app.color || 'inherit',
										fontSize: '3rem',
									}"
								></i>
							</div>
							<div class="text-muted mb-2">{{ app.description }}</div>
						</div>
						<div
							class="block-content block-content-full d-flex align-items-center justify-content-between"
						>
							<span class="uppercase text-sm font-bold">{{ app.name }}</span>
							<span
								class="badge"
								:style="{
									backgroundColor: app.color || 'inherit',
								}"
								>{{ app.notifications }}</span
							>
						</div>
					</template>
				</BaseBlock>
			</div>
		</div>
	</div>
	<!-- END Categories -->
</template>
