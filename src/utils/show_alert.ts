import Swal from "sweetalert2";

interface AlertArgs {
	title?: string;
	html: string;
	icon?: "warning" | "error" | "success" | "info" | "question";
	showCancelButton?: boolean;
	confirmButtonText?: string;
	cancelButtonText?: string;
	reverseButtons?: boolean;
	target?: string | HTMLElement | null | undefined;
	onConfirm?: () => void;
	onCancel?: () => void;
}

export const showAlert = ({
	title = "Attention !",
	html,
	icon = "warning",
	showCancelButton = true,
	confirmButtonText = "OK",
	cancelButtonText = "Annuler",
	reverseButtons = true,
	target = "body",
	onConfirm,
	onCancel,
}: AlertArgs) => {
	Swal.fire({
		title,
		html,
		icon,
		showCancelButton,
		confirmButtonColor: "#00549D",
		cancelButtonColor: "#fff",
		confirmButtonText,
		cancelButtonText,
		reverseButtons,
		target,
		customClass: {
			confirmButton: "text-white",
			cancelButton: "text-dark",
		},
	}).then(async (response) => {
		if (response.isConfirmed) onConfirm?.();
		else onCancel?.();
	});
};
