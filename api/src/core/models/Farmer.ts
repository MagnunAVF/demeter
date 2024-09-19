import Farm from './Farm'
import DocumentValidator from '../validators/DocumentValidator'

class Farmer {
  id?: string
  name: string
  document: string
  farm: Farm
  constructor(
    name: string,
    document: string,
    farm: Farm,
    documentValidator: DocumentValidator,
    id?: string
  ) {
    this.validateDocument(document, documentValidator)

    this.name = name
    this.document = document
    this.farm = farm
    this.id = id
  }

  validateDocument(document: string, documentValidator: DocumentValidator) {
    documentValidator.validate(document)
  }
}

export default Farmer
