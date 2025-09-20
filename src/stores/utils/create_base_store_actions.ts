import { GenericStoreService } from "@/services/generic_store_service";

export function createBaseStoreActions<T>(service: GenericStoreService<T>) {
	return {
		async initialize(store: any, { reset = false } = {}) {
			if (store.initialized && !reset) return;
			store.setLoading(true);
			const state = await service.initialize({ reset });
			store.$patch(state);
			store.setLoading(false);
			store.initialized = true;
		},
		setLoading(store: any, loading: boolean) {
			appLogger.debug(`Setting loading state to ${loading} for store ${store.$id}`);
			store.loading = loading;
		},
	};
}
