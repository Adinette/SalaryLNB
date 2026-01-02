import { openDB, type IDBPDatabase } from "idb";
import { AppCrypto } from "../appcrypto";
import config from "../config";
import { createLogger } from "../utils/logger";

const logger = createLogger("AppIndexedDBStorage");

const DB_NAME = config.env.apiUrl;
const STORE_NAME = "secure";
const PREFIX = "salary-lnb";
const ENCRYPTED_FLAG = "__ENCRYPTED__:";

let dbPromise: Promise<IDBPDatabase>;

function getDB() {
	if (!dbPromise) {
		dbPromise = openDB(DB_NAME, 1, {
			upgrade(db) {
				db.createObjectStore(STORE_NAME);
			},
		});
	}
	return dbPromise;
}

export default class AppIndexedDBStorage {
	static readonly AUTH_TOKEN_KEY = `${PREFIX}auth-token`;
	static readonly USER_DATA_KEY = `${PREFIX}user-data`;

	static async set<T>(key: string, value: T): Promise<void> {
		try {
			const serialized = JSON.stringify(value);
			const encrypted = await AppCrypto.encrypt(serialized);
			const flagged = `${ENCRYPTED_FLAG}${encrypted}`;
			const db = await getDB();
			await db.put(STORE_NAME, flagged, `${PREFIX}${key}`);
			logger.debug(`Encrypted value stored in IndexedDB for key "${key}"`);
		} catch (error) {
			logger.error(`Error storing key "${key}" in IndexedDB:`, error);
		}
	}

	static async get<T>(key: string): Promise<T | null> {
		try {
			const db = await getDB();
			const value = await db.get(STORE_NAME, `${PREFIX}${key}`);
			if (value === null || value === undefined) {
				logger.warn(`Key "${key}" not found in IndexedDB`);
				return null;
			}

			if (value.startsWith(ENCRYPTED_FLAG)) {
				const decrypted = await AppCrypto.decrypt(value.slice(ENCRYPTED_FLAG.length));
				return JSON.parse(decrypted) as T;
			}

			logger.warn(`Value for key "${key}" is not encrypted!`);
			return JSON.parse(value) as T;
		} catch (error) {
			logger.error(`Error retrieving key "${key}" from IndexedDB:`, error);
			return null;
		}
	}

	static async remove(key: string): Promise<void> {
		try {
			const db = await getDB();
			await db.delete(STORE_NAME, `${PREFIX}${key}`);
		} catch (error) {
			logger.error(`Error removing key "${key}" from IndexedDB:`, error);
		}
	}

	static async has(key: string): Promise<boolean> {
		const db = await getDB();
		return (await db.get(STORE_NAME, `${PREFIX}${key}`)) !== undefined;
	}

	static async clear(): Promise<void> {
		try {
			const db = await getDB();
			const tx = db.transaction(STORE_NAME, "readwrite");
			const store = tx.objectStore(STORE_NAME);
			const keys = await store.getAllKeys();
			for (const key of keys) {
				if (typeof key === "string" && key.startsWith(PREFIX)) {
					await store.delete(key);
				}
			}
			await tx.done;
		} catch (error) {
			logger.error("Error clearing IndexedDB store:", error);
		}
	}

	static async setAuthToken(token: string): Promise<void> {
		await this.set(this.AUTH_TOKEN_KEY, token);
	}

	static async getAuthToken(): Promise<string | null> {
		return this.get<string>(this.AUTH_TOKEN_KEY);
	}

	static async isAuthenticated(): Promise<boolean> {
		return this.has(this.AUTH_TOKEN_KEY);
	}

	static async setUserData<T>(userData: T): Promise<void> {
		await this.set(this.USER_DATA_KEY, userData);
	}

	static async getUserData<T>(): Promise<T | null> {
		return this.get<T>(this.USER_DATA_KEY);
	}

	static async clearAuth(): Promise<void> {
		await this.remove(this.AUTH_TOKEN_KEY);
		await this.remove(this.USER_DATA_KEY);
		logger.info("Authentication data cleared from IndexedDB");
	}
}
