// plugins/piniaAutoPersistPlugin.ts
import { watch } from "vue";
import throttle from "lodash.throttle";
import { StoreKeysEnum } from "./../../enums";
import { type GenericStoreService } from "./../../services/generic_store_service";
import { createLogger } from "../../utils/logger";

interface PersistableStore {
	$state: object;
	$id: string;
	$patch: (state: object) => void;
}

// interface PersistableService {
// 	save: (state: any) => Promise<void>;
// 	isCritical?: boolean;
// }

interface AutoPersistedOptions<T = unknown> {
	service: GenericStoreService<T>;
	throttleMs?: number;
}

export function createAutoPersistPlugin(
	optionsMap: Record<StoreKeysEnum, AutoPersistedOptions | undefined>
) {
	return ({ store }: { store: PersistableStore }) => {
		const options = optionsMap[store.$id as StoreKeysEnum];
		if (!options) return; // skip stores without auto-persist config

		const { service, throttleMs = 1000 } = options;
		const shouldThrottle = !service.isCritical;
		const logger = createLogger(`AutoPersistPlugin<${store.$id}>`);

		// Load persisted state on initialization
		service
			.load()
			.then((persistedState) => {
				if (persistedState) {
					logger.debug("rehydrating store from persisted state", persistedState);
					store.$patch(persistedState);
				}
			})
			.catch((error) => {
				logger.error("Failed to load persisted state:", error);
			});

		const persist = shouldThrottle
			? throttle((state: any) => service.save(state), throttleMs, { trailing: true })
			: (state: any) => service.save(state);
		watch(
			() => store.$state,
			(newState) => {
				persist(newState);
			},
			{ deep: true }
		);
	};
}
