import { defaultStoreState } from "@/constants";
import { StoreKeysEnum } from "@/enums";
import { AppLocalesEnum } from "@/locales";
import { GenericStoreService } from "@/services/generic_store_service";

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
