<template>
  <div>
    <div v-if="operator">
     <div class="lg:flex justify-between items-center mb-4">
			 <h2 class="text-xl mb:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 lg:mb-0 text-center lg:text-start">Détails et Historique pour {{ operator.first_name }} {{ operator.last_name }}</h2>
      <div class="flex align-center justify-end">
        <button
          type="button"
          @click="goBack"
        class="text-white btn hover:bg-green-800 rounded-full focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-base px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      	>
				Retour à la liste
				</button>
			</div>
		 </div>

	<div class="grid grid-cols-1 mb-8 rounded-2xl shadow-xs md:mb-12 md:grid-cols-1 lg:grid-cols-2 bg-white">
			<!-- Body -->
			<div class="flex flex-col items-center p-8 sm:p-6 w-full bg-white border border-gray-200 rounded-t-2xl md:ounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none shadow-md">
				<h3 class="text-2xl font-bold text-gray-900 mb-3">
					Détails pour {{ operator.first_name }} {{ operator.last_name }}</h3>
				<!-- Avatar -->
				<div class="w-24 h-24 mb-3 rounded-full shadow-lg flex items-center justify-center bg-blue-100">
					<span class="text-2xl font-bold text-blue-700">
						{{ operator.first_name.charAt(0) }}{{ operator.last_name.charAt(0) }}
					</span>
				</div>

				<!-- last_name complet -->
				<h5 class="mb-1 text-xl font-bold text-gray-900">
					{{ operator.first_name }} {{ operator.last_name }}
				</h5>

				<!-- Infos -->
				<ul class="mt-4 space-y-2 text-sm text-gray-900 w-full">
					<li class="flex justify-between border-b border-gray-200 pb-1">
						<span class="font-bold text-base">Téléphone</span>
						<span class="text-base">{{ operator.tel }}</span>
					</li>
					<li class="flex justify-between border-b border-gray-200 pb-1">
						<span class="font-bold text-base">N° Machine</span>
						<span class="text-base">{{ operator.machineId }}</span>
					</li>
					<li class="flex justify-between border-b border-gray-200 pb-1">
						<span class="font-bold text-base">Rôle</span>
						<span class="text-base">Opérateur</span>
					</li>
				</ul>

				<!-- Actions -->
				<div class="flex mt-6 space-x-2">
					<button
						class="px-4 py-2 text-base font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800">
						Modifier
					</button>
					<button
						class="px-4 py-2 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-xl 
									hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100">
						Supprimer
					</button>
				</div>
			</div>
			<!-- Salary History Card -->
			<div class="w-full p-8 bg-white border border-gray-200 rounded-b-2xl md:rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none  shadow-sm sm:p-6">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-2xl font-bold text-gray-900 mb-3">
						Historique des 3 Derniers Salaires
					</h3>
				</div>

				<div v-if="operator.salaryHistory.length === 0">
					<p class="text-sm text-gray-900">
						Aucun calcul de salaire enregistré pour cet opérateur.
					</p>
				</div>

				<div v-else class="flow-root">
					<ul role="list" class="divide-y divide-gray-200">
						<li
							v-for="(record, index) in last3Records"
							:key="index"
							class="py-3 sm:py-4"
							:title="`Calcul du ${formatDate(record.date)}`"
						>
							<div class="flex items-center">
								<!-- Pastille -->
								<div class="shrink-0">
									<div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 ">
										<span class="text-blue-600  font-bold text-sm">{{ index + 1 }}</span>
									</div>
								</div>

								<!-- Infos -->
								<div class="flex-1 min-w-0 ms-4 text-justify">
									<h6 class="text-base font-medium text-gray-900 truncate">
										Commission Brute : {{ formatFCFA(record.commissionBrute) }}
									</h6>
									<h6 class="text-base font-medium text-gray-900 truncate">
										Total des Prélèvements : {{ formatFCFA(record.totalPrelevements) }}
									</h6>
									<!-- ✅ Date de calcul -->
									<h6 class="text-base font-medium text-gray-900">
										Calculé le {{ formatDate(record.date) }}
									</h6>
									<h6 class="text-base font-medium text-gray-900">Date de calcul : {{ extractMonthAndYear(record.date).month }} {{ extractMonthAndYear(record.date).year }}</h6>
								</div>

							</div>
							<div class="mt-4 flex items-center justify-between">
								<!-- Salaire net -->
							<div class=" ms-12 inline-flex items-center text-base font-semibold text-green-600 dark:text-green-400">
								<span class="bg-green-600 text-white text-xl font-medium me-2 px-4 py-2 rounded-full">{{ formatFCFA(record.salaireBrut) }}</span>
							</div>
								<!-- Bouton d'exportation -->
								<div class="ml-4 flex items-center justify-end">
									<button
										@click="exportPDF(record)"
										class="px-4 py-2 text-base font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800"
									>
										Exporter PDF
									</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
	</div>
</div>
</div>
</template>

<script setup lang="ts">
import { useOperatorsStore, type Operator } from '../stores/operators';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { extractMonthAndYear } from '../utils/formatDate'

// --- SETUP ---
const route = useRoute();
const router = useRouter();
const operatorsStore = useOperatorsStore();

// --- DATA ---
const operatorId = computed(() => route.params.id as string);
const operator = computed<Operator | undefined>(() =>
  operatorsStore.operators.find(o => o.id === operatorId.value)
);
console.log(operator.value);

// --- UTILITIES ---
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  minimumFractionDigits: 0,
});

function formatFCFA(value: number) {
  return currencyFormatter.format(value).replace('XOF', 'FCFA');
}

// Limiter aux 3 plus récents (optionnel mais cohérent avec le titre)
const last3Records = computed(() =>
  [...(operator.value?.salaryHistory ?? [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
)

// Format court FR : "03 sept. 2025"
function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(iso))
  } catch {
    return '—'
  }
}

// --- ACTIONS ---
function goBack() {
  router.push({ name: 'operateurs' });
}

function exportPDF(record: any) {
  router.push({
    name: 'salaire-pdf',
    params: { 
      id: operatorId.value,
      date: record.date // identifiant unique
    }
  })
}

</script>
