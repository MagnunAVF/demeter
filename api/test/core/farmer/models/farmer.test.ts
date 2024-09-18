import Farm from '../../../../src/core/farm/models/Farm'
import Farmer from '../../../../src/core/farmer/models/Farmer'
import DocumentValidator from '../../../../src/core/farmer/services/DocumentValidator'

describe('Farmer Class', () => {
  let mockDocumentValidator: jest.Mocked<DocumentValidator>
  let farm: Farm
  let name: string, document: string

  beforeEach(() => {
    mockDocumentValidator = {
      validate: jest.fn(),
    }

    name = 'Máximus Décimus Meridius'
    document = '12345678901'
    farm = new Farm('My farm', 'Serro Largo', 'RS', 100, 50, 30, [])
  })

  it('should create a Farmer instance with valid parameters', () => {
    mockDocumentValidator.validate.mockImplementation(() => {})

    const farmer = new Farmer(name, document, farm, mockDocumentValidator)

    expect(farmer).toBeInstanceOf(Farmer)
    expect(farmer.name).toBe(name)
    expect(farmer.document).toBe(document)
    expect(farmer.farm).toBe(farm)
  })

  it('should call validateDocument with the correct document', () => {
    const validateSpy = jest
      .spyOn(mockDocumentValidator, 'validate')
      .mockImplementation(() => {})

    new Farmer(name, document, farm, mockDocumentValidator)

    expect(validateSpy).toHaveBeenCalledWith(document)
  })

  it('should throw an error if document validation fails', () => {
    const errorMessage = 'Invalid document'

    mockDocumentValidator.validate.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    expect(() => {
      new Farmer(name, 'invalid-document', farm, mockDocumentValidator)
    }).toThrow(errorMessage)
  })

  it('should handle cases where the document is valid', () => {
    mockDocumentValidator.validate.mockImplementation(() => {})

    expect(() => {
      new Farmer(name, document, farm, mockDocumentValidator)
    }).not.toThrow()
  })
})
