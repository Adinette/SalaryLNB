import ApiError from './ApiError'

export default class UnprocessableEntityApiError extends ApiError {
  data: { [key: string]: string[] }

  constructor(data: { [key: string]: string[] }) {
    super(422, 'Erreur de validation', '', data)

    this.data = data
  }

  compileValidationErrors(): Array<{ [key: string]: string }> {
    return Object.entries(this.data)
      .map(([key, errors]) => {
        return {
          [key]: `${errors.join(', ')}`,
        }
      })
  }

  compileValidationErrorsInHtml(): string {
    // Create a table with the validation errors
    const table = document.createElement('table')

    table.style.width = '100%'
    table.style.borderCollapse = 'collapse'
    table.style.borderSpacing = '0'
    table.style.border = '1px solid #ccc'
    table.style.fontSize = '14px'

    const tHead = table.createTHead()

    tHead.insertRow()

    const fieldHeaderCell = tHead.rows[0].insertCell()

    fieldHeaderCell.textContent = 'Champ'
    fieldHeaderCell.style.border = '1px solid #ccc'
    fieldHeaderCell.style.padding = '5px'
    fieldHeaderCell.style.textAlign = 'left'
    fieldHeaderCell.style.fontWeight = 'bold'
    fieldHeaderCell.style.minWidth = '200px'

    const errorHeaderCell = tHead.rows[0].insertCell()

    errorHeaderCell.textContent = 'Erreur'
    errorHeaderCell.style.border = '1px solid #ccc'
    errorHeaderCell.style.padding = '5px'
    errorHeaderCell.style.textAlign = 'left'
    errorHeaderCell.style.fontWeight = 'bold'

    const tBody = table.createTBody()

    this.compileValidationErrors().forEach(error => {
      const key = Object.keys(error)[0]
      const value = error[key]

      const row = tBody.insertRow()

      const fieldCell = row.insertCell()

      fieldCell.textContent = key
      fieldCell.style.border = '1px solid #ccc'
      fieldCell.style.padding = '5px'

      const errorCell = row.insertCell()

      errorCell.textContent = value
      errorCell.style.border = '1px solid #ccc'
      errorCell.style.padding = '5px'
    })

    return table.outerHTML
  }
}

