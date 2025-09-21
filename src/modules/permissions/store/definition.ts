
  import { defaultStoreState } from "@/constants";
import { StoreKeysEnum } from "@/enums";
import { GenericStoreService } from "@/services/generic_store_service";

export const permissionStoreDefinition: AppStoreDefinition<PermissionStoreInterface> = {
	key: StoreKeysEnum.Permission,
	service: new GenericStoreService<PermissionStoreInterface>({
		name: StoreKeysEnum.Permission,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};

