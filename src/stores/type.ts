import { UserStore } from "@/modules/users/store";
import { GlobalStore } from "./global";
import { FunctionStore } from "@/modules/functions/store";
import { PositionStore } from "@/modules/positions/store";

export type AppStore = GlobalStore | UserStore | FunctionStore | PositionStore