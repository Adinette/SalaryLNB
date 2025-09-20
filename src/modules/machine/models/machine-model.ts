import { ApiResourceModel } from "../../../models/ApiResourceModel";
import type { MachineInterface } from "../interfaces";

export class MachineModel extends ApiResourceModel implements MachineInterface {
  code: MachineInterface["code"];
  emplacement: MachineInterface["emplacement"];
  is_active: MachineInterface["is_active"];

  constructor(data: MachineInterface) {
    super(data);
    this.code = data.code;
    this.emplacement = data.emplacement;
    this.is_active = data.is_active;
  }

  get interface(): MachineInterface {
    return {
      ...super.interface,
      code: this.code,
      emplacement: this.emplacement,
      is_active: this.is_active,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }

}
