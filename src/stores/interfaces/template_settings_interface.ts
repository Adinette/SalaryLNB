import { ColorThemeEnum, DarkModeEnum, MainContentModeEnum } from "../../enums";

export interface TemplateSettingsInterface {
	colorTheme: ColorThemeEnum;
	darkMode: DarkModeEnum;
	darkModeActive: boolean | null;
	sidebarLeft: boolean;
	sidebarMini: boolean;
	sidebarDark: boolean;
	sidebarVisibleDesktop: boolean;
	sidebarVisibleMobile: boolean;
	sideOverlayVisible: boolean;
	sideOverlayHoverable: boolean;
	pageOverlay: boolean;
	headerFixed: boolean;
	headerDark: boolean;
	headerSearch: boolean;
	headerLoader: boolean;
	pageLoader: boolean;
	rtlSupport: boolean;
	sideTransitions: boolean;
	mainContent: MainContentModeEnum;
}
