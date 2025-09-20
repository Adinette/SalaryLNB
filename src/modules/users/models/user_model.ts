import { AppRole, AppRoles } from "@/modules/roles/enums/role_enum";
import { UserInterface } from "../interfaces";
import { EmployeeModel } from "@/modules/employees/models/employee_model";

export class UserModel extends ApiResourceModel implements UserInterface {
  first_name: UserInterface["first_name"];
  last_name: UserInterface["last_name"];
  email: UserInterface["email"];
  phone: UserInterface["phone"];
  is_active: UserInterface["is_active"];
  permanent_function: UserInterface["permanent_function"];

  constructor(data: UserInterface) {
    super(data);
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.is_active = data.is_active;
    this.permanent_function = data.permanent_function;
  }

  get interface(): UserInterface {
    return {
      ...super.interface,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      is_active: this.is_active,
      permanent_function: this.permanent_function,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  get role() {
    switch (this.permanent_function?.position.role) {
      case AppRole.MANAGER:
        return AppRoles.Manager;
      case AppRole.EMPLOYEE:
        return AppRoles.Employee;
      case AppRole.ADMIN:
        return AppRoles.Admin;
      case AppRole.DEVELOPER:
        return AppRoles.Developer;
      case AppRole.SUPERADMIN:
        return AppRoles.SuperAdmin;
      default:
        return AppRoles.Manager;
    }
  }
}
