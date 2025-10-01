import type { OperatorSalaryStore } from "..";
import { appLogger } from "../../../../utils/logger";
import type { OperatorSalaryModel } from "../../models/operator-salary-model";


/**
 * setOperatorSalarys action
 *
 * @param {OperatorSalaryStore} store - The Pinia store instance
 * @param {Object} [payload={}] - Optional parameters
 * @returns {Promise<void>}
 */
export async function setOperatorSalary(
	store: OperatorSalaryStore,
	payload: { users?: OperatorSalaryModel[] } = {}
): Promise<void> {
	store.loading = true;
	appLogger.info(`[🍍][${store.$id}]: Executing setOperatorSalarys()`);

	store.elements = payload.users || [];

	store.loading = false;
	appLogger.success(`[🍍][${store.$id}]: setOperatorSalarys() completed`);
}
