<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useOperatorSalaryActions } from "../composables/use_sprint_operatorSalary_actions";
import { OperatorSalaryModel } from "../models/operator-salary_model";
import { useBootstrapToast } from "@/composables/useBootstrapToast";
import { DateTime } from "luxon";
import { SprintObjectiveModel } from "@/modules/sprint-objectives/models/sprint-objective_model";
import { useModernTableStyles } from "@/composables/useModernTableStyles";
import LogoSanlamAllianz from "@/assets/images/sanlam-allianz-logo.svg";
import qrcode from "qrcode-generator";
import { useSprintObjectiveActions } from "@/modules/sprint-objectives";
import appRoutes from "../../../router/routes";
import { computed, onMounted, ref } from "vue";

const route = useRoute(appRoutes.operatorsSalary.details);
const router = useRouter();
const toast = useBootstrapToast();

const operatorSalaryId = route.params.id as string;

const { processing, findOperatorSalary, deleteOperatorSalary } =
  useOperatorSalaryActions();

const { sprintObjectives, getSprintObjectives } = useSprintObjectiveActions();

const { badgeClasses, icons } = useModernTableStyles();

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

const operatorSalary = ref<OperatorSalaryModel | null>(null);
const deleteDialog = ref(false);
const deleting = ref(false);
const qrCodeDataUrl = ref<string>("");


const isEditable = computed(() => {
  return operatorSalary.value?.isEditable ?? false;
});

const operatorSalaryStatusBadge = computed(() => {
  if (!operatorSalary.value)
    return { class: badgeClasses.primary, text: "Inconnu" };

  const status = operatorSalary.value.operatorSalary_status;
  switch (status) {
    case "completed":
      return { class: badgeClasses.success, text: "Terminé" };
    case "in_progress":
      return { class: badgeClasses.warning, text: "En cours" };
    case "pending":
      return { class: badgeClasses.primary, text: "En attente" };
    default:
      return { class: badgeClasses.primary, text: status };
  }
});

const trackingStatusBadge = computed(() => {
  if (!operatorSalary.value)
    return { class: badgeClasses.primary, text: "Inconnu" };

  return operatorSalary.value.isTrackingActive
    ? { class: badgeClasses.success, text: "Actif" }
    : { class: badgeClasses.danger, text: "Terminé" };
});

// Fonctions utilitaires
const formatDate = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_SHORT);
};

const formatDateTime = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_SHORT);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "warning";
    case "pending":
      return "info";
    default:
      return "grey";
  }
};

const handleBack = () => {
  router.push({ name: appRoutes.operatorsSalary.list });
};

const handleEdit = () => {
  if (operatorSalary.value) {
    router.push({
      name: appRoutes.operatorsSalary.edit,
      params: { id: operatorSalary.value.id },
    });
  }
};

const printDocument = () => {
  window.print();
};

// Génération du QR code
const generateQrCode = () => {
  if (!operatorSalary.value) return;

  // Données à encoder dans le QR code
  const qrData = {
    operatorSalaryId: operatorSalary.value.id,
    operator: operatorSalary.value.employeeFullName,
    operatorSalaryDate: operatorSalary.value.evaluated_at || new Date().toISOString(),
    url: `https://eval.sahges.com/operatorSalary/${operatorSalary.value.id}`,
  };

  // Créer le QR code
  const qr = qrcode(0, "M"); // Type 0 (auto), niveau de correction d'erreur M
  qr.addData(JSON.stringify(qrData));
  qr.make();

  // Générer l'image du QR code
  const cellSize = 3;
  const margin = 0;
  const size = qr.getModuleCount() * cellSize + margin * 2;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Fond blanc
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    // Dessiner le QR code
    ctx.fillStyle = "#000000";
    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(
            col * cellSize + margin,
            row * cellSize + margin,
            cellSize,
            cellSize
          );
        }
      }
    }

    // Convertir en data URL
    qrCodeDataUrl.value = canvas.toDataURL("image/png");
  }
};

