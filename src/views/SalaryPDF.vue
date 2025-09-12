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
    <div    class="pdf-document bg-gray-100 min-h-screen print:bg-white print:min-h-0 print:block pt-20" v-if="record">
	 <div class="pdf-page bg-white mx-auto shadow-lg print:shadow-none">
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
    </div>
    <!-- Bouton Print -->
    <div class="mt-8 text-center btn-print">
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
/* .a4 {
  width: 210mm;
  min-height: 297mm;
  margin: auto;
} */
	.pdf-document {
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  padding-top: 5rem;
}

.pdf-page {
  width: 210mm; /* Format A4 */
  min-height: 297mm; /* Hauteur A4 */
  padding: 20mm;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
}

/* Styles pour le document PDF-like */
.pdf-document {
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  padding-top: 5rem;
}

.pdf-page {
  width: 210mm; /* Format A4 */
  min-height: 297mm; /* Hauteur A4 */
  padding: 20mm;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
}

.pdf-header {
  margin-bottom: 30px;
}

.pdf-footer {
  position: absolute;
  bottom: 0mm;
  left: 20mm;
  right: 20mm;
}
.btn-print {
  right: 3rem;
}

/* Styles d'impression */
@media print {
  /* Masquer TOUT sauf le document PDF */
  body * {
    visibility: hidden;
  }

  /* Afficher uniquement le document PDF et ses enfants */
  .pdf-document,
  .pdf-document * {
    visibility: visible;
  }

  /* Positionner le document PDF en haut de la page */
  .pdf-document {
    position: absolute;
    top: 0;
    left: 0;
    width: 210mm;   /* format A4 */
    min-height: 297mm;
    margin: 0;
    padding: 20mm;
    background: white;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  .pdf-page {
    width: 100% !important;
    max-width: none !important;
    min-height: 100vh !important;
    margin: 0 !important;
    padding: 15mm !important;
    box-shadow: none !important;
    border: none !important;
    page-break-after: always;
  }

  .pdf-page:last-child {
    page-break-after: avoid;
  }

  .pdf-footer {
    position: fixed;
    bottom: 10mm;
    left: 15mm;
    right: 15mm;
  }

  /* Masquer les éléments non imprimables */
  .print\\:hidden {
    display: none !important;
  }
	  /* Masquer le bouton print */
  .btn-print {
    display: none !important;
  }

/* Styles responsives pour l'écran */
@media screen and (max-width: 768px) {
  .pdf-page {
    width: 100%;
    margin: 10px;
    padding: 20px;
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

/* Animation pour le loading */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 2s linear infinite;
}
</style>
