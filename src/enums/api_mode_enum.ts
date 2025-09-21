export const ApiModeEnum = {
  MOCK: "mock",
  LIVE: "live",
} as const

export type ApiModeEnum = typeof ApiModeEnum[keyof typeof ApiModeEnum]
