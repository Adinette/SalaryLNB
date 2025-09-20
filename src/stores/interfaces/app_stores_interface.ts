import { type AppLocalStorageService } from "@/services/local_storage";

export interface AppStoresInterface {
	global: AppLocalStorageService;
	// Add other stores here
	// Example: user: AppLocalStorageService;
}
