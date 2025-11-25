import { defaultStoreState } from "../../constants";
import { AppLocalesEnum } from "../../locales";
import AppLocalStorageService from "../../services/AppLocalStorage";
import type { GlobalStoreInterface } from "../interfaces/global_store_interface";

export class GlobalLocalStorageService extends AppLocalStorageService {
	static storeName = "global_store";
	load: any;
	save: any;

	constructor() {
		super();
	}

	get default(): GlobalStoreInterface {
		return {
			...defaultStoreState,
			session: null,
			locale: AppLocalesEnum.fr, // Default locale
			alerts: [],
		};
	}

	async initialize(): Promise<GlobalStoreInterface> {
		const cached = (await this.load()) as GlobalStoreInterface;

		if (cached)
			return {
				...cached,
				...defaultStoreState,
				loading: false,
			};

		this.save(this.default);

		return this.default;
	}
}
