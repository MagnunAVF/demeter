import Farm from '../../farm/models/Farm'
import DocumentValidator from '../services/DocumentValidator'

class Farmer {
  name: string
  document: string
  farm: Farm
  constructor(
    name: string,
    document: string,
    farm: Farm,
    documentValidator: DocumentValidator
  ) {
    this.validateDocument(document, documentValidator)

    this.name = name
    this.document = document
    this.farm = farm
  }

  validateDocument(document: string, documentValidator: DocumentValidator) {
    documentValidator.validate(document)
  }
}

export default Farmer
