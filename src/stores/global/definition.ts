import { defaultStoreState } from "../../constants";
import { StoreKeysEnum } from "../../enums";
import { AppLocalesEnum } from "../../locales";
import type { GlobalStoreInterface } from "../interfaces/global_store_interface";

export const globalStoreDefinition = {
	key: StoreKeysEnum.Global,
	defaults: {
		...defaultStoreState,
		session: null,
		locale: AppLocalesEnum.fr,
		alerts: [],
	},
};
