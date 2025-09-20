import { defaultStoreState } from "@/constants";
import { StoreKeysEnum } from "@/enums";
import { GenericStoreService } from "@/services/generic_store_service";
import users from "../data/users";

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
