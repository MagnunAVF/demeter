import Crop from '../../../src/core/models/Crop'
import Farm from '../../../src/core/models/Farm'
import Farmer from '../../../src/core/models/Farmer'
import FarmerRepository from '../../../src/core/repository/FarmerRepository'
import Id from '../../../src/core/shared/Id'
import CreateFarmer from '../../../src/core/useCases/CreateFarmer'
import DocumentValidator from '../../../src/core/validators/DocumentValidator'

describe('CreateFarmer Use Case', () => {
  let createFarmer: CreateFarmer
  let mockFarmerRepository: jest.Mocked<FarmerRepository>
  let mockDocumentValidator: jest.Mocked<DocumentValidator>
  let mockId: jest.Mocked<Id>
  let farm: Farm
  let crops: Crop[]

  beforeEach(() => {
    mockFarmerRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      getByDocument: jest.fn(),
      putById: jest.fn(),
      putByDocument: jest.fn(),
      deleteById: jest.fn(),
      deleteByDocument: jest.fn(),
    }

    mockDocumentValidator = {
      validate: jest.fn(),
    }

    mockId = {
      generate: jest.fn().mockReturnValue('generated-id'),
    }

    crops = [new Crop('corn'), new Crop('soybeans')]
    farm = new Farm('My farm', 'Cerro Largo', 'RS', 100, 40, 30, crops)

    createFarmer = new CreateFarmer(
      mockFarmerRepository,
      mockDocumentValidator,
      mockId
    )
  })

  it('should throw an error if a farmer with the same document already exists', async () => {
    const existingFarmer = new Farmer(
      'Zeus',
      '12345678901',
      farm,
      mockDocumentValidator,
      'existing-id'
    )

    mockFarmerRepository.getByDocument.mockResolvedValue(existingFarmer)

    const farmer = new Farmer(
      'Zeus',
      '12345678901',
      farm,
      mockDocumentValidator
    )

    await expect(createFarmer.execute(farmer)).rejects.toThrow(
      'Farmer already exists!'
    )
  })

  it('should create a new farmer if the farmer does not exist', async () => {
    mockFarmerRepository.getByDocument.mockResolvedValue(null)

    const newFarmer = new Farmer(
      'Neo',
      '98765432100',
      farm,
      mockDocumentValidator
    )

    await createFarmer.execute(newFarmer)

    expect(mockFarmerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Neo',
        document: '98765432100',
        farm,
        id: 'generated-id',
      })
    )
  })

  it('should validate the farmer document', async () => {
    mockFarmerRepository.getByDocument.mockResolvedValue(null)

    const farmer = new Farmer(
      'Odin',
      '98765432100',
      farm,
      mockDocumentValidator
    )

    await createFarmer.execute(farmer)

    expect(mockDocumentValidator.validate).toHaveBeenCalledWith('98765432100')
  })
})
