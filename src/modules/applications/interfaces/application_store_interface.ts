import type { StoreInterface } from "../../../stores/interfaces/store_interface";
import type { ApplicationInterface } from "./application_interface";

export interface ApplicationStoreInterface extends StoreInterface {
	apps: ApplicationInterface[];
}
