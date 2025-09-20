import { defaultStoreState } from "@/constants";
import { AppLocalesEnum } from "@/locales";
import { AppLocalStorageService } from "@/services/local_storage";

export class GlobalLocalStorageService extends AppLocalStorageService {
	static storeName = "global_store";

	constructor() {
		super(GlobalLocalStorageService.storeName);
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
