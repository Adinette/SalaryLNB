import { ApiResourceModel } from "../../../models/ApiResourceModel";
import type { UserInterface } from "../interfaces";

export class UserModel extends ApiResourceModel implements UserInterface {
  first_name: UserInterface["first_name"];
  last_name: UserInterface["last_name"];
  email: UserInterface["email"];
  phone: UserInterface["phone"];
  role?: UserInterface["role"];

  constructor(data: UserInterface) {
    super(data);
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
  }

  get interface(): UserInterface {
    return {
      ...super.interface,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      role: this.role,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

}
