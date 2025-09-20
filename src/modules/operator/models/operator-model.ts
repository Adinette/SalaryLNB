import { ApiResourceModel } from "../../../models/ApiResourceModel";
import type { OperatorInterface } from "../interfaces";

export class OperatorModel extends ApiResourceModel implements OperatorInterface {
  first_name: OperatorInterface["first_name"];
  last_name: OperatorInterface["last_name"];
  phone: OperatorInterface["phone"];
    email: OperatorInterface["email"];

  machine_id: OperatorInterface["machine_id"];
  salary_history: OperatorInterface["salary_history"];

  constructor(data: OperatorInterface) {
    super(data);
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.phone = data.phone;
        this.email = data.email;

    this.machine_id = data.machine_id;
    this.salary_history = data.salary_history;
  }

  get interface(): OperatorInterface {
    return {
      ...super.interface,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email,
      machine_id: this.machine_id,
      salary_history: this.salary_history,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

}
