/**
 * Utility class for interacting with localStorage.
 * Provides a type-safe interface to persist, retrieve, and remove data.
 * All values are automatically encrypted before storage and decrypted upon retrieval.
 */

import { AppCrypto } from "../appcrypto";
import { createLogger } from "../utils/logger";

// Logger dedicated to this class
const logger = createLogger("AppLocalStorage");

export default class AppLocalStorage {
	/**
	 * Prefix used for all stored keys to prevent collision with other apps.
	 */
	private static readonly PREFIX = "salary-lnb";

	/**
	 * Key for storing persistent authentication token.
	 */
	static readonly AUTH_TOKEN_KEY = `${AppLocalStorage.PREFIX}auth-token`;

	/**
	 * Key for storing user preferences.
	 */
	static readonly USER_PREFERENCES_KEY = `${AppLocalStorage.PREFIX}user-preferences`;

	/**
	 * Indicates if a stored value is encrypted.
	 */
	private static readonly ENCRYPTED_FLAG = "__ENCRYPTED__:";

	/**
	 * Stores a value in localStorage with encryption.
	 * @param key - The key under which to store the value.
	 * @param value - The value to store (will be JSON stringified and encrypted).
	 */
	static async set<T>(key: string, value: T): Promise<void> {
		try {
			// Convert to JSON
			const serializedValue = JSON.stringify(value);

			// Encrypt the value
			const encryptedValue = await AppCrypto.encrypt(serializedValue);

			// Add a flag indicating the value is encrypted
			const flaggedValue = `${this.ENCRYPTED_FLAG}${encryptedValue}`;

			// Store in localStorage
			window.localStorage.setItem(`${this.PREFIX}${key}`, flaggedValue);
			logger.debug(`Encrypted value stored for key "${key}"`);
		} catch (error) {
			logger.error(`Error storing secure key "${key}" in localStorage:`, error);
		}
	}

	/**
	 * Retrieves and decrypts a value from localStorage.
	 * @param key - The key to retrieve.
	 * @returns The decrypted stored value, or null if the key does not exist or on error.
	 */
	static async get<T>(key: string): Promise<T | null> {
		try {
			const value = window.localStorage.getItem(`${this.PREFIX}${key}`);

			if (value === null || value === undefined) {
				logger.warn(`Key "${key}" not found in localStorage`);
				return null;
			}

			// Check if the value is encrypted
			if (value.startsWith(this.ENCRYPTED_FLAG)) {
				// Extract the encrypted part (without the flag)
				const encryptedValue = value.substring(this.ENCRYPTED_FLAG.length);

				// Decrypt the value
				const decryptedValue = await AppCrypto.decrypt(encryptedValue);

				// Parse the JSON value
				const parsedValue = JSON.parse(decryptedValue) as T;
				logger.debug(`Decrypted value retrieved for key "${key}"`);
				return parsedValue;
			} else {
				// Unencrypted value (for backward compatibility)
				logger.warn(`Value for key "${key}" is not encrypted!`);
				return JSON.parse(value) as T;
			}
		} catch (error) {
			logger.error(`Error retrieving key "${key}" from localStorage:`, error);
			return null;
		}
	}

	/**
	 * Removes a value from localStorage.
	 * @param key - The key to remove.
	 */
	static remove(key: string): void {
		try {
			window.localStorage.removeItem(key);
			logger.debug(`Key "${key}" removed from localStorage`);
		} catch (error) {
			logger.error(`Error removing key "${key}" from localStorage:`, error);
		}
	}

	/**
	 * Checks if a key exists in localStorage.
	 * @param key - The key to check.
	 * @returns true if the key exists, false otherwise.
	 */
	static has(key: string): boolean {
		return window.localStorage.getItem(key) !== null;
	}

	/**
	 * Clears all localStorage entries associated with this application.
	 * Only removes keys starting with the prefix.
	 */
	static clear(): void {
		try {
			// Only remove keys related to our application
			Object.keys(window.localStorage)
				.filter((key) => key.startsWith(AppLocalStorage.PREFIX))
				.forEach((key) => window.localStorage.removeItem(key));
			logger.debug("LocalStorage cleared for the application");
		} catch (error) {
			logger.error("Error clearing localStorage:", error);
		}
	}

	/**
	 * Stores the authentication token securely.
	 * @param token - JWT authentication token.
	 */
	static async setAuthToken(token: string): Promise<void> {
		await this.set(this.AUTH_TOKEN_KEY, token);
	}

	/**
	 * Retrieves the authentication token securely.
	 * @returns The decrypted authentication token or null.
	 */
	static async getAuthToken(): Promise<string | null> {
		return this.get<string>(this.AUTH_TOKEN_KEY);
	}

	/**
	 * Checks if a persistent authentication token exists.
	 * @returns true if a persistent authentication token is present, false otherwise.
	 */
	static hasAuthToken(): boolean {
		return this.has(this.AUTH_TOKEN_KEY);
	}

	/**
	 * Stores user preferences securely.
	 * @param preferences - Object containing user preferences.
	 */
	static async setUserPreferences<T>(preferences: T): Promise<void> {
		await this.set(this.USER_PREFERENCES_KEY, preferences);
	}

	/**
	 * Retrieves user preferences securely.
	 * @returns The decrypted user preferences or null.
	 */
	static async getUserPreferences<T>(): Promise<T | null> {
		return this.get<T>(this.USER_PREFERENCES_KEY);
	}

	/**
	 * Removes persistent authentication data.
	 */
	static clearAuth(): void {
		this.remove(this.AUTH_TOKEN_KEY);
		logger.info("Authentication data removed");
	}
}
