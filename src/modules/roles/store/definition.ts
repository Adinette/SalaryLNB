import { defaultStoreState } from "../../../constants";
import { StoreKeysEnum } from "../../../enums";
import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import { GenericStoreService } from "../../../services/generic_store_service";
import type { RoleStoreInterface } from "../interfaces";

export const roleStoreDefinition: AppStoreDefinition<RoleStoreInterface> = {
	key: StoreKeysEnum.Role,
	service: new GenericStoreService<RoleStoreInterface>({
		name: StoreKeysEnum.Role,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};

