import type { ListApiArgsInterface } from "../../../api/interfaces/list_api_args_interface";

export interface UserListFilterInterface extends ListApiArgsInterface {
  is_active?: boolean;
  role?: string;
}
