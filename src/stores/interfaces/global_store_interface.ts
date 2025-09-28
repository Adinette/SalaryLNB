import { AppLocalesEnum } from "../../locales";
import type { SessionInterface } from "../../modules/authentication/interfaces/session_interface";
import type { AppAlertInterface } from "../../interfaces/AppAlertInterface";
import type { StoreInterface } from "./store_interface";

export interface GlobalStoreInterface extends StoreInterface {
	session: SessionInterface | null;
	locale: AppLocalesEnum;
	alerts: AppAlertInterface[];
}
