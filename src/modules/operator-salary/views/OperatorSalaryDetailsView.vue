<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { DateTime } from "luxon";
import { extractMonthAndYear } from '../../../utils/formatDate'
import appRoutes from "../../../router/routes";
import { useOperatorActions } from "../../operator/composable/use_operator_actions";
import { useModernTableStyles } from "../../../composables/useModernTableStyles";
import { useOperatorSalaryActions } from "../composable/use_operator_salary_ action";
import { onMounted, ref, computed } from "vue";
import { OperatorSalaryModel } from "../models/operator-salary-model";
import { useBootstrapToast } from "../../../composables/useBootstrapToast";

const route = useRoute(appRoutes.operatorsSalary.details);
const router = useRouter();
const toast = useBootstrapToast();

const operatorSalaryId = route.params.id as string;

const { processing } =
  useOperatorSalaryActions();

	const operatorSalary = ref<OperatorSalaryModel | null>(null);

const { findOperatorSalary } = useOperatorSalaryActions();
const {
  operators,
} = useOperatorActions();

// operators est ta liste de tous les opérateurs
const getOperatorById = (id: string) => {
  return operators.value.find(operator => operator.id === id) || null;
};

const loadoperatorSalary = async () => {
  const result = await findOperatorSalary(operatorSalaryId);
  if (result) {
    operatorSalary.value = new OperatorSalaryModel(result.interface);
  } else {
    toast.show({
      title: "Erreur",
      message: "Bulletin de salaire non trouvé",
      icon: "error",
    });
    router.push({ name: appRoutes.operatorsSalary.list });
  }
};


const { icons } = useModernTableStyles();

// Icônes supplémentaires pour cette vue
const detailIcons = {
  eye: "ri-eye-line",
  back: "ri-arrow-left-line",
  user: "ri-user-line",
  status: "ri-checkbox-circle-line",
  tracking: "ri-time-line",
  star: "ri-star-line",
  comment: "ri-chat-3-line",
  target: "ri-focus-3-line",
  error: "ri-error-warning-line",
  warning: "ri-alert-line",
};

// Fusion des icônes
const allIcons = { ...icons, ...detailIcons };

const chiffreAffaireHorsTaxe = computed(() => {
  if (!operatorSalary.value) return 0;
  return operatorSalary.value.chiffreAffaireMensuelttc / 1.1;
});

const commissionBrute = computed(() => {
  if (!operatorSalary.value) return 0;
  return (
    chiffreAffaireHorsTaxe.value *
    (operatorSalary.value.percentCommissionBrute / 100)
  );
});

const FEL = 2500;

const aib = computed(() => commissionBrute.value * 0.05);

const penalite = computed(() => {
  if (!operatorSalary.value) return 0;
  return (operatorSalary.value.ecart || 0) * 0.15;
});

const fraisMomo = computed(() => {
  if (!operatorSalary.value) return 0;
  return (
    ((operatorSalary.value.payement || 0) *
      (operatorSalary.value.percentFraisMomo || 0)) /
    100
  );
});

const totalPrelevements = computed(() => {
  if (!operatorSalary.value) return 0;
  return (
    FEL +
    aib.value +
    (operatorSalary.value.dette || 0) -
    (operatorSalary.value.remboursement || 0) +
    (operatorSalary.value.ecart || 0) +
    penalite.value +
    fraisMomo.value
  );
});

const salaireBrut = computed(() => {
  return commissionBrute.value - totalPrelevements.value;
});


// Fonctions utilitaires
const formatDate = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_SHORT);
};

const formatDateTime = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_SHORT);
};

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  minimumFractionDigits: 0,
});

function formatFCFA(value: number) {
  return currencyFormatter.format(value).replace('XOF', 'FCFA');
}

const handleBack = () => {
  router.push({ name: appRoutes.operatorsSalary.list });
};

const printDocument = () => {
  window.print();
};

// Lifecycle
onMounted(() => {
  loadoperatorSalary();
});
</script>

