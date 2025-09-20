import type { StoreKeysEnum } from "../enums";
import type { GenericStoreService } from "../services/generic_store_service";

export type AppStoreDefinition<T> = {
	key: StoreKeysEnum;
	service: GenericStoreService<T>;
	throttleMs?: number;
};
