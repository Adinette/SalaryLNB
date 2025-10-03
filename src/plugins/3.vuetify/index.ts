import type { App } from "vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import defaults from "./components";
import * as directives from "vuetify/directives";

// Components
import { themes } from "./theme";
import { VBtn } from "vuetify/components/VBtn";
import { useTemplateStore } from "../../stores/template";
import { DarkModeEnum } from "../../enums";

export default function (app: App) {
	const templateStore = useTemplateStore();

	const vuetify = createVuetify({
		aliases: {
			IconBtn: VBtn,
		},
		defaults,
		directives,
		theme: {
			defaultTheme: templateStore.settings.darkMode === DarkModeEnum.On ? "dark" : "light",
			themes,
		},
	});

	app.use(vuetify);
}
