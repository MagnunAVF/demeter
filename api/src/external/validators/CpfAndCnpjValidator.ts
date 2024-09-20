import { cpf, cnpj } from 'cpf-cnpj-validator'
import DocumentValidator from '../../core/validators/DocumentValidator'
import { InvalidDocumentError } from '../../core/shared/Errors'

class CpfAndCnpjValidator implements DocumentValidator {
  validate(document: string) {
    const isValidCpf = cpf.isValid(document)
    const isValidCnpj = cnpj.isValid(document)
    const validDocument = isValidCpf || isValidCnpj

    if (!validDocument) {
      throw new InvalidDocumentError()
    }
  }
}

export default CpfAndCnpjValidator
