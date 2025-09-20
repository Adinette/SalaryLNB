import type { ApiResourceInterface } from "../interfaces/ApiResourceInterface";
import { DateTime, luxonFormats } from "../utils/luxon";

export class ApiResourceModel implements ApiResourceInterface {
  id: ApiResourceInterface["id"];
  created_at: ApiResourceInterface["created_at"];
  updated_at: ApiResourceInterface["updated_at"];
  created_by: ApiResourceInterface["created_by"];
  updated_by: ApiResourceInterface["updated_by"];

  constructor(data: ApiResourceInterface) {
    this.id = data.id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.created_by = data.created_by;
    this.updated_by = data.updated_by;
  }

  get interface(): ApiResourceInterface {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      created_by: this.created_by,
      updated_by: this.updated_by,
    };
  }

  get json(): string {
    return JSON.stringify(this.interface);
  }

  get createdAtFormatted(): string {
    if (!this.created_at) return "N/A";

    return DateTime.fromISO(this.created_at).toFormat(
      luxonFormats.longDateFormat.LL
    );
  }

  get updatedAtFormatted(): string {
    if (!this.updated_at) return "N/A";

    return DateTime.fromISO(this.updated_at).toFormat(
      luxonFormats.longDateFormat.LL
    );
  }
}
