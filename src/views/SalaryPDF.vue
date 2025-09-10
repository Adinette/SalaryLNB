<template>
  <div>
    <!-- Retour -->
    <div class="flex justify-end items-center mb-4" v-if="record">
      <button
        type="button"
        @click="goBack"
        class="text-white bg-green-600 hover:bg-green-700 rounded-full px-5 py-2.5 text-sm font-medium shadow-md"
      >
        Retour à la liste
      </button>
    </div>

    <!-- Fiche de Paie -->
    <div class="a4 p-10 bg-white text-black border shadow-lg" v-if="record">
      <!-- Header Entreprise -->
			<h4 class="text-3xl text-green-600 font-bold text-center mb-8">Bulletin de salaire</h4>
      <div class="flex justify-between items-center border-b pb-4 mb-6">
          <h2 class="text-2xl font-extrabold text-green-700">TEA Services</h2>
        <div class="text-right text-base text-gray-900">
          <p>Date d’émission : {{ formatDate(new Date().toISOString()) }}</p>
        </div>
      </div>

      <!-- Infos Employé -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Informations de l’opérateur</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <p><span class="font-semibold">Nom :</span> {{ record.operatorName }}</p>
          <p><span class="font-semibold">Mois :</span> {{ extractMonthAndYear(record.date).month }} {{ extractMonthAndYear(record.date).year }}</p>
        </div>
      </div>

      <!-- Tableau de rémunération -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Détails du calcul</h2>
        <table class="w-full border-collapse text-sm">
          <tbody>
            <tr class="border-b">
              <td class="pb-4 font-medium">Chiffre d’affaire TTC</td>
              <td class="pb-4 text-right">{{ formatFCFA(record.chiffreAffaireMensuelttc) }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4 font-medium">Chiffre d’affaire HT</td>
              <td class="py-4 text-right">{{ formatFCFA(record.chiffreAffaireHorsTaxe) }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4 font-medium">Commission brute ({{ record.percentCommissionBrute }}%)</td>
              <td class="py-4 text-right">{{ formatFCFA(record.commissionBrute) }}</td>
            </tr>
            <tr v-if="record.aib" class="border-b">
              <td class="py-4 font-medium">AIB</td>
              <td class="py-4 text-right">{{ formatFCFA(record.aib) }}</td>
            </tr>
            <tr v-if="record.dette" class="border-b">
              <td class="py-4 font-medium">Dette</td>
              <td class="py-4 text-right">{{ formatFCFA(record.dette) }}</td>
            </tr>
            <tr v-if="record.penalite" class="border-b">
              <td class="py-4 font-medium">Pénalité</td>
              <td class="py-4 text-right">{{ formatFCFA(record.penalite) }}</td>
            </tr>
            <tr v-if="record.remboursement" class="border-b">
              <td class="py-4 font-medium">Remboursement</td>
              <td class="py-4 text-right">{{ formatFCFA(record.remboursement) }}</td>
            </tr>
            <tr v-if="record.ecart" class="border-b">
              <td class="py-4 font-medium">Écart</td>
              <td class="py-4 text-right">{{ formatFCFA(record.ecart) }}</td>
            </tr>
            <tr v-if="record.calculatedFraisMomo" class="border-b">
              <td class="py-4 font-medium">Frais MoMo</td>
              <td class="py-4 text-right">{{ formatFCFA(record.calculatedFraisMomo) }}</td>
            </tr>
            <tr class="border-t-2 border-gray-700 font-semibold">
              <td class="py-4">Total des prélèvements</td>
              <td class="py-4 text-right">{{ formatFCFA(record.totalPrelevements) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Salaire Net -->
      <div class="mt-8 text-right">
        <h2 class="text-2xl font-extrabold text-green-600">
          Salaire Brut : {{ formatFCFA(record.salaireBrut) }}
        </h2>
      </div>

    </div>

    <!-- Bouton Print -->
    <div class="mt-8 text-center">
      <button
        @click="handlePrint"
        class="px-6 py-2 text-white bg-green-600 rounded shadow hover:bg-green-700"
      >
        Imprimer / Exporter PDF
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useOperatorsStore } from '../stores/operators';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { extractMonthAndYear } from '../utils/formatDate'


const route = useRoute();
const router = useRouter();
const operatorsStore = useOperatorsStore();

const operatorId = route.params.id as string;
const date = route.params.date as string;

const operator = operatorsStore.operators.find(o => o.id === operatorId);
const record = computed(() =>
  operator?.salaryHistory.find(r => r.date === date)
);

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  minimumFractionDigits: 0,
});
function formatFCFA(value: number) {
  return currencyFormatter.format(value).replace('XOF', 'FCFA');
}
function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(iso))
}

function handlePrint() {
  window.print();
}

function goBack() {
  router.push({ name: 'operateur-details' });
}
</script>

<style>
.a4 {
  width: 210mm;
  min-height: 297mm;
  margin: auto;
}
@media print {
  body { background: white; }
  .a4 { box-shadow: none; }
}
</style>
