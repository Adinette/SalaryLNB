<template>
  <div>
    <div v-if="operator">
     <div class="flex justify-between items-center mb-4">
			 <h1 class="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">Détails pour {{ operator.prenom }} {{ operator.nom }}</h1>
      <div class="flex align-center justify-end mb-3">
        <button
          type="button"
          @click="goBack"
        class="text-white btn hover:bg-green-800 rounded-full focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      	>
				Retour à la liste
				</button>
			</div>
		 </div>

<div class="grid mb-8 border border-gray-200 rounded-2xl shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
        <!-- Operator Info Card -->
  <div class="w-full max-w-md bg-white border border-gray-200 rounded-l-2xl shadow-md dark:bg-gray-800 dark:border-gray-700">
  <!-- Header -->
  <div class="flex justify-end px-4 pt-4">
    <button type="button"
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 
             focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5">
      <span class="sr-only">Options</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
      </svg>
    </button>
  </div>

  <!-- Body -->
  <div class="flex flex-col items-center pb-8 px-6">
    <!-- Avatar -->
    <div class="w-24 h-24 mb-3 rounded-full shadow-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900">
      <span class="text-2xl font-bold text-blue-700 dark:text-blue-300">
        {{ operator.prenom.charAt(0) }}{{ operator.nom.charAt(0) }}
      </span>
    </div>

    <!-- Nom complet -->
    <h5 class="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
      {{ operator.prenom }} {{ operator.nom }}
    </h5>

    <!-- Infos -->
    <ul class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 w-full">
      <li class="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
        <span class="font-medium">Téléphone</span>
        <span>{{ operator.tel }}</span>
      </li>
      <li class="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
        <span class="font-medium">N° Machine</span>
        <span>{{ operator.machineId }}</span>
      </li>
      <li class="flex justify-between">
        <span class="font-medium">Rôle</span>
        <span>Opérateur</span>
      </li>
    </ul>

    <!-- Actions -->
    <div class="flex mt-6 space-x-2">
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 
               focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
        Modifier
      </button>
      <button
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg 
               hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 
               dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Supprimer
      </button>
    </div>
  </div>
</div>


        <!-- Salary History Card -->
<div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-r-2xl shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-bold leading-none text-gray-900 dark:text-white">
      Historique des 3 Derniers Salaires
    </h3>
  </div>

  <div v-if="operator.salaryHistory.length === 0">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Aucun calcul de salaire enregistré pour cet opérateur.
    </p>
  </div>

  <div v-else class="flow-root">
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
      <li
        v-for="(record, index) in last3Records"
        :key="index"
        class="py-3 sm:py-4"
        :title="`Calcul du ${formatDate(record.calculationDate)}`"
      >
        <div class="flex items-center">
          <!-- Pastille -->
          <div class="shrink-0">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <span class="text-blue-600 dark:text-blue-300 font-bold text-sm">{{ index + 1 }}</span>
            </div>
          </div>

          <!-- Infos -->
          <div class="flex-1 min-w-0 ms-4 text-justify">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              Commission Brute : {{ formatFCFA(record.chiffreAffaireHorsTaxe) }}
            </p>
            <p class="text-xs text-gray-500 truncate dark:text-gray-400">
              Total des Prélèvements : {{ formatFCFA(record.totalPrelevements) }}
            </p>
            <!-- ✅ Date de calcul -->
            <p class="text-xs text-gray-400">
              Calculé le {{ formatDate(record.calculationDate) }}
            </p>
          </div>

          <!-- Salaire net -->
          <div class="inline-flex items-center text-base font-semibold text-green-600 dark:text-green-400">
            {{ formatFCFA(record.salaireBrut) }}
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

// --- SETUP ---
const route = useRoute();
const router = useRouter();
const operatorsStore = useOperatorsStore();

// --- DATA ---
const operatorId = computed(() => parseInt(route.params.id as string, 10));
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
    .sort((a, b) => new Date(b.calculationDate).getTime() - new Date(a.calculationDate).getTime())
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
</script>

<style scoped>
h1 {
  font-weight: 300;
}
</style>
