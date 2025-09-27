import type { ApiErrorData } from '.'
import ApiError from './ApiError'

export default class ForbiddenApiError extends ApiError {
  constructor({ message, data }: ApiErrorData) {
    super(403, 'Accès interdit', message, data)
  }
}
