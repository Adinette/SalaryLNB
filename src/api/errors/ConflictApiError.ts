import { ApiErrorData } from '.'
import ApiError from './ApiError'

export default class ConflictApiError extends ApiError {
  constructor({ message, data }: ApiErrorData) {
    super(409, 'Ressource en conflit', message, data)
  }
}
