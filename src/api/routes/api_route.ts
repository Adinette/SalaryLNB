import type { AxiosError, AxiosRequestConfig } from "axios";
import { isAxiosError } from "axios";

import {
  ApiError,
  ForbiddenApiError,
  InternalServerApiError,
  UnauthorizedApiError,
  UnprocessableEntityApiError,
} from "../errors";
import ConflictApiError from "../errors/ConflictApiError";
import GeneralApiError from "../errors/GeneralApiError";
import NotFoundApiError from "../errors/NotFoundApiError";
import ApiHttpMethod from "../enums/api_http_method_enum";
import { salaryApiClient } from "../clients";
import type { ApiRouteInterface } from "../interfaces";
import { appLogger } from "../../utils/logger";
import { AppUtils } from "../../utils";

export class ApiRoute implements ApiRouteInterface {
  path = "";
  method: ApiHttpMethod = ApiHttpMethod.GET;
  data: object;
  useFormDataType: boolean;

  constructor(path: string, method: ApiHttpMethod, data: object = {}) {
    this.path = path;
    this.method = method;
    this.data = data;
    this.useFormDataType = data instanceof FormData;
  }

  get requestDataConfig(): object {
    if (this.method === ApiHttpMethod.GET) return { params: this.data };
    else return { data: this.data };
  }

  get requestContentTypeConfig(): object {
    if (this.useFormDataType) return { "Content-Type": "multipart/form-data" };
    else return { "Content-Type": "application/json" };
  }

  getRequestConfig(): AxiosRequestConfig {
    return {
      url: this.path,
      method: this.method,
      ...this.requestDataConfig,
      headers: {
        ...this.requestContentTypeConfig,
      },
    };
  }

  async request(): Promise<object | ApiError> {
    this.data = JSON.parse(JSON.stringify(this.data));
    try {
      const response = await salaryApiClient.request(
        this.getRequestConfig()
      );

      appLogger.info(
        `API REQUEST ${this.method}  ${this.path} :`,
        this.data,
        response.data
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        appLogger.error(
          `[${error.response?.status}] API ERROR ${this.method}  ${this.path} :`,
          this.data,
          error.response?.data
        );

        if (error.response?.status !== 422) {
          AppUtils.toast({
            title: "Erreur",
            text: error.response?.data?.message || error.message,
            icon: "error",
            position: "bottom",
            timer: 5000,
          });
        }

        return this.handleAxiosError(error);
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAxiosError(error: AxiosError<any, any>): ApiError {
    if (!error.response)
      return new GeneralApiError(0, { message: error.message, data: {} });

    if (error.status === 422) {
      const unprocessableEntityApiError = new UnprocessableEntityApiError(
        error.response?.data.messages.json || error.response?.data.messages.form
      );

      // Swal.fire({
      //   title: unprocessableEntityApiError.title,
      //   html: unprocessableEntityApiError.compileValidationErrorsInHtml(),
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      //   allowOutsideClick: false,
      //   allowEscapeKey: false,
      //   width: 600,
      //   confirmButtonColor: '#2975c9',
      //   customClass: {
      //     title: 'text-primary',
      //     confirmButton: 'text-white v-btn v-btn--block v-btn--rounded v-btn--elevated',
      //     icon: 'text-xs',
      //   },
      // })

      return unprocessableEntityApiError;
    }

    if (error.status === 403)
      return new ForbiddenApiError(error.response?.data);

    if (error.status === 401)
      return new UnauthorizedApiError(error.response?.data);

    if (error.status === 500)
      return new InternalServerApiError(error.response?.data);

    if (error.status === 404) return new NotFoundApiError(error.response?.data);

    if (error.status === 409) return new ConflictApiError(error.response?.data);

    return new GeneralApiError(error.status || 0, error.response?.data);
  }
}
