import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import type { OperatorStoreInterface } from "../interfaces";
import { StoreKeysEnum } from "../../../enums";
import { GenericStoreService } from "../../../services/generic_store_service";
import { defaultStoreState } from "../../../constants";

export const operatorStoreDefinition: AppStoreDefinition<OperatorStoreInterface> = {
	key: StoreKeysEnum.Operator,
	service: new GenericStoreService<OperatorStoreInterface>({
		name: StoreKeysEnum.Operator,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};
