export type SidebarVisibilityEnum = "open" | "close" | "toggle";

export type SidebarMiniEnum = "on" | "off" | "toggle";

export type SidebarPositionEnum = "left" | "right" | "toggle";

export type SidebarStyleEnum = "dark" | "light" | "toggle";

export type SideOverlayEnum = "open" | "close" | "toggle";

export type SideOverlayHoverEnum = "on" | "off" | "toggle";

export type PageOverlayEnum = "on" | "off" | "toggle";

export type HeaderEnum = "fixed" | "static" | "toggle";

export type HeaderStyleEnum = "dark" | "light" | "toggle";

export type HeaderSearchEnum = "on" | "off" | "toggle";

export type HeaderLoaderEnum = "on" | "off" | "toggle";

export type PageLoaderEnum = "on" | "off" | "toggle";

export type MainContentEnum = "full" | "boxed" | "narrow";

// enums.ts
export const ColorThemeEnum = {
  Default: "",
  Amethyst: "amethyst",
  City: "city",
  Flat: "flat",
  Modern: "modern",
  Smooth: "smooth",
} as const;

export type ColorThemeEnum = typeof ColorThemeEnum[keyof typeof ColorThemeEnum];

export const DarkModeEnum = {
  On: "on",
  Off: "off",
  System: "system",
} as const;

export type DarkModeEnum = typeof DarkModeEnum[keyof typeof DarkModeEnum];


export type LayoutEnum = "header" | "sidebar" | "sideOverlay" | "footer";

export type LayoutModeEnum = "open" | "close" | "toggle";

export type SidebarModeEnum = "open" | "close" | "toggle";

export type SidebarMiniModeEnum = "on" | "off" | "toggle";

export type SidebarPositionModeEnum = "left" | "right" | "toggle";

export type SidebarStyleModeEnum = "dark" | "light" | "toggle";

export type DarkModeModeEnum = "on" | "off" | "system";

// export type MainContentModeEnum = "" | "boxed" | "narrow";

// ---- MainContentMode ----
export const MainContentModeEnum = {
  Default: "",
  Boxed: "boxed",
  Narrow: "narrow",
} as const;
export type MainContentModeEnum = typeof MainContentModeEnum[keyof typeof MainContentModeEnum];


export type HeaderModeEnum = "fixed" | "static" | "toggle";

export type HeaderStyleModeEnum = "dark" | "light" | "toggle";

export type HeaderSearchModeEnum = "on" | "off" | "toggle";

export type HeaderLoaderModeEnum = "on" | "off" | "toggle";

export type PageLoaderModeEnum = "on" | "off" | "toggle";

export type PageOverlayModeEnum = "on" | "off" | "toggle";

export type SideOverlayModeEnum = "open" | "close" | "toggle";
