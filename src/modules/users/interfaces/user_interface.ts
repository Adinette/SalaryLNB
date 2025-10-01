import type { ApiResourceInterface } from "../../../interfaces/ApiResourceInterface";

export interface UserInterface extends ApiResourceInterface {
  /** Prénom de l'utilisateur */
  first_name: string;
  /** Nom de famille de l'utilisateur */
  last_name: string;
  /** Adresse e-mail de l'utilisateur */
  email: string;
  /** Numéro de téléphone de l'utilisateur */
  phone: string;

}
