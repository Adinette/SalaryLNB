import { UserModel } from "@/modules/users/models/user_model";

export class SessionModel implements SessionInterface {
  user: UserModel;
  token: string;

  constructor(data: SessionInterface) {
    this.user = new UserModel(data.user);
    this.token = data.token;
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
