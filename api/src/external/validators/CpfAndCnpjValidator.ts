import { cpf, cnpj } from 'cpf-cnpj-validator'
import DocumentValidator from '../../core/validators/DocumentValidator'

class CpfAndCnpjValidator implements DocumentValidator {
  validate(document: string) {
    const isValidCpf = cpf.isValid(document)
    const isValidCnpj = cnpj.isValid(document)
    const validDocument = isValidCpf || isValidCnpj

    if (!validDocument) {
      throw Error('Invalid document. Must be a valid CPF or CNPJ')
    }
  }
}

export default CpfAndCnpjValidator
