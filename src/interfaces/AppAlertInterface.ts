export type AppAlertType =
	| "primary"
	| "secondary"
	| "success"
	| "info"
	| "warning"
	| "danger"
	| "dark"
	| "light";

export interface AppAlertInterface {
	id: string;
	type: AppAlertType;
	title: string;
	message: string;
	closable?: boolean;
	onClose?: (id: AppAlertInterface["id"]) => void;
}
