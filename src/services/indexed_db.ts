import { AppCrypto } from "../appcrypto";
import { AppUtils } from "../utils";

interface IndexedDBServiceOptions {
	dbName: string;
}

export class AppIndexedDBService {
	private dbName: string;
	private storeName = "stores";

	constructor({ dbName }: IndexedDBServiceOptions) {
		this.dbName = dbName;
		this.initDB();
	}

	private initDB(): void {
		const request = indexedDB.open(this.dbName, 1);

		request.onupgradeneeded = (event:any) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(this.storeName))
				db.createObjectStore(this.storeName, { keyPath: "key" });
		};
		request.onerror = (event:any) => {
			AppUtils.logger.error("Failed to open IndexedDB:", event);
		};
	}

	private async getItemFromDB(key: string): Promise<string | null> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName);

			request.onsuccess = () => {
				const db = request.result;
				const transaction = db.transaction(this.storeName, "readonly");
				const store = transaction.objectStore(this.storeName);
				const getRequest = store.get(key);

				getRequest.onsuccess = () => {
					resolve(getRequest.result ? getRequest.result.value : null);
				};
				getRequest.onerror = () => reject(new Error("Failed to retrieve item from IndexedDB."));
			};
			request.onerror = () => reject(new Error("Failed to open IndexedDB."));
		});
	}

	private async setItemInDB(key: string, value: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName);

			request.onsuccess = () => {
				const db = request.result;
				const transaction = db.transaction(this.storeName, "readwrite");
				const store = transaction.objectStore(this.storeName);
				const putRequest = store.put({ key, value });

				putRequest.onsuccess = () => resolve();
				putRequest.onerror = () => reject(new Error("Failed to store item in IndexedDB."));
			};
			request.onerror = () => reject(new Error("Failed to open IndexedDB."));
		});
	}

	remove(key: string): void {
		const request = indexedDB.open(this.dbName);

		request.onsuccess = () => {
			const db = request.result;
			const transaction = db.transaction(this.storeName, "readwrite");
			const store = transaction.objectStore(this.storeName);

			store.delete(key);
		};
	}

	clear(): void {
		const request = indexedDB.open(this.dbName);

		request.onsuccess = () => {
			const db = request.result;
			const transaction = db.transaction(this.storeName, "readwrite");
			const store = transaction.objectStore(this.storeName);

			store.clear();
			AppUtils.logger.info("IndexedDB storage cleared.");
		};
	}

	async get(key: string): Promise<string | null> {
		try {
			const item = await this.getItemFromDB(key);

			return item ? await AppCrypto.decrypt(item) : null;
		} catch (error) {
			AppUtils.logger.error(`Failed to decrypt IndexedDB item with key "${key}":`, error);

			return null;
		}
	}

	async set(key: string, value: string): Promise<void> {
		try {
			const encryptedValue = await AppCrypto.encrypt(value);

			await this.setItemInDB(key, encryptedValue);
		} catch (error) {
			AppUtils.logger.error(`Failed to encrypt and set IndexedDB item with key "${key}":`, error);
		}
	}

	async setWithExpiry(key: string, value: string, ttl: number = 30 * 60 * 1000): Promise<void> {
		const expiry = Date.now() + ttl;
		const data = { value, expiry };

		await this.set(key, JSON.stringify(data));
	}

	async getWithExpiry(key: string): Promise<string | null> {
		const data = await this.get(key);
		if (data) {
			const { value, expiry } = JSON.parse(data);
			if (Date.now() < expiry) {
				return value;
			} else {
				this.remove(key);

				return null;
			}
		}

		return null;
	}
}
