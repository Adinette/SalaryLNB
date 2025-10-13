<script setup lang="ts">
import OperatorSalaryDetailsView from "../../../modules/operator-salary/views/OperatorSalaryDetailsView.vue";

const pageTitle = "Détails du salaire d'un opérateur";
const pageSubtitle =
  "Consulter les détails complets du salaire d'un opérateur.";
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
          <li class="breadcrumb-item" aria-current="page">Salaire d'un opérateur</li>
			<li class="breadcrumb-item" aria-current="page"> 
						<RouterLink to="/operators-salary">
						Liste des salaires de l'opérateur</RouterLink>
					</li>
					          <li class="breadcrumb-item active" aria-current="page">Détails de la fiche de paye </li>
        </ol>
      </nav>
    </template>
  </BasePageHeading>
  <!-- Page Content -->
  <div class="content">
    <OperatorSalaryDetailsView />
  </div>
  <!-- END Page Content -->
</template>