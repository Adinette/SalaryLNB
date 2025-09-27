import type { ApiErrorData } from '.'
import ApiError from './ApiError'

export default class NotFoundApiError extends ApiError {
  constructor({ message, data }: ApiErrorData) {
    super(404, 'Ressource introuvable', message, data)
  }
}
