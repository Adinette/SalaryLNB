export const AppLocalesEnum = {
	fr: "fr",
	en: "en",
} as const;

export type AppLocalesEnum = typeof AppLocalesEnum[keyof typeof AppLocalesEnum];
