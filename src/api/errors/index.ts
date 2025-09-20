import ApiError from './ApiError'
import ForbiddenApiError from './ForbiddenApiError'
import InternalServerApiError from './InternalServerApiError'
import NotFoundApiError from './NotFoundApiError'
import UnauthorizedApiError from './UnauthorizedApiError'
import UnprocessableEntityApiError from './UnprocessableEntityApiError'

export {
  ApiError,
  ForbiddenApiError, InternalServerApiError,
  NotFoundApiError, UnauthorizedApiError, UnprocessableEntityApiError
}

export interface ApiErrorData {
  message: string;
  data?: Record<string, any>;
}
