import { EmployeeInterface } from "@/interfaces";

export interface UserInterface extends ApiResourceInterface {
  /** Prénom de l'utilisateur */
  first_name: string;
  /** Nom de famille de l'utilisateur */
  last_name: string;
  /** Adresse e-mail de l'utilisateur */
  email: string;
  /** Numéro de téléphone de l'utilisateur */
  phone: string;
  /** Indique si le compte utilisateur est actif */
  is_active?: boolean;
  /**Employé */
  permanent_function?: EmployeeInterface;
}