<template>
  <!-- Actions flottantes pour l'écran (cachées à l'impression) -->
  <div class="btn-print print:hidden fixed top-64 z-50 flex gap-2">
    <VBtn
      type="button"
      variant="outlined"
      @click="handleBack"
      :disabled="processing"
    >
      <i :class="allIcons.back" />
      <span class="ml-1">Retour</span>
    </VBtn>
    <VBtn
      type="button"
      variant="flat"
      color="primary"
      @click="printDocument"
    >
      <i class="ri-printer-line" />
      <span class="ml-1">Imprimer</span>
    </VBtn>
  </div>

  <!-- Document PDF-like - SEULE PARTIE IMPRIMÉE -->
  <div
    v-if="!processing && operatorSalary"
    class="pdf-document bg-gray-100 min-h-screen print:bg-white print:min-h-0 print:block pt-20"
  >
    <!-- Page 1: Informations générales et résultats -->
    <div class="pdf-page bg-white mx-auto shadow-lg print:shadow-none">
      <!-- Header de la page -->
      <div class="pdf-header border-b-2 border-gray-200 mb-5">
        <div class="">
          <div>
            <h1 class="text-4xl text-center font-bold text-gray-900 mb-5">
              Bulletin de commission
            </h1>

						<!-- Information sur l'entreprise -->
						<section class="border-b pb-3">
							<div class="flex items-center gap-4 mb-4 justify-between">
								<div>
									<h2 class="text-2xl mb-0 font-extrabold text-green-700 font-[Quicksand, sans-serif]">TEA</h2>
									<p class="text-xs font-extrabold text-green-700 font-[Quicksand, sans-serif]">Services</p>
								</div>
								<div class="text-right text-xl font-bold text-gray-950">
									<p class="mb-2"> <span class="text-lg font-bold">Date d’émission :</span> <span class="text-base font-bold">{{ formatDate(new Date().toISOString()) }}</span></p>
									<p><span class="text-lg font-bold">Salaire du mois :</span> <span class="text-base font-bold">{{ extractMonthAndYear(operatorSalary.date).month }} {{ extractMonthAndYear(operatorSalary.date).year }}</span> </p>
								</div>
							</div>
							<div>
								<p class="mb-2"> <span class="text-lg font-bold">IFU :</span> <span class="text-base font-bold text-gray-950">0202112432071</span></p>
								<p class="mb-2"> <span class="text-lg font-bold">RCCM :</span> <span class="text-base font-bold text-gray-950">COTONOU N° RB/ABC/24 A 116906</span></p>
							</div>
						</section>

						 <!-- Infos opérateur -->
            <section class="mb-5 pt-3">
							<h2 class="text-2xl font-bold text-green-700 mb-2 text-center">Informations de l’opérateur</h2>
							<div class="">
									<p v-if="operatorSalary.operator_id" class="mb-2">
										<span class="text-lg font-bold">Nom et Prénoms :</span> {{ getOperatorById(operatorSalary.operator_id)?.first_name }} {{ getOperatorById(operatorSalary.operator_id)?.last_name }}
									</p>
									<p v-if="operatorSalary.operator_id"><span class="text-lg font-bold">Téléphone :</span> <span class="text-base font-medium">{{ getOperatorById(operatorSalary.operator_id)?.phone }}</span> </p>
							</div>
						</section>

            <!-- Tableau de rémunération -->
						<section class="border-t pt-3">
							<h2 class="text-2xl font-bold text-green-700 mb-3 text-center">Détails du calcul</h2>
							<table class="w-full border-collapse text-lg text-gray-900 font-bold">
								<tbody>
									<tr class="border-b">
										<td class="pb-4 font-bold">Chiffre d’affaire TTC</td>
										<td class="pb-4 text-right">{{ formatFCFA(operatorSalary.chiffreAffaireMensuelttc) }}</td>
									</tr>
									<tr class="border-b">
										<td class="py-4 font-bold">Chiffre d’affaire HT</td>
										<td class="py-4 text-right">{{ formatFCFA(chiffreAffaireHorsTaxe) }}</td>
									</tr>
									<tr class="border-b">
										<td class="py-4 font-bold">Commission brute ({{ operatorSalary.percentCommissionBrute }}%)</td>
										<td class="py-4 text-right">{{ formatFCFA(commissionBrute) }}</td>
									</tr>
									<tr v-if="operatorSalary.aib" class="border-b">
										<td class="py-4 font-bold">AIB</td>
										<td class="py-4 text-right">{{ formatFCFA(aib) }}</td>
									</tr>
										<tr v-if="operatorSalary.fel" class="border-b">
										<td class="py-4 font-bold">Frais d'entretien LNB</td>
										<td class="py-4 text-right">{{ formatFCFA(FEL) }}</td>
									</tr>
									<tr v-if="operatorSalary.dette" class="border-b">
										<td class="py-4 font-bold">Dette</td>
										<td class="py-4 text-right">{{ formatFCFA(operatorSalary.dette) }}</td>
									</tr>
									<tr v-if="operatorSalary.ecart" class="border-b">
										<td class="py-4 font-bold">Écart</td>
										<td class="py-4 text-right">{{ formatFCFA(operatorSalary.ecart) }}</td>
									</tr>
									<tr v-if="operatorSalary.penalite" class="border-b">
										<td class="py-4 font-bold">Pénalité</td>
										<td class="py-4 text-right">{{ formatFCFA(penalite) }}</td>
									</tr>
									<tr v-if="operatorSalary.remboursement" class="border-b">
										<td class="py-4 font-bold">Remboursement</td>
										<td class="py-4 text-right">{{ formatFCFA(operatorSalary.remboursement) }}</td>
									</tr>
									<tr v-if="operatorSalary.calculatedFraisMomo" class="border-b">
										<td class="py-4 font-bold">Frais MoMo</td>
										<td class="py-4 text-right">{{ formatFCFA(fraisMomo) }}</td>
									</tr>
									<tr class="border-t-2 border-gray-700 font-bold">
										<td class="py-4">Total des prélèvements</td>
										<td class="py-4 text-right">{{ formatFCFA(operatorSalary.totalPrelevements) }}</td>
									</tr>
								</tbody>
							</table>
						</section>

						   <!-- Salaire Net -->
						<section class="mt-5 text-right">
							<h2 class="text-2xl font-extrabold text-green-700">
								Commission : {{ formatFCFA(salaireBrut) }}
							</h2>
						</section>
					</div>
				</div>
			</div>


      <!-- Footer de la page 1 -->
      <div
        class="pdf-footer text-center text-gray-500 text-sm pt-4"
      >
        <p>
          Page 1/1 - Bulletin de salaire généré le
          {{ formatDateTime(new Date().toISOString()) }}
        </p>
      </div>
    </div>

    <!-- Saut de page -->
    <div class="print:break-before-page"></div>

  </div>

</template>

<style scoped>
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

.pdf-header h1,
.pdf-header h2 {
	color: #0aa77b; /* Vert foncé */
	font-family: 'Quicksand', sans-serif;
	font-weight: 700;
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
    left: 0;
    top: 0;
    width: 100% !important;
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
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

  /* Forcer les couleurs des badges */
  .bg-green-100 {
    background-color: #dcfce7 !important;
  }
  .text-green-800 {
    color: #166534 !important;
  }
  .bg-red-100 {
    background-color: #fee2e2 !important;
  }
  .text-red-800 {
    color: #991b1b !important;
  }
  .bg-yellow-100 {
    background-color: #fef3c7 !important;
  }
  .text-yellow-800 {
    color: #92400e !important;
  }
  .bg-blue-50 {
    background-color: #eff6ff !important;
  }
  .text-blue-600 {
    color: #2563eb !important;
  }
  .bg-green-50 {
    background-color: #f0fdf4 !important;
  }
  .text-green-600 {
    color: #16a34a !important;
  }
  .bg-orange-50 {
    background-color: #fff7ed !important;
  }
  .text-orange-600 {
    color: #ea580c !important;
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
