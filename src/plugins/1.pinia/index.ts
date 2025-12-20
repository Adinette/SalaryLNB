import { createPinia } from "pinia";
import type { App } from "vue";
import { createAutoPersistPlugin } from "./auto_persist_plugin";
import { StoreKeysEnum } from "../../enums";
import { globalStoreDefinition } from "../../stores/global/definition";
import { operatorStoreDefinition } from "../../modules/operator/store/definition";
import { machineStoreDefinition } from "../../modules/machine/store/definition";
import { userStoreDefinition } from "../../modules/users/store/definition";
import { operatorSalaryStoreDefinition } from "../../modules/operator-salary/store/definition";

export default function (app: App) {
  const pinia = createPinia();
  pinia.use(
    createAutoPersistPlugin({
      [StoreKeysEnum.Global]: {
        service: globalStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Operator]: {
        service: operatorStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.OperatorSalary]: {
        service: operatorSalaryStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Machine]: {
        service: machineStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.User]: {
        service: userStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Role]: undefined, // Add Role key with undefined or appropriate value
      [StoreKeysEnum.Permission]: undefined, // Add Permission key with undefined or appropriate value
    })
  );
  app.use(pinia);
  // initializeStores()
}