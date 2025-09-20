import { ref, onUnmounted } from "vue";

export function useBootstrapToast() {
	const containerId = "global-bootstrap-toast-container";
	let container: HTMLElement | null = null;

	function ensureContainer() {
		container = document.getElementById(containerId);
		if (!container) {
			container = document.createElement("div");
			container.id = containerId;
			container.className = "position-fixed bottom-0 end-0 p-3";
			container.style.zIndex = "9999";
			document.body.appendChild(container);
		}
	}

	function show({
		title,
		message,
		icon,
		delay = 4000,
	}: {
		title: string;
		message: string;
		icon?: string;
		delay?: number;
	}) {
		ensureContainer();
		const toastId = `toast-${Date.now()}`;
		const toastHtml = `
      <div id="${toastId}" class="toast fade hide" data-delay="${delay}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          ${icon ? `<i class="${icon} me-2"></i>` : ""}
          <strong class="me-auto">${title}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;
		container!.insertAdjacentHTML("beforeend", toastHtml);
		const toastEl = document.getElementById(toastId);
		// @ts-ignore
		const toast = new window.bootstrap.Toast(toastEl);
		toast.show();
		toastEl?.addEventListener("hidden.bs.toast", () => toastEl.remove());
	}

	onUnmounted(() => {
		// Optionnel : nettoyer le container si besoin
	});

	return { show };
}
