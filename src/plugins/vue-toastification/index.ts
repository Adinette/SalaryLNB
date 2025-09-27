import type { App } from "vue";
import Toast, { type PluginOptions, POSITION } from "vue-toastification";
// Import the CSS or use your own!

export default function setupVueToastification(app: App) {
	const options: PluginOptions = {
		// You can set your default options here
		position: POSITION.BOTTOM_RIGHT,
	};
	app.use(Toast, options);
}
