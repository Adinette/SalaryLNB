export const  EnvEnum  = {
	 LOCAL: "local",
  TEST: "test",
  	PRODUCTION:"production",

} as const
export type EnvEnum = typeof EnvEnum[keyof typeof EnvEnum]