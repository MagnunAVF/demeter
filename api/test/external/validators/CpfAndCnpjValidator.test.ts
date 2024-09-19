import CpfAndCnpjValidator from '../../../src/external/validators/CpfAndCnpjValidator'

describe('CpfAndCnpjValidator', () => {
  let validator: CpfAndCnpjValidator

  beforeEach(() => {
    validator = new CpfAndCnpjValidator()
  })

  it('should validate a valid CPF', () => {
    const validCpf = '259.456.540-78'

    expect(() => validator.validate(validCpf)).not.toThrow()
  })

  it('should validate a valid CPF (only digits)', () => {
    const validCpf = '25945654078'

    expect(() => validator.validate(validCpf)).not.toThrow()
  })

  it('should throw an error for an invalid CPF', () => {
    const invalidCpf = '123.456.789-00'

    expect(() => validator.validate(invalidCpf)).toThrow(
      'Invalid document. Must be a valid CPF or CNPJ'
    )
  })

  it('should validate a valid CNPJ', () => {
    const validCnpj = '12.345.678/0001-95'

    expect(() => validator.validate(validCnpj)).not.toThrow()
  })

  it('should validate a valid CNPJ (only digits)', () => {
    const validCnpj = '12345678000195'

    expect(() => validator.validate(validCnpj)).not.toThrow()
  })

  it('should throw an error for an invalid CNPJ', () => {
    const invalidCnpj = '12.345.678/0001-00'

    expect(() => validator.validate(invalidCnpj)).toThrow(
      'Invalid document. Must be a valid CPF or CNPJ'
    )
  })

  it('should throw an error for a document that is neither a valid CPF nor a valid CNPJ', () => {
    const invalidDocument = '11111111111'

    expect(() => validator.validate(invalidDocument)).toThrow(
      'Invalid document. Must be a valid CPF or CNPJ'
    )
  })
})
