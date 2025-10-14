import { RoleModel } from "../../roles/models/role_model";
import { UserModel } from "../../users/models/user_model";
import type { SessionInterface } from "../interfaces/session_interface";

export class SessionModel implements SessionInterface {
  user: UserModel;
  token: string;
  role?: RoleModel;

  constructor(data: SessionInterface) {
    this.user = new UserModel(data.user);
    this.token = data.token;
    this.role = data.role ? new RoleModel(data.role) : undefined;
  }

  get interface(): SessionInterface {
    return {
      user: this.user.interface,
      token: this.token,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }
}
