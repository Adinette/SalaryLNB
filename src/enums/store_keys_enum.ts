export const StoreKeysEnum = {
  Operator: "Operator",
  OperatorSalary: "OperatorSalary",
    Machine: "Machine",
  User: "User",
    Global: "Global",

} as const;

export type StoreKeysEnum = typeof StoreKeysEnum[keyof typeof StoreKeysEnum];
