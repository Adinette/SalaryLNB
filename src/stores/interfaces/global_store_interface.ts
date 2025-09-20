import { AppLocalesEnum } from "@/locales";
import type { SessionInterface } from "@/modules/authentication/interfaces/session_interface";

export interface GlobalStoreInterface extends StoreInterface {
	session: SessionInterface | null;
	locale: AppLocalesEnum;
	alerts: AppAlertInterface[];
}
