// services/AppStorageService.ts
import AppIndexedDBStorage from "./app_indexed_db_storage";
import AppSessionStorage from "./AppSessionStorage";
import { createLogger } from "../utils/logger";
import { StoreKeysEnum } from "../enums";
import type { AppStore } from "../stores/type";

const logger = createLogger("AppStorageService");

/**
 * Options pour le service de stockage
 */
export interface AppStorageOptions<T, AppStore> {
	persistent?: boolean;
	pinia?: {
		store: AppStore;
		action?: (value: T) => void;
		getter?: () => T | null;
	};
}

/**
 * Service de stockage générique pour Vue 3 avec Pinia
 */
export class AppStorageService {
	private prefix: string;

	constructor({ name }: { name: string }) {
		this.prefix = name.toLowerCase();
		logger.info(`Service de stockage initialisé pour "${this.prefix}"`);
	}

	get storageKey(): string {
		return `${this.prefix}-storage`;
	}

	computeStorageKey(key: string): string {
		return `${this.storageKey}-${key}`.toLowerCase();
	}

	/**
	 * Enregistre une donnée localement + dans le store si fourni
	 */
	async set<T>(
		key: StoreKeysEnum,
		value: T,
		options: AppStorageOptions<T, AppStore> = {}
	): Promise<void> {
		const fullKey = this.computeStorageKey(key);
		const { persistent = true, pinia } = options;

		try {
			if (pinia?.action) {
				pinia.action(value);
				logger.debug(`Action Pinia dispatchée pour "${key}"`);
			}

			if (persistent) {
				await AppIndexedDBStorage.set(fullKey, value);
				logger.debug(`Donnée persistée dans indexedDB pour "${key}"`);
			} else {
				await AppSessionStorage.set(fullKey, value);
				logger.debug(`Donnée persistée dans sessionStorage pour "${key}"`);
			}
		} catch (error) {
			logger.error(`Erreur lors du stockage de "${key}"`, error);
		}
	}

	/**
	 * Récupère une donnée depuis Pinia, sessionStorage ou indexedDB
	 */
	async get<T>(key: string, options: AppStorageOptions<T, AppStore> = {}): Promise<T | null> {
		const fullKey = this.computeStorageKey(key);
		const { pinia } = options;

		try {
			if (pinia?.getter) {
				const value = pinia.getter();
				if (value !== null && value !== undefined) {
					logger.debug(`Valeur trouvée dans Pinia pour "${key}"`);
					return value;
				}
			}

			const sessionValue = await AppSessionStorage.get<T>(fullKey);
			if (sessionValue !== null) {
				logger.debug(`Valeur récupérée depuis sessionStorage pour "${key}"`);
				if (pinia?.action) pinia.action(sessionValue);
				return sessionValue;
			}

			const persistedValue = await AppIndexedDBStorage.get<T>(fullKey);
			if (persistedValue !== null) {
				logger.debug(`Valeur récupérée depuis indexedDB pour "${key}"`, { persistedValue });
				if (pinia?.action) pinia.action(persistedValue);
				return persistedValue;
			}

			return null;
		} catch (error) {
			logger.error(`Erreur lors de la récupération de "${key}"`, error);
			return null;
		}
	}

	remove(key: string): void {
		const fullKey = this.computeStorageKey(key);
		try {
			AppIndexedDBStorage.remove(fullKey);
			AppSessionStorage.remove(fullKey);
			logger.debug(`Clé "${key}" supprimée`);
		} catch (error) {
			logger.error(`Erreur lors de la suppression de "${key}"`, error);
		}
	}

	clear(): void {
		try {
			const prefix = this.storageKey;
			Object.keys(window.sessionStorage)
				.filter((key) => key.startsWith(prefix))
				.forEach((key) => window.sessionStorage.removeItem(key));

			Object.keys(window.indexedDB)
				.filter((key) => key.startsWith(prefix))
				.forEach((key) => AppIndexedDBStorage.remove(key));

			logger.info(`Tous les éléments liés à "${this.prefix}" ont été supprimés`);
		} catch (error) {
			logger.error(`Erreur lors du nettoyage de "${this.prefix}"`, error);
		}
	}

	static clearAll(): void {
		AppSessionStorage.clear();
		AppIndexedDBStorage.clear();
		logger.info("Tous les storages applicatifs ont été vidés");
	}
}


// export class AppStorageService {
//   constructor({ name }: { name: string }) {}
//   computeStorageKey(key: string) { return `debug-${key}`; }
//   async get<T>(key: string) {
//     try { const raw = localStorage.getItem(this.computeStorageKey(key)); return raw ? JSON.parse(raw) as T : null; } catch { return null; }
//   }
//   async set<T>(key: string, value: T) {
//     try { localStorage.setItem(this.computeStorageKey(key), JSON.stringify(value)); } catch {}
//   }
//   remove(key: string) { localStorage.removeItem(this.computeStorageKey(key)); }
// }