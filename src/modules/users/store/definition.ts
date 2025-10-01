
import type { UserStoreInterface } from "../interfaces/user_store_interface";
import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import { GenericStoreService } from "../../../services/generic_store_service";
import { defaultStoreState } from "../../../constants/default_store_state";
import { StoreKeysEnum } from "../../../enums";

export const userStoreDefinition: AppStoreDefinition<UserStoreInterface> = {
	key: StoreKeysEnum.User,
	service: new GenericStoreService<UserStoreInterface>({
		name: StoreKeysEnum.User,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};
