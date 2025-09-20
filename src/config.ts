import { DarkModeEnum, EnvEnum, MainContentModeEnum } from "./enums";
import { ApiModeEnum } from "./enums/api_mode_enum";
import type { TemplateSettingsInterface } from "./stores/interfaces/template_settings_interface";
import appEnv from "./env";


const env = appEnv[EnvEnum.PRODUCTION];

const templateSettings: TemplateSettingsInterface = {
	colorTheme: ColorThemeEnum,
	darkMode: DarkModeEnum.System,
	darkModeActive: null,
	sidebarLeft: true,
	sidebarMini: false,
	sidebarDark: false,
	sidebarVisibleDesktop: true,
	sidebarVisibleMobile: true,
	sideOverlayVisible: false,
	sideOverlayHoverable: false,
	pageOverlay: false,
	headerFixed: true,
	headerDark: false,
	headerSearch: false,
	headerLoader: false,
	pageLoader: false,
	rtlSupport: false,
	sideTransitions: true,
	mainContent: MainContentModeEnum.Full,
};

const config = {
	env,
	templateSettings,
	apiMode: ApiModeEnum.LIVE,
};

export default config;

export { config };
