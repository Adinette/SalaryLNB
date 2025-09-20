import { createPinia } from "pinia";
import type { App } from "vue";
import { createAutoPersistPlugin } from "./auto_persist_plugin";
import { StoreKeysEnum } from "@/enums";

export default function (app: App) {
  const pinia = createPinia();
  pinia.use(
    createAutoPersistPlugin({
      [StoreKeysEnum.Global]: {
        service: globalStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Permission]: {
        service: permissionStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Role]: undefined,
      [StoreKeysEnum.Position]: {
        service: positionStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.User]: {
        service: userStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.application]: undefined,
      [StoreKeysEnum.Department]: {
        service: departmentStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.Employee]: {
        service: employeeStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.sprintObjective]: {
        service: sprintObjectiveStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.sprintTracking]: {
        service: sprintTrackingStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
      [StoreKeysEnum.sprintEvaluation]: {
        service: sprintEvaluationStoreDefinition.service,
        throttleMs: 1000, // 1 second throttle for non-critical stores
      },
    })
  );
  app.use(pinia);
  // initializeStores()
}
