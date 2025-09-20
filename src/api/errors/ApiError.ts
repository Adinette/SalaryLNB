export default abstract class ApiError {
  code: number
  title: string
  message: string
  data: any

  constructor(code: number, title = 'Erreur API', message = '', data = {}) {
    this.code = code
    this.title = title
    this.message = message
    this.data = data
  }
}
