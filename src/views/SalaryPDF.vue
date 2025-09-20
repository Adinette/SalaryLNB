<template>
     <div class="items-center mb-4">
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
    <div class="pdf-document bg-gray-100 min-h-screen print:bg-white print:min-h-0 print:block " v-if="record">
	 <div class="pdf-page bg-white mx-auto shadow-lg print:shadow-none">
      <!-- Header Entreprise -->
			<h4 class="text-3xl text-green-700 font-bold text-center mb-8">Bulletin de salaire</h4>
		<div class=" border-b pb-4 mb-6">
				<div class="flex justify-between mb-2">
					<div>
						<h2 class="text-2xl font-extrabold text-green-700 font-[Quicksand, sans-serif]">TEA</h2>
						<p class="text-xs font-extrabold text-green-700 font-[Quicksand, sans-serif]">Services</p>
					</div>
					<div class="text-right text-xl font-bold text-gray-950">
						<p>Date d’émission : {{ formatDate(new Date().toISOString()) }}</p>
						<p><span class="text-lg font-bold">Salaire du mois :</span> <span class="text-base font-bold">{{ extractMonthAndYear(record.date).month }} {{ extractMonthAndYear(record.date).year }}</span> </p>

					</div>
				</div>
				<div>
					<h2 class="text-lg font-bold text-gray-950">IFU : <span class="text-base font-medium text-gray-950">0202112432071</span></h2>
					<h2 class="text-lg font-bold text-gray-950">RCCM : <span class="text-base font-medium text-gray-950">COTONOU N° RB/ABC/24 A 116906</span></h2>
				</div>
		</div>

      <!-- Infos Employé -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-green-700 mb-2 text-center">Informations de l’opérateur</h2>
        <div class="">
          <p><span class="text-lg font-bold">Nom :</span> <span class="text-base font-medium">{{ record.operatorName }}</span></p>
					<p><span class="text-lg font-bold">Téléphone :</span> <span class="text-base font-medium">{{ operator?.tel }}</span> </p>
        </div>
      </div>

      <!-- Tableau de rémunération -->
      <div>
        <h2 class="text-2xl font-bold text-green-700 mb-3 text-center">Détails du calcul</h2>
        <table class="w-full border-collapse text-lg text-gray-900 font-bold">
          <tbody>
            <tr class="border-b">
              <td class="pb-4 font-bold">Chiffre d’affaire TTC</td>
              <td class="pb-4 text-right">{{ formatFCFA(record.chiffreAffaireMensuelttc) }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4 font-bold">Chiffre d’affaire HT</td>
              <td class="py-4 text-right">{{ formatFCFA(record.chiffreAffaireHorsTaxe) }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4 font-bold">Commission brute ({{ record.percentCommissionBrute }}%)</td>
              <td class="py-4 text-right">{{ formatFCFA(record.commissionBrute) }}</td>
            </tr>
            <tr v-if="record.aib" class="border-b">
              <td class="py-4 font-bold">AIB</td>
              <td class="py-4 text-right">{{ formatFCFA(record.aib) }}</td>
            </tr>
            <tr v-if="record.dette" class="border-b">
              <td class="py-4 font-bold">Dette</td>
              <td class="py-4 text-right">{{ formatFCFA(record.dette) }}</td>
            </tr>
            <tr v-if="record.penalite" class="border-b">
              <td class="py-4 font-bold">Pénalité</td>
              <td class="py-4 text-right">{{ formatFCFA(record.penalite) }}</td>
            </tr>
            <tr v-if="record.remboursement" class="border-b">
              <td class="py-4 font-bold">Remboursement</td>
              <td class="py-4 text-right">{{ formatFCFA(record.remboursement) }}</td>
            </tr>
            <tr v-if="record.ecart" class="border-b">
              <td class="py-4 font-bold">Écart</td>
              <td class="py-4 text-right">{{ formatFCFA(record.ecart) }}</td>
            </tr>
            <tr v-if="record.calculatedFraisMomo" class="border-b">
              <td class="py-4 font-bold">Frais MoMo</td>
              <td class="py-4 text-right">{{ formatFCFA(record.calculatedFraisMomo) }}</td>
            </tr>
            <tr class="border-t-2 border-gray-700 font-bold">
              <td class="py-4">Total des prélèvements</td>
              <td class="py-4 text-right">{{ formatFCFA(record.totalPrelevements) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Salaire Net -->
      <div class="mt-8 text-right">
        <h2 class="text-2xl font-extrabold text-green-700">
          Salaire : {{ formatFCFA(record.salaireBrut) }}
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
import { useOperatorsStore } from '../stores copy/operators';
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
		    page-break-after: avoid !important;
    page-break-before: avoid !important;
    page-break-inside: avoid !important;
    /* ❌ on supprime le page-break-after: always */
  }

  /* On laisse le navigateur gérer les sauts */
  .pdf-page:last-child {
    page-break-after: auto;
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
  /* Forcer une seule page si le contenu tient dedans */
  html, body {
    height: auto !important;
    overflow: visible !important;
  }

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
