import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import type { MachineStoreInterface } from "../interfaces";
import { StoreKeysEnum } from "../../../enums";
import { GenericStoreService } from "../../../services/generic_store_service";
import { defaultStoreState } from "../../../constants";

export const machineStoreDefinition: AppStoreDefinition<MachineStoreInterface> = {
	key: StoreKeysEnum.Machine,
	service: new GenericStoreService<MachineStoreInterface>({
		name: StoreKeysEnum.Machine,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};
