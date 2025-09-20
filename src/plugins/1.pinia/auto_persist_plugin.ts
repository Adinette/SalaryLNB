// plugins/piniaAutoPersistPlugin.ts
import { watch } from "vue";
import throttle from "lodash.throttle";
import { StoreKeysEnum } from "@/enums";
import { type GenericStoreService } from "@/services/generic_store_service";

interface PersistableStore {
	$state: object;
	$id: string;
}

interface PersistableService {
	save: (state: any) => Promise<void>;
	isCritical?: boolean;
}

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