// Handlers d'événements
const loadEvaluation = async () => {
  const result = await findOperatorSalary(operatorSalaryId);
  if (result) {
    operatorSalary.value = new OperatorSalaryModel(result.interface);
    await loadRelatedObjectives();
    generateQrCode(); // Générer le QR code après le chargement
  } else {
    toast.show({
      title: "Erreur",
      message: "Évaluation non trouvée",
      icon: "error",
    });
    router.push({ name: appRoutes.operatorsSalary.list });
  }
};

const loadRelatedObjectives = async () => {
  if (!operatorSalary.value) return;

  // Charger tous les objectifs
  await getSprintObjectives();

  // Filtrer les objectifs par tracking et employé
  relatedObjectives.value = sprintObjectives.value
    .filter((objective: any) => {
      const sameTracking =
        objective.standup_meeting_trackings?.id ===
        operatorSalary.value?.tracking.id;

      const isOtherOwner =
        objective.other_owner?.user?.id === operatorSalary.value?.function.user.id;

      const isOwner =
        objective.owner?.user?.id === operatorSalary.value?.function.user.id;

      return sameTracking && (isOtherOwner || isOwner);
    })
    .map((obj: any) => new SprintObjectiveModel(obj));
};

const handleDelete = () => {
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!operatorSalary.value) return;

  deleting.value = true;
  try {
    await deleteOperatorSalary(operatorSalary.value);
    toast.show({
      title: "Succès",
      message: "Évaluation supprimée avec succès",
      icon: "success",
    });
    router.push({ name: appRoutes.operatorsSalary.list });
  } catch (error) {
    toast.show({
      title: "Erreur",
      message: "Erreur lors de la suppression de l'évaluation",
      icon: "error",
    });
  } finally {
    deleting.value = false;
    deleteDialog.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadEvaluation();
  console.log("relatedObjectives", relatedObjectives);
});
</script>
<template>
  <!-- Actions flottantes pour l'écran (cachées à l'impression) -->
  <div class="btn-print print:hidden fixed top-64 z-50 flex gap-2">
    <VBtn
      type="button"
      variant="outlined"
      size="small"
      @click="handleBack"
      :disabled="processing"
    >
      <i :class="allIcons.back" />
      <span class="ml-1">Retour</span>
    </VBtn>
    <VBtn
      v-if="operatorSalary && isEditable"
      type="button"
      variant="outlined"
      color="primary"
      size="small"
      @click="handleEdit"
      :disabled="processing"
    >
      <i :class="allIcons.edit" />
      <span class="ml-1">Modifier</span>
    </VBtn>
    <VBtn
      type="button"
      variant="flat"
      color="primary"
      size="small"
      @click="printDocument"
    >
      <i class="ri-printer-line" />
      <span class="ml-1">Imprimer</span>
    </VBtn>
    <VBtn
      v-if="operatorSalary && isEditable"
      type="button"
      variant="flat"
      color="error"
      size="small"
      @click="handleDelete"
      :disabled="processing || deleting"
    >
      <i :class="allIcons.delete" />
      <span class="ml-1">Supprimer</span>
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
      <div class="pdf-header border-b-2 border-gray-200 pb-6 mb-8">
        <div class="flex justify-between items-start">
          <div>
            <img :src="LogoSanlamAllianz" class="h-16 mb-8" />
            <h1 class="text-2xl font-bold text-gray-900 mb-8">
              Objectifs Sprint - Rapport d'Évaluation
            </h1>
            <div class="flex items-center gap-4 mb-4 justify-between">
              <div>
                <p class="text-lg text-gray-600 mb-0">
                  {{ operatorSalary.employeeFullName }}
                </p>
                <p class="text-base text-gray-500">
                  {{ operatorSalary.tracking.libelle }}
                </p>
              </div>
              <div class="qrcode">
                <img
                  v-if="qrCodeDataUrl"
                  :src="qrCodeDataUrl"
                  alt="QR Code de l'évaluation"
                  class="w-32 h-32 border border-gray-300 rounded"
                  title="QR Code contenant les informations de l'évaluation"
                />
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="mb-2">
              <span
                :class="
                  operatorSalaryStatusBadge.class +
                  ' text-sm font-medium px-3 py-1 rounded-full'
                "
              >
                {{ operatorSalaryStatusBadge.text }}
              </span>
            </div>
            <p class="text-sm text-gray-500">
              {{ formatDate(operatorSalary.tracking.start_at) }} -
              {{ formatDate(operatorSalary.tracking.end_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Informations de l'employé -->
      <section class="mb-8">
        <h2
          class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2"
        >
          Informations de l'employé
        </h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <div class="flex items-center mb-4">
              <div
                class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-700 mr-4"
              >
                {{ operatorSalary.function.user.first_name.charAt(0)
                }}{{ operatorSalary.function.user.last_name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-medium text-lg m-0">
                  {{ operatorSalary.employeeFullName }}
                </h3>
                <p class="text-gray-600 m-0">
                  {{ operatorSalary.function.position?.name || "Non défini" }}
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Statut du suivi:</span>
              <span
                :class="
                  trackingStatusBadge.class + ' text-xs px-2 py-1 rounded'
                "
              >
                {{ trackingStatusBadge.text }}
              </span>
            </div>
            <div v-if="operatorSalary.evaluated_at" class="flex justify-between">
              <span class="font-medium text-gray-700">Évalué le:</span>
              <span class="text-gray-600">{{
                formatDateTime(operatorSalary.evaluated_at)
              }}</span>
            </div>
            <div v-if="operatorSalary.evaluated_by" class="flex justify-between">
              <span class="font-medium text-gray-700">Évaluateur:</span>
              <span class="text-gray-600">{{
                operatorSalary.evaluatorFullName
              }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Résultats de l'évaluation -->
      <section v-if="operatorSalary.isCompleted" class="mb-8">
        <h2
          class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2"
        >
          Résultats de l'évaluation
        </h2>
        <div class="bg-gray-50 rounded-lg p-6">
          <div v-if="operatorSalary.hasGlobalScore" class="text-center mb-6">
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ operatorSalary.formattedGlobalScore }}
            </div>
            <div class="flex justify-center mb-2">
              <VRating
                v-if="operatorSalary?.global_score! > 0"
                :model-value="Number(operatorSalary?.global_score! / 2)"
                readonly
                density="comfortable"
                color="amber"
                size="large"
              />
            </div>
            <p class="text-gray-600">Score global</p>
          </div>

          <div v-if="operatorSalary.general_comments" class="mt-6">
            <h3 class="font-medium text-gray-800 mb-3">
              Commentaires généraux
            </h3>
            <div
              class="bg-white border border-gray-200 rounded p-4 text-gray-700 leading-relaxed"
            >
              {{ operatorSalary.general_comments }}
            </div>
          </div>
        </div>
      </section>

      <!-- Footer de la page 1 -->
      <div
        class="pdf-footer text-center text-gray-500 text-sm border-t border-gray-200 pt-4"
      >
        <p>
          Page 1/2 - Rapport généré le
          {{ formatDateTime(new Date().toISOString()) }}
        </p>
      </div>
    </div>

    <!-- Saut de page -->
    <div class="print:break-before-page"></div>

    <!-- Page 2: Détail des objectifs -->
    <div class="pdf-page bg-white mx-auto shadow-lg print:shadow-none">
      <!-- Résumé des objectifs -->
      <section class="mb-8">
        <h2
          class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2"
        >
          Résumé des objectifs
        </h2>
        <div class="grid grid-cols-3 gap-6 text-center">
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-blue-600">
              {{ relatedObjectives.length }}
            </div>
            <div class="text-sm text-blue-700">Total objectifs</div>
          </div>
          <div class="bg-green-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-green-600">
              {{ relatedObjectives.filter((obj) => obj.is_achieved).length }}
            </div>
            <div class="text-sm text-green-700">Objectifs atteints</div>
          </div>
          <div class="bg-orange-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-orange-600">
              {{ relatedObjectives.filter((obj) => !obj.isEvaluated).length }}
            </div>
            <div class="text-sm text-orange-700">Non évalués</div>
          </div>
        </div>
      </section>

      <!-- Header de la page 2 -->
      <div class="pdf-header border-b-2 border-gray-200 pb-2 mb-1">
        <div class="flex justify-between items-center">
          <div>
            <span class="text-md font-bold text-gray-900 mb-2"
              >Détail des Objectifs</span
            >
            <p class="text-lg text-gray-600 m-0">
              {{ operatorSalary.employeeFullName }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500 m-0">
              {{ relatedObjectives.length }} objectif(s) au total
            </p>
          </div>
        </div>
      </div>

      <!-- Liste des objectifs -->
      <section>
        <div v-if="relatedObjectives.length === 0" class="text-center py-12">
          <div class="text-6xl text-gray-300 mb-4">📋</div>
          <h3 class="text-xl font-medium text-gray-500 mb-2">
            Aucun objectif trouvé
          </h3>
          <p class="text-gray-400">
            Aucun objectif n'est associé à cette évaluation.
          </p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="(objective, index) in relatedObjectives"
            :key="objective.id"
            class="border border-gray-200 rounded-lg px-6 py-2 bg-white"
          >
            <!-- Header de l'objectif -->
            <div class="flex justify-between items-start mb-0">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span
                    class="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    Objectif {{ index + 1 }}
                  </span>
                  <span
                    v-if="objective.isEvaluated"
                    :class="
                      (objective.is_achieved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800') +
                      ' text-xs font-medium px-2 py-1 rounded-full'
                    "
                  >
                    {{ objective.is_achieved ? "✓ Atteint" : "✗ Non atteint" }}
                  </span>
                  <span
                    v-else
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    ⏳ Non évalué
                  </span>
                </div>
                <h5 class="text-md font-semibold text-gray-900 mb-2">
                  {{ objective.libelle }}
                </h5>
              </div>
            </div>

            <!-- Détails de l'objectif -->
            <div class="grid grid-cols-2 gap-6 mb-4">
              <div>
                <div
                  class="space-y-2 text-sm flex gap-2 items-center justify-between"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Score:</span>
                    <span class="font-medium">{{
                      objective.formattedScore
                    }}</span>
                  </div>
                  <div
                    v-if="objective.evaluated_at"
                    class="flex justify-between items-center"
                  >
                    <span class="text-gray-600">Évalué le:</span>
                    <span class="font-medium">{{
                      formatDateTime(objective.evaluated_at)
                    }}</span>
                  </div>
                </div>
              </div>
              <div v-if="objective.evaluator_comments">
                <h4 class="font-medium text-gray-700 mb-2">
                  Commentaires de l'évaluateur
                </h4>
                <div
                  class="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-700 leading-relaxed"
                >
                  {{ objective.evaluator_comments }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer de la page 2 -->
      <div
        class="pdf-footer text-center text-gray-500 text-sm border-t border-gray-200 pt-4 mt-8"
      >
        <p>
          Page 2/2 - Rapport généré le
          {{ formatDateTime(new Date().toISOString()) }}
        </p>
      </div>
    </div>
  </div>

  <!-- État de chargement -->
  <div
    v-else-if="processing"
    class="min-h-screen flex items-center justify-center bg-gray-100 print:hidden"
  >
    <div class="text-center">
      <i
        :class="allIcons.loading"
        class="text-4xl text-primary mb-4 animate-spin"
      />
      <div class="text-lg font-medium">Chargement de l'évaluation...</div>
    </div>
  </div>

  <!-- Évaluation non trouvée -->
  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gray-100 print:hidden"
  >
    <div class="text-center bg-white p-12 rounded-lg shadow-lg max-w-md">
      <i :class="allIcons.error" class="text-6xl text-red-300 mb-4" />
      <div class="text-xl font-medium text-gray-900 mb-2">
        Évaluation non trouvée
      </div>
      <div class="text-gray-500 mb-6">
        L'évaluation demandée n'existe pas ou n'est plus disponible.
      </div>
      <VBtn color="primary" @click="handleBack">Retour à la liste</VBtn>
    </div>
  </div>

  <!-- Dialog de confirmation de suppression -->
  <VDialog v-model="deleteDialog" max-width="400" class="print:hidden">
    <VCard>
      <VCardTitle class="flex items-center gap-2">
        <i :class="allIcons.warning" class="text-warning" />
        Confirmer la suppression
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer cette évaluation ? Cette action est
        irréversible.
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deleteDialog = false">Annuler</VBtn>
        <VBtn color="error" @click="confirmDelete" :loading="deleting"
          >Supprimer</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
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
