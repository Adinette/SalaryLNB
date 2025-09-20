import { ApiErrorData } from '.'
import ApiError from './ApiError'

export default class UnauthorizedApiError extends ApiError {
  constructor({message, data }: ApiErrorData) {
    super(403, 'Credentials invalides ou session expirée', message, data)
  }
}
