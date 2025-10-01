// Define TableHeader type locally (adjust fields as needed)
export type TableHeader = {
  key: string;
  title: string;
  width?: string;
  class?: string;
};

/**
 * Composable pour les styles et utilitaires des tables
 */
export function useCustomTable() {
  // Classes CSS prêtes à l'emploi
  const tableClasses = {
    badge: {
      success: "badge bg-success-light",
      danger: "badge bg-danger-light",
      primary: "badge bg-primary-light",
      warning: "badge bg-warning-light",
    },
    button: {
      action: "btn btn-sm btn-alt-secondary",
      danger: "btn btn-sm btn-alt-secondary text-error",
    },
    column: {
      info: "info-column",
    },
  };

  // Utilitaires pour les badges de statut
  const getStatusBadge = (isActive: boolean) => {
    return isActive ? tableClasses.badge.success : tableClasses.badge.danger;
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Actif" : "Inactif";
  };

  const getStatusPublishText = (isPublished: boolean) => {
    return isPublished ? "Actif" : "Inactif";
  };
  // Formatage des dates
  const formatDate = (date: Date | string | null) => {
    if (!date) return "Non défini";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Création d'headers standards
  const createHeaders = {
    checkbox: (): TableHeader => ({
      key: "checkbox",
      title: "",
      width: "42px",
      class: "text-center",
    }),

    info: (title: string = "Informations"): TableHeader => ({
      key: "info",
      title,
    }),

    status: (title: string = "Statut"): TableHeader => ({
      key: "status",
      title,
    }),

    actions: (
      title: string = "Actions",
      width: string = "100px"
    ): TableHeader => ({
      key: "actions",
      title,
      width,
      class: "text-center",
    }),

    custom: (
      key: string,
      title: string,
      options?: { width?: string; class?: string }
    ): TableHeader => ({
      key,
      title,
      width: options?.width,
      class: options?.class,
    }),
  };

  // Headers prédéfinis pour les différents modules
  const commonHeaders = {
    // Pour UserListView
    user: (): TableHeader[] => [
      createHeaders.info("Informations"),
      createHeaders.status(),
      createHeaders.actions(),
    ],
  };

  return {
    tableClasses,
    getStatusBadge,
    getStatusText,
    getStatusPublishText,
    formatDate,
    createHeaders,
    commonHeaders,
  };
}
