export interface PermissionInterface extends ApiResourceInterface {
  /** Code unique de la permission */
  code: string;
  /** Libellé de la permission */
  name: string;
  /** Description de la permission */
  description?: string;
  /** Permission active ou non */
  is_active?: boolean;
}