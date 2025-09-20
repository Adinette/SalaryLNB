import { ApiErrorData } from '.'
import ApiError from './ApiError'

export default class InternalServerApiError extends ApiError {
  constructor({ message, data }: ApiErrorData) {
    super(500, 'Erreur interne', message, data)
  }
}
