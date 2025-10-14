import { defaultStoreState } from "../../../constants";
import { StoreKeysEnum } from "../../../enums";
import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import { GenericStoreService } from "../../../services/generic_store_service";
import type { PermissionStoreInterface } from "../interfaces/permission_store_interface";


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

