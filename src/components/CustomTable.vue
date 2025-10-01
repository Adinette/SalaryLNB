<template>
  <div class="table-responsive">
    <table
      class="table table-striped table-vcenter table-modern"
      style="--bs-table-bg: transparent"
    >
      <thead
        style="
          background: linear-gradient(
            135deg,
            #005aa7 0%,
            #009ddc 100%
          ) !important;
        "
      >
        <tr>
          <!-- Checkbox de sélection (optionnel) -->
          <th
            v-if="selectable"
            style="
              width: 42px;
              color: white !important;
              font-weight: 600 !important;
            "
            class="text-center"
          >
            <VCheckbox
              :model-value="allSelected"
              :indeterminate="someSelected"
              @update:model-value="$emit('toggle-select-all')"
              hide-details
              density="compact"
              color="primary"
              :disabled="items.length === 0"
            />
          </th>

          <!-- Headers dynamiques -->
          <th
            v-for="header in headers"
            :key="header.key"
            :style="`${header.width ? `width: ${header.width};` : ''} color: white !important; font-weight: 600 !important`"
            :class="header.class || ''"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <slot name="body" :items="items"></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface TableHeader {
  key: string;
  title: string;
  width?: string;
  class?: string;
}

export interface CustomTableProps {
  headers: TableHeader[];
  items: any[];
  selectable?: boolean;
  allSelected?: boolean;
  someSelected?: boolean;
}

withDefaults(defineProps<CustomTableProps>(), {
  selectable: true,
  allSelected: false,
  someSelected: false,
});

defineEmits<{
  "toggle-select-all": [];
}>();
</script>

<style lang="scss" scoped>
.row-active {
  td {
    background-color: rgba(175, 95, 95, 0.75);
  }
}

/* Personnalisation des cases à cocher pour une meilleure intégration */
:deep(.v-checkbox) {
  margin: 0;
  padding: 0;
}

:deep(.v-checkbox .v-selection-control) {
  min-height: auto;
}

/* Assurer la visibilité des headers avec le gradient */
:deep(.table-modern thead th) {
  color: white !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
}

/* Améliorer le contraste des badges */
:deep(.badge.bg-primary-light) {
  background: rgba(0, 90, 167, 0.1) !important;
  color: #005aa7 !important;
  border: 1px solid rgba(0, 90, 167, 0.2) !important;
  font-weight: 500 !important;
}

/* Corps de table avec effets hover */
:deep(.table-modern tbody tr) {
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f3f7;
}

:deep(.table-modern tbody tr:hover) {
  background-color: rgba(0, 157, 220, 0.04);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 90, 167, 0.05);
}

:deep(.table-modern tbody td) {
  padding: 1rem;
  vertical-align: middle;
  border: none;
}

/* Boutons d'action modernisés */
:deep(.btn-group .btn.btn-alt-secondary) {
  background: #f8f9fc;
  border: 1px solid #e1e6ec;
  color: #005aa7;
  border-radius: 6px;
  margin: 0 2px;
  transition: all 0.2s ease;
}

:deep(.btn-group .btn.btn-alt-secondary:hover) {
  background: #005aa7;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 90, 167, 0.3);
}

:deep(.btn-group .btn.btn-alt-secondary.text-error:hover) {
  background: #d32f2f;
  border-color: #d32f2f;
}

/* Layout pour les colonnes d'information */
:deep(.info-column-customTable .info-name) {
  font-weight: 700;
  color: #2f3e4d;
  margin-bottom: 0.25rem;
}

:deep(.info-column-customTable .info-detail) {
  color: #6c757d;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

:deep(.info-column-customTable .info-detail .fa) {
  margin-right: 0.5rem;
  color: #009ddc;
  opacity: 0.7;
  width: 12px;
}

/* Badges modernes */
:deep(.badge-customTable.bg-success-light) {
  background: rgba(59, 175, 41, 0.1) !important;
  color: #3baf29 !important;
  border: 1px solid rgba(59, 175, 41, 0.2);
  font-weight: 500 !important;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.75rem;
}

:deep(.badge-customTable.bg-danger-light) {
  background: rgba(211, 47, 47, 0.1) !important;
  color: #d32f2f !important;
  border: 1px solid rgba(211, 47, 47, 0.2);
  font-weight: 500 !important;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.75rem;
}

:deep(.badge-customTable.bg-primary-light) {
  background: rgba(0, 90, 167, 0.1) !important;
  color: #005aa7 !important;
  border: 1px solid rgba(0, 90, 167, 0.2) !important;
  font-weight: 500 !important;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.75rem;
}

/* Responsive design */
@media (max-width: 768px) {
  :deep(.table-modern) {
    font-size: 0.875rem;
  }

  :deep(.table-modern thead th),
  :deep(.table-modern tbody td) {
    padding: 0.75rem 0.5rem;
  }

  :deep(.info-column-customTable .info-detail) {
    font-size: 0.7rem;
  }
}
</style>
