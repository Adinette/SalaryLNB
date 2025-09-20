// services/storage/generic_store_service.ts

import { StoreKeysEnum } from "@/enums";
import { AppStorageService } from "./app_storage_service";
import { AppLogger } from "@/utils/logger";

export interface GenericStoreOptions<T> {
	name: StoreKeysEnum;
	defaults: T;
	isCritical?: boolean; // Set to true if this store should not be throttled
}

export class GenericStoreService<T> {
	private _defaults: T;
	public isCritical = false; // Set to true if this store should not be throttled
	protected storageService: AppStorageService;
	protected storeKey: StoreKeysEnum;

	get logger(): AppLogger {
		return createLogger(`StoreService<${this.storeKey}>`);
	}

	constructor({ name, defaults, isCritical }: GenericStoreOptions<T>) {
		this._defaults = defaults;
		this.isCritical = isCritical ?? false; // Default to false if not specified
		this.storageService = new AppStorageService({ name });
		this.storeKey = name;
	}

	async initialize({ reset = false }: { reset?: boolean } = {}): Promise<T> {
		const cached = await this.load();
		if (cached && !reset) return { ...this._defaults, ...cached, loading: false };
		await this.save(this._defaults);
		return this._defaults;
	}

	async load(): Promise<T | null> {
		const data = await this.storageService.get<T>(this.storeKey);
		return data ? (data as T) : null;
	}

	async save(state: T): Promise<void> {
		// should throttle if isCritical is false
		if (!this.isCritical) {
			const current = await this.load();
			if (JSON.stringify(current) === JSON.stringify(state)) {
				this.logger.debug(`No changes detected for store "${this.storeKey}", skipping save.`);
				return; // No changes, no need to save
			}
		}
		state = { ...this._defaults, ...state, loading: false }; // Ensure loading is always false
		// Save the state to storage
		this.logger.debug(`Saving state for store "${this.storeKey}":`, { state });
		await this.storageService.set(this.storeKey, state, {
			persistent: true,
		});
	}

	clear(): void {
		this.logger.debug(`Clearing store "${this.storeKey}"`);
		this.storageService.remove(this.storeKey);
	}

	get defaults(): T {
		return this._defaults;
	}
}
