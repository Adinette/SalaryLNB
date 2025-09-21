import { defaultStoreState } from "../../constants";
import { StoreKeysEnum } from "../../enums";
import type { AppStoreDefinition } from "../../interfaces/app_store_definition_interface";
import { AppLocalesEnum } from "../../locales";
import { GenericStoreService } from "../../services/generic_store_service";
import type { GlobalStoreInterface } from "../interfaces/global_store_interface";

export const globalStoreDefinition: AppStoreDefinition<GlobalStoreInterface> = {
	key: StoreKeysEnum.Global,
	service: new GenericStoreService<GlobalStoreInterface>({
		name: StoreKeysEnum.Global,
		defaults: {
			...defaultStoreState,
			session: null,
			locale: AppLocalesEnum.fr,
			alerts: [],
		},
		isCritical: true, // This store should not be throttled
	}),
};
