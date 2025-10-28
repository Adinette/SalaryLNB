import type { AppStoreDefinition } from "../../../interfaces/app_store_definition_interface";
import type { OperatorSalaryStoreInterface } from "../interfaces";
import { StoreKeysEnum } from "../../../enums";
import { GenericStoreService } from "../../../services/generic_store_service";
import { defaultStoreState } from "../../../constants";

export const operatorSalaryStoreDefinition: AppStoreDefinition<OperatorSalaryStoreInterface> = {
	key: StoreKeysEnum.OperatorSalary,
	service: new GenericStoreService<OperatorSalaryStoreInterface>({
		name: StoreKeysEnum.OperatorSalary,
		defaults: {
			...defaultStoreState,
			elements: [],
		},
	}),
};
